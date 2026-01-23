'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { BookOpenIcon, PenLineIcon, SparklesIcon, BookHeartIcon, CalendarIcon, BrainIcon } from 'lucide-react';

function FloatingPage({ className, delay = '0s' }: { className?: string; delay?: string }) {
  return (
    <div
      className={`absolute rounded-lg bg-linear-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-sm border border-white/20 shadow-xl ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      <div className="p-3 space-y-2">
        <div className="h-1.5 w-12 rounded-full bg-primary/30" />
        <div className="h-1 w-16 rounded-full bg-muted-foreground/20" />
        <div className="h-1 w-10 rounded-full bg-muted-foreground/20" />
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
      style={{
        animation: 'fadeInUp 0.8s ease-out forwards',
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
          <Icon className="size-6 text-primary" />
        </div>
        <h3 className="font-crimson mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-background relative min-h-screen w-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-linear-to-br from-primary/20 via-primary/5 to-transparent blur-3xl"
          style={{
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -right-1/4 -bottom-1/4 h-3/4 w-3/4 rounded-full bg-linear-to-tl from-primary/15 via-primary/5 to-transparent blur-3xl"
          style={{
            animation: 'pulse 10s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] bg-size-[24px_24px] opacity-40 dark:bg-[radial-gradient(#404040_1px,transparent_1px)] dark:opacity-30" />

      {/* Floating page elements */}
      <FloatingPage className="top-[15%] left-[8%] w-20 rotate-[-15deg] opacity-60" delay="0s" />
      <FloatingPage className="top-[25%] right-[12%] w-24 rotate-12 opacity-50" delay="1s" />
      <FloatingPage className="bottom-[30%] left-[15%] w-16 rotate-[8deg] opacity-40" delay="2s" />
      <FloatingPage className="bottom-[20%] right-[8%] w-20 rotate-[-8deg] opacity-50" delay="1.5s" />

      {/* Navigation */}
      <nav
        className="relative z-20 flex items-center justify-between px-6 py-4 md:px-12"
        style={{
          animation: 'fadeInDown 0.6s ease-out forwards',
        }}
      >
        <div className="flex items-center gap-2">
          <BookHeartIcon className="size-7 text-primary" />
          <span className="font-crimson text-xl font-bold">Life in Pages</span>
        </div>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant="ghost" className="transition-all duration-300 hover:scale-105">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/home">
              <Button variant="ghost" className="transition-all duration-300 hover:scale-105">
                Dashboard
              </Button>
            </Link>
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-24 text-center md:pt-24 md:pb-32">
        {/* Animated book icon */}
        <div
          className="mb-8 rounded-full bg-primary/10 p-4"
          style={{
            animation: 'fadeInUp 0.6s ease-out forwards, bookBounce 3s ease-in-out infinite',
            animationDelay: '0.2s, 0.8s',
          }}
        >
          <BookOpenIcon className="size-12 text-primary md:size-16" />
        </div>

        <h1
          className="font-crimson mb-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
          style={{
            animation: 'fadeInUp 0.8s ease-out forwards',
            animationDelay: '0.3s',
            opacity: 0,
          }}
        >
          Turn your daily thoughts
          <br />
          <span className="bg-linear-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            into a book
          </span>
        </h1>

        <p
          className="text-muted-foreground mb-10 max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{
            animation: 'fadeInUp 0.8s ease-out forwards',
            animationDelay: '0.5s',
            opacity: 0,
          }}
        >
          Write a little each day — your thoughts, moods, and reflections. Over time, they come together to form{' '}
          <span className="text-foreground font-medium">chapters of your life</span>, written by you and shaped by AI.
        </p>

        <div
          className="flex flex-col gap-4 sm:flex-row"
          style={{
            animation: 'fadeInUp 0.8s ease-out forwards',
            animationDelay: '0.7s',
            opacity: 0,
          }}
        >
          <SignedOut>
            <SignInButton>
              <Button
                size="lg"
                className="group relative overflow-hidden px-8 py-6 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PenLineIcon className="size-5 transition-transform duration-300 group-hover:rotate-[-10deg]" />
                  Start Your Journey
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/home">
              <Button
                size="lg"
                className="group relative overflow-hidden px-8 py-6 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PenLineIcon className="size-5 transition-transform duration-300 group-hover:rotate-[-10deg]" />
                  Continue Writing
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </Link>
          </SignedIn>

          <Button
            variant="outline"
            size="lg"
            className="group px-8 py-6 text-base transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <BookOpenIcon className="size-5 transition-transform duration-300 group-hover:scale-110" />
              Learn More
            </span>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{
            animation: 'fadeIn 1s ease-out forwards',
            animationDelay: '1.2s',
            opacity: 0,
          }}
        >
          <span className="text-muted-foreground text-xs uppercase tracking-widest">Discover</span>
          <div
            className="h-12 w-6 rounded-full border-2 border-muted-foreground/30 p-1"
            style={{ animation: 'bounce 2s infinite' }}
          >
            <div className="mx-auto h-2 w-1 rounded-full bg-primary" style={{ animation: 'scrollDown 2s infinite' }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div
            className="mb-16 text-center"
            style={{
              animation: 'fadeInUp 0.8s ease-out forwards',
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            <h2 className="font-crimson mb-4 text-3xl font-bold md:text-4xl">Your story, one entry at a time</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Life in Pages helps you capture and preserve your daily experiences, transforming them into meaningful
              narratives.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={PenLineIcon}
              title="Daily Journaling"
              description="Capture your thoughts, feelings, and experiences with our beautiful, distraction-free writing experience."
              delay="0.3s"
            />
            <FeatureCard
              icon={SparklesIcon}
              title="AI-Powered Insights"
              description="Watch as AI weaves your entries into cohesive chapters, finding patterns and themes in your journey."
              delay="0.4s"
            />
            <FeatureCard
              icon={CalendarIcon}
              title="Track Your Streak"
              description="Build a consistent writing habit with streak tracking and gentle reminders to keep you motivated."
              delay="0.5s"
            />
            <FeatureCard
              icon={BookOpenIcon}
              title="Chapter Generation"
              description="Your entries automatically become chapters of your life book, creating a narrative of your experiences."
              delay="0.6s"
            />
            <FeatureCard
              icon={BrainIcon}
              title="Mood Tracking"
              description="Understand your emotional patterns over time with intelligent mood analysis and visualization."
              delay="0.7s"
            />
            <FeatureCard
              icon={BookHeartIcon}
              title="Your Personal Archive"
              description="A beautiful, searchable archive of your memories that you can revisit and cherish anytime."
              delay="0.8s"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24 md:px-12">
        <div
          className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-12 text-center backdrop-blur-sm"
          style={{
            animation: 'fadeInUp 0.8s ease-out forwards',
            animationDelay: '0.3s',
            opacity: 0,
          }}
        >
          <div
            className="mb-6 inline-flex rounded-full bg-primary/20 p-3"
            style={{
              animation: 'pulse 3s ease-in-out infinite',
            }}
          >
            <PenLineIcon className="size-8 text-primary" />
          </div>
          <h2 className="font-crimson mb-4 text-3xl font-bold md:text-4xl">Ready to write your story?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Start your journaling journey today and watch your life unfold, one page at a time.
          </p>
          <SignedOut>
            <SignInButton>
              <Button
                size="lg"
                className="group px-10 py-6 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  Begin Writing
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/home">
              <Button
                size="lg"
                className="group px-10 py-6 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  Continue Your Story
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <BookHeartIcon className="size-5 text-primary" />
          <span className="font-crimson font-medium">Life in Pages</span>
        </div>
        <p className="text-muted-foreground mt-2 text-sm">Your story, beautifully preserved.</p>
      </footer>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(var(--rotation, 0deg));
          }
          50% {
            transform: translateY(-20px) rotate(var(--rotation, 0deg));
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bookBounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes scrollDown {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(16px);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
