import type { NextPage } from 'next';
import { AuthenticationForm } from './_components/authentication-form';
import { getRandomMenstrualFact, type MenstrualFact } from '@/services/menstrual-facts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse } from 'lucide-react';

const AuthPage: NextPage = async () => {
  let fact: MenstrualFact | null = null;
  let error: string | null = null;

  try {
    fact = await getRandomMenstrualFact();
  } catch (err) {
    console.error("Failed to fetch menstrual fact:", err);
    error = "Could not load a health fact right now. Please try again later.";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-secondary p-4">
      <div className="w-full max-w-md space-y-6">
         <div className="text-center">
             <h1 className="text-4xl font-bold text-primary mb-2">FemoraFlow</h1>
             <p className="text-muted-foreground">Track your cycle with confidence.</p>
         </div>

        <AuthenticationForm />

        {fact && (
          <Card className="mt-6 bg-card border-accent shadow-lg">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <HeartPulse className="text-accent w-5 h-5" />
              <CardTitle className="text-lg font-semibold text-accent-foreground">Did you know?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground italic">
                {fact.fact}
              </CardDescription>
            </CardContent>
          </Card>
        )}
         {error && (
          <Card className="mt-6 bg-destructive/10 border-destructive shadow-lg">
             <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <HeartPulse className="text-destructive w-5 h-5" />
              <CardTitle className="text-lg font-semibold text-destructive-foreground">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-destructive-foreground">
                {error}
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
