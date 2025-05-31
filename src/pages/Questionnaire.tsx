
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    id: 1,
    text: "העובדים מרגישים חופשיים לשתף רעיונות גם אם הם יוצאי דופן",
    domain: "Communication",
    reversed: false,
  },
  {
    id: 2,
    text: "פעמים רבות לא ברור לאן הארגון שואף להגיע",
    domain: "Trust",
    reversed: true,
  },
  {
    id: 3,
    text: "קיימת תקשורת פתוחה בגובה העיניים בין מנהלים לעובדים",
    domain: "Communication",
    reversed: false,
  },
  {
    id: 4,
    text: "שינויים בארגון מתקבלים בקושי רב",
    domain: "Innovation",
    reversed: true,
  },
  {
    id: 5,
    text: "הנהלת הארגון מגדירה חזון מעורר השראה",
    domain: "Trust",
    reversed: false,
  },
  {
    id: 6,
    text: "העובדים נרתעים מהבעת ביקורת או הצגת חלופות",
    domain: "Communication",
    reversed: true,
  },
  {
    id: 7,
    text: "בארגון קיימת מחויבות לתרומה שמעבר למטרות אישיות",
    domain: "Collaboration",
    reversed: false,
  },
  {
    id: 8,
    text: "לא נהוג לשתף בהצלחות או בכישלונות כדי ללמוד מהן",
    domain: "Accountability",
    reversed: true,
  },
  {
    id: 9,
    text: "ההנהלה מתנהלת בשקיפות מלאה",
    domain: "Trust",
    reversed: false,
  },
  {
    id: 10,
    text: "שיתוף פעולה בין צוותים מוביל לרעיונות חדשים",
    domain: "Innovation",
    reversed: false,
  },
  {
    id: 11,
    text: "קיימת תחושת משמעות רחבה בעבודת היומיום",
    domain: "Collaboration",
    reversed: false,
  },
  {
    id: 12,
    text: "העובדים נמנעים משיח ערכי בנוגע לעבודתם",
    domain: "Communication",
    reversed: true,
  },
  {
    id: 13,
    text: "נהוג להציג את הסיפור שמאחורי ההחלטות",
    domain: "Trust",
    reversed: false,
  },
  {
    id: 14,
    text: "העובדים חשים שהמנהלים לא קשובים לצרכים שלהם",
    domain: "Communication",
    reversed: true,
  },
  {
    id: 15,
    text: "קיימת אווירה של סקרנות וחיפוש ידע חדש",
    domain: "Innovation",
    reversed: false,
  },
  {
    id: 16,
    text: "אין מוטיבציה ליזום או להציע דרכי פעולה חדשות",
    domain: "Innovation",
    reversed: true,
  },
  {
    id: 17,
    text: "הארגון מעודד התפתחות אישית של כל עובד",
    domain: "Collaboration",
    reversed: false,
  },
  {
    id: 18,
    text: "נהוג להסתיר בעיות כדי להימנע מעימותים",
    domain: "Trust",
    reversed: true,
  },
  {
    id: 19,
    text: "תחושת האמון בארגון גבוהה",
    domain: "Trust",
    reversed: false,
  },
  {
    id: 20,
    text: "לא מקיימים שיחות עומק עם העובדים על מטרותיהם",
    domain: "Accountability",
    reversed: true,
  },
  {
    id: 21,
    text: "הארגון פועל מתוך ראייה רחבה של עתיד משתנה",
    domain: "Innovation",
    reversed: false,
  },
  {
    id: 22,
    text: "תהליך קבלת ההחלטות אינו כולל שיח פתוח עם עובדים",
    domain: "Communication",
    reversed: true,
  },
  {
    id: 23,
    text: "השראה היא חלק בלתי נפרד מהתרבות הארגונית",
    domain: "Collaboration",
    reversed: false,
  },
  {
    id: 24,
    text: "חוסר ודאות נתפסת כהזדמנות ללמידה",
    domain: "Innovation",
    reversed: false,
  },
  {
    id: 25,
    text: "לעובדים קל להביע תחושות ורעיונות אישיים",
    domain: "Communication",
    reversed: false,
  },
  {
    id: 26,
    text: "קיימת תחושת ניתוק בין הנהלה לעובדים",
    domain: "Trust",
    reversed: true,
  },
  {
    id: 27,
    text: "בארגון יודעים לנהל קונפליקטים באופן בונה",
    domain: "Collaboration",
    reversed: false,
  },
  {
    id: 28,
    text: "לא מקדישים זמן ללמידה ושיפור",
    domain: "Accountability",
    reversed: true,
  },
  {
    id: 29,
    text: "יש נכונות אמיתית להקשיב לדעות שונות",
    domain: "Communication",
    reversed: false,
  },
  {
    id: 30,
    text: "הארגון מתקשה להסתגל לשינויים חיצוניים",
    domain: "Innovation",
    reversed: true,
  },
  {
    id: 31,
    text: "תחושת השייכות בארגון חזקה ומחברת",
    domain: "Collaboration",
    reversed: false,
  },
  {
    id: 32,
    text: "המנהיגים מציגים דוגמה אישית",
    domain: "Accountability",
    reversed: false,
  },
  {
    id: 33,
    text: "הארגון מדגיש מטרות ארגוניות עם ערך חברתי",
    domain: "Collaboration",
    reversed: false,
  },
  {
    id: 34,
    text: "תחושת שליחות אישית אינה מקבלת ביטוי",
    domain: "Accountability",
    reversed: true,
  },
  {
    id: 35,
    text: "נהוג לשקול מגוון של חלופות לפני קבלת החלטה",
    domain: "Accountability",
    reversed: false,
  },
  {
    id: 36,
    text: "יש מחסור בבהירות לגבי כיווני פעולה ארגוניים",
    domain: "Trust",
    reversed: true,
  },
];

interface PersonalDetails {
  fullName: string;
  education: string;
  profession: string;
  organization: string;
  experienceYears: number;
  email: string;
  phone: string;
}

const Questionnaire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const personalDetails = location.state?.personalDetails as PersonalDetails | undefined;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!personalDetails) {
      navigate('/personal-details');
    }
  }, [personalDetails, navigate]);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const calculateScores = () => {
    const scores: { [key: string]: number } = {
      Communication: 0,
      Trust: 0,
      Innovation: 0,
      Collaboration: 0,
      Accountability: 0,
    };

    let counts: { [key: string]: number } = {
      Communication: 0,
      Trust: 0,
      Innovation: 0,
      Collaboration: 0,
      Accountability: 0,
    };

    questions.forEach(question => {
      if (answers[question.id]) {
        // Handle reversed questions by inverting the score
        const adjustedScore = question.reversed ? (6 - answers[question.id]) : answers[question.id];
        scores[question.domain] += adjustedScore;
        counts[question.domain]++;
      }
    });

    for (const domain in scores) {
      if (counts[domain] > 0) {
        scores[domain] = scores[domain] / counts[domain];
      }
    }

    return scores;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const scores = calculateScores();
      const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
      
      // Create question responses dictionary
      const questionResponses: { [key: string]: number } = {};
      questions.forEach(question => {
        if (answers[question.id]) {
          questionResponses[`question_${question.id}`] = answers[question.id];
        }
      });

      // Generate a unique ID for this response
      const responseId = crypto.randomUUID();
      
      const { error } = await supabase
        .from('woca')
        .insert({
          id: responseId,
          full_name: personalDetails?.fullName || '',
          education: personalDetails?.education || null,
          profession: personalDetails?.profession || null,
          organization: personalDetails?.organization || null,
          experience_years: personalDetails?.experienceYears || null,
          email: personalDetails?.email || '',
          phone: personalDetails?.phone || null,
          scores: scores,
          overall_score: overallScore,
          question_responses: questionResponses,
        });

      if (error) {
        console.error('Error saving data:', error);
        toast({
          title: "שגיאה",
          description: "אירעה שגיאה בשמירת הנתונים. נא לנסות שוב.",
          variant: "destructive",
        });
        return;
      }

      console.log('Data saved successfully');
      navigate('/results', {
        state: {
          scores,
          overallScore,
          personalDetails,
          answers
        }
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה לא צפויה. נא לנסות שוב.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              שאלון להערכת תרבות ארגונית לפי מודל SALIMA
            </CardTitle>
            <p className="text-gray-600 mt-2">
              דרג/י כל היגד לפי הסולם:
            </p>
            <p className="text-sm text-gray-500">
              1 = כלל לא נכון | 2 = לעיתים רחוקות | 3 = לפעמים | 4 = לעיתים קרובות | 5 = נכון מאוד
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <Progress value={progress} className="h-2" />
            
            <div className="text-center text-sm text-gray-500">
              שאלה {currentQuestionIndex + 1} מתוך {questions.length}
            </div>

            <div className="space-y-4">
              <p className="text-lg font-semibold">
                {questions[currentQuestionIndex].text}
              </p>
              <RadioGroup 
                value={answers[questions[currentQuestionIndex].id]?.toString()} 
                onValueChange={(value) => handleAnswer(questions[currentQuestionIndex].id, parseInt(value))} 
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="1" id="r1" />
                  <Label htmlFor="r1">1 - כלל לא נכון</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="2" id="r2" />
                  <Label htmlFor="r2">2 - לעיתים רחוקות</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="3" id="r3" />
                  <Label htmlFor="r3">3 - לפעמים</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="4" id="r4" />
                  <Label htmlFor="r4">4 - לעיתים קרובות</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="5" id="r5" />
                  <Label htmlFor="r5">5 - נכון מאוד</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                  }
                }}
                disabled={currentQuestionIndex === 0}
              >
                הקודם
              </Button>
              <Button
                onClick={() => {
                  if (answers[questions[currentQuestionIndex].id] === undefined) {
                    toast({
                      title: "תשובה נדרשת",
                      description: "נא לענות על השאלה לפני שממשיכים",
                      variant: "destructive",
                    });
                    return;
                  }
                  if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  } else {
                    handleSubmit();
                  }
                }}
                disabled={isSubmitting}
              >
                {currentQuestionIndex === questions.length - 1 ? "סיום" : "הבא"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Questionnaire;
