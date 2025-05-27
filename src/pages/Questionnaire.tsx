
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LocationState {
  personalDetails: {
    fullName: string;
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
  "האם אתה מרגיש שהארגון מקדם למידה מתמדת?",
  "האם אתה מרגיש שהארגון מתמודד היטב עם שינויים?",
  "האם אתה מרגיש שהארגון אתי וישר?",
  "האם אתה מרגיש שיש לך קשר טוב עם הממונים עליך?",
  "האם אתה מרגיש שהארגון מעניק הכרה על הישגים?",
  "האם אתה מרגיש שהארגון מקדם תקשורת פתוחה?",
  "האם אתה מרגיש שיש לך השפעה על סביבת העבודה שלך?",
  "האם אתה מרגיש שהארגון מסייע לך להתמודד עם קשיים?",
  "האם אתה מרגיש שהארגון מעודד עבודת צוות?",
  "האם אתה מרגיש שהארגון מקדם את הקריירה שלך?",
  "האם אתה מרגיש שהארגון רגיש לצרכים שלך?",
  "האם אתה מרגיש שהארגון מעניק לך אוטונומיה בעבודה?",
  "האם אתה מרגיש מחובר לערכים של הארגון?"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
            <CardTitle className="text-4xl font-bold mb-2">
              שאלון WOCA
            </CardTitle>
            <p className="text-xl opacity-90 mb-1">
              אזורי תודעה ארגונית
            </p>
            <p className="text-base opacity-80">
              שלום {state.personalDetails.fullName}, שאלה {currentQuestion + 1} מתוך {questions.length}
            </p>
          </CardHeader>

          <CardContent className="py-12 px-8">
            {/* התקדמות */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">
                  {currentQuestion + 1} / {questions.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-l from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* השאלה */}
            <div className="text-center mb-12">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-blue-100">
                <Label className="text-2xl font-bold text-gray-800 leading-relaxed block text-right">
                  {questions[currentQuestion]}
                </Label>
              </div>
            </div>

            {/* אפשרויות התשובה */}
            <div className="space-y-8">
              <RadioGroup 
                value={currentAnswer?.toString() || ""} 
                onValueChange={(value) => handleAnswerChange(parseInt(value))}
                className="space-y-6"
              >
                {/* תוויות קיצוניות */}
                <div className="flex justify-between items-center px-4">
                  <div className="text-center">
                    <span className="text-lg font-semibold text-red-600">לא מסכים בכלל</span>
                    <div className="text-sm text-gray-500 mt-1">1</div>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold text-green-600">מסכים מאוד</span>
                    <div className="text-sm text-gray-500 mt-1">5</div>
                  </div>
                </div>
                
                {/* כפתורי הבחירה */}
                <div className="flex justify-center items-center gap-12 py-8">
                  {[1, 2, 3, 4, 5].map(value => (
                    <div key={value} className="flex flex-col items-center space-y-3">
                      <div className="relative">
                        <RadioGroupItem 
                          value={value.toString()} 
                          id={`question-${currentQuestion}-${value}`}
                          className="w-8 h-8 border-2 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 transition-all duration-200 hover:scale-110"
                        />
                        {currentAnswer === value && (
                          <div className="absolute -inset-2 rounded-full bg-blue-100 -z-10 animate-pulse"></div>
                        )}
                      </div>
                      <Label 
                        htmlFor={`question-${currentQuestion}-${value}`}
                        className="text-xl font-bold cursor-pointer hover:text-blue-600 transition-colors duration-200"
                      >
                        {value}
                      </Label>
                      <div className="text-xs text-gray-500 text-center">
                        {value === 1 && "בכלל לא"}
                        {value === 2 && "קצת"}
                        {value === 3 && "בינוני"}
                        {value === 4 && "הרבה"}
                        {value === 5 && "מאוד"}
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* כפתורי ניווט */}
            <div className="flex justify-between items-center pt-12 border-t border-gray-200">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="px-8 py-3 text-lg font-semibold disabled:opacity-50 hover:bg-gray-50 transition-colors duration-200"
              >
                ← שאלה קודמת
              </Button>
              
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">
                  נותרו {questions.length - currentQuestion - 1} שאלות
                </div>
                <div className="text-xs text-gray-400">
                  זמן משוער: {Math.ceil((questions.length - currentQuestion - 1) * 0.5)} דקות
                </div>
              </div>

              <Button 
                onClick={handleNext}
                disabled={!isAnswered}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {currentQuestion === questions.length - 1 ? '✓ סיום השאלון' : 'שאלה הבאה →'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Questionnaire;
