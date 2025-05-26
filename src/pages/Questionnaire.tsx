
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LocationState {
  personalDetails: {
    fullName: string;
    age: number;
    gender: string;
    education: string;
    profession: string;
    organization: string;
    experienceYears: number;
    email: string;
    phone: string;
  };
}

const Questionnaire = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [answers, setAnswers] = useState<Record<string, number>>({});

  if (!state?.personalDetails) {
    navigate('/personal-details');
    return null;
  }

  const handleAnswerChange = (question: string, value: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]: value,
    }));
  };

  const handleSubmit = () => {
    // מעבר לחלונית אישור עם כל הנתונים
    navigate('/consent', {
      state: {
        answers,
        personalDetails: state.personalDetails
      }
    });
  };

  const isFormComplete = Object.keys(answers).length === 40;

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
            <p className="text-sm text-gray-500 mt-2">
              שלום {state.personalDetails.fullName}, אנא ענה על כל 40 השאלות
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
                  <RadioGroup 
                    defaultValue="" 
                    className="flex justify-end gap-6" 
                    onValueChange={(value) => handleAnswerChange(questionNumber.toString(), parseInt(value))}
                  >
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

            <div className="flex gap-4 justify-center pt-6">
              <Button
                onClick={() => navigate('/personal-details')}
                variant="outline"
                className="px-8"
              >
                חזור לפרטים אישיים
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!isFormComplete}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
              >
                {isFormComplete ? 'סיום ומעבר לאישור' : `נענו ${Object.keys(answers).length}/40 שאלות`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Questionnaire;
