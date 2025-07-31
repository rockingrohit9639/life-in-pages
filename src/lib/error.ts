import { toast } from 'sonner'

export function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Something went wrong'
  toast.error(message)
}
