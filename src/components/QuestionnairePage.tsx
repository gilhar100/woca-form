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
  answers: {
    [key: number]: number;
  };
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
  const handleAnswerChange = (questionId: number, value: number) => {
    onAnswer(questionId, value);
  };
  const scaleLabels = {
    5: 'בדרך כלל או תמיד',
    4: 'לעיתים קרובות',
    3: 'לפעמים',
    2: 'לעיתים רחוקות',
    1: 'אף פעם'
  };
  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);
  return <div className="max-w-5xl mx-auto">
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-8 space-y-8" dir="rtl">
          <div className="text-center space-y-4">
            <div className="text-sm text-gray-500 font-medium" style={{
            fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
              עמוד {pageNumber} מתוך {totalPages}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8" style={{
            fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>דרגו עד כמה אתם מסכימים עם ההיגדים הבאים:</h2>
          </div>

          {showValidation && !allQuestionsAnswered && <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700 text-right" style={{
            fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
                אנא השב על כל השאלות בעמוד זה לפני המעבר לעמוד הבא
              </AlertDescription>
            </Alert>}

          <div className="space-y-16">
            {questions.map((question, index) => <div key={question.id} className="space-y-8">
                <div className="flex items-start gap-4" dir="rtl">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 text-right leading-relaxed flex-1" style={{
                fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                    {question.text}
                  </h3>
                </div>
                
                <RadioGroup value={answers[question.id]?.toString() || ''} onValueChange={value => handleAnswerChange(question.id, parseInt(value))} className="flex justify-center gap-12 mt-8" dir="rtl">
                  {[5, 4, 3, 2, 1].map(value => <div key={value} className="flex flex-col items-center cursor-pointer" onClick={() => handleAnswerChange(question.id, value)}>
                      <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-3 transition-all duration-200 ${answers[question.id] === value ? 'bg-blue-500 border-blue-500 text-white shadow-lg' : 'bg-white border-gray-300 text-gray-600 hover:border-blue-300 hover:shadow-md'}`}>
                        <RadioGroupItem value={value.toString()} id={`q${question.id}_r${value}`} className="sr-only" />
                        <span className="font-bold text-lg">{value}</span>
                      </div>
                      <Label htmlFor={`q${question.id}_r${value}`} className="cursor-pointer text-center text-sm text-gray-600 max-w-[120px] leading-tight font-medium" style={{
                  fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                        {scaleLabels[value as keyof typeof scaleLabels]}
                      </Label>
                    </div>)}
                </RadioGroup>
              </div>)}
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Button onClick={onNext} disabled={!allQuestionsAnswered} className="h-12 px-8 font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2" style={{
            fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
              {pageNumber === totalPages ? 'סיים שאלון' : 'עמוד הבא'}
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <Button variant="outline" onClick={onBack} disabled={!canGoBack} className="h-12 px-6 font-semibold text-gray-700 border-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" style={{
            fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
              <ChevronLeft className="w-4 h-4" />
              חזור
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default QuestionnairePage;