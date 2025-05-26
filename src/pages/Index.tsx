import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Question {
  id: number;
  text: string;
  domain: 'WAR' | 'OPPORTUNITY' | 'COMFORT' | 'APATHY';
  isReverse: boolean;
}

const questions: Question[] = [
  // WAR questions
  { id: 1, text: "אני מתעקש על ניצחון מוחלט גם כשהמחיר גבוה.", domain: 'WAR', isReverse: false },
  { id: 2, text: "אני מאמין שלפעמים עדיף להפסיד כדי לשמור על יחסים טובים.", domain: 'WAR', isReverse: true },
  { id: 3, text: "אני מעדיף להכריע ויכוח מאשר להמשיך לחפש פשרה.", domain: 'WAR', isReverse: false },
  { id: 4, text: "אני מרגיש צורך להוכיח שאני צודק בכל דיון.", domain: 'WAR', isReverse: false },
  { id: 5, text: "אני פתוח לשנות דעתי אם הצד השני משכנע.", domain: 'WAR', isReverse: true },
  { id: 6, text: "אני מפגין אגרסיביות כדי להבטיח השגת מטרותיי.", domain: 'WAR', isReverse: false },
  { id: 7, text: "אני נוקט עמדה קשוחה, גם במחיר של פגיעה ביחסים.", domain: 'WAR', isReverse: false },
  { id: 8, text: "אני נמנע מעימותים כי הם יוצרים אווירה שלילית.", domain: 'WAR', isReverse: true },
  { id: 9, text: "אני מאמין שפשרה פירושה חולשה.", domain: 'WAR', isReverse: false },
  { id: 10, text: "אני שומר על גמישות גם במצבי קונפליקט.", domain: 'WAR', isReverse: true },

  // OPPORTUNITY questions
  { id: 11, text: "אני קשוב לרעיונות גם כשאינם תואמים את דעותיי.", domain: 'OPPORTUNITY', isReverse: false },
  { id: 12, text: "אני בוחן מספר חלופות לפני קבלת החלטה.", domain: 'OPPORTUNITY', isReverse: false },
  { id: 13, text: "אני מזהה בקלות הזדמנויות לצמיחה במצבים מאתגרים.", domain: 'OPPORTUNITY', isReverse: false },
  { id: 14, text: "אני מתקשה לראות את היתרונות שבמצבים לא ודאיים.", domain: 'OPPORTUNITY', isReverse: true },
  { id: 15, text: "אני מקדם יחסים טובים עם בעלי עניין שונים לטווח ארוך.", domain: 'OPPORTUNITY', isReverse: false },
  { id: 16, text: "אני מחפש הזדמנויות גם כשהכול מתנהל כשורה.", domain: 'OPPORTUNITY', isReverse: false },
  { id: 17, text: "אני נמנע מלבחון אפשרויות חדשות כל עוד התוצאות טובות מספיק.", domain: 'OPPORTUNITY', isReverse: true },
  { id: 18, text: "אני יוזם למידה ופיתוח באופן מתמיד.", domain: 'OPPORTUNITY', isReverse: false },
  { id: 19, text: "אני מתייחס בסקרנות לרעיונות יוצאי דופן.", domain: 'OPPORTUNITY', isReverse: false },
  { id: 20, text: "אני מתקשה להסתגל לשינויים כשהם מגיעים בהפתעה.", domain: 'OPPORTUNITY', isReverse: true },

  // COMFORT questions
  { id: 21, text: "אני מרגיש בנוח עם הדרך שבה הדברים מתנהלים ואיני רואה צורך בשינוי.", domain: 'COMFORT', isReverse: false },
  { id: 22, text: "אני מתעלם מיוזמות חדשות כל עוד הן לא הכרחיות.", domain: 'COMFORT', isReverse: false },
  { id: 23, text: "אני חש מאוים כאשר מציגים רעיונות שעשויים לשנות את סדרי העבודה שלי.", domain: 'COMFORT', isReverse: false },
  { id: 24, text: "אני יוזם שינויים לעיתים קרובות כדי למנוע קיפאון.", domain: 'COMFORT', isReverse: true },
  { id: 25, text: "אני מעדיף לשמור על הקיים, גם במחיר של פספוס הזדמנויות.", domain: 'COMFORT', isReverse: false },
  { id: 26, text: "אני מתלהב כשמגיעים רעיונות חדשים שמאתגרים את השגרה.", domain: 'COMFORT', isReverse: true },
  { id: 27, text: "אני מרגיש חוסר נוחות כאשר נדרשים שינויים בשיטות עבודה.", domain: 'COMFORT', isReverse: false },
  { id: 28, text: "אני נמנע מלעסוק בפעולות שעלולות להוביל לשינוי מהותי.", domain: 'COMFORT', isReverse: false },
  { id: 29, text: "אני מאמין שהרגלים קיימים לא תמיד טובים ויש לבחון אותם מחדש.", domain: 'COMFORT', isReverse: true },
  { id: 30, text: "אני מתקשה להיפרד משיטות ישנות, אפילו כשברור שהן לא יעילות.", domain: 'COMFORT', isReverse: false },

  // APATHY questions
  { id: 31, text: "אני מאמין שאין טעם לנסות לשנות כי המצב לא ישתפר.", domain: 'APATHY', isReverse: false },
  { id: 32, text: "אני לוקח יוזמה גם כשאני סקפטי לגבי הצלחתה.", domain: 'APATHY', isReverse: true },
  { id: 33, text: "אני חש שאין לי יכולת אמיתית להשפיע על הסביבה הארגונית שלי.", domain: 'APATHY', isReverse: false },
  { id: 34, text: "אני מרגיש אדישות ביחס לרעיונות חדשים.", domain: 'APATHY', isReverse: false },
  { id: 35, text: "אני חושב שהשינוי אפשרי, אבל לא טורח לפעול למענו.", domain: 'APATHY', isReverse: false },
  { id: 36, text: "אני משוכנע שבטווח הארוך אין אפשרות לשפר את המצב בארגון.", domain: 'APATHY', isReverse: false },
  { id: 37, text: "אני חש ביטחון שאני יכול לתרום לשינויים משמעותיים בארגון.", domain: 'APATHY', isReverse: true },
  { id: 38, text: "אני מגלה חוסר עניין מוחלט בכל תהליך לשיפור או שינוי.", domain: 'APATHY', isReverse: false },
  { id: 39, text: "אני מאמין שיש הזדמנות לשפר דברים, אך לרוב אין לי כוח או רצון להתערב.", domain: 'APATHY', isReverse: false },
  { id: 40, text: "אני חש שהמצב בארגון אבוד ואיני מעוניין להשקיע מאמץ לשנותו.", domain: 'APATHY', isReverse: false }
];

const shuffleArray = (array: Question[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [shuffledQuestions] = useState(() => shuffleArray(questions));
  const [isStarted, setIsStarted] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      // Calculate scores and navigate to results
      calculateAndNavigateToResults(newAnswers);
    }
  };

  const calculateAndNavigateToResults = (allAnswers: { [key: number]: number }) => {
    const scores: { [key: string]: number[] } = {
      WAR: [],
      OPPORTUNITY: [],
      COMFORT: [],
      APATHY: []
    };

    questions.forEach(question => {
      let score = allAnswers[question.id];
      
      // Apply reverse scoring
      if (question.isReverse) {
        score = 6 - score;
      }
      
      scores[question.domain].push(score);
    });

    const domainAverages = {
      WAR: scores.WAR.reduce((a, b) => a + b, 0) / scores.WAR.length,
      OPPORTUNITY: scores.OPPORTUNITY.reduce((a, b) => a + b, 0) / scores.OPPORTUNITY.length,
      COMFORT: scores.COMFORT.reduce((a, b) => a + b, 0) / scores.COMFORT.length,
      APATHY: scores.APATHY.reduce((a, b) => a + b, 0) / scores.APATHY.length
    };

    const overallWOCA = (domainAverages.WAR + domainAverages.OPPORTUNITY + domainAverages.COMFORT + domainAverages.APATHY) / 4;

    // Navigate to results with calculated scores
    navigate('/results', { 
      state: { 
        scores: domainAverages,
        overallScore: overallWOCA
      } 
    });
  };

  const getSelectedValue = () => {
    return answers[currentQuestion?.id] || 0;
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              שאלון אזורי תודעה ארגונית
            </CardTitle>
            <CardTitle className="text-2xl font-bold text-gray-700 mb-2">
              WOCA
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 leading-relaxed">
              שאלון זה מיועד להערכת סגנון הניהול והתנהגות הארגונית שלך בארבעה תחומים מרכזיים
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">השאלון כולל 40 שאלות בסדר אקראי</p>
              <p className="text-gray-600">זמן משוער למילוי: 8-10 דקות</p>
            </div>
            <Button 
              onClick={() => setIsStarted(true)}
              className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              התחל שאלון
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mb-4">
            <Progress value={progress} className="h-3 bg-gray-200" />
            <p className="text-sm text-gray-600 mt-2">
              שאלה {currentQuestionIndex + 1} מתוך {shuffledQuestions.length}
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed text-right">
              {currentQuestion?.text}
            </h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-6">עד כמה המשפט מתאר אותך?</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 5, label: "מתאר אותי במידה רבה מאוד", color: "bg-green-500 hover:bg-green-600" },
                { value: 4, label: "מתאר אותי במידה רבה", color: "bg-blue-500 hover:bg-blue-600" },
                { value: 3, label: "מתאר אותי במידה בינונית", color: "bg-yellow-500 hover:bg-yellow-600" },
                { value: 2, label: "מתאר אותי במידה מועטה", color: "bg-orange-500 hover:bg-orange-600" },
                { value: 1, label: "כלל לא מתאר אותי", color: "bg-red-500 hover:bg-red-600" }
              ].map((option) => (
                <Button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  variant={getSelectedValue() === option.value ? "default" : "outline"}
                  className={`p-4 text-lg justify-center transition-all duration-200 transform hover:scale-105 ${
                    getSelectedValue() === option.value 
                      ? `${option.color} text-white shadow-lg scale-105` 
                      : "hover:shadow-md"
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
