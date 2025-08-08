import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '~/lib/utils'

type MarkdownProps = {
  children: string
  className?: string
}

export default function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn(className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}
