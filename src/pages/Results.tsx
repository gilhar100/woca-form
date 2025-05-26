
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface LocationState {
  scores: {
    WAR: number;
    OPPORTUNITY: number;
    COMFORT: number;
    APATHY: number;
  };
  overallScore: number;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state) {
    navigate('/');
    return null;
  }

  const { scores, overallScore } = state;

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

  const getInterpretation = (domain: string, score: number) => {
    const interpretations = {
      WAR: score >= 3.5 
        ? "ניהול אגרסיבי ולא פשרני. נטייה לעמדות קיצוניות ורצון להכריע בכל מחיר."
        : "גישה מתונה יותר, פתוחות לפשרות ולשמירה על יחסים.",
      OPPORTUNITY: score >= 3.5
        ? "ניהול פתוח, גמיש וחדשני. יכולת לזהות הזדמנויות ולהסתגל לשינויים."
        : "נטייה לשמרנות ויותר זהירות בפני שינויים ורעיונות חדשים.",
      COMFORT: score >= 3.5
        ? "ניהול שמרני, לא דינמי ולא מחפש שינויים. העדפה לשמירה על הקיים."
        : "פתוחות לשינויים ויוזמה לחידושים.",
      APATHY: score >= 3.5
        ? "ניהול פסיבי, ללא יוזמה ועם תחושת חוסר מסוגלות להשפיע."
        : "תחושת מסוגלות גבוהה ורצון לפעול ולשפר."
    };
    return interpretations[domain as keyof typeof interpretations];
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

  const getOverallInterpretation = (score: number) => {
    if (score >= 4) return "פרופיל ניהולי דומיננטי עם נטיות חזקות";
    if (score >= 3.5) return "פרופיל ניהולי בולט עם מאפיינים ברורים";
    if (score >= 3) return "פרופיל ניהולי מאוזן עם מאפיינים מתונים";
    if (score >= 2.5) return "פרופיל ניהולי גמיש עם מאפיינים מגוונים";
    return "פרופיל ניהולי מותאם למצב עם גמישות גבוהה";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
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

        {/* Overall Score */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">ציון WOCA כללי</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {overallScore.toFixed(2)}
            </div>
            <Progress value={(overallScore / 5) * 100} className="h-4 mb-4" />
            <p className="text-lg text-gray-600">{getOverallInterpretation(overallScore)}</p>
          </CardContent>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(scores).map(([domain, score]) => (
            <Card key={domain} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-xl ${getDomainColor(domain)} text-right`}>
                  {domain === 'WAR' && 'WAR - אזור מלחמה'}
                  {domain === 'OPPORTUNITY' && 'OPPORTUNITY - אזור הזדמנות'}
                  {domain === 'COMFORT' && 'COMFORT - אזור נוחות'}
                  {domain === 'APATHY' && 'APATHY - אזור אדישות'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getDomainColor(domain)}`}>
                    {score.toFixed(2)}
                  </div>
                  <Progress 
                    value={(score / 5) * 100} 
                    className="h-3 mt-2"
                  />
                </div>
                <p className="text-gray-700 text-right leading-relaxed">
                  {getInterpretation(domain, score)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

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
                  <li>• ציון כללי = ממוצע 4 התחומים</li>
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
