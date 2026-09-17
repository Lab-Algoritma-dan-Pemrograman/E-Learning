-- Migration: E-Learning Updates
-- Description: Adds sort_order to levels and study_time to users

-- 1. Add sort_order column to levels table
ALTER TABLE public.levels ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- 2. Initialize sort_order based on the current order of ID
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) - 1 AS rn
  FROM public.levels
)
UPDATE public.levels SET sort_order = ordered.rn
FROM ordered WHERE public.levels.id = ordered.id;

-- 3. Add study_time column to users table (tracked in seconds)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS study_time INTEGER DEFAULT 0;
