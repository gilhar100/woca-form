import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Index = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleAnswerChange = (question: string, value: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]: value,
    }));
  };

  const calculateScores = () => {
    const warQuestions = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37];
    const opportunityQuestions = [2, 6, 10, 14, 18, 22, 26, 30, 34, 38];
    const comfortQuestions = [3, 7, 11, 15, 19, 23, 27, 31, 35, 39];
    const apathyQuestions = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

    const reverseQuestions = [2, 4, 6, 8, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];

    const calculateDomainScore = (questions: number[]) => {
      let sum = 0;
      questions.forEach(q => {
        let score = answers[q] || 1;
        if (reverseQuestions.includes(q)) {
          score = 6 - score;
        }
        sum += score;
      });
      return sum / questions.length;
    };

    const scores = {
      WAR: calculateDomainScore(warQuestions),
      OPPORTUNITY: calculateDomainScore(opportunityQuestions),
      COMFORT: calculateDomainScore(comfortQuestions),
      APATHY: calculateDomainScore(apathyQuestions)
    };

    const overallScore = (scores.WAR + scores.OPPORTUNITY + scores.COMFORT + scores.APATHY) / 4;

    return { scores, overallScore };
  };

  const handleSubmit = () => {
    const { scores, overallScore } = calculateScores();
    
    // במקום לעבור ישירות לתוצאות, נעבור לדף הפרטים האישיים
    navigate('/personal-details', {
      state: { answers }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              שאלון WOCA
            </CardTitle>
            <p className="text-xl text-gray-600 mt-2">
              אזורי תודעה ארגונית
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {[...Array(40)].map((_, i) => {
              const questionNumber = i + 1;
              return (
                <div key={questionNumber} className="space-y-3">
                  <Label htmlFor={`question-${questionNumber}`} className="text-right block">
                    שאלה {questionNumber}
                  </Label>
                  <RadioGroup defaultValue="" className="flex justify-end gap-6" onValueChange={(value) => handleAnswerChange(questionNumber.toString(), parseInt(value))}>
                    {[1, 2, 3, 4, 5].map(value => (
                      <div key={value} className="flex items-center space-x-2 space-x-reverse">
                        <Label htmlFor={`question-${questionNumber}-${value}`}>{value}</Label>
                        <RadioGroupItem value={value.toString()} id={`question-${questionNumber}-${value}`} />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              );
            })}

            <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              סיום ומעבר לתוצאות
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
