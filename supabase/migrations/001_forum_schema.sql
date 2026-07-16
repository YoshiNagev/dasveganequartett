-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null unique,
  bio text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'moderator', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Threads
create table if not exists public.threads (
  id uuid primary key default gen_random_uuid(),
  card_id integer not null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  slug text not null unique,
  is_locked boolean not null default false,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Comments
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reports
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) on delete set null,
  thread_id uuid references public.threads(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now(),
  check (
    thread_id is not null or comment_id is not null
  )
);

-- Indexes
create index if not exists threads_card_id_idx on public.threads(card_id);
create index if not exists threads_user_id_idx on public.threads(user_id);
create index if not exists comments_thread_id_idx on public.comments(thread_id);
create index if not exists comments_user_id_idx on public.comments(user_id);
create index if not exists reports_status_idx on public.reports(status);

-- Updated_at helper
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists threads_set_updated_at on public.threads;
create trigger threads_set_updated_at
before update on public.threads
for each row execute function public.set_updated_at();

drop trigger if exists comments_set_updated_at on public.comments;
create trigger comments_set_updated_at
before update on public.comments
for each row execute function public.set_updated_at();

-- Auto-create profile after registration
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nickname)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'nickname',
      'User-' || substring(new.id::text, 1, 8)
    )
  );

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.threads enable row level security;
alter table public.comments enable row level security;
alter table public.reports enable row level security;

-- Profiles policies
create policy "Profiles are public"
on public.profiles
for select
using (true);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- Threads policies
create policy "Visible threads are public"
on public.threads
for select
using (is_hidden = false);

create policy "Authenticated users can create threads"
on public.threads
for insert
with check (auth.uid() = user_id);

create policy "Users can update own threads"
on public.threads
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Comments policies
create policy "Visible comments are public"
on public.comments
for select
using (is_hidden = false);

create policy "Authenticated users can create comments"
on public.comments
for insert
with check (auth.uid() = user_id);

create policy "Users can update own comments"
on public.comments
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Reports policies
create policy "Authenticated users can create reports"
on public.reports
for insert
with check (auth.uid() = reporter_id);

create policy "Users can see own reports"
on public.reports
for select
using (auth.uid() = reporter_id);