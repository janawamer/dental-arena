-- ============================================================
-- DENTAL ARENA — Full Database Schema
-- Paste this entire file into Supabase → SQL Editor → Run
-- ============================================================

-- ── PROFILES (extends auth.users) ──────────────────────────
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  phone       text,
  role        text default 'customer' check (role in ('customer', 'admin')),
  city        text,
  created_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Admins can view all profiles"
  on profiles for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'customer'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── PRODUCTS ────────────────────────────────────────────────
create table if not exists public.products (
  id            uuid default gen_random_uuid() primary key,
  name          text not null,
  brand         text not null,
  specialty     text not null,
  category      text,
  price         numeric(10,2) not null,
  old_price     numeric(10,2),
  stock         int default 0,
  description   text,
  image_url     text,
  rating        numeric(3,2) default 0,
  reviews_count int default 0,
  is_hot_deal   boolean default false,
  hot_deal_expiry_days int,
  is_active     boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.products enable row level security;

create policy "Anyone can view active products"
  on products for select using (is_active = true);

create policy "Admins can manage products"
  on products for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- ── ORDERS ──────────────────────────────────────────────────
create table if not exists public.orders (
  id               uuid default gen_random_uuid() primary key,
  user_id          uuid references auth.users(id),
  status           text default 'pending'
                     check (status in ('pending','confirmed','processing','shipped','delivered','cancelled')),
  subtotal         numeric(10,2) not null,
  discount         numeric(10,2) default 0,
  tax              numeric(10,2) not null,
  total            numeric(10,2) not null,
  coupon_code      text,
  shipping_name    text,
  shipping_phone   text,
  shipping_address text,
  shipping_city    text,
  notes            text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on orders for select using (auth.uid() = user_id);

create policy "Users can create orders"
  on orders for insert with check (auth.uid() = user_id);

create policy "Admins can view all orders"
  on orders for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins can update orders"
  on orders for update using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- ── ORDER ITEMS ─────────────────────────────────────────────
create table if not exists public.order_items (
  id            uuid default gen_random_uuid() primary key,
  order_id      uuid references orders(id) on delete cascade,
  product_id    uuid references products(id),
  product_name  text not null,
  product_brand text,
  image_url     text,
  price         numeric(10,2) not null,
  qty           int not null
);

alter table public.order_items enable row level security;

create policy "Users can view own order items"
  on order_items for select using (
    exists (select 1 from orders where id = order_id and user_id = auth.uid())
  );

create policy "Users can insert order items"
  on order_items for insert with check (
    exists (select 1 from orders where id = order_id and user_id = auth.uid())
  );

create policy "Admins can view all order items"
  on order_items for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- ── MARKETPLACE LISTINGS ─────────────────────────────────────
create table if not exists public.marketplace_listings (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id),
  title       text not null,
  category    text,
  condition   text,
  price       numeric(10,2) not null,
  description text,
  phone       text,
  city        text,
  image_url   text,
  seller_name text,
  status      text default 'pending'
                check (status in ('pending','active','sold','rejected')),
  created_at  timestamptz default now()
);

alter table public.marketplace_listings enable row level security;

create policy "Anyone can view active listings"
  on marketplace_listings for select using (status = 'active');

create policy "Users can insert listings"
  on marketplace_listings for insert with check (auth.uid() = user_id);

create policy "Users can view own listings"
  on marketplace_listings for select using (auth.uid() = user_id);

create policy "Admins can manage all listings"
  on marketplace_listings for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- ── STORAGE BUCKET (run separately if needed) ───────────────
-- Go to Supabase → Storage → Create bucket named "products"
-- Set it to Public
-- Also create bucket named "listings" and set to Public

-- ── UPDATED_AT TRIGGER ──────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_products_updated_at
  before update on products
  for each row execute procedure set_updated_at();

create trigger set_orders_updated_at
  before update on orders
  for each row execute procedure set_updated_at();

-- ── DONE ────────────────────────────────────────────────────
-- After running this, go to Authentication → Settings and enable Email/Password
-- Then go to Table Editor → profiles → find your user row → change role to 'admin'
