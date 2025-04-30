/**
 * Represents a menstrual health fact.
 */
export interface MenstrualFact {
  /**
   * The text of the menstrual health fact.
   */
  fact: string;
}

const facts: string[] = [
    'The average menstrual cycle is typically around 28 days, but cycles ranging from 21 to 35 days are also considered normal.',
    'Menstruation is a natural process involving the shedding of the uterine lining when pregnancy does not occur.',
    'Ovulation, the release of an egg from the ovary, usually happens about midway through the menstrual cycle.',
    'Hormonal fluctuations throughout the cycle can affect mood, energy levels, and physical symptoms.',
    'Tracking your cycle can help you understand your body better and predict fertile windows or period start dates.',
    'Period poverty, the lack of access to menstrual products and education, affects millions worldwide.',
    'The color and consistency of menstrual blood can vary and provide clues about hormonal health.',
    'Exercise and a balanced diet can help manage symptoms like cramps and bloating.',
    'Stress can sometimes impact the regularity and timing of your menstrual cycle.',
    'It\'s a myth that you can\'t get pregnant during your period, though the chances are lower.',
];

/**
 * Asynchronously retrieves a random menstrual health fact.
 * Uses Math.random for simplicity. In a real application, consider a more robust
 * random selection method or an AI service if complex fact selection logic is needed.
 *
 * @returns A promise that resolves to a MenstrualFact object containing the fact.
 */
export async function getRandomMenstrualFact(): Promise<MenstrualFact> {
  // Simulate potential async operation (e.g., fetching from an external source/AI)
  await new Promise(resolve => setTimeout(resolve, 50)); // Small delay simulation

  const randomIndex = Math.floor(Math.random() * facts.length);
  return {
    fact: facts[randomIndex],
  };
}
