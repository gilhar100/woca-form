
-- Update existing woca_responses records with calculated scores
UPDATE woca_responses 
SET 
  war_score = (
    -- Calculate War score average from reversed/non-reversed questions
    (
      CASE WHEN q2 IS NOT NULL THEN q2 ELSE 0 END +
      CASE WHEN q9 IS NOT NULL THEN (6 - q9) ELSE 0 END +
      CASE WHEN q10 IS NOT NULL THEN (6 - q10) ELSE 0 END +
      CASE WHEN q15 IS NOT NULL THEN (6 - q15) ELSE 0 END +
      CASE WHEN q19 IS NOT NULL THEN (6 - q19) ELSE 0 END +
      CASE WHEN q21 IS NOT NULL THEN (6 - q21) ELSE 0 END +
      CASE WHEN q25 IS NOT NULL THEN (6 - q25) ELSE 0 END +
      CASE WHEN q28 IS NOT NULL THEN (6 - q28) ELSE 0 END +
      CASE WHEN q32 IS NOT NULL THEN (6 - q32) ELSE 0 END
    ) / NULLIF(
      CASE WHEN q2 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q9 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q10 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q15 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q19 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q21 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q25 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q28 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q32 IS NOT NULL THEN 1 ELSE 0 END, 0
    )
  ),
  opportunity_score = (
    -- Calculate Opportunity score average
    (
      CASE WHEN q4 IS NOT NULL THEN q4 ELSE 0 END +
      CASE WHEN q7 IS NOT NULL THEN q7 ELSE 0 END +
      CASE WHEN q11 IS NOT NULL THEN q11 ELSE 0 END +
      CASE WHEN q14 IS NOT NULL THEN q14 ELSE 0 END +
      CASE WHEN q17 IS NOT NULL THEN q17 ELSE 0 END +
      CASE WHEN q22 IS NOT NULL THEN q22 ELSE 0 END +
      CASE WHEN q27 IS NOT NULL THEN q27 ELSE 0 END +
      CASE WHEN q29 IS NOT NULL THEN q29 ELSE 0 END +
      CASE WHEN q35 IS NOT NULL THEN q35 ELSE 0 END
    ) / NULLIF(
      CASE WHEN q4 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q7 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q11 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q14 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q17 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q22 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q27 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q29 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q35 IS NOT NULL THEN 1 ELSE 0 END, 0
    )
  ),
  comfort_score = (
    -- Calculate Comfort score average from reversed questions
    (
      CASE WHEN q3 IS NOT NULL THEN (6 - q3) ELSE 0 END +
      CASE WHEN q5 IS NOT NULL THEN (6 - q5) ELSE 0 END +
      CASE WHEN q13 IS NOT NULL THEN (6 - q13) ELSE 0 END +
      CASE WHEN q18 IS NOT NULL THEN (6 - q18) ELSE 0 END +
      CASE WHEN q20 IS NOT NULL THEN (6 - q20) ELSE 0 END +
      CASE WHEN q24 IS NOT NULL THEN (6 - q24) ELSE 0 END +
      CASE WHEN q30 IS NOT NULL THEN (6 - q30) ELSE 0 END +
      CASE WHEN q31 IS NOT NULL THEN (6 - q31) ELSE 0 END +
      CASE WHEN q36 IS NOT NULL THEN (6 - q36) ELSE 0 END
    ) / NULLIF(
      CASE WHEN q3 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q5 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q13 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q18 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q20 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q24 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q30 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q31 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q36 IS NOT NULL THEN 1 ELSE 0 END, 0
    )
  ),
  apathy_score = (
    -- Calculate Apathy score average from reversed questions
    (
      CASE WHEN q1 IS NOT NULL THEN (6 - q1) ELSE 0 END +
      CASE WHEN q6 IS NOT NULL THEN (6 - q6) ELSE 0 END +
      CASE WHEN q8 IS NOT NULL THEN (6 - q8) ELSE 0 END +
      CASE WHEN q12 IS NOT NULL THEN (6 - q12) ELSE 0 END +
      CASE WHEN q16 IS NOT NULL THEN (6 - q16) ELSE 0 END +
      CASE WHEN q23 IS NOT NULL THEN (6 - q23) ELSE 0 END +
      CASE WHEN q26 IS NOT NULL THEN (6 - q26) ELSE 0 END +
      CASE WHEN q33 IS NOT NULL THEN (6 - q33) ELSE 0 END +
      CASE WHEN q34 IS NOT NULL THEN (6 - q34) ELSE 0 END
    ) / NULLIF(
      CASE WHEN q1 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q6 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q8 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q12 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q16 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q23 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q26 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q33 IS NOT NULL THEN 1 ELSE 0 END +
      CASE WHEN q34 IS NOT NULL THEN 1 ELSE 0 END, 0
    )
  )
WHERE war_score IS NULL OR opportunity_score IS NULL OR comfort_score IS NULL OR apathy_score IS NULL;

-- Update analyzed_score with the dominant zone
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
WHERE analyzed_score IS NULL AND (war_score IS NOT NULL OR opportunity_score IS NOT NULL OR comfort_score IS NOT NULL OR apathy_score IS NOT NULL);
