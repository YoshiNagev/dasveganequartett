-- Sichere und atomare Kontolöschung
--
-- Vor Verwendung:
-- 1. In Supabase unter Authentication > Users einen Systemnutzer anlegen.
-- 2. Für dessen UUID ein Profil mit dem Nickname "Gelöschter Account" anlegen.
-- 3. Dieselbe UUID in Vercel als DELETED_ACCOUNT_USER_ID hinterlegen.
--
-- Diese Funktion darf ausschließlich über die serverseitige API-Route mit
-- Service-Role-/Secret-Key aufgerufen werden.

create or replace function public.delete_user_and_anonymize(
  target_user_id uuid,
  replacement_user_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if target_user_id is null or replacement_user_id is null then
    raise exception 'Eine erforderliche Benutzer-ID fehlt.';
  end if;

  if target_user_id = replacement_user_id then
    raise exception 'Der Systemnutzer kann nicht gelöscht werden.';
  end if;

  if not exists (
    select 1
    from auth.users
    where id = replacement_user_id
  ) then
    raise exception 'Der Ersatznutzer existiert nicht.';
  end if;

  if not exists (
    select 1
    from public.profiles
    where id = replacement_user_id
  ) then
    raise exception 'Das Profil des Ersatznutzers existiert nicht.';
  end if;

  if not exists (
    select 1
    from auth.users
    where id = target_user_id
  ) then
    raise exception 'Das zu löschende Benutzerkonto existiert nicht.';
  end if;

  -- Benachrichtigungen, die für das gelöschte Konto bestimmt waren,
  -- werden nicht mehr benötigt.
  delete from public.notifications
  where user_id = target_user_id;

  -- In Benachrichtigungen anderer Nutzer wird der bisherige Akteur entfernt.
  update public.notifications
  set actor_id = null
  where actor_id = target_user_id;

  -- Persönliche Abstimmungen werden vollständig entfernt.
  delete from public.comment_votes
  where user_id = target_user_id;

  -- Öffentliche Inhalte bleiben erhalten und werden dem neutralen
  -- Systemprofil "Gelöschter Account" zugeordnet.
  update public.suggested_arguments
  set user_id = replacement_user_id
  where user_id = target_user_id;

  update public.threads
  set user_id = replacement_user_id
  where user_id = target_user_id;

  update public.comments
  set user_id = replacement_user_id
  where user_id = target_user_id;

  -- Meldungen bleiben für die Moderation erhalten, werden aber anonymisiert.
  update public.reports
  set reporter_id = null
  where reporter_id = target_user_id;

  -- Durch ON DELETE CASCADE wird nun nur noch das persönliche Profil entfernt.
  -- Die zuvor übertragenen öffentlichen Inhalte bleiben bestehen.
  delete from auth.users
  where id = target_user_id;

  if not found then
    raise exception 'Das Benutzerkonto konnte nicht gelöscht werden.';
  end if;
end;
$$;

revoke all on function public.delete_user_and_anonymize(uuid, uuid)
from public, anon, authenticated;

grant execute on function public.delete_user_and_anonymize(uuid, uuid)
to service_role;
