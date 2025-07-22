
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";

interface Question {
  id: number;
  text: string;
  domain: string;
  reversed: boolean;
}

interface QuestionnairePageProps {
  questions: Question[];
  answers: { [key: number]: number; };
  onAnswer: (questionId: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  pageNumber: number;
  totalPages: number;
  showValidation: boolean;
  startingQuestionNumber: number;
}

const QuestionnairePage = ({
  questions,
  answers,
  onAnswer,
  onNext,
  onBack,
  canGoBack,
  pageNumber,
  totalPages,
  showValidation,
  startingQuestionNumber
}: QuestionnairePageProps) => {
  const isMobile = useIsMobile();
  
  const handleAnswerChange = (questionId: number, value: number) => {
    onAnswer(questionId, value);
  };

  const scaleLabels = {
    5: 'תמיד נכון',
    4: 'נכון לעיתים קרובות',
    3: 'די נכון',
    2: 'נכון לעיתים רחוקות',
    1: 'לא נכון אף פעם'
  };

  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <div className={`${isMobile ? 'px-3' : 'max-w-5xl'} mx-auto`}>
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className={`${isMobile ? 'p-4 space-y-4' : 'p-8 space-y-8'}`} dir="rtl">
          <div className="text-center space-y-4">
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-black font-medium font-sans`}>
              עמוד {pageNumber} מתוך {totalPages}
            </div>
            <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-black ${isMobile ? 'mb-4' : 'mb-8'} font-sans`}>
              דרגו עד כמה אתם מסכימים עם ההיגדים הבאים:
            </h2>
          </div>

          {showValidation && !allQuestionsAnswered && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700 text-right text-sm font-sans">
                אנא השב על כל השאלות בעמוד זה לפני המעבר לעמוד הבא
              </AlertDescription>
            </Alert>
          )}

          <div className={`${isMobile ? 'space-y-8' : 'space-y-16'}`}>
            {questions.map((question, index) => (
              <div key={question.id} className={`${isMobile ? 'space-y-4' : 'space-y-8'}`}>
                <div className="flex items-start gap-4" dir="rtl">
                  <div className={`flex-shrink-0 ${isMobile ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'} bg-blue-500 text-white rounded-full flex items-center justify-center font-bold`}>
                    {startingQuestionNumber + index}
                  </div>
                  <h3 className={`${isMobile ? 'text-sm' : 'text-sm'} font-medium text-black text-right leading-relaxed flex-1 font-sans`}>
                    {question.text}
                  </h3>
                </div>
                
                <RadioGroup 
                  value={answers[question.id]?.toString() || ''} 
                  onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                  className={`flex justify-center ${isMobile ? 'gap-2 flex-wrap' : 'gap-12'} ${isMobile ? 'mt-4' : 'mt-8'}`} 
                  dir="rtl"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <div 
                      key={value} 
                      className="flex flex-col items-center cursor-pointer" 
                      onClick={() => handleAnswerChange(question.id, value)}
                    >
                      <div className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full border-2 flex items-center justify-center ${isMobile ? 'mb-2' : 'mb-3'} transition-all duration-200 ${
                        answers[question.id] === value 
                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg' 
                          : 'bg-white border-gray-300 text-gray-600 hover:border-blue-300 hover:shadow-md'
                      }`}>
                        <RadioGroupItem value={value.toString()} id={`q${question.id}_r${value}`} className="sr-only" />
                        <span className={`font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>{value}</span>
                      </div>
                      <Label 
                        htmlFor={`q${question.id}_r${value}`} 
                        className={`cursor-pointer text-center ${isMobile ? 'text-xs max-w-[80px]' : 'text-sm max-w-[120px]'} text-black leading-tight font-medium font-sans`}
                      >
                        {scaleLabels[value as keyof typeof scaleLabels]}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className={`flex justify-between items-center ${isMobile ? 'pt-4' : 'pt-8'} border-t border-gray-200`}>
            <Button 
              onClick={onNext} 
              disabled={!allQuestionsAnswered} 
              className={`${isMobile ? 'h-10 px-4 text-sm' : 'h-12 px-8 text-sm'} font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-sans`}
            >
              {pageNumber === totalPages ? 'סיים שאלון' : 'עמוד הבא'}
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onBack} 
              disabled={!canGoBack} 
              className={`${isMobile ? 'h-10 px-4 text-sm' : 'h-12 px-6 text-sm'} font-semibold text-black border-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-sans`}
            >
              <ChevronLeft className="w-4 h-4" />
              חזור
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionnairePage;
