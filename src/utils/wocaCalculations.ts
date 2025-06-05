
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
    if (answers[question.id] !== undefined) {
      // Apply reverse scoring if needed
      const adjustedScore = question.reversed ? 
        applyReverseScoring(answers[question.id]) : 
        answers[question.id];
      
      const domain = question.domain as keyof WOCAScores;
      scores[domain] += adjustedScore;
      counts[domain]++;
    }
  });

  // Calculate averages per dimension only
  Object.keys(scores).forEach(domain => {
    const key = domain as keyof WOCAScores;
    if (counts[key] > 0) {
      scores[key] = scores[key] / counts[key];
    }
  });

  return scores;
};

// Calculate scores from question_responses array
export const calculateWOCAScoresFromResponses = (questionResponses: any[]): WOCAScores => {
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

  questionResponses.forEach(qr => {
    if (qr && qr.dimension && qr.score !== undefined) {
      const dimension = qr.dimension as keyof WOCAScores;
      if (scores[dimension] !== undefined) {
        // Use the score directly as reverse scoring should already be applied
        scores[dimension] += qr.score;
        counts[dimension]++;
      }
    }
  });

  // Calculate averages per dimension
  Object.keys(scores).forEach(domain => {
    const key = domain as keyof WOCAScores;
    if (counts[key] > 0) {
      scores[key] = scores[key] / counts[key];
    }
  });

  return scores;
};

export const getDominantZone = (scores: WOCAScores): string => {
  const maxScore = Math.max(...Object.values(scores));
  const dominantZones = Object.entries(scores)
    .filter(([_, score]) => Math.abs(score - maxScore) < 0.01) // Handle floating point precision
    .map(([zone, _]) => zone);
  
  return dominantZones.join('/');
};

export const getZoneNameInHebrew = (zone: string): string => {
  if (zone.includes('/')) {
    // Handle tied zones
    const zones = zone.split('/');
    const hebrewNames = zones.map(z => getZoneNameInHebrew(z));
    return hebrewNames.join(' ו-');
  }
  
  const hebrewNames: { [key: string]: string } = {
    War: "מלחמה",
    Opportunity: "הזדמנות", 
    Comfort: "נוחות",
    Apathy: "אדישות"
  };
  return hebrewNames[zone] || zone;
};

export const getZoneAssignmentText = (dominantZone: string, isGroup: boolean = false): string => {
  const zones = dominantZone.split('/');
  const hebrewZones = zones.map(z => getZoneNameInHebrew(z));
  
  if (zones.length === 1) {
    return isGroup ? 
      `הקבוצה מזוהה עם אזור תודעה: ${hebrewZones[0]}` :
      `הנבדק נמצא באזור תודעה: ${hebrewZones[0]}`;
  } else if (zones.length === 2) {
    return isGroup ? 
      `הקבוצה מזוהה עם שני אזורי תודעה: ${hebrewZones[0]} ו-${hebrewZones[1]}` :
      `הנבדק נמצא בשני אזורי תודעה: ${hebrewZones[0]} ו-${hebrewZones[1]}`;
  } else {
    return isGroup ? 
      `הקבוצה מזוהה עם מספר אזורי תודעה: ${hebrewZones.join(', ')}` :
      `הנבדק נמצא במספר אזורי תודעה: ${hebrewZones.join(', ')}`;
  }
};

export const getZoneColor = (zone: string): string => {
  const colors: { [key: string]: string } = {
    War: "#ef4444",      // Red
    Opportunity: "#22c55e", // Green  
    Comfort: "#eab308",     // Yellow
    Apathy: "#6b7280"       // Gray
  };
  return colors[zone] || "#6b7280";
};
