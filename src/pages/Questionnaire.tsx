
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import GroupIdForm from '@/components/GroupIdForm';
import QuestionnairePage from '@/components/QuestionnairePage';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

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
    text: "חוסר ודאות נתפסת כopportunità ללמידה",
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

// Map domains to WOCA parameters
const domainToWOCA = {
  Communication: "WAR",
  Trust: "OPPORTUNITY", 
  Innovation: "COMFORT",
  Collaboration: "APATHY",
  Accountability: "WAR"
};

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
  
  const [groupId, setGroupId] = useState<string>('');
  const [showGroupIdForm, setShowGroupIdForm] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  const questionsPerPage = 9;
  const totalPages = 4;

  // Split questions into pages
  const getPageQuestions = (pageIndex: number) => {
    const startIndex = pageIndex * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return questions.slice(startIndex, endIndex);
  };

  useEffect(() => {
    if (!personalDetails) {
      navigate('/personal-details');
    }
  }, [personalDetails, navigate]);

  const handleGroupIdSubmit = (id: string) => {
    setGroupId(id);
    setShowGroupIdForm(false);
  };

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
    setShowValidation(false);
  };

  const handleNext = () => {
    const pageQuestions = getPageQuestions(currentPage);
    const allAnswered = pageQuestions.every(q => answers[q.id] !== undefined);
    
    if (!allAnswered) {
      setShowValidation(true);
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setShowValidation(false);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setShowValidation(false);
    }
  };

  const calculateIndividualScores = () => {
    const scores: { [key: string]: number } = {
      WAR: 0,
      OPPORTUNITY: 0,
      COMFORT: 0,
      APATHY: 0,
    };

    let counts: { [key: string]: number } = {
      WAR: 0,
      OPPORTUNITY: 0,
      COMFORT: 0,
      APATHY: 0,
    };

    questions.forEach(question => {
      if (answers[question.id]) {
        // Apply reverse scoring if needed
        const adjustedScore = question.reversed ? (6 - answers[question.id]) : answers[question.id];
        const wocaParameter = domainToWOCA[question.domain as keyof typeof domainToWOCA];
        
        scores[wocaParameter] += adjustedScore;
        counts[wocaParameter]++;
      }
    });

    // Calculate averages
    for (const parameter in scores) {
      if (counts[parameter] > 0) {
        scores[parameter] = scores[parameter] / counts[parameter];
      }
    }

    return scores;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const scores = calculateIndividualScores();
      const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
      
      // Create question responses dictionary
      const questionResponses: { [key: string]: number } = {};
      questions.forEach(question => {
        if (answers[question.id]) {
          questionResponses[`question_${question.id}`] = answers[question.id];
        }
      });
      
      // Prepare data for insertion including group_id
      const insertData = {
        id: uuidv4(),
        full_name: personalDetails?.fullName || '',
        education: personalDetails?.education || null,
        profession: personalDetails?.profession || null,
        organization: personalDetails?.organization || null,
        experience_years: personalDetails?.experienceYears || null,
        email: personalDetails?.email || '',
        phone: personalDetails?.phone || null,
        group_id: groupId,
        scores: scores,
        overall_score: overallScore,
        question_responses: questionResponses,
      };

      console.log('Attempting to insert data:', insertData);
      
      const { data, error } = await supabase
        .from('woca_responses')
        .insert(insertData);

      if (error) {
        console.error('Supabase error details:', error);
        
        toast({
          title: "שגיאה בשמירת הנתונים",
          description: `שגיאה: ${error.message}. קוד שגיאה: ${error.code}`,
          variant: "destructive",
        });
        return;
      }

      console.log('Data saved successfully:', data);
      
      // Show completion screen instead of navigating immediately
      setShowCompletionScreen(true);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "שגיאה לא צפויה",
        description: "אירעה שגיאה לא צפויה. נא לבדוק את החיבור לאינטרנט ולנסות שוב.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchGroupScores = async () => {
    try {
      // Fetch all responses for this group
      const { data: groupResponses, error } = await supabase
        .from('woca_responses')
        .select('scores')
        .eq('group_id', groupId);

      if (error) {
        console.error('Error fetching group scores:', error);
        return null;
      }

      if (!groupResponses || groupResponses.length === 0) {
        return null;
      }

      // Calculate group averages
      const groupScores: { [key: string]: number } = {
        WAR: 0,
        OPPORTUNITY: 0,
        COMFORT: 0,
        APATHY: 0,
      };

      groupResponses.forEach(response => {
        if (response.scores) {
          Object.keys(groupScores).forEach(parameter => {
            groupScores[parameter] += response.scores[parameter] || 0;
          });
        }
      });

      // Calculate averages
      Object.keys(groupScores).forEach(parameter => {
        groupScores[parameter] = groupScores[parameter] / groupResponses.length;
      });

      return groupScores;
    } catch (error) {
      console.error('Error calculating group scores:', error);
      return null;
    }
  };

  const handleContinueToResults = async () => {
    const individualScores = calculateIndividualScores();
    const groupScores = await fetchGroupScores();
    const overallScore = Object.values(individualScores).reduce((sum, score) => sum + score, 0) / Object.keys(individualScores).length;
    
    navigate('/results', {
      state: {
        scores: groupScores || individualScores, // Use group scores if available
        individualScores,
        groupScores,
        overallScore,
        personalDetails,
        answers,
        groupId
      }
    });
  };

  // Calculate progress based on answered questions across all pages
  const totalAnsweredQuestions = Object.keys(answers).length;
  const progress = (totalAnsweredQuestions / questions.length) * 100;

  if (showGroupIdForm) {
    return <GroupIdForm onSubmit={handleGroupIdSubmit} />;
  }

  // Show completion screen with updated message
  if (showCompletionScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4" dir="rtl">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm max-w-2xl w-full">
          <CardContent className="p-12 text-center space-y-8">
            <div className="flex justify-center">
              <CheckCircle className="w-24 h-24 text-green-500" />
            </div>
            
            <h1 className="text-5xl font-bold text-gray-800 leading-relaxed" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              הנתונים נקלטו בהצלחה
            </h1>
            
            <div className="pt-6">
              <Button
                onClick={handleContinueToResults}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
                style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                צפה בתוצאות
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header with progress */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              שאלון WOCA
            </h1>
            <p className="text-lg text-gray-600 font-medium text-right" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              קבוצה: <span className="text-blue-600 font-bold">{groupId}</span>
            </p>
          </div>
          
          <div className="space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
            <Progress value={progress} className="h-4 bg-gray-200" dir="ltr" />
            <div className="flex justify-between text-base text-gray-700 font-medium" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              <span className="text-blue-600 font-bold">{Math.round(progress)}% הושלם</span>
              <span>עמוד {currentPage + 1} מתוך {totalPages} • {totalAnsweredQuestions} מתוך {questions.length} שאלות נענו</span>
            </div>
          </div>
        </div>

        {/* Current Page */}
        <QuestionnairePage
          questions={getPageQuestions(currentPage)}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={currentPage > 0}
          pageNumber={currentPage + 1}
          totalPages={totalPages}
          showValidation={showValidation}
        />

        {/* Loading overlay for submission */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" dir="rtl">
            <div className="bg-white p-8 rounded-2xl text-center shadow-2xl">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
              <p className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>שומר תשובות...</p>
              <p className="text-gray-600 mt-2" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>אנא המתינו</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
