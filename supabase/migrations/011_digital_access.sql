-- 011_digital_access.sql
-- Kaufgebundener Zugriff auf die vollständigen Argumente und das Forum.

create extension if not exists pgcrypto;

create table if not exists public.access_licenses (
  id uuid primary key default gen_random_uuid(),
  product_key text not null default 'das-vegane-quartett'
    check (product_key = 'das-vegane-quartett'),
  source text not null
    check (source in ('stripe', 'market', 'manual')),
  order_id uuid null references public.orders(id) on delete set null,
  order_item_number smallint null check (order_item_number > 0),
  status text not null default 'available'
    check (status in ('available', 'claimed', 'revoked')),
  claim_token_hash text null unique,
  claim_token_hint text null,
  claimed_by uuid null references auth.users(id) on delete set null,
  claimed_at timestamptz null,
  revoked_at timestamptz null,
  note text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_id, order_item_number),
  check (
    (status = 'claimed' and claimed_by is not null and claimed_at is not null)
    or status <> 'claimed'
  )
);

create index if not exists access_licenses_claimed_by_idx
  on public.access_licenses(claimed_by)
  where status = 'claimed';

create index if not exists access_licenses_order_id_idx
  on public.access_licenses(order_id);

create or replace function public.set_access_license_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if old.claimed_by is not null
    and new.claimed_by is null
    and new.status = 'claimed' then
    new.status = 'revoked';
    new.revoked_at = now();
  end if;

  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_access_license_updated_at
  on public.access_licenses;

create trigger set_access_license_updated_at
before update on public.access_licenses
for each row execute function public.set_access_license_updated_at();

alter table public.access_licenses enable row level security;

drop policy if exists "Users can read their access licenses"
  on public.access_licenses;

create policy "Users can read their access licenses"
on public.access_licenses
for select
to authenticated
using (
  claimed_by = auth.uid()
  or exists (
    select 1
    from public.orders
    where orders.id = access_licenses.order_id
      and orders.user_id = auth.uid()
  )
);

-- Ausschließlich der Stripe-Webhook mit Service Role darf Zugänge aus einer
-- bezahlten Bestellung erzeugen. Wiederholte Webhooks bleiben idempotent.
create or replace function public.provision_order_access_licenses(
  target_order_id uuid
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_order public.orders%rowtype;
  inserted_count integer := 0;
begin
  select * into target_order
  from public.orders
  where id = target_order_id;

  if not found then
    raise exception 'Bestellung nicht gefunden.';
  end if;

  if target_order.status not in ('paid', 'shipped') then
    raise exception 'Zugänge dürfen nur für bezahlte Bestellungen entstehen.';
  end if;

  if target_order.user_id is null then
    raise exception 'Der Bestellung ist kein Profil zugeordnet.';
  end if;

  insert into public.access_licenses (
    source,
    order_id,
    order_item_number,
    status,
    claimed_by,
    claimed_at
  )
  select
    'stripe',
    target_order.id,
    item_number,
    case when item_number = 1 then 'claimed' else 'available' end,
    case when item_number = 1 then target_order.user_id else null end,
    case when item_number = 1 then now() else null end
  from generate_series(1, target_order.quantity) as item_number
  on conflict (order_id, order_item_number) do nothing;

  get diagnostics inserted_count = row_count;
  return inserted_count;
end;
$$;

revoke all on function public.provision_order_access_licenses(uuid)
  from public, anon, authenticated;
grant execute on function public.provision_order_access_licenses(uuid)
  to service_role;

-- Wird in RLS-Regeln verwendet. user_metadata ist hierfür ausdrücklich nicht
-- geeignet, weil Nutzer diese Metadaten selbst verändern können.
create or replace function public.has_dvq_access()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    auth.uid() is not null
    and (
      exists (
        select 1 from public.profiles
        where profiles.id = auth.uid()
          and profiles.role = 'admin'
      )
      or exists (
        select 1 from public.access_licenses
        where access_licenses.claimed_by = auth.uid()
          and access_licenses.status = 'claimed'
      )
    );
$$;

revoke all on function public.has_dvq_access() from public;
grant execute on function public.has_dvq_access() to anon, authenticated;

-- Öffentliche Beispielkarten: #01, #16, #24, #29, #37 und #48.
create or replace function public.is_public_dvq_card(target_card_id integer)
returns boolean
language sql
immutable
parallel safe
as $$
  select target_card_id = any (array[1, 16, 24, 29, 37, 48]);
$$;

grant execute on function public.is_public_dvq_card(integer)
  to anon, authenticated;

-- Die bisherigen öffentlichen Forumspolicies werden durch kartenspezifische
-- Policies ersetzt. Zu den sechs Vorschaukarten bleibt Lesen und Schreiben
-- öffentlich möglich; der restliche Bereich verlangt Käuferzugang.
drop policy if exists "Visible threads are public" on public.threads;
drop policy if exists "Authenticated users can create threads" on public.threads;
drop policy if exists "Users can update own threads" on public.threads;

create policy "Accessible visible threads can be read"
on public.threads
for select
to anon, authenticated
using (
  is_hidden = false
  and (
    public.is_public_dvq_card(card_id)
    or public.has_dvq_access()
  )
);

create policy "Eligible users can create threads"
on public.threads
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    public.is_public_dvq_card(card_id)
    or public.has_dvq_access()
  )
);

create policy "Eligible users can update own threads"
on public.threads
for update
to authenticated
using (
  auth.uid() = user_id
  and (
    public.is_public_dvq_card(card_id)
    or public.has_dvq_access()
  )
)
with check (
  auth.uid() = user_id
  and (
    public.is_public_dvq_card(card_id)
    or public.has_dvq_access()
  )
);

drop policy if exists "Visible comments are public" on public.comments;
drop policy if exists "Authenticated users can create comments" on public.comments;
drop policy if exists "Users can update own comments" on public.comments;

create policy "Accessible visible comments can be read"
on public.comments
for select
to anon, authenticated
using (
  is_hidden = false
  and exists (
    select 1
    from public.threads
    where threads.id = comments.thread_id
  )
);

create policy "Eligible users can create comments"
on public.comments
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.threads
    where threads.id = comments.thread_id
  )
);

create policy "Eligible users can update own comments"
on public.comments
for update
to authenticated
using (
  auth.uid() = user_id
  and exists (
    select 1
    from public.threads
    where threads.id = comments.thread_id
  )
)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.threads
    where threads.id = comments.thread_id
  )
);

-- Die Tabellen für Community-Vorschläge wurden im bestehenden Projekt direkt
-- in Supabase angelegt. Falls sie vorhanden sind, werden ihre bisherigen
-- Policies vollständig durch Käuferpolicies ersetzt.
do $$
declare
  existing_policy record;
begin
  if to_regclass('public.suggested_arguments') is not null then
    execute 'alter table public.suggested_arguments enable row level security';

    for existing_policy in
      select policyname
      from pg_policies
      where schemaname = 'public'
        and tablename = 'suggested_arguments'
    loop
      execute format(
        'drop policy %I on public.suggested_arguments',
        existing_policy.policyname
      );
    end loop;

    execute $policy$
      create policy "Buyers can read suggested arguments"
      on public.suggested_arguments
      for select
      to authenticated
      using (is_hidden = false and public.has_dvq_access())
    $policy$;

    execute $policy$
      create policy "Buyers can create suggested arguments"
      on public.suggested_arguments
      for insert
      to authenticated
      with check (auth.uid() = user_id and public.has_dvq_access())
    $policy$;

    execute $policy$
      create policy "Buyers can update own suggested arguments"
      on public.suggested_arguments
      for update
      to authenticated
      using (auth.uid() = user_id and public.has_dvq_access())
      with check (auth.uid() = user_id and public.has_dvq_access())
    $policy$;
  end if;
end;
$$;

comment on table public.access_licenses is
  'Eine übertragbare digitale Zugangsberechtigung pro verkauftem Deck.';
comment on column public.access_licenses.claim_token_hash is
  'SHA-256-Hash eines einmaligen Markt- oder Geschenkcodes; der Klartext wird nicht gespeichert.';
