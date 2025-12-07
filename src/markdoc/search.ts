// Client-safe search module - no Node.js APIs
import FlexSearch from 'flexsearch'
import searchData from '../../.generated/search-data.json'

export interface Result {
  url: string
  title: string
  pageTitle?: string
  [key: string]: unknown
}

interface SearchDataItem {
  url: string
  sections: [string, string | null, string[]][]
}

const sectionIndex = new FlexSearch.Document({
  tokenize: 'full',
  document: {
    id: 'url',
    index: 'content',
    store: ['title', 'pageTitle'],
  },
  context: {
    resolution: 9,
    depth: 2,
    bidirectional: true,
  },
})

// Index the pre-generated data
for (const { url, sections } of searchData as SearchDataItem[]) {
  for (const [title, hash, content] of sections) {
    const doc: Record<string, string> = {
      url: url + (hash ? '#' + hash : ''),
      title,
      content: [title, ...content].join('\n'),
    }
    if (hash) {
      doc.pageTitle = sections[0][0]
    }
    sectionIndex.add(doc)
  }
}

export function search(query: string, options: { limit?: number } = {}): Result[] {
  const result = sectionIndex.search(query, {
    ...options,
    enrich: true,
  })
  if (result.length === 0) {
    return []
  }
  return (result[0] as { result: { id: string; doc: { title: string; pageTitle?: string } }[] }).result.map((item) => ({
    url: item.id,
    title: item.doc.title,
    pageTitle: item.doc.pageTitle,
  }))
}
