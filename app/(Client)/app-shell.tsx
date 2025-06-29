'use client';

// import ThemeSwitcher from '@/components/ThemeSwitcher';
// import { ThemeSwitcher } from '@/components/theme-switcher';
import { Container } from './contrainer';
import Link from 'next/link';
import { Toaster } from 'sonner';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
        <Container className="flex justify-between items-center py-4">
          <Link href="/" className="font-bold text-xl text-primary">CompeteX</Link>
          {/* <ThemeSwitcher /> */}
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-10">
          {children}
          <Toaster position="top-center" />
        </Container>
      </main>

      <footer className="border-t py-6 mt-12 bg-muted/10 text-center text-sm text-muted-foreground">
        <Container>© 2025 CompeteX. All rights reserved.</Container>
      </footer>
    </div>
  );
}
