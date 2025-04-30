'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const profileSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  age: z.coerce // Use coerce for automatic string-to-number conversion
    .number({ invalid_type_error: 'Age must be a number.' })
    .min(1, { message: 'Age is required.' })
    .positive({ message: 'Age must be positive.' })
    .optional(), // Make age optional or adjust validation as needed
  cycleLength: z.coerce
    .number({ invalid_type_error: 'Cycle length must be a number.' })
    .min(15, { message: 'Cycle length seems too short.' }) // Example validation
    .max(60, { message: 'Cycle length seems too long.' }) // Example validation
    .positive({ message: 'Cycle length must be positive.' }),
  periodLength: z.coerce
    .number({ invalid_type_error: 'Period length must be a number.' })
    .min(1, { message: 'Period length must be at least 1 day.' })
    .max(15, { message: 'Period length seems too long.' }) // Example validation
     .positive({ message: 'Period length must be positive.' }),
  preferences: z.string().optional(), // Example: Could be a multi-select or text area later
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Placeholder for fetching user data
const fetchUserData = async (): Promise<Partial<ProfileFormValues>> => {
  console.log('Fetching user data...');
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
  return {
    name: 'Jane Doe', // Placeholder data
    age: 30,
    cycleLength: 28,
    periodLength: 5,
    preferences: 'Likes Yoga',
  };
};

export function ProfileForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isFetching, setIsFetching] = React.useState<boolean>(true); // State for initial data load

   const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { // Set initial defaults or fetch them
      name: '',
      age: undefined, // Use undefined for optional number fields
      cycleLength: 28, // Default cycle length
      periodLength: 5, // Default period length
      preferences: '',
    },
  });

   // Fetch user data on component mount
   React.useEffect(() => {
     const loadData = async () => {
       setIsFetching(true);
       try {
         const userData = await fetchUserData();
         // Reset form with fetched data
         form.reset(userData);
       } catch (error) {
         console.error("Failed to fetch user data:", error);
         toast({
           title: 'Error',
           description: 'Could not load your profile data.',
           variant: 'destructive',
         });
       } finally {
         setIsFetching(false);
       }
     };
     loadData();
   }, [form.reset]); // form.reset added to dependencies

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    console.log('Saving profile data:', data); // Placeholder for actual save logic

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: 'Profile Updated!',
      description: 'Your changes have been saved successfully.',
    });
     // Optionally re-fetch data or update state if needed after save
     form.reset(data); // Update form state with saved data to prevent dirty state
  }

   if (isFetching) {
     return <div className="space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse w-1/3"></div>
        <div className="h-10 bg-muted rounded animate-pulse"></div>
        <div className="h-8 bg-muted rounded animate-pulse w-1/3"></div>
        <div className="h-10 bg-muted rounded animate-pulse"></div>
        <div className="h-8 bg-muted rounded animate-pulse w-1/3"></div>
        <div className="h-10 bg-muted rounded animate-pulse"></div>
         <div className="flex gap-2 mt-4">
             <div className="h-10 bg-muted rounded animate-pulse w-20"></div>
            <div className="h-10 bg-muted rounded animate-pulse w-20"></div>
         </div>
     </div>;
   }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6', className)} {...props}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age (Optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Your Age" disabled={isLoading} {...field} onChange={event => field.onChange(event.target.value === '' ? undefined : +event.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="cycleLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Cycle Length (Days)</FormLabel>
              <FormControl>
                 <Input type="number" placeholder="e.g., 28" disabled={isLoading} {...field} onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
              <FormDescription>
                 The number of days from the start of one period to the start of the next.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="periodLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Period Length (Days)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 5" disabled={isLoading} {...field} onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
               <FormDescription>
                 The typical number of days your period lasts.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         {/* Example Select for Preferences - replace/expand as needed */}
        <FormField
          control={form.control}
          name="preferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferences (Example)</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                 <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Select a preference (optional)" />
                    </SelectTrigger>
                 </FormControl>
                <SelectContent>
                  <SelectItem value="Likes Yoga">Likes Yoga</SelectItem>
                  <SelectItem value="Prefers Cardio">Prefers Cardio</SelectItem>
                  <SelectItem value="Needs Gentle Exercise">Needs Gentle Exercise</SelectItem>
                </SelectContent>
               </Select>
               <FormDescription>
                 Let us know any preferences for recommendations.
               </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-start gap-4 pt-4">
          <Button type="submit" disabled={isLoading || !form.formState.isDirty} className="bg-primary hover:bg-primary/90">
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Save Changes
          </Button>
           <Button
             type="button"
             variant="outline"
             onClick={() => form.reset()} // Reset to last saved state (or initial fetched data)
             disabled={isLoading || !form.formState.isDirty}
           >
            Reset Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
