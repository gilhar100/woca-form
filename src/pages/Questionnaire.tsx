
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

const questions = [
  "האם אתה מרגיש שיש לך השפעה על תהליכי קבלת החלטות בארגון?",
  "עד כמה אתה מכיר את החזון והמטרות של הארגון?",
  "האם אתה מרגיש שהעבודה שלך תורמת לארגון?",
  "עד כמה אתה מרגיש שהדעה שלך חשובה לארגון?",
  "האם יש לך הזדמנויות לפיתוח מקצועי בארגון?",
  "עד כמה אתה מרגיש אחראי על התוצאות בעבודה שלך?",
  "האם אתה מקבל משוב מועיל על הביצועים שלך?",
  "עד כמה אתה מרגיש שהעבודה שלך מעניינת ומאתגרת?",
  "האם אתה מרגיש שיש לך יכולת להשפיע על השינויים בארגון?",
  "עד כמה אתה מרגיש שהארגון תומך בך?",
  "האם אתה מרגיש שהתפקיד שלך ברור ומוגדר?",
  "עד כמה אתה מרגיש שיש לך גמישות בדרך שבה אתה מבצע את העבודה?",
  "האם אתה מרגיש שהארגון מעריך את התרומה שלך?",
  "עד כמה אתה מרגיש שאתה חלק מהקבוצה בעבודה?",
  "האם אתה מרגיש שיש לך הזדמנויות לצמיחה בארגון?",
  "עד כמה אתה מרגיש שהעבודה שלך משמעותית?",
  "האם אתה מרגיש שאתה יכול להביע את הדעות שלך בחופשיות?",
  "עד כמה אתה מרגיש שהארגון שקוף בתקשורת?",
  "האם אתה מרגיש שיש לך את הכלים הנדרשים לביצוע העבודה?",
  "עד כמה אתה מרגיש שהמנהיגות בארגון אפקטיבית?",
  "האם אתה מרגיש שהארגון מעודד חדשנות?",
  "עד כמה אתה מרגיש שיש שיתוף פעולה טוב בין המחלקות?",
  "האם אתה מרגיש שהארגון מתייחס אליך כאל אדם ולא רק כעובד?",
  "עד כמה אתה מרגיש שיש לך איזון בין עבודה לחיים האישיים?",
  "האם אתה מרגיש שהארגון מקדם גיוון והכלה?",
  "עד כמה אתה מרגיש שהתהליכים בארגון יעילים?",
  "האם אתה מרגיש שיש לך ביטחון תעסוקתי בארגון?",
  "עד כמה אתה מרגיש שהארגון מקדם למידה מתמדת?",
  "האם אתה מרגיש שהארגון מתמודד היטב עם שינויים?",
  "עד כמה אתה מרגיש שהארגון אתי וישר?",
  "האם אתה מרגיש שיש לך קשר טוב עם הממונים עליך?",
  "עד כמה אתה מרגיש שהארגון מעניק הכרה על הישגים?",
  "האם אתה מרגיש שהארגון מקדם תקשורת פתוחה?",
  "עד כמה אתה מרגיש שיש לך השפעה על סביבת העבודה שלך?",
  "האם אתה מרגיש שהארגון מסייע לך להתמודד עם קשיים?",
  "עד כמה אתה מרגיש שהארגון מעודד עבודת צוות?",
  "האם אתה מרגיש שהארגון מקדם את הקריירה שלך?",
  "עד כמה אתה מרגיש שהארגון רגיש לצרכים שלך?",
  "האם אתה מרגיש שהארגון מעניק לך אוטונומיה בעבודה?",
  "עד כמה אתה מרגיש מחובר לערכים של הארגון?"
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  if (!state?.personalDetails) {
    navigate('/personal-details');
    return null;
  }

  const handleAnswerChange = (value: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // מעבר לחלונית אישור עם כל הנתונים
      navigate('/consent', {
        state: {
          answers,
          personalDetails: state.personalDetails
        }
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentAnswer = answers[currentQuestion];
  const isAnswered = currentAnswer !== undefined;

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
              שלום {state.personalDetails.fullName}, שאלה {currentQuestion + 1} מתוך {questions.length}
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="text-center">
              <Label className="text-xl font-semibold text-gray-800 leading-relaxed block text-right">
                {questions[currentQuestion]}
              </Label>
            </div>

            <div className="space-y-4">
              <RadioGroup 
                value={currentAnswer?.toString() || ""} 
                onValueChange={(value) => handleAnswerChange(parseInt(value))}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">לא מסכים בכלל</span>
                  <span className="text-sm text-gray-600">מסכים מאוד</span>
                </div>
                <div className="flex justify-center gap-8">
                  {[1, 2, 3, 4, 5].map(value => (
                    <div key={value} className="flex flex-col items-center space-y-2">
                      <RadioGroupItem 
                        value={value.toString()} 
                        id={`question-${currentQuestion}-${value}`}
                        className="w-6 h-6"
                      />
                      <Label 
                        htmlFor={`question-${currentQuestion}-${value}`}
                        className="text-lg font-semibold"
                      >
                        {value}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="px-8"
              >
                שאלה קודמת
              </Button>
              
              <div className="text-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {currentQuestion + 1}/{questions.length}
                </p>
              </div>

              <Button 
                onClick={handleNext}
                disabled={!isAnswered}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
              >
                {currentQuestion === questions.length - 1 ? 'סיום השאלון' : 'שאלה הבאה'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Questionnaire;
