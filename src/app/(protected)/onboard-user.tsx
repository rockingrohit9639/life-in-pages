'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { onboardUser } from '~/actions/user'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import { Switch } from '~/components/ui/switch'
import { handleError } from '~/lib/error'
import { OnboardUserSchema, onboardUserSchema } from '~/schema/user'

export default function OnboardUser() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(onboardUserSchema),
    defaultValues: {
      name: '',
      bookTitle: 'My life in pages',
      bookMood: '',
      bookIsPublic: false,
    },
  })

  const onboardUserMutation = useMutation({
    mutationFn: onboardUser,
    onError: handleError,
    onSuccess: () => {
      form.reset()
      toast.success('Onboarding successful')
      router.refresh()
    },
  })

  function onSubmit(data: OnboardUserSchema) {
    onboardUserMutation.mutate(data)
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white p-4 md:p-0"
      style={{
        backgroundPosition: '0 0,10px 10px',
        backgroundImage:
          'radial-gradient(var(--primary) 0.5px, transparent 0.5px), radial-gradient(var(--primary) 0.5px, #ffffff 0.5px)',
        backgroundSize: '20px 20px',
      }}
    >
      <Form {...form}>
        <form
          className="w-full rounded-lg border bg-white p-4 md:max-w-screen-sm"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="mb-2 text-lg font-medium">Personal Info</p>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-6" />

          <p className="mb-2 text-lg font-medium">Book Info</p>

          <FormField
            control={form.control}
            name="bookTitle"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the title of the book" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bookMood"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Book Mood</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the mood of the book" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bookIsPublic"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Book Is Public</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value ?? false}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={onboardUserMutation.isPending}>
            {onboardUserMutation.isPending ? 'Saving...' : 'Continue'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
