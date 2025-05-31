
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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
  const handleAnswerChange = (value: string) => {
    const numValue = parseInt(value);
    onAnswer(numValue);
  };

  const scaleLabels = {
    1: 'כלל לא נכון',
    2: 'לעיתים רחוקות',
    3: 'לפעמים',
    4: 'לעיתים קרובות',
    5: 'נכון מאוד'
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-8 space-y-8" dir="rtl">
        <div className="text-center space-y-4">
          <div className="text-sm text-gray-500 font-medium">
            שאלה {questionNumber} מתוך {totalQuestions}
          </div>
          <h2 className="text-xl font-bold leading-relaxed text-gray-800 px-4">
            {question.text}
          </h2>
        </div>

        <div className="text-center text-sm text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="font-semibold mb-2 text-blue-800">דרגו לפי הסולם:</p>
          <div className="space-y-1">
            <p>1 = כלל לא נכון</p>
            <p>2 = לעיתים רחוקות</p>
            <p>3 = לפעמים</p>
            <p>4 = לעיתים קרובות</p>
            <p>5 = נכון מאוד</p>
          </div>
        </div>

        <RadioGroup 
          value={currentAnswer?.toString()} 
          onValueChange={handleAnswerChange}
          className="space-y-3"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <div 
              key={value}
              className={`flex items-center space-x-4 space-x-reverse p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200 ${
                currentAnswer === value 
                  ? 'bg-blue-100 border-blue-400 shadow-md' 
                  : 'bg-white border-gray-200 hover:shadow-sm'
              }`}
              onClick={() => handleAnswerChange(value.toString())}
            >
              <RadioGroupItem 
                value={value.toString()} 
                id={`r${value}`} 
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label 
                htmlFor={`r${value}`} 
                className="flex-1 cursor-pointer text-lg font-medium text-right leading-relaxed"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="font-bold text-blue-600 text-xl">{value}</span>
                  <span>-</span>
                  <span>{scaleLabels[value as keyof typeof scaleLabels]}</span>
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={!canGoBack}
            className="h-12 px-6 font-semibold text-gray-700 border-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4" />
            חזור
          </Button>
          
          <div className="text-sm text-gray-500 font-medium">
            {currentAnswer ? 'עובר לשאלה הבאה...' : 'בחרו תשובה כדי להמשיך'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
