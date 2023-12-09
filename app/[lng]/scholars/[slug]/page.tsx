import { Authors, allAuthors, allBlogs } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from '../../seo'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'

export const metadata = genPageMetadata({ title: 'Scholar' })

export const generateStaticParams = async () => {
  return allAuthors.map((p) => ({ slug: p.slug }))
}

export default function ScholarPage({ params }: { params: { slug: string } }) {
  const slug = decodeURI(params.slug)
  const author = allAuthors.find((p) => p.slug === slug) as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
