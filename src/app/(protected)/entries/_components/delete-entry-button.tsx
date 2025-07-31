'use client'

import { useMutation } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteEntry } from '~/actions/entry'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { handleError } from '~/lib/error'

type DeleteEntryButtonProps = {
  entryId: string
}

export default function DeleteEntryButton({ entryId }: DeleteEntryButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const deleteEntryMutation = useMutation({
    mutationFn: deleteEntry,
    onError: handleError,
    onSuccess: () => {
      router.refresh()
      setIsOpen(false)
    },
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2Icon className="text-destructive size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this entry? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Nevermind</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={deleteEntryMutation.isPending}
            onClick={() => {
              deleteEntryMutation.mutate(entryId)
            }}
          >
            Yes, delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
