
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 flex items-center justify-center" dir="rtl">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            שאלון להערכת תרבות ארגונית
          </CardTitle>
          <p className="text-gray-600 mt-2">
            לפני שמתחילים, נא להזין את קוד הקבוצה שלכם
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groupId" className="text-base font-medium">
                קוד הקבוצה *
              </Label>
              <Input
                id="groupId"
                type="text"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                placeholder="הזינו את קוד הקבוצה"
                required
                className="h-12 text-lg"
                dir="rtl"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg"
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
