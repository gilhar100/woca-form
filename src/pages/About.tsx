import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate('/personal-details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {/* Dr. Yossi Sharabi Photo */}
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/01817066-9e5c-4047-95a5-f665351ad915.png" 
                alt="ד״ר יוסי שרעבי" 
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
            </div>
            
            {/* Main Title */}
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4" 
                       style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              אודות
            </CardTitle>
            <p className="mt-2 text-zinc-600 font-medium text-lg" 
               style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              ד"ר יוסי שרעבי
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8 text-right space-y-8">
            {/* Who Are We Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4" 
                  style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                מי אנחנו?
              </h2>
              
              <div className="space-y-4 text-zinc-700 leading-relaxed" 
                   style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                <p>
                  אנחנו OPPORTUNITY – חברת פיתוח ארגוני בהובלת ד"ר יוסי שרעבי, עו״ד, מרצה וחוקר מוביל בתחומי המנהיגות, האסטרטגיה והתרבות הארגונית. ד״ר שרעבי כיהן בעבר כמנכ״ל משרד התרבות והספורט ומילא שורת תפקידי ניהול בכירים במגזר הציבורי והחברתי.
                </p>
                
                <p>
                  אנחנו מאמינים שארגונים לא נועדו רק לשרוד – אלא לגדול, להתחדש ולהשפיע. מטרתנו היא ללוות ארגונים במעברים קריטיים, להוציא אותם מתקיעות תודעתית ולסייע להם לנוע לעבר טרנספורמציה עמוקה וברת קיימא.
                </p>
                
                <p>
                  במהלך השנים פיתחנו את מודל SALIMA–WOCA – כלי אבחון ייחודי ופורץ דרך שפיתח ד״ר שרעבי, ומאפשר לנו למפות את ה-DNA הארגוני, לזהות חסמים סמויים ולבנות תשתית לפיתוח מנהיגות אפקטיבית ותרבות ארגונית מתקדמת. המודל נמצא בשימוש בלעדי של חברת OPPORTUNITY, ומיושם בהצלחה בגופים ציבוריים, פרטיים וחברתיים.
                </p>
                
                <p className="font-semibold">
                  אנחנו לא רק מאבחנים – אנחנו שותפים למסע.
                </p>
              </div>
            </div>

            {/* Terms and Clarifications Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-800 mb-4" 
                  style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                תנאים והבהרות
              </h2>
              
              <ul className="space-y-3 text-zinc-700 leading-relaxed" 
                  style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                <li className="flex items-start">
                  <span className="text-blue-600 ml-3">•</span>
                  השאלון הוא כלי מקצועי פנימי שנועד לצרכים אבחוניים בלבד.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 ml-3">•</span>
                  אין לעשות בו שימוש מסחרי, חינוכי או מחקרי ללא קבלת רשות כתובה מראש מחברת OPPORTUNITY.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 ml-3">•</span>
                  כל הזכויות על השאלון, התכנים הנלווים, מודל SALIMA–WOCA והניתוחים הנגזרים ממנו – שמורות לד״ר יוסי שרעבי ולחברת OPPORTUNITY.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 ml-3">•</span>
                  המשך מילוי השאלון מהווה אישור להסכמתך לתנאים אלו.
                </li>
              </ul>
            </div>

            {/* Continue Button */}
            <div className="text-center pt-6">
              <Button 
                onClick={handleStart} 
                className="w-full max-w-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-3"
                style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              >
                המשך לשאלון
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
