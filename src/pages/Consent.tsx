
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LocationState {
  answers: Record<string, number>;
  personalDetails: {
    fullName: string;
    age: number;
    gender: string;
    education: string;
    profession: string;
    organization: string;
    experienceYears: number;
    email: string;
    phone: string;
  };
}

const Consent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { toast } = useToast();
  
  const [consentResearch, setConsentResearch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!state?.answers || !state?.personalDetails) {
    navigate('/');
    return null;
  }

  const calculateScores = (answers: Record<string, number>) => {
    const warQuestions = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37];
    const opportunityQuestions = [2, 6, 10, 14, 18, 22, 26, 30, 34, 38];
    const comfortQuestions = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39];
    const apathyQuestions = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

    const reverseQuestions = [2, 4, 6, 8, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];

    const calculateDomainScore = (questions: number[]) => {
      let sum = 0;
      questions.forEach(q => {
        let score = answers[q] || 1;
        if (reverseQuestions.includes(q)) {
          score = 6 - score;
        }
        sum += score;
      });
      return sum / questions.length;
    };

    const scores = {
      WAR: calculateDomainScore(warQuestions),
      OPPORTUNITY: calculateDomainScore(opportunityQuestions),
      COMFORT: calculateDomainScore(comfortQuestions),
      APATHY: calculateDomainScore(apathyQuestions)
    };

    const overallScore = (scores.WAR + scores.OPPORTUNITY + scores.COMFORT + scores.APATHY) / 4;

    return { scores, overallScore };
  };

  const handleSubmit = async (showResults: boolean) => {
    setIsSubmitting(true);
    
    try {
      const { scores, overallScore } = calculateScores(state.answers);
      
      if (consentResearch) {
        const { error } = await supabase
          .from('woca_responses')
          .insert({
            full_name: state.personalDetails.fullName,
            age: state.personalDetails.age || null,
            gender: state.personalDetails.gender || null,
            education: state.personalDetails.education || null,
            profession: state.personalDetails.profession || null,
            organization: state.personalDetails.organization || null,
            experience_years: state.personalDetails.experienceYears || null,
            email: state.personalDetails.email || null,
            phone: state.personalDetails.phone || null,
            scores: scores,
            overall_score: overallScore,
            consent_research: consentResearch
          });

        if (error) {
          console.error('Error saving to database:', error);
          toast({
            title: "שגיאה",
            description: "אירעה שגיאה בשמירת הנתונים. התוצאות יוצגו ללא שמירה.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "נתונים נשמרו בהצלחה",
            description: "תודה על השתתפותך במחקר!",
            variant: "default"
          });
        }
      }

      if (showResults) {
        navigate('/results', {
          state: { scores, overallScore }
        });
      } else {
        toast({
          title: "תודה רבה!",
          description: "הנתונים נשמרו בהצלחה. תוכל לסגור את החלון.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעיבוד הנתונים",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              אישור והסכמה
            </CardTitle>
            <p className="text-gray-600 mt-2">
              שלב אחרון לפני קבלת התוצאות
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* מידע על המחקר */}
            <div className="bg-blue-50 p-6 rounded-lg text-right">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                אודות המחקר
              </h3>
              <div className="space-y-2 text-blue-700">
                <p>• מטרת המחקר: פיתוח והטבת כלי ההערכה WOCA</p>
                <p>• הנתונים ישמרו באופן אנונימי ומוצפן</p>
                <p>• לא יתבצע שימוש מסחרי בנתונים</p>
                <p>• הנתונים ישמשו למטרות מחקר אקדמי בלבד</p>
                <p>• ניתן לבקש מחיקת הנתונים בכל עת</p>
              </div>
            </div>

            {/* אישור השתתפות במחקר */}
            <div className="flex items-start space-x-3 space-x-reverse">
              <Checkbox
                id="consent"
                checked={consentResearch}
                onCheckedChange={(checked) => setConsentResearch(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="consent" className="text-right leading-relaxed">
                אני מסכים/ה לשתף את הנתונים שלי למטרות מחקר אקדמי.
                הנתונים ישמרו באופן אנונימי ולא יועברו לגורמים חיצוניים.
                ניתן לבטל הסכמה זו בכל עת.
              </Label>
            </div>

            {/* הודעה במידה ולא מסכים */}
            {!consentResearch && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-right">
                <p className="text-yellow-800">
                  במידה ולא תסכים לשתף נתונים למחקר, עדיין תוכל לקבל את התוצאות האישיות שלך.
                  הנתונים לא ישמרו במערכת.
                </p>
              </div>
            )}

            {/* כפתורי פעולה */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                onClick={() => navigate('/personal-details', { state: { answers: state.answers } })}
                variant="outline"
                className="px-8"
                disabled={isSubmitting}
              >
                חזור לעריכת פרטים
              </Button>
              
              <Button
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
              >
                {isSubmitting ? 'מעבד...' : 'המשך לתוצאות'}
              </Button>

              {consentResearch && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      disabled={isSubmitting}
                    >
                      שמור נתונים בלבד
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-right">אישור שמירה</AlertDialogTitle>
                      <AlertDialogDescription className="text-right">
                        האם אתה בטוח שברצונך לשמור את הנתונים בלבד מבלי לצפות בתוצאות?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ביטול</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleSubmit(false)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        כן, שמור בלבד
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Consent;
