
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Question {
  id: number;
  text: string;
  domain: string;
  reversed: boolean;
}

interface QuestionCardProps {
  question: Question;
  currentAnswer?: number;
  onAnswer: (value: number) => void;
  onBack: () => void;
  canGoBack: boolean;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question,
  currentAnswer,
  onAnswer,
  onBack,
  canGoBack,
  questionNumber,
  totalQuestions
}: QuestionCardProps) => {
  const isMobile = useIsMobile();
  
  const handleAnswerChange = (value: string) => {
    const numValue = parseInt(value);
    onAnswer(numValue);
  };

  const scaleLabels = {
    5: 'נכון מאוד',
    4: 'לעיתים קרובות', 
    3: 'לפעמים',
    2: 'לעיתים רחוקות',
    1: 'כלל לא נכון'
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className={`${isMobile ? 'p-4' : 'p-8'} space-y-6 sm:space-y-8`} dir="rtl">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="text-sm text-gray-500 font-medium" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            שאלה {questionNumber} מתוך {totalQuestions}
          </div>
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold leading-relaxed text-gray-800 px-2 sm:px-4 text-right`} style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {question.text}
          </h2>
        </div>

        <div className={`text-center ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-100`}>
          <p className="font-semibold mb-2 text-blue-800" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>דרגו לפי הסולם:</p>
          <div className="space-y-1 text-right" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <p>5 = נכון מאוד</p>
            <p>4 = לעיתים קרובות</p>
            <p>3 = לפעמים</p>
            <p>2 = לעיתים רחוקות</p>
            <p>1 = כלל לא נכון</p>
          </div>
        </div>

        <RadioGroup 
          value={currentAnswer?.toString()} 
          onValueChange={handleAnswerChange}
          className="space-y-2 sm:space-y-3"
          dir="rtl"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <div 
              key={value}
              className={`flex items-center space-x-3 sm:space-x-4 space-x-reverse ${isMobile ? 'p-3' : 'p-4'} rounded-xl border-2 transition-all duration-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200 ${
                currentAnswer === value 
                  ? 'bg-blue-100 border-blue-400 shadow-md' 
                  : 'bg-white border-gray-200 hover:shadow-sm'
              }`}
              onClick={() => handleAnswerChange(value.toString())}
            >
              <RadioGroupItem 
                value={value.toString()} 
                id={`r${value}`} 
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 ml-2 sm:ml-3 flex-shrink-0"
              />
              <Label 
                htmlFor={`r${value}`} 
                className={`flex-1 cursor-pointer ${isMobile ? 'text-base' : 'text-lg'} font-medium text-right leading-relaxed`}
                style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                <span className="inline-flex items-center gap-2 sm:gap-3 justify-end w-full">
                  <span>{scaleLabels[value as keyof typeof scaleLabels]}</span>
                  <span>-</span>
                  <span className={`font-bold text-blue-600 ${isMobile ? 'text-lg' : 'text-xl'}`}>{value}</span>
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between items-center pt-4 sm:pt-6 border-t border-gray-100">
          <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 font-medium`} style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {currentAnswer ? 'עובר לשאלה הבאה...' : 'בחרו תשובה כדי להמשיך'}
          </div>
          
          <Button
            variant="outline"
            onClick={onBack}
            disabled={!canGoBack}
            className={`${isMobile ? 'h-10 px-4 text-sm' : 'h-12 px-6'} font-semibold text-gray-700 border-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
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

export default QuestionCard;
