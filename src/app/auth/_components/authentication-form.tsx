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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation'; // Import useRouter

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export function AuthenticationForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter(); // Initialize router

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onLoginSubmit(data: LoginFormValues) {
    setIsLoading(true);
    console.log('Login data:', data); // Placeholder for actual login logic

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: 'Login Successful!',
      description: 'Redirecting to your dashboard...',
    });
    router.push('/dashboard'); // Redirect to dashboard on successful login
  }

  async function onSignupSubmit(data: SignupFormValues) {
    setIsLoading(true);
    console.log('Signup data:', data); // Placeholder for actual signup logic

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: 'Sign Up Successful!',
      description: 'Welcome! Redirecting to your dashboard...',
    });
     router.push('/dashboard'); // Redirect to dashboard on successful signup
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
       <Tabs defaultValue="login" className="w-full">
         <TabsList className="grid w-full grid-cols-2">
           <TabsTrigger value="login">Login</TabsTrigger>
           <TabsTrigger value="signup">Sign Up</TabsTrigger>
         </TabsList>
         <TabsContent value="login">
           <Card className="border-accent">
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <CardContent className="space-y-4 pt-6">
                <div className="grid gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                    id="login-email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...loginForm.register('email')}
                    />
                    {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...loginForm.register('password')}
                    />
                    {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                    )}
                </div>
                </CardContent>
                <CardFooter>
                 <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
                    {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ) : null}
                    Login
                </Button>
                </CardFooter>
            </form>
           </Card>
         </TabsContent>
         <TabsContent value="signup">
            <Card className="border-accent">
             <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
                <CardContent className="space-y-4 pt-6">
                <div className="grid gap-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                    id="signup-name"
                    placeholder="Your Name"
                    type="text"
                    autoCapitalize="words"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...signupForm.register('name')}
                    />
                    {signupForm.formState.errors.name && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.name.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                    id="signup-email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...signupForm.register('email')}
                    />
                    {signupForm.formState.errors.email && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    {...signupForm.register('password')}
                    />
                    {signupForm.formState.errors.password && (
                    <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
                    )}
                </div>
                </CardContent>
                <CardFooter>
                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
                    {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ) : null}
                    Sign Up
                </Button>
                </CardFooter>
            </form>
            </Card>
         </TabsContent>
       </Tabs>
    </div>
  );
}
