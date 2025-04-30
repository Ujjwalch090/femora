'use client'; // Need client-side for redirection hook

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth'); // Redirect to the authentication page
  }, [router]);

  // Optionally, show a loading state while redirecting
  return <div className="flex h-screen items-center justify-center">Loading...</div>;
}
