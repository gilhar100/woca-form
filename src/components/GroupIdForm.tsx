
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

interface GroupIdFormProps {
  onSubmit: (fullName: string, groupId: string) => void;
}

const GroupIdForm = ({ onSubmit }: GroupIdFormProps) => {
  const [fullName, setFullName] = useState('');
  const [groupId, setGroupId] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && groupId.trim()) {
      onSubmit(fullName.trim(), groupId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 flex items-center justify-center" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
          <CardTitle className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3`} style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            שאלון להערכת תרבות ארגונית
          </CardTitle>
          <p className={`mt-2 text-zinc-600 font-medium ${isMobile ? 'text-base' : 'text-lg'}`} style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            ד"ר יוסי שרעבי
          </p>
          <p className={`text-gray-600 ${isMobile ? 'text-base' : 'text-lg'} leading-relaxed text-right mt-3`} style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            לפני שמתחילים, נא למלא את הפרטים הבאים
          </p>
        </CardHeader>
        <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-3">
              <Label htmlFor="fullName" className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-right block`} style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                שם מלא *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="הזינו את השם המלא"
                required
                className={`${isMobile ? 'h-12 text-base' : 'h-14 text-lg'} text-right border-2 focus:border-blue-500 transition-colors`}
                dir="rtl"
                style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="groupId" className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-right block`} style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                קוד קבוצה *
              </Label>
              <Input
                id="groupId"
                type="text"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                placeholder="הזינו את קוד הקבוצה"
                required
                className={`${isMobile ? 'h-12 text-base' : 'h-14 text-lg'} text-right border-2 focus:border-blue-500 transition-colors`}
                dir="rtl"
                style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
              />
            </div>
            
            <Button 
              type="submit" 
              className={`w-full ${isMobile ? 'h-12 text-lg' : 'h-14 text-xl'} font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 mt-6`}
              disabled={!fullName.trim() || !groupId.trim()}
              style={{ fontFamily: 'Assistant, Alef, "Varela Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              התחל שאלון
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupIdForm;
