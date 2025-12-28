/*
  # Customer Messaging System Schema

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `first_name` (text) - Customer first name
      - `phone` (text, unique) - Customer phone number
      - `points` (integer) - Current loyalty points
      - `opted_out` (boolean) - SMS opt-out status
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `messages`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key) - Reference to customer
      - `phone` (text) - Phone number message was sent to
      - `message_body` (text) - SMS message content
      - `status` (text) - Sending status (pending, sent, failed, skipped)
      - `twilio_sid` (text) - Twilio message SID for tracking
      - `error_message` (text) - Error details if failed
      - `sent_at` (timestamptz) - When message was sent
      - `created_at` (timestamptz) - Record creation timestamp
    
    - `settings`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Setting key
      - `value` (text) - Setting value
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage data
    
  3. Indexes
    - Index on customers.phone for fast lookups
    - Index on customers.points for filtering
    - Index on messages.status for tracking
    - Index on messages.created_at for history sorting

  4. Notes
    - All timestamps default to current time
    - Opted out defaults to false
    - Points default to 0
    - Status defaults to 'pending'
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  phone text UNIQUE NOT NULL,
  points integer DEFAULT 0 NOT NULL,
  opted_out boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  phone text NOT NULL,
  message_body text NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  twilio_sid text,
  error_message text,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_points ON customers(points);
CREATE INDEX IF NOT EXISTS idx_customers_opted_out ON customers(opted_out);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_customer_id ON messages(customer_id);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Customers policies
CREATE POLICY "Authenticated users can view customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customers"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
  ON customers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete customers"
  ON customers FOR DELETE
  TO authenticated
  USING (true);

-- Messages policies
CREATE POLICY "Authenticated users can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete messages"
  ON messages FOR DELETE
  TO authenticated
  USING (true);

-- Settings policies
CREATE POLICY "Authenticated users can view settings"
  ON settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert settings"
  ON settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('twilio_account_sid', ''),
  ('twilio_auth_token', ''),
  ('twilio_phone_number', '')
ON CONFLICT (key) DO NOTHING;