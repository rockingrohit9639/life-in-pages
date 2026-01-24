'use client';

import type { Chapter } from '@prisma/client';
import Markdown from '~/components/markdown';
import { BookOpenIcon, ChevronUpIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';

type BookContentProps = {
  chapters: Pick<Chapter, 'id' | 'title' | 'content'>[];
};

function ChapterDivider({ chapterNumber }: { chapterNumber: number }) {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5">
        <span className="font-crimson text-sm font-bold text-primary">{chapterNumber}</span>
      </div>
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button variant="outline" size="sm" onClick={scrollToTop} className="gap-2">
      <ChevronUpIcon className="size-4" />
      <span>Back to Top</span>
    </Button>
  );
}

export default function BookContent({ chapters }: BookContentProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {chapters.map((chapter, index) => {
        const isLastChapter = index === chapters.length - 1;
        const wordCount = chapter.content.split(/\s+/).length;

        return (
          <article key={chapter.id} id={`chapter-${index + 1}`} className="scroll-mt-4">
            {/* Chapter Header */}
            <div className="px-6 py-10 text-center md:py-14">
              <ChapterDivider chapterNumber={index + 1} />

              <h2 className="font-crimson mt-6 text-2xl font-bold tracking-tight md:text-3xl">{chapter.title}</h2>

              <p className="mt-2 text-sm text-muted-foreground">{wordCount.toLocaleString()} words</p>
            </div>

            {/* Chapter Content */}
            <div className="px-6 pb-12 md:px-10">
              <Markdown className="font-crimson mx-auto max-w-none text-justify text-lg leading-loose text-foreground/90 [&>blockquote]:my-6 [&>blockquote]:border-l-4 [&>blockquote]:border-primary/30 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>h1]:mb-4 [&>h1]:mt-8 [&>h1]:text-2xl [&>h1]:font-bold [&>h2]:mb-3 [&>h2]:mt-6 [&>h2]:text-xl [&>h2]:font-semibold [&>h3]:mb-2 [&>h3]:mt-4 [&>h3]:text-lg [&>h3]:font-medium [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1 [&>p:first-of-type]:first-letter:text-5xl [&>p:first-of-type]:first-letter:font-bold [&>p:first-of-type]:first-letter:leading-none [&>p:first-of-type]:first-letter:text-primary [&>p:first-of-type]:indent-0 [&>p]:mb-6 [&>p]:indent-8 [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>li]:mb-2">
                {chapter.content}
              </Markdown>
            </div>

            {/* Chapter End Ornament */}
            {!isLastChapter && (
              <div className="flex items-center justify-center gap-2 pb-8">
                <span className="text-2xl opacity-30">✦</span>
                <span className="text-xl opacity-20">✦</span>
                <span className="text-2xl opacity-30">✦</span>
              </div>
            )}

            {/* End of Book */}
            {isLastChapter && (
              <div className="border-t bg-linear-to-b from-muted/30 to-transparent px-6 py-12 text-center">
                <div className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <BookOpenIcon className="size-6 text-primary" />
                </div>
                <p className="font-crimson mb-2 text-xl font-semibold">End of Current Chapters</p>
                <p className="mb-6 text-sm text-muted-foreground">
                  Your story is still being written. Keep journaling to add more chapters.
                </p>
                <ScrollToTop />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
