import { getUserBook } from '~/actions/book'
import EmptyState from '~/components/empty-state'
import { When } from '~/components/when'
import BookContent from './book-content'

export default async function BookPage() {
  const book = await getUserBook()

  return (
    <div className="mx-auto min-h-screen max-w-screen-md md:border-x">
      <div className="flex flex-col gap-4 border-b p-4">
        <h1 className="font-playfair text-2xl font-bold">{book.title}</h1>
      </div>

      <When
        condition={book.chapters.length > 0}
        fallback={
          <div className="flex h-full items-center justify-center p-4">
            <EmptyState
              className="max-w-96"
              title="No chapters yet"
              description="Write more entries to generate your first chapter"
            />
          </div>
        }
      >
        <BookContent chapters={book.chapters} />
      </When>
    </div>
  )
}
