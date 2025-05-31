
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

  return (
    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-2">
            שאלה {questionNumber} מתוך {totalQuestions}
          </div>
          <h2 className="text-lg sm:text-xl font-semibold leading-relaxed">
            {question.text}
          </h2>
        </div>

        <div className="text-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p className="mb-1">דרג/י לפי הסולם:</p>
          <p>1 = כלל לא נכון | 2 = לעיתים רחוקות | 3 = לפעמים | 4 = לעיתים קרובות | 5 = נכון מאוד</p>
        </div>

        <RadioGroup 
          value={currentAnswer?.toString()} 
          onValueChange={handleAnswerChange}
          className="space-y-4"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <div 
              key={value}
              className="flex items-center space-x-2 space-x-reverse p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleAnswerChange(value.toString())}
            >
              <RadioGroupItem value={value.toString()} id={`r${value}`} />
              <Label 
                htmlFor={`r${value}`} 
                className="flex-1 cursor-pointer text-base sm:text-lg font-medium"
              >
                {value} - {
                  value === 1 ? 'כלל לא נכון' :
                  value === 2 ? 'לעיתים רחוקות' :
                  value === 3 ? 'לפעמים' :
                  value === 4 ? 'לעיתים קרובות' :
                  'נכון מאוד'
                }
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={!canGoBack}
            className="h-12 px-6"
          >
            חזור
          </Button>
          <div className="text-xs text-gray-400 self-center">
            בחר תשובה כדי להמשיך
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
