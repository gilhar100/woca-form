
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
    text: "בצוות שלי, חברים חולקים מידע ורעיונות באופן חופשי.",
    domain: "Communication",
  },
  {
    id: 2,
    text: "בצוות שלי, ישנה אווירה של אמון ותמיכה הדדית.",
    domain: "Trust",
  },
  {
    id: 3,
    text: "בצוות שלי, אנו מעודדים חדשנות ויצירתיות.",
    domain: "Innovation",
  },
  {
    id: 4,
    text: "בצוות שלי, אנו פועלים בשיתוף פעולה כדי להשיג מטרות משותפות.",
    domain: "Collaboration",
  },
  {
    id: 5,
    text: "בצוות שלי, אנו לוקחים אחריות על התוצאות שלנו.",
    domain: "Accountability",
  },
  {
    id: 6,
    text: "בצוות שלי, התקשורת פתוחה וכנה.",
    domain: "Communication",
  },
  {
    id: 7,
    text: "בצוות שלי, אנו סומכים אחד על השני לבצע את העבודה שלנו.",
    domain: "Trust",
  },
  {
    id: 8,
    text: "בצוות שלי, אנו מחפשים דרכים חדשות וטובות יותר לעשות דברים.",
    domain: "Innovation",
  },
  {
    id: 9,
    text: "בצוות שלי, אנו עובדים יחד כדי לפתור בעיות.",
    domain: "Collaboration",
  },
  {
    id: 10,
    text: "בצוות שלי, אנו מצפים אחד מהשני לעמוד בסטנדרטים גבוהים.",
    domain: "Accountability",
  },
  {
    id: 11,
    text: "בצוות שלי, אנו מקשיבים באופן פעיל לדעות של אחרים.",
    domain: "Communication",
  },
  {
    id: 12,
    text: "בצוות שלי, אנו מרגישים בטוחים לקחת סיכונים.",
    domain: "Trust",
  },
  {
    id: 13,
    text: "בצוות שלי, אנו לומדים כל הזמן דברים חדשים.",
    domain: "Innovation",
  },
  {
    id: 14,
    text: "בצוות שלי, אנו חוגגים הצלחות ביחד.",
    domain: "Collaboration",
  },
  {
    id: 15,
    text: "בצוות שלי, אנו נותנים ו מקבלים משוב בונה.",
    domain: "Accountability",
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
        scores[question.domain] += answers[question.id];
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
      
      const { error } = await supabase
        .from('woca_responses')
        .insert({
          full_name: personalDetails?.fullName || '',
          education: personalDetails?.education || null,
          profession: personalDetails?.profession || null,
          organization: personalDetails?.organization || null,
          experience_years: personalDetails?.experienceYears || null,
          email: personalDetails?.email || null,
          phone: personalDetails?.phone || null,
          scores: scores,
          overall_score: overallScore,
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
              שאלון
            </CardTitle>
            <p className="text-gray-600 mt-2">
              ענה על השאלות הבאות בכנות
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <Progress value={progress} className="h-2" />

            <div className="space-y-2">
              <p className="text-lg font-semibold">
                {questions[currentQuestionIndex].text}
              </p>
              <RadioGroup defaultValue={answers[questions[currentQuestionIndex].id]?.toString()} onValueChange={(value) => handleAnswer(questions[currentQuestionIndex].id, parseInt(value))} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="1" id="r1" />
                  <Label htmlFor="r1">1 - לא מסכים כלל</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="2" id="r2" />
                  <Label htmlFor="r2">2 - לא מסכים</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="3" id="r3" />
                  <Label htmlFor="r3">3 - נייטרלי</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="4" id="r4" />
                  <Label htmlFor="r4">4 - מסכים</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="5" id="r5" />
                  <Label htmlFor="r5">5 - מסכים מאוד</Label>
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
