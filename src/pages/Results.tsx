import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface LocationState {
  scores: {
    WAR: number;
    OPPORTUNITY: number;
    COMFORT: number;
    APATHY: number;
  };
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.scores) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state?.scores) {
    return null;
  }

  const { scores } = state;

  const chartData = [
    {
      domain: 'WAR\n(מלחמה)',
      score: scores.WAR,
      fill: '#ef4444'
    },
    {
      domain: 'OPPORTUNITY\n(הזדמנות)',
      score: scores.OPPORTUNITY,
      fill: '#22c55e'
    },
    {
      domain: 'COMFORT\n(נוחות)',
      score: scores.COMFORT,
      fill: '#eab308'
    },
    {
      domain: 'APATHY\n(אדישות)',
      score: scores.APATHY,
      fill: '#6b7280'
    }
  ];

  const radarData = [
    {
      domain: 'WAR',
      score: scores.WAR,
      fullMark: 5
    },
    {
      domain: 'OPPORTUNITY',
      score: scores.OPPORTUNITY,
      fullMark: 5
    },
    {
      domain: 'COMFORT',
      score: scores.COMFORT,
      fullMark: 5
    },
    {
      domain: 'APATHY',
      score: scores.APATHY,
      fullMark: 5
    }
  ];

  const getDetailedInterpretation = (domain: string, score: number) => {
    const interpretations = {
      WAR: {
        title: "War (מלחמה)",
        description: "ציון גבוה מעיד על תחושת איום תמידית, לחץ, ומאבקים פנימיים בארגון. הארגון משקיע משאבים רבים בהישרדות ובתגובה למצבי משבר חוזרים ונשנים, מה שמונע פיתוח וצמיחה.",
        highScore: "הארגון נמצא במצב של לחץ קבוע ומאבקים פנימיים. ישנה תחושת איום מתמדת ומשקיעים משאבים רבים בהישרדות במקום בפיתוח.",
        lowScore: "הארגון אינו נמצא במצב של משבר או לחץ קיצוני. ישנה יכולת להתמקד בפיתוח ובצמיחה במקום רק בהישרדות."
      },
      OPPORTUNITY: {
        title: "Opportunity (הזדמנות)",
        description: "ציון גבוה באזור זה הוא הרצוי ביותר, ומעיד שהארגון נמצא במצב אופטימלי. קיימת תחושת התלהבות, פתיחות, ומוכנות לנצל הזדמנויות. התרבות הארגונית מעודדת חדשנות, למידה, וגמישות מחשבתית, מה שמאפשר לארגון לצמוח ולהתפתח.",
        highScore: "מצב אידיאלי! הארגון נמצא במצב אופטימלי עם תחושת התלהבות ופתיחות. התרבות הארגונית מעודדת חדשנות, למידה וגמישות מחשבתית המאפשרים צמיחה והתפתחות.",
        lowScore: "הארגון מתקשה לזהות ולנצל הזדמנויות חדשות. ייתכן שקיימת נטייה לשמרנות ופחות פתיחות לחדשנות ושינויים."
      },
      COMFORT: {
        title: "Comfort (נוחות)",
        description: "ציון גבוה באזור זה מציין שהארגון נמצא באזור נוחות מוגזם. למרות שהארגון מתנהל בשלווה ויציבות, קיימת הימנעות משינויים, חוסר יוזמה, ושאננות. המצב הנוח מביא לקיפאון והיעדר חדשנות וצמיחה ארוכת טווח.",
        highScore: "הארגון נמצא באזור נוחות מוגזם. למרות היציבות והשלווה, קיימת הימנעות משינויים וחוסר יוזמה שעלולים להוביל לקיפאון וחוסר חדשנות.",
        lowScore: "הארגון אינו נמצא באזור נוחות מוגזם. ישנה פתיחות לשינויים ויוזמה לחידושים ופיתוח."
      },
      APATHY: {
        title: "Apathy (אדישות)",
        description: "ציון גבוה מעיד על מצב של אדישות וניתוק רגשי ומנטלי של העובדים מהארגון. קיימת תחושת חוסר אונים, ירידה במוטיבציה, וירידה משמעותית בביצועים. במצב זה הארגון מתקשה להתמודד עם אתגרים או לנצל הזדמנויות חדשות.",
        highScore: "מצב של אדישות וניתוק רגשי ומנטלי של העובדים מהארגון. קיימת תחושת חוסר אונים, ירידה במוטיבציה ובביצועים, וקושי להתמודד עם אתגרים חדשים.",
        lowScore: "רמת מעורבות גבוהה של העובדים בארגון. תחושת מסוגלות חזקה, מוטיבציה גבוהה ויכולת טובה להתמודד עם אתגרים ולנצל הזדמנויות."
      }
    };
    
    const domainData = interpretations[domain as keyof typeof interpretations];
    const interpretation = score >= 3.5 ? domainData.highScore : domainData.lowScore;
    
    return {
      title: domainData.title,
      description: domainData.description,
      interpretation
    };
  };

  const getDomainColor = (domain: string) => {
    const colors = {
      WAR: "text-red-600",
      OPPORTUNITY: "text-green-600", 
      COMFORT: "text-yellow-600",
      APATHY: "text-gray-600"
    };
    return colors[domain as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              תוצאות שאלון WOCA
            </CardTitle>
            <p className="text-xl text-gray-600 mt-2">אזורי תודעה ארגונית</p>
          </CardHeader>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center">ציונים לפי תחומים</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="domain" 
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis domain={[0, 5]} />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(2), 'ציון']}
                    labelStyle={{ textAlign: 'right' }}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-center">פרופיל WOCA</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="domain" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 5]} 
                    tick={{ fontSize: 10 }}
                  />
                  <Radar
                    name="ציון"
                    dataKey="score"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip formatter={(value: number) => [value.toFixed(2), 'ציון']} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(scores).map(([domain, score]) => {
            const interpretation = getDetailedInterpretation(domain, score);
            return (
              <Card key={domain} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className={`text-2xl ${getDomainColor(domain)} text-right`}>
                    {interpretation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${getDomainColor(domain)} mb-2`}>
                      {score.toFixed(2)}
                    </div>
                    <Progress 
                      value={(score / 5) * 100} 
                      className="h-4 mt-2"
                    />
                  </div>
                  
                  {/* General Description */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2 text-right">הסבר כללי על התחום:</h4>
                    <p className="text-gray-700 text-right leading-relaxed">
                      {interpretation.description}
                    </p>
                  </div>
                  
                  {/* Personal Interpretation */}
                  <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                    <h4 className="font-bold text-blue-800 mb-2 text-right">הפרשנות האישית שלך:</h4>
                    <p className="text-blue-700 text-right leading-relaxed">
                      {interpretation.interpretation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Key Insight */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-800 mb-4">תובנה מפתח</h3>
              <p className="text-lg text-green-700 leading-relaxed">
                רק ארגון עם ציון גבוה באזור <strong>Opportunity</strong> נמצא במצב אידיאלי ומיטבי, 
                ומבטיח יכולת הסתגלות, צמיחה, והתמודדות מוצלחת עם אתגרי העתיד.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              מלא שאלון חדש
            </Button>
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
            >
              הדפס תוצאות
            </Button>
          </CardContent>
        </Card>

        {/* Methodology */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-right">אודות השאלון</CardTitle>
          </CardHeader>
          <CardContent className="text-right space-y-4">
            <p className="text-gray-700">
              שאלון WOCA (War, Opportunity, Comfort, Apathy) מיועד למדידת אזורי תודעה ארגונית ובחינת סגנונות ניהול שונים.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">חישוב הציונים:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• כל תחום מכיל 10 שאלות</li>
                  <li>• שאלות מסוימות מחושבות הפוך</li>
                  <li>• ציון התחום = ממוצע השאלות</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">פרשנות:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• ציון גבוה = נטייה חזקה לתחום</li>
                  <li>• ציון נמוך = נטייה מועטה לתחום</li>
                  <li>• ניתן להשתמש להערכה עצמית</li>
                  <li>• או להערכת אחרים</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
