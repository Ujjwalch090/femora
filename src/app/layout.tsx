import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from "@/components/ui/toaster" // Import Toaster

export const metadata: Metadata = {
  title: 'FemoraFlow',
  description: 'Advanced menstrual cycle tracking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} font-sans antialiased`}>
        {children}
        <Toaster /> {/* Add Toaster here */}
      </body>
    </html>
  );
}
