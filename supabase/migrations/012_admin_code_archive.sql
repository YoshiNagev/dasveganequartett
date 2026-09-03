-- 012_admin_code_archive.sql
-- Ermöglicht es Admins, neu erzeugte Direktverkaufscodes später erneut
-- anzusehen und auszudrucken. Der Klartext wird ausschließlich verschlüsselt
-- gespeichert; der Hash bleibt für die eigentliche Einlösung maßgeblich.

alter table public.access_licenses
  add column if not exists claim_token_ciphertext text null;

comment on column public.access_licenses.claim_token_ciphertext is
  'AES-256-GCM-verschlüsselter Klartext eines Marktcodes für die Adminverwaltung.';
