import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from '../../tag-data.json'
import { genPageMetadata } from '../seo'
import SearchButton from '@/components/SearchButton'
import { getTranslation } from '../../i18n'

export type ITag = {
  tag: string
  displayName: string
}

const tagMap = {
  economy: '經濟學',
  sociology: '社會學',
  psychology: '心理學',
  politics: '政治學',
}
export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page({ params: { lng } }) {
  const { t } = await getTranslation(lng, 'tags')
  const tagCounts = tagData as Record<string, number>
  const tagKeys: ITag[] = Object.keys(tagCounts).map((tag) => ({ tag, displayName: tagMap[tag] }))
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b.tag] - tagCounts[a.tag])
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="h-6 space-x-2 md:space-y-5">
          <SearchButton></SearchButton>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((tag) => {
            return (
              <div key={tag.tag} className="mb-2 mr-5 mt-2">
                <Tag tag={tag.tag} displayName={t(tag.tag)} />
                <Link
                  href={`/tags/${slug(tag.tag)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${tag.displayName}`}
                >
                  {` (${tagCounts[tag.tag]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
