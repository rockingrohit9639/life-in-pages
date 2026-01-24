import { getUserBook } from '~/actions/book';
import { When } from '~/components/when';
import BookContent from './book-content';
import {
  BookOpenIcon,
  FeatherIcon,
  LibraryIcon,
  PenLineIcon,
  SparklesIcon,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '~/components/ui/card';

function getMoodEmoji(mood: string): string {
  const moodMap: Record<string, string> = {
    reflective: '🪞',
    hopeful: '🌅',
    grateful: '🙏',
    adventurous: '🧭',
    peaceful: '🕊️',
    creative: '🎨',
    determined: '💪',
    nostalgic: '📷',
    joyful: '✨',
    contemplative: '🤔',
  };
  return moodMap[mood.toLowerCase()] || '📖';
}

function EmptyBook({ bookTitle, authorName }: { bookTitle: string; authorName: string }) {
  return (
    <div className="min-h-screen">
      {/* Book Cover for Empty State */}
      <div className="relative overflow-hidden border-b bg-linear-to-br from-primary/10 via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
          <div className="mb-6 inline-flex size-20 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpenIcon className="size-10 text-primary" />
          </div>

          <h1 className="font-crimson mb-3 text-3xl font-bold tracking-tight md:text-4xl">{bookTitle}</h1>
          <p className="text-muted-foreground mb-2 text-lg">by {authorName}</p>

          <div className="mx-auto mb-8 h-px w-24 bg-border" />

          <p className="text-muted-foreground mx-auto mb-8 max-w-md text-sm leading-relaxed">
            Your book is waiting to be written. Every entry you create becomes a piece of your story. 
            Keep writing, and watch your chapters come to life.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="shadow-lg shadow-primary/20">
              <Link href="/entries/new">
                <PenLineIcon className="size-4" />
                <span>Write an Entry</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/home">
                <SparklesIcon className="size-4" />
                <span>View Progress</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Encouragement Section */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <div className="mb-4 flex justify-center gap-2">
              <FeatherIcon className="size-5 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold">How Your Book Grows</h3>
            <p className="text-muted-foreground mx-auto max-w-md text-sm">
              As you write entries, they're woven together into chapters using AI. 
              Each chapter captures a period of your life, your thoughts, and your journey. 
              The more you write, the richer your story becomes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default async function BookPage() {
  const book = await getUserBook();

  // Calculate book stats
  const totalChapters = book.chapters.length;
  const totalWords = book.chapters.reduce((acc, chapter) => {
    return acc + chapter.content.split(/\s+/).length;
  }, 0);

  return (
    <When
      condition={book.chapters.length > 0}
      fallback={<EmptyBook bookTitle={book.title} authorName={book.author.name} />}
    >
      <div className="min-h-screen">
        {/* Book Cover / Hero Section */}
        <div className="relative overflow-hidden border-b bg-linear-to-br from-amber-50/80 via-background to-orange-50/50 dark:from-primary/10 dark:via-background dark:to-primary/5">
          {/* Decorative elements */}
          <div className="absolute left-4 top-4 text-6xl opacity-10">📖</div>
          <div className="absolute bottom-4 right-4 text-4xl opacity-10">✨</div>

          <div className="relative mx-auto max-w-3xl px-6 py-12 text-center md:py-16">
            {/* Book Icon */}
            <div className="mb-6 inline-flex size-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 shadow-lg shadow-primary/10">
              <LibraryIcon className="size-9 text-primary" />
            </div>

            {/* Book Title */}
            <h1 className="font-crimson mb-3 text-3xl font-bold tracking-tight md:text-5xl">{book.title}</h1>

            {/* Author */}
            <p className="text-muted-foreground mb-4 text-lg italic">by {book.author.name}</p>

            {/* Mood Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
              <span className="text-sm">{getMoodEmoji(book.mood)}</span>
              <span className="text-sm font-medium capitalize text-primary">{book.mood}</span>
            </div>

            {/* Divider */}
            <div className="mx-auto mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-border" />
              <SparklesIcon className="size-4 text-primary/60" />
              <div className="h-px w-16 bg-border" />
            </div>

            {/* Book Stats */}
            <div className="flex items-center justify-center gap-8 text-sm">
              <div>
                <p className="text-2xl font-bold text-primary">{totalChapters}</p>
                <p className="text-muted-foreground">{totalChapters === 1 ? 'Chapter' : 'Chapters'}</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold">{totalWords.toLocaleString()}</p>
                <p className="text-muted-foreground">Words</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="border-b bg-muted/30">
          <div className="mx-auto max-w-3xl px-6 py-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <BookOpenIcon className="size-4" />
              Table of Contents
            </h2>
            <nav className="grid gap-2">
              {book.chapters.map((chapter, index) => (
                <a
                  key={chapter.id}
                  href={`#chapter-${index + 1}`}
                  className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-background"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="font-medium group-hover:text-primary">{chapter.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Book Content */}
        <BookContent chapters={book.chapters} />

        {/* Footer */}
        <div className="border-t bg-muted/30">
          <div className="mx-auto max-w-3xl px-6 py-8 text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Your story continues with every entry you write.
            </p>
            <Button asChild className="shadow-lg shadow-primary/20">
              <Link href="/entries/new">
                <PenLineIcon className="size-4" />
                <span>Add to Your Story</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </When>
  );
}
