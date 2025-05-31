
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GroupIdFormProps {
  onSubmit: (groupId: string) => void;
}

const GroupIdForm = ({ onSubmit }: GroupIdFormProps) => {
  const [groupId, setGroupId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupId.trim()) {
      onSubmit(groupId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 flex items-center justify-center" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            שאלון להערכת תרבות ארגונית
          </CardTitle>
          <p className="text-gray-600 text-lg leading-relaxed">
            לפני שמתחילים, נא להזין את קוד הקבוצה שלכם
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="groupId" className="text-lg font-semibold text-right block">
                קוד הקבוצה *
              </Label>
              <Input
                id="groupId"
                type="text"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                placeholder="הזינו את קוד הקבוצה"
                required
                className="h-14 text-lg text-right border-2 focus:border-blue-500 transition-colors"
                dir="rtl"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              disabled={!groupId.trim()}
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
