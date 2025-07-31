import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function Home() {
  return (
    <div className="bg-background relative flex h-screen w-full flex-col items-center justify-center gap-6 text-center">
      <div
        className={cn(
          'absolute inset-0 z-0',
          '[background-size:20px_20px]',
          '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
          'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]',
        )}
      />

      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <h1 className="font-playfair z-10 text-4xl font-bold md:max-w-2xl md:text-6xl">
        Turn your daily thoughts into a book
      </h1>
      <p className="text-muted-foreground z-10 max-w-2xl">
        Write a little each day — your thoughts, moods, and reflections. Over time, they come together to form chapters
        of your life, written by you and shaped by AI.
      </p>

      <div className="z-10">
        <SignedOut>
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link href="/home">
            <Button>Start Writing</Button>
          </Link>
        </SignedIn>
      </div>
    </div>
  )
}
