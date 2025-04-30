import type { NextPage } from 'next';
import { ProfileForm } from './_components/profile-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog } from 'lucide-react';

const ProfilePage: NextPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
         <UserCog className="w-7 h-7 text-primary" />
        Profile Settings
      </h1>

      <Card className="shadow-lg border-accent">
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>
            Update your personal details and cycle preferences here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
