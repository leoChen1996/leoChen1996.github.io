import '@/css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { allCoreContent, coreContent, sortPosts } from 'pliny/utils/contentlayer'
import type { Authors, Blog } from 'contentlayer/generated'
import { allActivities, allAuthors, allBlogs } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug)
  const activity = allActivities.find((p) => p.slug === slug)
  if (!activity) {
    return
  }

  const publishedAt = new Date(activity.date).toISOString()

  return {
    title: activity.title,
    description: activity.summary,
    openGraph: {
      title: activity.title,
      description: activity.summary,
      siteName: siteMetadata.title,
      locale: 'zh-HK',
      type: 'article',
      publishedTime: publishedAt,
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: activity.title,
      description: activity.summary,
    },
  }
}

export const generateStaticParams = async () => {
  return allActivities.map((p) => ({ slug: p.slug }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = decodeURI(params.slug)
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allActivities))
  const activityIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (activityIndex === -1) {
    return notFound()
  }

  const activity = allActivities[activityIndex]
  const prev = sortedCoreContents[activityIndex + 1]
  const next = sortedCoreContents[activityIndex - 1]
  const authorList = activity?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.name === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(activity)
  const jsonLd = activity.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[activity.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={activity.body.code} components={components} toc={activity.toc} />
      </Layout>
    </>
  )
}
