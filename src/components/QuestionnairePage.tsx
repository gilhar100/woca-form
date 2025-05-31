
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Question {
  id: number;
  text: string;
  domain: string;
  reversed: boolean;
}

interface QuestionnairePageProps {
  questions: Question[];
  answers: { [key: number]: number };
  onAnswer: (questionId: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  pageNumber: number;
  totalPages: number;
  showValidation: boolean;
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
  showValidation
}: QuestionnairePageProps) => {
  const handleAnswerChange = (questionId: number, value: string) => {
    const numValue = parseInt(value);
    onAnswer(questionId, numValue);
  };

  const scaleLabels = {
    5: 'נכון מאוד',
    4: 'לעיתים קרובות', 
    3: 'לפעמים',
    2: 'לעיתים רחוקות',
    1: 'כלל לא נכון'
  };

  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-8 space-y-8" dir="rtl">
        <div className="text-center space-y-4">
          <div className="text-sm text-gray-500 font-medium" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            עמוד {pageNumber} מתוך {totalPages}
          </div>
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            שאלון להערכת תרבות ארגונית
          </h2>
        </div>

        <div className="text-center text-sm text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="font-semibold mb-2 text-blue-800" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>דרגו לפי הסולם:</p>
          <div className="grid grid-cols-5 gap-2 text-center" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <div className="text-xs">
              <div className="font-bold text-blue-600">5</div>
              <div>נכון מאוד</div>
            </div>
            <div className="text-xs">
              <div className="font-bold text-blue-600">4</div>
              <div>לעיתים קרובות</div>
            </div>
            <div className="text-xs">
              <div className="font-bold text-blue-600">3</div>
              <div>לפעמים</div>
            </div>
            <div className="text-xs">
              <div className="font-bold text-blue-600">2</div>
              <div>לעיתים רחוקות</div>
            </div>
            <div className="text-xs">
              <div className="font-bold text-blue-600">1</div>
              <div>כלל לא נכון</div>
            </div>
          </div>
        </div>

        {showValidation && !allQuestionsAnswered && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700 text-right" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              אנא השב על כל השאלות בעמוד זה לפני המעבר לעמוד הבא
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 text-right leading-relaxed" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  {index + 1}. {question.text}
                </h3>
              </div>
              
              <RadioGroup 
                value={answers[question.id]?.toString() || ''} 
                onValueChange={(value) => handleAnswerChange(question.id, value)}
                className="flex flex-row-reverse justify-center gap-4"
                dir="rtl"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <div 
                    key={value}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200 min-w-[80px] ${
                      answers[question.id] === value 
                        ? 'bg-blue-100 border-blue-400 shadow-md' 
                        : 'bg-white border-gray-200'
                    }`}
                    onClick={() => handleAnswerChange(question.id, value.toString())}
                  >
                    <RadioGroupItem 
                      value={value.toString()} 
                      id={`q${question.id}_r${value}`} 
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mb-2"
                    />
                    <Label 
                      htmlFor={`q${question.id}_r${value}`} 
                      className="cursor-pointer text-center text-sm font-medium"
                      style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                    >
                      <div className="font-bold text-blue-600 text-lg mb-1">{value}</div>
                      <div className="text-xs text-gray-600">{scaleLabels[value as keyof typeof scaleLabels]}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <Button
            onClick={onNext}
            disabled={!allQuestionsAnswered}
            className="h-12 px-8 font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            {pageNumber === totalPages ? 'סיים שאלון' : 'עמוד הבא'}
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            onClick={onBack}
            disabled={!canGoBack}
            className="h-12 px-6 font-semibold text-gray-700 border-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            <ChevronLeft className="w-4 h-4" />
            חזור
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionnairePage;
