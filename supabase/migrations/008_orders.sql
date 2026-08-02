-- 008_orders.sql
-- Sicheres Bestellmodell für Das Vegane Quartett.
-- Bestellungen werden später ausschließlich serverseitig angelegt und geändert.

create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),

  -- Kann bei Gastbestellungen leer bleiben.
  user_id uuid null references auth.users(id) on delete set null,

  order_number text not null unique
    default ('DVQ-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))),

  quantity smallint not null
    check (quantity between 1 and 4),

  unit_price_cents integer not null
    check (unit_price_cents = 1200),

  shipping_cost_cents integer not null
    check (shipping_cost_cents = 300),

  total_cents integer not null
    check (
      total_cents =
      (quantity::integer * unit_price_cents) + shipping_cost_cents
    ),

  currency text not null default 'eur'
    check (currency = 'eur'),

  status text not null default 'pending'
    check (
      status in (
        'pending',
        'paid',
        'cancelled',
        'refunded',
        'shipped'
      )
    ),

  customer_email text null,
  shipping_name text null,
  shipping_address jsonb null,

  stripe_checkout_session_id text null unique,
  stripe_payment_intent_id text null unique,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz null,
  shipped_at timestamptz null
);

create index if not exists orders_user_id_idx
  on public.orders(user_id);

create index if not exists orders_status_idx
  on public.orders(status);

create index if not exists orders_created_at_idx
  on public.orders(created_at desc);

create or replace function public.set_orders_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_orders_updated_at on public.orders;

create trigger set_orders_updated_at
before update on public.orders
for each row
execute function public.set_orders_updated_at();

alter table public.orders enable row level security;

-- Angemeldete Personen dürfen ihre eigenen Bestellungen lesen.
-- Es gibt bewusst keine INSERT-, UPDATE- oder DELETE-Policy:
-- Diese Vorgänge erfolgen später ausschließlich über sichere Server-Endpunkte.
drop policy if exists "Users can read own orders" on public.orders;

create policy "Users can read own orders"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);

comment on table public.orders is
  'Vorbestellungen und spätere Shop-Bestellungen für Das Vegane Quartett.';

comment on column public.orders.total_cents is
  'Gesamtbetrag in Cent. Muss Menge × Einzelpreis + Versand entsprechen.';
