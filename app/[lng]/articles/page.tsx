import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from '../seo'
import { getTranslation } from '../../i18n'
import { usePathname } from 'next/navigation'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Articles' })

export default async function BlogPage({ params: { lng } }) {
  const { t } = await getTranslation(lng, 'articles')
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    lng,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={t('title')}
      lng={lng}
    />
  )
}
