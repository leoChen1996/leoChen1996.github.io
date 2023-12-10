import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allActivities, allBlogs, DocumentTypes } from 'contentlayer/generated'
import Main from './Main'

export default function Page({ params: { lng } }) {
  const data: DocumentTypes[] = [...allBlogs, ...allActivities]
  const sortedPosts = sortPosts(data)
  const posts = allCoreContent(sortedPosts)
  return <Main lng={lng} posts={posts} />
}
