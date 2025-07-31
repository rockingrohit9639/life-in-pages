'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'

const schema = z.object({
  content: z.string().min(100, { message: 'Content must be at least 100 characters' }),
})

export default function CreateEntryPage() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      content: '',
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

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
                  <Textarea placeholder="Start writing..." className="max-h-96 min-h-40" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>Create</Button>
        </form>
      </Form>
    </div>
  )
}
