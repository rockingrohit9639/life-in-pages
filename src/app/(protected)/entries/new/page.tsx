'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { createEntry } from '~/actions/entry'
import { handleError } from '~/lib/error'
import { PlusIcon } from 'lucide-react'
import { CreateEntrySchema, createEntrySchema } from '~/schema/entry'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function CreateEntryPage() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      content: '',
    },
  })

  const createEntryMutation = useMutation({
    mutationFn: createEntry,
    onError: handleError,
    onSuccess: () => {
      toast.success('Entry created successfully')
      form.reset()
      router.push('/home')
    },
  })

  function onSubmit(values: CreateEntrySchema) {
    createEntryMutation.mutate(values)
  }

  const content = form.watch('content')

  return (
    <div className="mx-auto pt-10 md:max-w-screen-md">
      <h1 className="font-playfair mx-auto mb-10 max-w-2xl text-center text-xl font-bold md:text-6xl">
        This is your space. Let your thoughts flow.
      </h1>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea autoFocus placeholder="Start writing..." className="max-h-96 min-h-40" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="text-right text-xs">{content.trim().length}</FormDescription>
              </FormItem>
            )}
          />

          <Button disabled={createEntryMutation.isPending}>
            <PlusIcon />
            <span>Create</span>
          </Button>
        </form>
      </Form>
    </div>
  )
}
