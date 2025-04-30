import type { NextPage } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, HeartPulse, Moon, Sun } from 'lucide-react'; // Example icons
import Image from 'next/image';
import { getExerciseRecommendations, ExerciseRecommendations } from '@/services/exercise';

// Define phase types explicitly if not already globally defined
type MenstrualPhase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';

const phaseIcons: Record<MenstrualPhase, React.ElementType> = {
  Menstrual: Moon, // Gentle, restorative
  Follicular: Sun, // Energizing
  Ovulation: HeartPulse, // Peak energy, cardio
  Luteal: Dumbbell, // Strength, moderate intensity
};

// Placeholder fetch function - replace with actual API call using getExerciseRecommendations
const fetchExerciseRecs = async (phase: MenstrualPhase): Promise<ExerciseRecommendations> => {
  console.log(`Fetching exercise recommendations for ${phase} phase...`);
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulate delay

  const phaseExercises: Record<MenstrualPhase, { name: string; description: string; imageSeed: string }[]> = {
    Menstrual: [
      { name: 'Gentle Yoga', description: 'Focus on restorative poses and light stretching.', imageSeed: 'yoga_gentle' },
      { name: 'Walking', description: 'Light-paced walks in nature or indoors.', imageSeed: 'walking_light' },
      { name: 'Meditation', description: 'Mindfulness and breathing exercises.', imageSeed: 'meditation' },
    ],
    Follicular: [
      { name: 'Brisk Walking/Jogging', description: 'Increase intensity as energy rises.', imageSeed: 'jogging' },
      { name: 'Dancing', description: 'Fun cardio to boost mood and energy.', imageSeed: 'dancing' },
      { name: 'Light Strength Training', description: 'Introduce light weights or bodyweight exercises.', imageSeed: 'strength_light' },
    ],
    Ovulation: [
      { name: 'High-Intensity Interval Training (HIIT)', description: 'Short bursts of intense exercise.', imageSeed: 'hiit' },
      { name: 'Running', description: 'Take advantage of peak energy levels.', imageSeed: 'running' },
      { name: 'Spinning', description: 'Challenging cardio workout.', imageSeed: 'spinning' },
    ],
    Luteal: [
      { name: 'Strength Training', description: 'Focus on building muscle with moderate weights.', imageSeed: 'strength_moderate' },
      { name: 'Pilates', description: 'Core strengthening and flexibility.', imageSeed: 'pilates' },
      { name: 'Swimming', description: 'Low-impact cardio and full-body workout.', imageSeed: 'swimming' },
    ],
  };

  return {
    phase,
    exerciseSuggestions: phaseExercises[phase].map(ex => `${ex.name}: ${ex.description}`), // Combine for the service structure
    // Add detailed structure for component rendering
    detailedSuggestions: phaseExercises[phase],
  };
};


// Extend the fetched data type to include the detailed structure if needed elsewhere,
// or handle it directly within the component as done here.
interface DetailedExerciseRecommendations extends ExerciseRecommendations {
     detailedSuggestions: { name: string; description: string; imageSeed: string }[];
}


const ExercisePage: NextPage = async () => {
  const phases: MenstrualPhase[] = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];
   let recommendations: DetailedExerciseRecommendations[] = [];
   let error: string | null = null;

   try {
     const results = await Promise.all(phases.map(phase => fetchExerciseRecs(phase)));
     // We need to cast here because fetchExerciseRecs returns a more detailed structure
     recommendations = results as DetailedExerciseRecommendations[];
   } catch (err) {
     console.error("Failed to fetch exercise recommendations:", err);
     error = "Could not load exercise recommendations. Please try again later.";
   }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Dumbbell className="w-7 h-7 text-primary" />
        Exercise Recommendations
      </h1>
       <p className="text-muted-foreground">
        Sync your workouts with your cycle for optimal energy and well-being.
      </p>

       {error && (
         <Card className="bg-destructive/10 border-destructive">
            <CardHeader>
                <CardTitle className="text-destructive-foreground">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-destructive-foreground">{error}</p>
            </CardContent>
         </Card>
      )}

      {!error && recommendations.length > 0 && (
        phases.map((phase) => {
           const rec = recommendations.find(r => r.phase === phase);
           if (!rec) return null; // Should not happen if fetching works correctly

           const PhaseIcon = phaseIcons[phase];
           return (
             <Card key={phase} className="shadow-lg border-accent overflow-hidden">
               <CardHeader className="bg-muted/30">
                 <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                    <PhaseIcon className="w-6 h-6 text-primary" />
                   {phase} Phase Recommendations
                 </CardTitle>
               </CardHeader>
               <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {rec.detailedSuggestions.map((exercise) => (
                   <div key={exercise.name} className="border rounded-lg p-4 flex flex-col items-center text-center bg-card hover:shadow-md transition-shadow duration-200">
                      <div className="w-full h-32 relative rounded-md overflow-hidden mb-3">
                        <Image
                           src={`https://picsum.photos/seed/${exercise.imageSeed}/200/150`} // Placeholder image
                           alt={exercise.name}
                           layout="fill"
                           objectFit="cover"
                           className="transition-transform duration-300 hover:scale-105"
                         />
                      </div>
                     <h3 className="font-semibold text-base mb-1 text-foreground">{exercise.name}</h3>
                     <p className="text-xs text-muted-foreground">{exercise.description}</p>
                   </div>
                 ))}
               </CardContent>
             </Card>
           );
         })
      )}
       {!error && recommendations.length === 0 && (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-muted-foreground">Loading recommendations...</p>
                     {/* Optional: Add skeleton loaders here */}
                </CardContent>
            </Card>
        )}
    </div>
  );
};

export default ExercisePage;
