import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import GroupIdForm from '@/components/GroupIdForm';
import QuestionCard from '@/components/QuestionCard';

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
  
  const [groupId, setGroupId] = useState<string>('');
  const [showGroupIdForm, setShowGroupIdForm] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleSubmit();
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        console.error('Error hint:', error.hint);
        
        toast({
          title: "שגיאה בשמירת הנתונים",
          description: `שגיאה: ${error.message}. קוד שגיאה: ${error.code}`,
          variant: "destructive",
        });
        return;
      }

      console.log('Data saved successfully:', data);
      
      toast({
        title: "הנתונים נשמרו בהצלחה",
        description: "התשובות שלך נשמרו במערכת",
        variant: "default",
      });

      navigate('/results', {
        state: {
          scores,
          overallScore,
          personalDetails,
          answers,
          groupId
        }
      });
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

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (showGroupIdForm) {
    return <GroupIdForm onSubmit={handleGroupIdSubmit} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Header with progress */}
        <div className="mb-4 sm:mb-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              שאלון SALIMA
            </h1>
            <p className="text-sm text-gray-500 mt-1">קבוצה: {groupId}</p>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>שאלה {currentQuestionIndex + 1} מתוך {questions.length}</span>
              <span>{Math.round(progress)}% הושלם</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={questions[currentQuestionIndex]}
          currentAnswer={answers[questions[currentQuestionIndex].id]}
          onAnswer={(value) => handleAnswer(questions[currentQuestionIndex].id, value)}
          onBack={handleBack}
          canGoBack={currentQuestionIndex > 0}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />

        {/* Loading overlay for submission */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>שומר תשובות...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
