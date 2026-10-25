-- Vor dem Deployment im Supabase SQL-Editor ausführen.
begin;
create table if not exists public.withdrawals (
 id uuid primary key default gen_random_uuid(),
 reference text not null unique,
 created_at timestamptz not null default now(),
 name text not null,
 email text not null,
 order_reference text not null,
 scope text not null check (scope in ('Gesamte Bestellung','Teil der Bestellung')),
 details text not null default '',
 order_id uuid references public.orders(id) on delete set null,
 status text not null default 'open' check (status in ('open','closed')),
 mail_status text not null default 'pending' check (mail_status in ('pending','sent','failed')),
 admin_note text not null default '',
 reviewed_by uuid references auth.users(id) on delete set null,
 reviewed_at timestamptz
);
create index if not exists withdrawals_created_idx on public.withdrawals(created_at desc);
create index if not exists withdrawals_order_idx on public.withdrawals(order_id);
alter table public.withdrawals enable row level security;
revoke all on public.withdrawals from anon, authenticated;
grant all on public.withdrawals to service_role;

-- Eine dauerhafte Sperre pro Bestellung: auch bei Timeout kein zweiter Auftrag.
create table if not exists public.order_refund_requests (
 order_id uuid primary key references public.orders(id),
 withdrawal_id uuid not null references public.withdrawals(id),
 requested_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(),
 stripe_refund_id text,
 status text not null default 'processing'
);
alter table public.order_refund_requests enable row level security;
revoke all on public.order_refund_requests from anon, authenticated;
grant all on public.order_refund_requests to service_role;

alter table public.orders add column if not exists refund_status text not null default 'none';
alter table public.orders add column if not exists refunded_amount_cents integer not null default 0;
alter table public.orders add column if not exists refund_checked_at timestamptz;

-- Verspätete Checkout-Webhooks dürfen eine Erstattung nicht überschreiben.
create or replace function public.preserve_refunded_order()
returns trigger language plpgsql set search_path = public as $$
begin
 if old.status = 'refunded' and new.status <> 'refunded' then
   new.status := old.status;
 end if;
 if old.paid_at is not null then new.paid_at := old.paid_at; end if;
 -- Ein Checkout-Upsert enthält shipped_at nicht; explizites undo_shipped setzt NULL.
 if old.status = 'shipped' and new.status in ('pending','paid','cancelled')
    and new.shipped_at is not null then new.status := 'shipped'; end if;
 if old.status = 'paid' and new.status in ('pending','cancelled') then new.status := 'paid'; end if;
 return new;
end; $$;
drop trigger if exists preserve_refunded_order on public.orders;
create trigger preserve_refunded_order before update on public.orders
for each row execute function public.preserve_refunded_order();
commit;
