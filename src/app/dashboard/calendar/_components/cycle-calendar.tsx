'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { addDays, startOfMonth, getDaysInMonth, isSameDay, isBefore, isAfter, format } from 'date-fns';

// Define phase types
type Phase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal' | 'predicted_period';

// Define cycle data structure (replace with actual user data later)
interface CycleDay {
  date: Date;
  phase: Phase;
}

// Mock cycle data - Replace with dynamic data fetching
const generateMockCycleData = (currentDate: Date): CycleDay[] => {
  const cycleLength = 28;
  const periodLength = 5;
  const ovulationDay = 14; // Relative to start of cycle

  // Find the most recent period start before or on the first visible day of the calendar
  const firstDayOfMonth = startOfMonth(currentDate);
  // Go back further to ensure we catch the start of the cycle relevant to the displayed month
  let cycleStartDate = startOfMonth(addDays(firstDayOfMonth, -cycleLength));
  // Iterate forward until we find a cycle start date such that day 1 is within a reasonable range of the current month view
   while(isBefore(addDays(cycleStartDate, cycleLength -1), firstDayOfMonth)) {
      cycleStartDate = addDays(cycleStartDate, cycleLength);
   }


  const cycleDays: CycleDay[] = [];
  let currentCycleDay = 1;

  for (let i = 0; i < cycleLength * 3; i++) { // Generate enough days to cover edge cases
    const date = addDays(cycleStartDate, i);
    let phase: Phase;

    if (currentCycleDay <= periodLength) {
      phase = 'menstrual';
    } else if (currentCycleDay < ovulationDay) {
      phase = 'follicular';
    } else if (currentCycleDay === ovulationDay) {
      phase = 'ovulation';
    } else {
      phase = 'luteal';
    }

     // Predict next period start
    const nextPeriodStart = addDays(cycleStartDate, cycleLength);
     // Predict next period days
     const predictedPeriodDays: Date[] = [];
     for (let j = 0; j < periodLength; j++) {
         predictedPeriodDays.push(addDays(nextPeriodStart, j));
     }

    cycleDays.push({ date, phase });

    // Check for predicted period days
    if (predictedPeriodDays.some(predictedDate => isSameDay(date, predictedDate))) {
        // Check if it's also part of the *current* period - current period takes precedence
        if (currentCycleDay > periodLength || i >= cycleLength) {
           phase = 'predicted_period';
           // Override if it was something else
            const existingIndex = cycleDays.findIndex(d => isSameDay(d.date, date));
            if (existingIndex > -1) {
                cycleDays[existingIndex].phase = phase;
            } else {
                 cycleDays.push({ date, phase });
            }
        }
    }


    currentCycleDay++;
    if (currentCycleDay > cycleLength) {
      currentCycleDay = 1; // Reset for the next cycle (prediction)
      cycleStartDate = addDays(cycleStartDate, cycleLength); // Move to the next cycle start date
    }
  }

  return cycleDays;
};

const CycleCalendar: React.FC = () => {
  const [date, setDate] = React.useState<Date>(new Date());
   const [cycleData, setCycleData] = React.useState<CycleDay[]>([]);

   // Generate cycle data based on the initially selected month
   React.useEffect(() => {
     setCycleData(generateMockCycleData(date));
   }, [date]); // Regenerate if the viewed month changes significantly (or on first load)


  const phaseStyles: Record<Phase, string> = {
    menstrual: 'bg-red-400/80 text-white rounded-full',
    follicular: 'bg-purple-400/70 text-white rounded-full',
    ovulation: 'bg-teal-400 text-white rounded-full border-2 border-teal-600 font-bold',
    luteal: 'bg-pink-400/70 text-white rounded-full',
    predicted_period: 'bg-red-200/70 text-red-800 rounded-full opacity-80'
  };


  const modifiers = cycleData.reduce((acc, day) => {
    const phaseKey = day.phase;
    if (!acc[phaseKey]) {
      acc[phaseKey] = [];
    }
    acc[phaseKey].push(day.date);
    return acc;
  }, {} as Record<Phase, Date[]>);


  const modifiersStyles = Object.keys(phaseStyles).reduce((acc, phase) => {
    acc[phase as Phase] = { // Type assertion needed here
        className: phaseStyles[phase as Phase], // And here
        style: { } // Add base style if needed
    };
    return acc;
   }, {} as Record<Phase, React.CSSProperties & { className?: string }>);


  return (
    <Calendar
      mode="single" // Keep single selection for potential interaction later
      selected={date} // Highlight the selected day (can be today or clicked day)
      onSelect={(day) => setDate(day || new Date())}
      className="rounded-md border p-0" // Remove default padding
      modifiers={modifiers}
      modifiersClassNames={Object.keys(phaseStyles).reduce((acc, phase) => {
        acc[phase] = phaseStyles[phase as Phase]; // Use phaseStyles for class names directly
        return acc;
      }, {} as Record<string, string>)}
       // Show multiple months if needed, e.g., numberOfMonths={2}
       // Customize day cell rendering if more complex logic is needed
       components={{
         DayContent: ({ date: dayDate, displayMonth }) => {
            // Find cycle info for this specific day
            const dayInfo = cycleData.find(d => isSameDay(d.date, dayDate));
            const formattedDay = format(dayDate, 'd');

            // Only render if the day belongs to the currently displayed month
           if (dayDate.getMonth() !== displayMonth.getMonth()) {
               return <span className="text-muted-foreground opacity-50">{formattedDay}</span>;
           }

           return <span>{formattedDay}</span>;
         }
       }}
       // Ensure styles apply correctly within the calendar cells
       classNames={{
         day: cn(
           'h-10 w-10 p-0 font-normal relative focus-within:relative focus-within:z-20'
         ),
         day_selected: 'bg-primary/20 text-primary-foreground rounded-full', // Keep selection subtle
         day_today: 'bg-accent/50 text-accent-foreground rounded-full',
         // Applied by modifiersClassNames above:
         // day_menstrual: phaseStyles.menstrual,
         // day_follicular: phaseStyles.follicular,
         // ...etc
       }}
    />
  );
};

export default CycleCalendar;
