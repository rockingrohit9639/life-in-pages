import { Chapter } from '@prisma/client'
import Markdown from '~/components/markdown'

type BookContentProps = {
  chapters: Pick<Chapter, 'id' | 'title' | 'content'>[]
}

export default function BookContent({ chapters }: BookContentProps) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4">
      {chapters.map((chapter) => (
        <div key={chapter.id} className="font-playfair">
          <h2 className="mb-4 text-center text-2xl font-bold">{chapter.title}</h2>

          <Markdown className="text-justify">{chapter.content}</Markdown>
        </div>
      ))}
    </div>
  )
}
