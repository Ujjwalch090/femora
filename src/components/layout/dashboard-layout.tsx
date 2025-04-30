'use client';

import * as React from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';
import { CalendarDays, Apple, Dumbbell, UserCog, LogOut, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
     // Check local storage for theme preference
     const storedTheme = localStorage.getItem('femora-theme') as 'light' | 'dark' | null;
     if (storedTheme) {
         setTheme(storedTheme);
         document.documentElement.classList.toggle('dark', storedTheme === 'dark');
     } else {
        // Default to light theme if nothing is stored
         document.documentElement.classList.remove('dark');
     }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('femora-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const isActive = (path: string) => pathname === path;

   const handleLogout = () => {
    // Placeholder for logout logic
    console.log("Logging out...");
    router.push('/auth'); // Redirect to auth page
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" variant="sidebar" className="border-r">
          <SidebarHeader className="items-center justify-between p-4">
            <Link href="/dashboard" className="text-2xl font-bold text-primary flex items-center gap-2 group-data-[collapsible=icon]:hidden">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                 <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634h5.25c.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634H9.375Zm-1.875 4.5a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H7.5Zm1.125.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75Zm-.375 3.75a.75.75 0 0 0 0 1.5h.008a.75.75 0 0 0 0-1.5H8.25Zm1.125.75a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5h-5.25a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
               </svg>
               <span className="group-data-[state=expanded]:inline">FemoraFlow</span>
            </Link>
             {/* Trigger is visible only when sidebar is expanded */}
            <SidebarTrigger className="md:hidden group-data-[collapsible=icon]:hidden" />
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/calendar')} tooltip="Cycle Calendar">
                   <Link href="/dashboard/calendar">
                      <CalendarDays />
                      <span>Cycle Calendar</span>
                   </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/nutrition')} tooltip="Nutrition Insights">
                  <Link href="/dashboard/nutrition">
                    <Apple />
                    <span>Nutrition Insights</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/exercise')} tooltip="Exercise Recommendations">
                  <Link href="/dashboard/exercise">
                     <Dumbbell />
                    <span>Exercise</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/profile')} tooltip="Profile Settings">
                  <Link href="/dashboard/profile">
                    <UserCog />
                    <span>Profile Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-2 items-center">
             {/* Theme Toggle Button */}
             <Button variant="ghost" size="icon" onClick={toggleTheme} className="mb-2 group-data-[collapsible=icon]:mb-0">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
             </Button>
             {/* Logout Button */}
             <Button variant="ghost" size="icon" onClick={handleLogout} className="text-destructive hover:bg-destructive/10 hover:text-destructive group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:gap-2">
                <LogOut className="h-5 w-5" />
                <span className="group-data-[state=expanded]:inline group-data-[collapsible=icon]:inline">Logout</span>
             </Button>

             {/* User Avatar and Name - shown only when expanded */}
             <div className="mt-4 flex items-center gap-3 p-2 group-data-[collapsible=icon]:hidden border-t border-sidebar-border pt-4">
                <Avatar>
                  <AvatarImage src="https://picsum.photos/40/40" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="font-medium">User Name</span>
             </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
            <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                {/* Hamburger menu trigger for mobile/collapsed sidebar */}
               <SidebarTrigger className="md:hidden" />
               <h1 className="text-xl font-semibold ml-auto">Welcome, User!</h1> {/* Placeholder */}
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6">
              {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
