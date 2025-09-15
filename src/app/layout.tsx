import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Islamic Games Houston 2025',
  description: 'Sign up for the Muslim Olympics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <header className="fixed top-0 left-0 w-full p-4 bg-background/80 backdrop-blur-sm border-b z-10">
          <nav className="container mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold font-headline text-primary"
            >
              Islamic Games
            </Link>
            <Button asChild variant="ghost">
              <Link href="/admin">Admin View</Link>
            </Button>
          </nav>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
