import type { NextPage } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Legend } from '@/components/ui/legend'; // Assuming a Legend component exists or will be created
import { CalendarIcon } from 'lucide-react';
import CycleCalendar from './_components/cycle-calendar'; // Import the new component

const CalendarPage: NextPage = () => {
  const phases = [
    { name: 'Menstrual', color: 'bg-red-400' },
    { name: 'Follicular', color: 'bg-purple-400' },
    { name: 'Ovulation', color: 'bg-teal-400' },
    { name: 'Luteal', color: 'bg-pink-400' },
    { name: 'Predicted Period', color: 'bg-red-200 opacity-70' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <CalendarIcon className="w-7 h-7 text-primary" />
        Cycle Calendar
      </h1>

      <Card className="shadow-lg border-accent">
        <CardHeader>
          <CardTitle>Your Cycle Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <CycleCalendar />
        </CardContent>
      </Card>

      <Legend title="Phase Legend" items={phases} />

    </div>
  );
};

export default CalendarPage;
