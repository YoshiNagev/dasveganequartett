create unique index if not exists
  orders_stripe_checkout_session_id_unique
on public.orders(stripe_checkout_session_id)
where stripe_checkout_session_id is not null;

create unique index if not exists
  orders_stripe_payment_intent_id_unique
on public.orders(stripe_payment_intent_id)
where stripe_payment_intent_id is not null;

create index if not exists
  orders_paid_at_idx
on public.orders(paid_at desc)
where paid_at is not null;

comment on column public.orders.stripe_checkout_session_id is
  'Eindeutige Stripe Checkout Session. Dient der idempotenten Webhook-Verarbeitung.';

comment on column public.orders.stripe_payment_intent_id is
  'Stripe PaymentIntent der erfolgreichen oder ausstehenden Zahlung.';
