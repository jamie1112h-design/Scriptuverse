-- Scriptuverse -- Stripe / subscription columns migration
-- Run in: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- Project: l3v3l-scriptuverse (xvlqixdhxvsjcowjmxyl)
--
-- Adds subscription state to the existing scriptuverse_profiles table.
-- Additive only -- does not touch denomination, denomination_note, or
-- bible_version, and does not touch scriptuverse_crisis_events.
--
-- trial_uses_remaining default is set to 5, matching the front door's own
-- already-live copy ("Start 5 Free Sessions" / "Enter your email to begin
-- 5 free sessions") -- ScriptBDL_v60 itself never locks an exact number
-- for the free-trial pool (Decision 66/75 name the trial flow as launch-
-- blocking but leave the count open), so this default is taken from the
-- front door's own visible promise to visitors rather than invented fresh.

alter table scriptuverse_profiles
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists subscription_status text not null default 'trial',
  add column if not exists trial_uses_remaining integer not null default 5,
  add column if not exists current_period_end timestamptz;

-- subscription_status values used by the front door and webhook:
--   'trial'     -- no Stripe subscription yet; gated by trial_uses_remaining
--   'active'    -- paid and current
--   'past_due'  -- Stripe reported a failed charge; still shown as needing attention
--   'canceled'  -- subscription ended; falls back to trial_uses_remaining (likely 0)

-- Helpful index for the webhook's lookup-by-customer-id path.
create index if not exists scriptuverse_profiles_stripe_customer_id_idx
  on scriptuverse_profiles (stripe_customer_id);
