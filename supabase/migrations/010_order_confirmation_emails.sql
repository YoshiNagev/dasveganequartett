-- 010_order_confirmation_emails.sql
-- Idempotente Bestellbestätigungen über Resend.

alter table public.orders
  add column if not exists confirmation_email_status text
    not null default 'pending'
    check (
      confirmation_email_status in (
        'pending',
        'sending',
        'sent',
        'failed'
      )
    ),
  add column if not exists confirmation_email_sent_at timestamptz null,
  add column if not exists confirmation_email_resend_id text null,
  add column if not exists confirmation_email_error text null;

create index if not exists orders_confirmation_email_status_idx
  on public.orders(confirmation_email_status);

create or replace function public.claim_order_confirmation_email(
  target_order_id uuid
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  claimed boolean;
begin
  update public.orders
  set
    confirmation_email_status = 'sending',
    confirmation_email_error = null,
    updated_at = now()
  where id = target_order_id
    and status in ('paid', 'shipped')
    and confirmation_email_sent_at is null
    and (
      confirmation_email_status in ('pending', 'failed')
      or (
        confirmation_email_status = 'sending'
        and updated_at < now() - interval '10 minutes'
      )
    );

  get diagnostics claimed = row_count;
  return claimed;
end;
$$;

revoke all on function public.claim_order_confirmation_email(uuid)
  from public, anon, authenticated;

grant execute on function public.claim_order_confirmation_email(uuid)
  to service_role;
