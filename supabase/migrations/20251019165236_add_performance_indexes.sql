/*
  # Add Performance Indexes for Message History

  1. Performance Improvements
    - Add index on `messages.created_at` for fast date filtering
    - Add index on `messages.status` for status-based queries
    - Add composite index on `messages.created_at, status` for combined filtering
    - Add index on `customers.phone` for fast phone lookups
    - Add index on `customers.points` for points-based filtering
    - Add index on `customers.opted_out` for filtering active customers

  2. Notes
    - These indexes will dramatically improve query performance when dealing with 1000+ messages
    - Composite indexes help with queries that filter by multiple columns
    - All indexes use IF NOT EXISTS to prevent errors on re-run
*/

-- Index for date-based filtering on messages
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);

-- Composite index for date + status filtering
CREATE INDEX IF NOT EXISTS idx_messages_created_at_status ON messages(created_at DESC, status);

-- Index for customer phone lookups
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);

-- Index for points-based filtering
CREATE INDEX IF NOT EXISTS idx_customers_points ON customers(points DESC);

-- Index for filtering opted-out customers
CREATE INDEX IF NOT EXISTS idx_customers_opted_out ON customers(opted_out);

-- Composite index for points + opted_out queries
CREATE INDEX IF NOT EXISTS idx_customers_points_opted_out ON customers(points DESC, opted_out);