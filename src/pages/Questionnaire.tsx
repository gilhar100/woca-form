
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import QuestionnairePage from '@/components/QuestionnairePage';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { wocaQuestions } from '@/data/wocaQuestions';
import { useIsMobile } from "@/hooks/use-mobile";

const Questionnaire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  // Get personal details from navigation state
  const personalDetails = location.state?.personalDetails;

  // Redirect if no personal details
  useEffect(() => {
    if (!personalDetails) {
      navigate('/personal-details');
    }
  }, [personalDetails, navigate]);
  
  const questionsPerPage = 9;
  const totalPages = 4; // 36 questions / 9 per page = 4 pages

  // Split questions into pages - limit to first 36 questions
  const getPageQuestions = (pageIndex: number) => {
    const first36Questions = wocaQuestions.slice(0, 36);
    const startIndex = pageIndex * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return first36Questions.slice(startIndex, endIndex);
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value
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
      // Auto-scroll to top after page change with a small delay
      setTimeout(scrollToTop, 100);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setShowValidation(false);
      // Auto-scroll to top after page change with a small delay
      setTimeout(scrollToTop, 100);
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Only process first 36 questions
      const first36Questions = wocaQuestions.slice(0, 36);

      // Prepare individual question answers as q1-q36
      const questionAnswers: {
        [key: string]: number;
      } = {};
      first36Questions.forEach(question => {
        if (answers[question.id] !== undefined) {
          questionAnswers[`q${question.id}`] = answers[question.id];
        }
      });
      const insertData = {
        id: uuidv4(),
        full_name: personalDetails.fullName,
        group_id: parseInt(personalDetails.groupCode) || null,
        email: personalDetails.email || '',
        survey_type: 'WOCA',
        ...questionAnswers
      };
      console.log('Attempting to insert WOCA data:', insertData);
      const {
        error
      } = await supabase.from('woca_responses').insert(insertData);
      if (error) {
        console.error('Supabase error details:', error);
        toast({
          title: "שגיאה בשמירת הנתונים",
          description: `שגיאה: ${error.message}. קוד שגיאה: ${error.code}`,
          variant: "destructive"
        });
        return;
      }
      console.log('WOCA data saved successfully');

      // Show completion screen
      setShowCompletionScreen(true);
      // Scroll to top for completion screen
      setTimeout(scrollToTop, 100);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "שגיאה לא צפויה",
        description: "אירעה שגיאה לא צפויה. נא לבדוק את החיבור לאינטרנט ולנסות שוב.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate progress based on answered questions across first 36 questions only
  const totalAnsweredQuestions = Object.keys(answers).filter(questionId => parseInt(questionId) <= 36).length;
  const progress = totalAnsweredQuestions / 36 * 100;

  // Show completion screen
  if (showCompletionScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-3 sm:p-4" dir="rtl">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm max-w-2xl w-full">
          <CardContent className={`${isMobile ? 'p-8' : 'p-12'} text-center space-y-6 sm:space-y-8`}>
            <div className="flex justify-center">
              <CheckCircle className={`${isMobile ? 'w-16 h-16' : 'w-24 h-24'} text-green-500`} />
            </div>
            
            <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-black leading-relaxed font-sans`}>
              תודה רבה על מילוי השאלון
            </h1>
            
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-black font-sans leading-relaxed`}>
              השתתפותכם תאפשר לנו לאבחן את התרבות הארגונית ולהעניק תובנות מותאמות לצמיחה ולפיתוח
            </p>
            
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 font-sans mt-4 sm:mt-6`}>
              חברת OPPORTUNITY מקיימת סדנאות הכשרה המבוססות על מודל SALIMA-WOCA.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Don't render if no personal details
  if (!personalDetails) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header with progress */}
        <div className="mb-6 sm:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-black mb-2 font-sans`}>
              שאלון WOCA
            </h1>
            <div className="mt-3 sm:mt-4 text-center space-y-2 sm:space-y-3">
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-black leading-relaxed max-w-3xl mx-auto font-sans px-2`}>
                ברוכים הבאים לשאלון WOCA של חברת OPPORTUNITY.
              </p>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-black leading-relaxed max-w-3xl mx-auto font-sans px-2`}>
                לפניך 36 שאלות שמטרתן לאבחן את התודעה הארגונית בארגון – כדי לזהות חוזקות, חולשות ודפוסי פעולה מרכזיים המשפיעים על התרבות הארגונית והיכולת להתמודד עם שינוי.
              </p>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-black leading-relaxed font-sans px-2`}>
                נשמח למענה כן ומדויק ככל האפשר. אין תשובות נכונות או שגויות – רק תיאור של המציאות כפי שהיא נתפסת עבורך.
              </p>
            </div>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-black font-medium text-right mt-4 sm:mt-6 font-sans px-2`}>
              שם: <span className="text-black font-bold">{personalDetails.fullName}</span> • קוד קבוצה: <span className="text-black font-bold">{personalDetails.groupCode}</span>
            </p>
          </div>
          
          <div className="space-y-3 sm:space-y-4 bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg mx-2 sm:mx-0">
            <Progress value={progress} className="h-3 sm:h-4 bg-gray-200" dir="ltr" />
            <div className={`flex ${isMobile ? 'flex-col space-y-1' : 'justify-between'} ${isMobile ? 'text-xs' : 'text-sm'} text-black font-medium font-sans`}>
              <span className="text-black font-bold">{Math.round(progress)}% הושלם</span>
              <span>עמוד {currentPage + 1} מתוך {totalPages} • {totalAnsweredQuestions} מתוך 36 שאלות נענו</span>
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
          startingQuestionNumber={currentPage * questionsPerPage + 1}
        />

        {/* Loading overlay for submission */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" dir="rtl">
            <div className="bg-white p-6 sm:p-8 rounded-2xl text-center shadow-2xl mx-4">
              <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4 sm:mb-6"></div>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-black font-sans`}>שומר תשובות...</p>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-black mt-2 font-sans`}>אנא המתינו</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
