import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const Index = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/personal-details');
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">אבחון תודעה ארגונית</CardTitle>
            
            <p className="text-lg text-gray-500 mt-4">
              ברוכים הבאים לשאלון WOCA המיועד למדידת אזורי תודעה ארגונית
            </p>
          </CardHeader>

          <CardContent className="text-center">
            <Button onClick={handleStart} className="w-full max-w-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-3">
              התחל שאלון
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Index;