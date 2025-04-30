/**
 * Represents exercise recommendations for a specific menstrual phase.
 */
export interface ExerciseRecommendations {
  /**
   * The menstrual phase for which the recommendations are provided.
   */
  phase: string;
  /**
   * An array of exercise suggestions (name and description combined) for the specified phase.
   */
  exerciseSuggestions: string[];
   /**
    * Optional: A more detailed structure if needed by the calling component.
    * This allows flexibility in how the data is used.
    */
   detailedSuggestions?: { name: string; description: string; imageSeed?: string }[];
}

/**
 * Asynchronously retrieves exercise recommendations for a given menstrual phase.
 *
 * @param phase The menstrual phase for which to retrieve exercise recommendations.
 * @returns A promise that resolves to an ExerciseRecommendations object containing exercise suggestions.
 * @throws {Error} If the recommendations cannot be fetched.
 */
export async function getExerciseRecommendations(phase: string): Promise<ExerciseRecommendations> {
   console.log(`Fetching exercise recommendations for ${phase} phase...`);

   // TODO: Replace this with a real API call to an exercise service or database.
   // Example: const response = await fetch(`/api/exercise?phase=${phase}`);
   // if (!response.ok) throw new Error('Failed to fetch exercise data');
   // const data = await response.json();
   // return data;

   // Simulate API call delay and potential error
   await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));


   // --- Placeholder Data ---
   const phaseExercises: Record<string, { name: string; description: string; imageSeed: string }[]> = {
    Menstrual: [
      { name: 'Restorative Yoga', description: 'Focus on gentle poses, breathing, and relaxation.', imageSeed: 'yoga_restorative' },
      { name: 'Light Walking', description: 'Easy-paced walks, listen to your body.', imageSeed: 'walking_gentle' },
      { name: 'Stretching', description: 'Focus on relieving tension, especially in the lower back and hips.', imageSeed: 'stretching' },
      { name: 'Mindful Movement', description: 'Slow, intentional movements like Tai Chi.', imageSeed: 'tai_chi' },
    ],
    Follicular: [
      { name: 'Brisk Walking or Jogging', description: 'Increase pace and duration as energy builds.', imageSeed: 'jogging_brisk' },
      { name: 'Dancing', description: 'Energetic and fun cardio.', imageSeed: 'dance_cardio' },
      { name: 'Circuit Training', description: 'Combine light strength and cardio exercises.', imageSeed: 'circuit_light' },
      { name: 'Hiking', description: 'Enjoy nature with moderate intensity.', imageSeed: 'hiking' },
    ],
    Ovulation: [
      { name: 'High-Intensity Interval Training (HIIT)', description: 'Maximize effort during peak energy.', imageSeed: 'hiit_intense' },
      { name: 'Running or Sprinting', description: 'Push your limits if you feel up to it.', imageSeed: 'sprinting' },
      { name: 'Power Yoga', description: 'Dynamic and challenging yoga flow.', imageSeed: 'yoga_power' },
      { name: 'Team Sports', description: 'Engage in competitive and social activities.', imageSeed: 'team_sports' },
    ],
    Luteal: [
      { name: 'Strength Training', description: 'Focus on compound movements with moderate weights.', imageSeed: 'strength_compound' },
      { name: 'Pilates', description: 'Build core strength and improve posture.', imageSeed: 'pilates_core' },
      { name: 'Swimming', description: 'Low-impact cardio that\'s easy on the joints.', imageSeed: 'swimming_laps' },
      { name: 'Steady-State Cardio', description: 'Moderate intensity cardio like cycling or elliptical.', imageSeed: 'cycling_moderate' },
    ],
     // Default case or handle specific phase names
     'Default': [
        { name: 'Listen to Your Body', description: 'Adjust intensity based on how you feel each day.', imageSeed: 'listening' },
        { name: 'Stay Consistent', description: 'Aim for regular movement throughout your cycle.', imageSeed: 'consistency' },
        { name: 'Prioritize Recovery', description: 'Include rest days and stretching.', imageSeed: 'recovery' },
     ]
  };

  const suggestions = phaseExercises[phase] || phaseExercises['Default'];
   // --- End Placeholder Data ---

    // Simulate potential error
   // if (Math.random() > 0.85) {
   //   throw new Error("Simulated network error fetching exercise data.");
   // }


  return {
    phase: phase,
    // Combine name and description for the basic exerciseSuggestions array
    exerciseSuggestions: suggestions.map(ex => `${ex.name}: ${ex.description}`),
    // Include the detailed structure for richer component rendering
    detailedSuggestions: suggestions,
  };
}
