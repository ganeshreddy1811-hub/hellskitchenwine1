/*
  # Add Previous Points Tracking for Redemption Detection

  1. Changes to Tables
    - Add `previous_points` column to `customers` table
      - Stores the points from the last upload
      - Used to detect when points decrease (redemption)
    - Add `recently_redeemed` column to `customers` table
      - Boolean flag indicating if customer recently redeemed points
      - Set to true when points drop from 500+ to below 500

  2. Notes
    - previous_points will be updated each time a new POS sheet is uploaded
    - recently_redeemed flag helps identify customers who just used their rewards
*/

-- Add previous_points column to track point changes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'previous_points'
  ) THEN
    ALTER TABLE customers ADD COLUMN previous_points integer DEFAULT 0 NOT NULL;
  END IF;
END $$;

-- Add recently_redeemed column to flag redemptions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'recently_redeemed'
  ) THEN
    ALTER TABLE customers ADD COLUMN recently_redeemed boolean DEFAULT false NOT NULL;
  END IF;
END $$;

-- Initialize previous_points to current points for existing customers
UPDATE customers 
SET previous_points = points 
WHERE previous_points = 0;
