
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
import { wocaQuestions } from '@/data/wocaQuestions';
import { calculateWOCAScores, calculateWOCAScoresFromResponses, applyReverseScoring } from '@/utils/wocaCalculations';

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
  const totalPages = 4; // 36 questions / 9 per page = 4 pages

  // Split questions into pages - limit to first 36 questions
  const getPageQuestions = (pageIndex: number) => {
    const first36Questions = wocaQuestions.slice(0, 36);
    const startIndex = pageIndex * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return first36Questions.slice(startIndex, endIndex);
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Only process first 36 questions
      const first36Questions = wocaQuestions.slice(0, 36);
      const scores = calculateWOCAScores(first36Questions, answers);
      const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
      
      // Create detailed question responses with reverse scoring applied
      const questionResponses = first36Questions.map(question => {
        const rawScore = answers[question.id];
        if (rawScore === undefined) return null;
        
        // Apply reverse scoring if needed
        const finalScore = question.reversed ? applyReverseScoring(rawScore) : rawScore;
        
        return {
          questionId: question.id,
          score: finalScore,
          rawScore: rawScore,
          dimension: question.domain,
          isReversed: question.reversed,
          questionText: question.text
        };
      }).filter(response => response !== null);
      
      // Prepare individual question answers as q1-q36 (store original answers, not reverse-scored)
      const questionAnswers: { [key: string]: number } = {};
      first36Questions.forEach(question => {
        if (answers[question.id] !== undefined) {
          questionAnswers[`q${question.id}`] = answers[question.id];
        }
      });
      
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
        overall_score: overallScore,
        question_responses: questionResponses,
        ...questionAnswers,
      };

      console.log('Attempting to insert data:', insertData);
      console.log('Question responses:', questionResponses);
      
      const { error } = await supabase
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

      console.log('Data saved successfully');
      
      // Show completion screen
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
        .select('question_responses')
        .eq('group_id', groupId);

      if (error) {
        console.error('Error fetching group scores:', error);
        return null;
      }

      if (!groupResponses || groupResponses.length === 0) {
        return null;
      }

      // Aggregate all question responses from all group members
      const allQuestionResponses: any[] = [];
      groupResponses.forEach(response => {
        if (response.question_responses && Array.isArray(response.question_responses)) {
          allQuestionResponses.push(...response.question_responses);
        }
      });

      // Calculate group averages using the new function
      return calculateWOCAScoresFromResponses(allQuestionResponses);
    } catch (error) {
      console.error('Error calculating group scores:', error);
      return null;
    }
  };

  const handleContinueToResults = async () => {
    const first36Questions = wocaQuestions.slice(0, 36);
    const individualScores = calculateWOCAScores(first36Questions, answers);
    const groupScores = await fetchGroupScores();
    const overallScore = Object.values(individualScores).reduce((sum, score) => sum + score, 0) / Object.keys(individualScores).length;
    
    navigate('/results', {
      state: {
        scores: groupScores || individualScores,
        individualScores,
        groupScores,
        overallScore,
        personalDetails,
        answers,
        groupId
      }
    });
  };

  // Calculate progress based on answered questions across first 36 questions only
  const totalAnsweredQuestions = Object.keys(answers).filter(questionId => 
    parseInt(questionId) <= 36
  ).length;
  const progress = (totalAnsweredQuestions / 36) * 100;

  if (showGroupIdForm) {
    return <GroupIdForm onSubmit={handleGroupIdSubmit} />;
  }

  // Show completion screen
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
