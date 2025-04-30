import type { NextPage } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Apple, Dumbbell, UserCog } from 'lucide-react';

const DashboardPage: NextPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card border-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Phase
            </CardTitle>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-muted-foreground">
               <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
             </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Follicular Phase</div>
            <p className="text-xs text-muted-foreground">
              Day 5 of your cycle
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card border-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Next Period Estimate
            </CardTitle>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">In 23 days</div>
            <p className="text-xs text-muted-foreground">
              Based on average cycle length
            </p>
          </CardContent>
        </Card>

         <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card border-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quick Actions
            </CardTitle>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-muted-foreground">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
            </svg>
          </CardHeader>
          <CardContent className="flex gap-2">
             <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/calendar">Log Symptoms</Link>
             </Button>
             <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/profile">Update Profile</Link>
             </Button>
          </CardContent>
        </Card>

      </div>

       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Navigation Links as Cards */}
         <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card border-accent">
           <CardHeader>
             <CardTitle className="flex items-center gap-2"><CalendarDays className="text-primary"/> Cycle Calendar</CardTitle>
             <CardDescription>View your cycle phases and log symptoms.</CardDescription>
           </CardHeader>
           <CardContent>
             <Button asChild className="bg-primary hover:bg-primary/90">
               <Link href="/dashboard/calendar">Go to Calendar</Link>
             </Button>
           </CardContent>
         </Card>

         <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card border-accent">
           <CardHeader>
             <CardTitle className="flex items-center gap-2"><Apple className="text-primary"/> Nutrition Insights</CardTitle>
             <CardDescription>Get food recommendations for your current phase.</CardDescription>
           </CardHeader>
           <CardContent>
             <Button asChild className="bg-primary hover:bg-primary/90">
               <Link href="/dashboard/nutrition">View Nutrition Tips</Link>
             </Button>
           </CardContent>
         </Card>

         <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card border-accent">
           <CardHeader>
             <CardTitle className="flex items-center gap-2"><Dumbbell className="text-primary"/> Exercise Recommendations</CardTitle>
             <CardDescription>Discover exercises suitable for your energy levels.</CardDescription>
           </CardHeader>
           <CardContent>
             <Button asChild className="bg-primary hover:bg-primary/90">
               <Link href="/dashboard/exercise">Explore Exercises</Link>
             </Button>
           </CardContent>
         </Card>

         <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card border-accent">
           <CardHeader>
             <CardTitle className="flex items-center gap-2"><UserCog className="text-primary"/> Profile Settings</CardTitle>
             <CardDescription>Manage your personal details and preferences.</CardDescription>
           </CardHeader>
           <CardContent>
             <Button asChild className="bg-primary hover:bg-primary/90">
               <Link href="/dashboard/profile">Update Settings</Link>
             </Button>
           </CardContent>
         </Card>
       </div>

    </div>
  );
};

export default DashboardPage;
