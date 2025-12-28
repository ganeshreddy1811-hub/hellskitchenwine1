/*
  # Add Application Settings Table

  1. New Tables
    - `app_settings`
      - `id` (uuid, primary key) - Unique identifier
      - `store_name` (text) - Name of the store
      - `store_website` (text) - Store website URL
      - `store_logo_url` (text, nullable) - URL to store logo
      - `business_hours_start` (integer) - Start hour for sending messages (0-23)
      - `business_hours_end` (integer) - End hour for sending messages (0-23)
      - `timezone` (text) - Timezone for business hours
      - `sunday_sending_enabled` (boolean) - Whether to send messages on Sundays
      - `holiday_sending_enabled` (boolean) - Whether to send messages on holidays
      - `require_opt_in` (boolean) - Whether customers must opt in
      - `message_template_250` (text) - Default template for 250 points
      - `message_template_500` (text) - Default template for 500 points
      - `created_at` (timestamptz) - When settings were created
      - `updated_at` (timestamptz) - When settings were last updated

  2. Security
    - Enable RLS on `app_settings` table
    - Add policy for authenticated users to read settings
    - Add policy for authenticated users to update settings

  3. Default Data
    - Insert default settings for Hell's Kitchen Wine & Spirits
*/

-- Create app_settings table
CREATE TABLE IF NOT EXISTS app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name text NOT NULL DEFAULT 'Hell''s Kitchen Wine & Spirits',
  store_website text NOT NULL DEFAULT 'https://hellskitchenwine.com',
  store_logo_url text,
  business_hours_start integer NOT NULL DEFAULT 9,
  business_hours_end integer NOT NULL DEFAULT 18,
  timezone text NOT NULL DEFAULT 'America/New_York',
  sunday_sending_enabled boolean NOT NULL DEFAULT false,
  holiday_sending_enabled boolean NOT NULL DEFAULT false,
  require_opt_in boolean NOT NULL DEFAULT true,
  message_template_250 text NOT NULL DEFAULT 'Hi {name}! You have {points} loyalty points. Keep shopping to reach 500 points and unlock exclusive rewards! Visit us today.',
  message_template_500 text NOT NULL DEFAULT 'Hi {name}! Congrats! You have {points} loyalty points and qualify for special rewards! Come in soon to redeem your points.',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read settings (needed for the app to function)
CREATE POLICY "Anyone can read app settings"
  ON app_settings
  FOR SELECT
  USING (true);

-- Only allow updates (no inserts or deletes to prevent accidental data loss)
CREATE POLICY "Authenticated users can update app settings"
  ON app_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default settings if none exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM app_settings LIMIT 1) THEN
    INSERT INTO app_settings (
      store_name,
      store_website,
      business_hours_start,
      business_hours_end,
      timezone,
      sunday_sending_enabled,
      holiday_sending_enabled,
      require_opt_in
    ) VALUES (
      'Hell''s Kitchen Wine & Spirits',
      'https://hellskitchenwine.com',
      9,
      18,
      'America/New_York',
      false,
      false,
      true
    );
  END IF;
END $$;