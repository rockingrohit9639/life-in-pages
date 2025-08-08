'use client'

import { Entry } from '@prisma/client'
import dynamic from 'next/dynamic'

type EntriesMasonryProps = {
  entries: Entry[]
}

const MasonryContent = dynamic(() => import('./masonry-content'), {
  ssr: false,
})

export default function EntriesMasonry({ entries }: EntriesMasonryProps) {
  return <MasonryContent entries={entries} />
}
