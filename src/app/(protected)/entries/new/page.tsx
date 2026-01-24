'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { createEntry } from '~/actions/entry';
import { handleError } from '~/lib/error';
import {
  ArrowLeftIcon,
  CalendarIcon,
  LightbulbIcon,
  Loader2Icon,
  PenLineIcon,
  SendIcon,
  SparklesIcon,
} from 'lucide-react';
import type { CreateEntrySchema } from '~/schema/entry';
import { createEntrySchema } from '~/schema/entry';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { Card, CardContent } from '~/components/ui/card';
import { cn } from '~/lib/utils';
import { useState } from 'react';

const WRITING_PROMPTS = [
  'What made you smile today?',
  'What are you grateful for right now?',
  'Describe a moment that surprised you recently.',
  'What did you learn about yourself today?',
  'Write about someone who inspired you.',
  "What's on your mind that you haven't told anyone?",
  'Describe your perfect day in detail.',
  'What challenge are you currently facing?',
];

const MIN_CHARACTERS = 100;

export default function CreateEntryPage() {
  const router = useRouter();
  const [showPrompts, setShowPrompts] = useState(false);

  const form = useForm({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      content: '',
    },
  });

  const createEntryMutation = useMutation({
    mutationFn: createEntry,
    onError: handleError,
    onSuccess: () => {
      toast.success('Entry saved to your journal');
      form.reset();
      router.push('/entries');
    },
  });

  function onSubmit(values: CreateEntrySchema) {
    createEntryMutation.mutate(values);
  }

  const content = form.watch('content');
  const charCount = content.trim().length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const progress = Math.min((charCount / MIN_CHARACTERS) * 100, 100);
  const isReady = charCount >= MIN_CHARACTERS;

  const today = new Date();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-linear-to-br from-primary/5 via-background to-primary/10">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <div className="mb-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
              <Link href="/entries">
                <ArrowLeftIcon className="size-4" />
                <span>Back</span>
              </Link>
            </Button>

            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="size-4" />
              <span className="text-sm font-medium">{format(today, 'EEEE, MMMM d, yyyy')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <PenLineIcon className="size-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">New Entry</h1>
              <p className="text-muted-foreground text-sm">Capture this moment in your story</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-6 py-6">
        {/* Writing Prompts Toggle */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowPrompts(!showPrompts)}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <LightbulbIcon className="size-4" />
            <span>{showPrompts ? 'Hide prompts' : 'Need inspiration?'}</span>
          </button>

          {showPrompts && (
            <Card className="mt-3 border-dashed">
              <CardContent className="py-4">
                <div className="mb-2 flex items-center gap-2">
                  <SparklesIcon className="size-4 text-primary" />
                  <span className="text-sm font-medium">Writing Prompts</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {WRITING_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => {
                        form.setValue('content', prompt + '\n\n');
                        setShowPrompts(false);
                      }}
                      className="rounded-lg border bg-muted/30 px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Writing Area */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="mb-4 overflow-hidden">
              <CardContent className="p-0">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          autoFocus
                          placeholder="Begin writing your thoughts here...

Take your time. There's no rush. This is your space to reflect, dream, remember, or simply be present with your words."
                          className="min-h-[400px] resize-none rounded-none border-0 px-6 py-5 text-base leading-relaxed shadow-none focus-visible:ring-0 md:min-h-[500px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="px-6 pb-2" />
                    </FormItem>
                  )}
                />

                {/* Footer with stats */}
                <div className="flex items-center justify-between border-t bg-muted/30 px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium">{wordCount}</span>
                      <span className="text-muted-foreground ml-1">words</span>
                    </div>
                    <div className="text-sm">
                      <span className={cn('font-medium', isReady ? 'text-primary' : '')}>{charCount}</span>
                      <span className="text-muted-foreground ml-1">/ {MIN_CHARACTERS} min</span>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-300',
                          isReady ? 'bg-primary' : 'bg-muted-foreground/40',
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {isReady && <SparklesIcon className="size-4 text-primary" />}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {isReady ? 'Ready to save!' : `${MIN_CHARACTERS - charCount} more characters needed`}
              </p>

              <Button
                type="submit"
                size="lg"
                disabled={createEntryMutation.isPending || !isReady}
                className="shadow-lg shadow-primary/20"
              >
                {createEntryMutation.isPending ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <SendIcon className="size-4" />
                    <span>Save Entry</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
