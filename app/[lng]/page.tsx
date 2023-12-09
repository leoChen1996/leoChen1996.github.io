import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { languages } from '../i18n/settings'
import { getTranslation } from '../i18n'

export default function Page({ params: { lng } }) {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main lng={lng} posts={posts} />
}
