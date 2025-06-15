
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalDetailsForm {
  fullName: string;
  education: string;
  profession: string;
  organization: string;
  experienceYears: number;
  email: string;
  phone: string;
}

const PersonalDetails = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalDetailsForm>();

  const onSubmit = (data: PersonalDetailsForm) => {
    console.log('Personal details submitted:', data);
    
    // מעבר לשאלון עם הפרטים האישיים
    navigate('/questionnaire', {
      state: {
        personalDetails: data
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              פרטים אישיים
            </CardTitle>
            <p className="mt-2 text-zinc-600 font-medium text-lg">ד"ר יוסי שרעבי</p>
            <p className="text-gray-600 mt-2">
              נשמח לקבל פרטים נוספים כדי לשפר את המחקר
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* שם מלא */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-right block">שם מלא *</Label>
                <Input
                  id="fullName"
                  {...register('fullName', { required: 'שדה חובה' })}
                  className="text-right"
                  placeholder="הזן שם מלא"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm text-right">{errors.fullName.message}</p>
                )}
              </div>

              {/* השכלה */}
              <div className="space-y-2">
                <Label htmlFor="education" className="text-right block">השכלה</Label>
                <Input
                  id="education"
                  {...register('education')}
                  className="text-right"
                  placeholder="תואר, מקצוע, וכו'"
                />
              </div>

              {/* מקצוע */}
              <div className="space-y-2">
                <Label htmlFor="profession" className="text-right block">מקצוע</Label>
                <Input
                  id="profession"
                  {...register('profession')}
                  className="text-right"
                  placeholder="תפקיד נוכחי"
                />
              </div>

              {/* ארגון */}
              <div className="space-y-2">
                <Label htmlFor="organization" className="text-right block">ארגון/חברה</Label>
                <Input
                  id="organization"
                  {...register('organization')}
                  className="text-right"
                  placeholder="שם מקום העבודה"
                />
              </div>

              {/* שנות ניסיון */}
              <div className="space-y-2">
                <Label htmlFor="experienceYears" className="text-right block">שנות ניסיון</Label>
                <Input
                  id="experienceYears"
                  type="number"
                  {...register('experienceYears', { valueAsNumber: true, min: 0 })}
                  className="text-right"
                  placeholder="מספר שנות ניסיון"
                />
              </div>

              {/* אימייל */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block">אימייל</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="text-left"
                  placeholder="example@email.com"
                />
              </div>

              {/* טלפון */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right block">טלפון</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  className="text-left"
                  placeholder="050-1234567"
                />
              </div>

              {/* כפתורים */}
              <div className="flex gap-4 justify-center pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="px-8"
                >
                  חזור
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                >
                  המשך לשאלון
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalDetails;
