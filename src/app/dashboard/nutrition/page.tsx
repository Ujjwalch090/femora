import type { NextPage } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, Leaf, Fish, Egg, Brain } from 'lucide-react'; // Example icons
import Image from 'next/image';
import { getNutritionRecommendations, NutritionRecommendations } from '@/services/nutrition';

// Define phase types explicitly if not already globally defined
type MenstrualPhase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';

const phaseIcons: Record<MenstrualPhase, React.ElementType> = {
  Menstrual: Egg, // Example icon choice
  Follicular: Brain, // Example icon choice
  Ovulation: Leaf, // Example icon choice
  Luteal: Fish, // Example icon choice
};

const fetchRecommendations = async (phase: MenstrualPhase): Promise<NutritionRecommendations> => {
  // Replace with actual API call
  console.log(`Fetching nutrition recommendations for ${phase} phase...`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  // Placeholder data - replace with data from getNutritionRecommendations
  const phaseFoods: Record<MenstrualPhase, string[]> = {
    Menstrual: ['Iron-rich foods (Spinach, Lentils)', 'Vitamin C (Oranges, Berries)', 'Hydrating foods (Cucumber, Watermelon)', 'Ginger Tea'],
    Follicular: ['Lean Protein (Chicken, Tofu)', 'Complex Carbs (Quinoa, Oats)', 'Flax Seeds', 'Broccoli'],
    Ovulation: ['Antioxidants (Blueberries, Dark Chocolate)', 'Fiber-rich foods (Whole Grains, Beans)', 'Healthy Fats (Avocado, Nuts)', 'Plenty of Water'],
    Luteal: ['Magnesium (Pumpkin Seeds, Almonds)', 'B Vitamins (Leafy Greens, Eggs)', 'Calcium (Yogurt, Kale)', 'Chamomile Tea'],
  };
  return { phase, foodSuggestions: phaseFoods[phase] };
};

const NutritionPage: NextPage = async () => {
  const phases: MenstrualPhase[] = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];
  let recommendations: NutritionRecommendations[] = [];
  let error: string | null = null;

  try {
    // Fetch recommendations for all phases concurrently
    recommendations = await Promise.all(phases.map(phase => fetchRecommendations(phase)));
  } catch (err) {
    console.error("Failed to fetch nutrition recommendations:", err);
    error = "Could not load nutrition recommendations. Please try again later.";
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
        <Apple className="w-7 h-7 text-primary" />
        Nutrition Insights
      </h1>
      <p className="text-muted-foreground">
        Tailored food suggestions to support your body throughout your cycle.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map(({ phase, foodSuggestions }) => {
            const PhaseIcon = phaseIcons[phase as MenstrualPhase];
            return (
              <Card key={phase} className="shadow-lg border-accent hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                   <PhaseIcon className="w-6 h-6 text-primary" />
                  <CardTitle className="text-xl font-semibold">{phase} Phase</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Focus on these nutrients during the {phase.toLowerCase()} phase:
                  </CardDescription>
                  <ul className="space-y-2">
                    {foodSuggestions.map((food) => (
                      <li key={food} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                   {/* Example image - replace with relevant images */}
                   <div className="mt-4 rounded-md overflow-hidden aspect-video relative">
                     <Image
                       src={`https://picsum.photos/seed/${phase}/300/200`} // Placeholder image based on phase name
                       alt={`${phase} phase food example`}
                       layout="fill"
                       objectFit="cover"
                       className="transition-transform duration-300 hover:scale-105"
                     />
                   </div>
                </CardContent>
              </Card>
            );
           })}
        </div>
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

export default NutritionPage;
