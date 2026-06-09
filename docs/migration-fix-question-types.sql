-- =========================================================================
-- MIGRATION: Fix Check Constraints for Assessment Questions Type
-- Run this SQL in your Supabase SQL Editor to update the allowed question types.
-- =========================================================================

-- 1. Drop the old check constraints if they exist
ALTER TABLE public.assessment_questions 
    DROP CONSTRAINT IF EXISTS assessment_questions_type_check;

ALTER TABLE public.assessment_questions 
    DROP CONSTRAINT IF EXISTS assessment_questions_menu_type_check;

-- 2. Add the updated check constraints matching the current application code
ALTER TABLE public.assessment_questions 
    ADD CONSTRAINT assessment_questions_type_check 
    CHECK (type IN ('essay', 'short_answer', 'coding', 'flowchart_translation'));

ALTER TABLE public.assessment_questions 
    ADD CONSTRAINT assessment_questions_menu_type_check 
    CHECK (menu_type IN ('pre_test', 'post_test', 'program_keterampilan', 'ujian_praktik'));

-- 3. Verify that the table allows inserting the new types
COMMENT ON TABLE public.assessment_questions IS 'Table for storing all types of assessment questions including essays and coding.';
