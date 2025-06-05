
import { WOCAQuestion } from '@/data/wocaQuestions';

export interface WOCAScores {
  War: number;
  Opportunity: number;
  Comfort: number;
  Apathy: number;
}

export const applyReverseScoring = (score: number): number => {
  const reverseMap: { [key: number]: number } = {
    1: 5,
    2: 4,
    3: 3,
    4: 2,
    5: 1,
  };
  return reverseMap[score] || score;
};

export const calculateWOCAScores = (
  questions: WOCAQuestion[], 
  answers: { [key: number]: number }
): WOCAScores => {
  const scores: WOCAScores = {
    War: 0,
    Opportunity: 0,
    Comfort: 0,
    Apathy: 0,
  };

  const counts: { [key in keyof WOCAScores]: number } = {
    War: 0,
    Opportunity: 0,
    Comfort: 0,
    Apathy: 0,
  };

  questions.forEach(question => {
    if (answers[question.id]) {
      // Apply reverse scoring if needed
      const adjustedScore = question.reversed ? 
        applyReverseScoring(answers[question.id]) : 
        answers[question.id];
      
      const domain = question.domain as keyof WOCAScores;
      scores[domain] += adjustedScore;
      counts[domain]++;
    }
  });

  // Calculate averages
  Object.keys(scores).forEach(domain => {
    const key = domain as keyof WOCAScores;
    if (counts[key] > 0) {
      scores[key] = scores[key] / counts[key];
    }
  });

  return scores;
};

export const getDominantZone = (scores: WOCAScores): string => {
  return Object.entries(scores).reduce((max, [zone, score]) => 
    score > max.score ? { zone, score } : max, 
    { zone: '', score: 0 }
  ).zone;
};

export const getZoneNameInHebrew = (zone: string): string => {
  const hebrewNames: { [key: string]: string } = {
    War: "מלחמה",
    Opportunity: "הזדמנות", 
    Comfort: "נוחות",
    Apathy: "אדישות"
  };
  return hebrewNames[zone] || zone;
};
