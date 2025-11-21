-- Update all records with missing scores using correct calculation
UPDATE woca_responses 
SET 
  war_score = (
    COALESCE(q2, 0) +
    COALESCE(6 - q9, 0) +
    COALESCE(6 - q10, 0) +
    COALESCE(6 - q15, 0) +
    COALESCE(6 - q19, 0) +
    COALESCE(6 - q21, 0) +
    COALESCE(6 - q25, 0) +
    COALESCE(6 - q28, 0) +
    COALESCE(6 - q32, 0)
  )::numeric / NULLIF(
    (CASE WHEN q2 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q9 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q10 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q15 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q19 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q21 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q25 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q28 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q32 IS NOT NULL THEN 1 ELSE 0 END), 0
  ),
  opportunity_score = (
    COALESCE(q4, 0) +
    COALESCE(q7, 0) +
    COALESCE(q11, 0) +
    COALESCE(q14, 0) +
    COALESCE(q17, 0) +
    COALESCE(q22, 0) +
    COALESCE(q27, 0) +
    COALESCE(q29, 0) +
    COALESCE(q35, 0)
  )::numeric / NULLIF(
    (CASE WHEN q4 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q7 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q11 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q14 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q17 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q22 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q27 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q29 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q35 IS NOT NULL THEN 1 ELSE 0 END), 0
  ),
  comfort_score = (
    COALESCE(6 - q3, 0) +
    COALESCE(6 - q5, 0) +
    COALESCE(6 - q13, 0) +
    COALESCE(6 - q18, 0) +
    COALESCE(6 - q20, 0) +
    COALESCE(6 - q24, 0) +
    COALESCE(6 - q30, 0) +
    COALESCE(6 - q31, 0) +
    COALESCE(6 - q36, 0)
  )::numeric / NULLIF(
    (CASE WHEN q3 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q5 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q13 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q18 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q20 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q24 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q30 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q31 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q36 IS NOT NULL THEN 1 ELSE 0 END), 0
  ),
  apathy_score = (
    COALESCE(6 - q1, 0) +
    COALESCE(6 - q6, 0) +
    COALESCE(6 - q8, 0) +
    COALESCE(6 - q12, 0) +
    COALESCE(6 - q16, 0) +
    COALESCE(6 - q23, 0) +
    COALESCE(6 - q26, 0) +
    COALESCE(6 - q33, 0) +
    COALESCE(6 - q34, 0)
  )::numeric / NULLIF(
    (CASE WHEN q1 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q6 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q8 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q12 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q16 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q23 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q26 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q33 IS NOT NULL THEN 1 ELSE 0 END +
    CASE WHEN q34 IS NOT NULL THEN 1 ELSE 0 END), 0
  )
WHERE war_score IS NULL OR opportunity_score IS NULL OR comfort_score IS NULL OR apathy_score IS NULL;

-- Update analyzed_score with the dominant zone for all records
UPDATE woca_responses 
SET analyzed_score = (
  CASE 
    WHEN war_score >= COALESCE(opportunity_score, 0) AND 
         war_score >= COALESCE(comfort_score, 0) AND 
         war_score >= COALESCE(apathy_score, 0) THEN 'War'
    WHEN opportunity_score >= COALESCE(war_score, 0) AND 
         opportunity_score >= COALESCE(comfort_score, 0) AND 
         opportunity_score >= COALESCE(apathy_score, 0) THEN 'Opportunity'
    WHEN comfort_score >= COALESCE(war_score, 0) AND 
         comfort_score >= COALESCE(opportunity_score, 0) AND 
         comfort_score >= COALESCE(apathy_score, 0) THEN 'Comfort'
    ELSE 'Apathy'
  END
)
WHERE (analyzed_score IS NULL OR analyzed_score = '') 
  AND (war_score IS NOT NULL OR opportunity_score IS NOT NULL OR comfort_score IS NOT NULL OR apathy_score IS NOT NULL);