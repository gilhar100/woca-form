import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { getDominantZone, getZoneNameInHebrew, getZoneAssignmentText, getZoneColor } from '@/utils/wocaCalculations';

interface WOCAScores {
  War: number;
  Opportunity: number;
  Comfort: number;
  Apathy: number;
}

interface LocationState {
  scores: WOCAScores;
  individualScores?: WOCAScores;
  groupScores?: WOCAScores;
  groupId?: string;
  overallScore?: number;
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

  const { scores, groupScores, individualScores, groupId } = state;
  const isGroupView = !!groupScores;
  const displayScores = isGroupView ? groupScores! : scores;

  // Prepare chart data with proper colors and Hebrew names
  const chartData = [
    {
      domain: 'הזדמנות',
      englishName: 'Opportunity', 
      score: displayScores.Opportunity,
      fill: getZoneColor('Opportunity')
    },
    {
      domain: 'מלחמה',
      englishName: 'War',
      score: displayScores.War,
      fill: getZoneColor('War')
    },
    {
      domain: 'נוחות',
      englishName: 'Comfort',
      score: displayScores.Comfort,
      fill: getZoneColor('Comfort')
    },
    {
      domain: 'אדישות',
      englishName: 'Apathy',
      score: displayScores.Apathy,
      fill: getZoneColor('Apathy')
    }
  ];

  const radarData = [
    {
      domain: 'War',
      score: displayScores.War,
      fullMark: 5
    },
    {
      domain: 'Opportunity',
      score: displayScores.Opportunity,
      fullMark: 5
    },
    {
      domain: 'Comfort',
      score: displayScores.Comfort,
      fullMark: 5
    },
    {
      domain: 'Apathy',
      score: displayScores.Apathy,
      fullMark: 5
    }
  ];

  // Find the dominant zone and create assignment text
  const dominantZone = getDominantZone(displayScores);
  const zoneAssignmentText = getZoneAssignmentText(dominantZone, isGroupView);

  const getDetailedInterpretation = (domain: string, score: number) => {
    const interpretations = {
      War: {
        title: "War (מלחמה)",
        description: "ציון גבוה מעיד על תחושת איום תמידית, לחץ, ומאבקים פנימיים בארגון. הארגון משקיע משאבים רבים בהישרדות ובתגובה למצבי משבר חוזרים ונשנים, מה שמונע פיתוח וצמיחה.",
        highScore: "הארגון נמצא במצב של לחץ קבוע ומאבקים פנימיים. ישנה תחושת איום מתמדת ומשקיעים משאבים רבים בהישרדות במקום בפיתוח.",
        lowScore: "הארגון אינו נמצא במצב של משבר או לחץ קיצוני. ישנה יכולת להתמקד בפיתוח ובצמיחה במקום רק בהישרדות."
      },
      Opportunity: {
        title: "Opportunity (הזדמנות)",
        description: "ציון גבוה באזור זה הוא הרצוי ביותר, ומעיד שהארגון נמצא במצב אופטימלי. קיימת תחושת התלהבות, פתיחות, ומוכנות לנצל הזדמנויות. התרבות הארגונית מעודדת חדשנות, למידה, וגמישות מחשבתית, מה שמאפשר לארגון לצמוח ולהתפתח.",
        highScore: "מצב אידיאלי! הארגון נמצא במצב אופטימלי עם תחושת התלהבות ופתיחות. התרבות הארגונית מעודדת חדשנות, למידה וגמישות מחשבתית המאפשרים צמיחה והתפתחות.",
        lowScore: "הארגון מתקשה לזהות ולנצל הזדמנויות חדשות. ייתכן שקיימת נטייה לשמרנות ופחות פתיחות לחדשנות ושינויים."
      },
      Comfort: {
        title: "Comfort (נוחות)",
        description: "ציון גבוה באזור זה מציין שהארגון נמצא באזור נוחות מוגזם. למרות שהארגון מתנהל בשלווה ויציבות, קיימת הימנעות משינויים, חוסר יוזמה, ושאננות. המצב הנוח מביא לקיפאון והיעדר חדשנות וצמיחה ארוכת טווח.",
        highScore: "הארגון נמצא באזור נוחות מוגזם. למרות היציבות והשלווה, קיימת הימנעות משינויים וחוסר יוזמה שעלולים להוביל לקיפאון וחוסר חדשנות.",
        lowScore: "הארגון אינו נמצא באזור נוחות מוגזם. ישנה פתיחות לשינויים ויוזמה לחידושים ופיתוח."
      },
      Apathy: {
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
      War: "text-red-600",
      Opportunity: "text-green-600",
      Comfort: "text-yellow-600",
      Apathy: "text-gray-600"
    };
    return colors[domain as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              תוצאות שאלון WOCA
            </CardTitle>
            <p className="text-xl text-gray-600 mt-2" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              אזורי תודעה ארגונית (36 שאלות)
            </p>
            {groupId && (
              <p className="text-lg text-blue-600 font-bold" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                קוד קבוצה: {groupId}
              </p>
            )}
          </CardHeader>
        </Card>

        {/* Zone Assignment */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50 border-r-4 border-blue-500">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-800 mb-4" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                זיהוי אזור התודעה הדומיננטי
              </h3>
              <div className="text-2xl font-bold text-blue-700 mb-4">
                {zoneAssignmentText}
              </div>
              {isGroupView && (
                <p className="text-lg text-blue-600" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  (בהתבסס על ממוצע כל המשתתפים בקבוצה)
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Zone Comparison Chart */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              השוואת ציונים בין אזורי WOCA
            </CardTitle>
            <p className="text-center text-gray-600" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              {isGroupView ? 'ציונים ממוצעים של הקבוצה' : 'הציונים האישיים שלך'} עבור כל אזור תודעה
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="domain" 
                  tick={{ fontSize: 16, fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }} 
                  interval={0}
                  angle={0}
                  textAnchor="middle"
                  height={80}
                />
                <YAxis 
                  domain={[0, 5]} 
                  tick={{ fontSize: 14 }}
                  label={{ value: 'ציון ממוצע', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                />
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [
                    value.toFixed(2), 
                    `${props.payload.englishName} (${props.payload.domain})`
                  ]} 
                  labelStyle={{ 
                    textAlign: 'right', 
                    fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
                  }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Zone Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(displayScores).map(([domain, score]) => {
            const interpretation = getDetailedInterpretation(domain, score);
            return (
              <Card key={domain} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className={`text-xl ${getDomainColor(domain)} text-right`} style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    {interpretation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getDomainColor(domain)} mb-2`}>
                      {score.toFixed(2)}
                    </div>
                    <Progress value={(score / 5) * 100} className="h-3 mt-2" />
                  </div>
                  
                  {/* Personal/Group Interpretation */}
                  <div className="bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                    <p className="text-blue-700 text-right leading-relaxed text-sm" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      {interpretation.interpretation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Key Insight */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-green-50 to-blue-50 border-r-4 border-green-500">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-800 mb-4" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                תובנת מפתח
              </h3>
              <p className="text-lg text-green-700 leading-relaxed text-right" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                רק ארגון עם ציון גבוה באזור <strong>Opportunity (הזדמנות)</strong> נמצא במצב אידיאלי ומיטבי, 
                ומבטיח יכולת הסתגלות, צמיחה, והתמודדות מוצלחת עם אתגרי העתיד.
                <br />
                <span className="text-sm mt-2 block">
                  הניתוח מבוסס על 36 שאלות המחולקות לארבעה אזורי תודעה.
                </span>
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
              style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              מלא שאלון חדש
            </Button>
            <Button 
              onClick={() => window.print()} 
              variant="outline" 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              הדפס תוצאות
            </Button>
          </CardContent>
        </Card>

        {/* Methodology */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-right" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              אודות שאלון WOCA
            </CardTitle>
          </CardHeader>
          <CardContent className="text-right space-y-4">
            <p className="text-gray-700" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              שאלון WOCA (War, Opportunity, Comfort, Apathy) מיועד למדידת אזורי תודעה ארגונית ובחינת דפוסי התנהגות ארגוניים באמצעות 36 שאלות ממוקדות.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  חישוב הציונים:
                </h4>
                <ul className="space-y-1 text-gray-600" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  <li>• 36 שאלות מחולקות לארבעה אזורי WOCA</li>
                  <li>• שאלות מסוימות מחושבות הפוך</li>
                  <li>• ציון האזור = ממוצע השאלות באותו אזור בלבד</li>
                  <li>• האזור הדומיננטי = הציון הגבוה ביותר</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  פרשנות התוצאות:
                </h4>
                <ul className="space-y-1 text-gray-600" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  <li>• ציון גבוה = נטייה חזקה לאזור</li>
                  <li>• האזור הדומיננטי מגדיר את האופי הארגוני</li>
                  <li>• במקרה של שוויון - מוצגים כל האזורים השווים</li>
                  <li>• המטרה: להגיע לאזור ההזדמנות</li>
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
