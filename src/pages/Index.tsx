
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    navigate('/about');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>WOCA</CardTitle>
            <p className="mt-2 text-zinc-600 font-medium text-lg" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>ד"ר יוסי שרעבי</p>
            <p className="mt-4 text-zinc-950 font-bold text-xl" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>שאלון תודעה ארגונית</p>
            <p className="mt-3 text-zinc-700 text-base leading-relaxed px-4" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>מערכת SALIMA-WOCA היא כלי אבחון ארגוני מקיף למנהלים וארגונים שפותח על ידי ד״ר יוסי שרעבי. שאלון אזור תודעה ארגונית מסוג WOCA מכיל 36 היגדים ומזהה את ה- DNA של הארגון.</p>
          </CardHeader>

          <CardContent className="text-center">
            <Button onClick={handleStart} className="w-full max-w-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-3" style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              התחל שאלון
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
