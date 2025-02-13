/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getTranslation } from '../app/i18n'
import { usePathname } from 'next/navigation'
import { useTranslation } from '../app/i18n/client'

interface PaginationProps {
  totalPages: number
  currentPage: number
  lng: string
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  lng: string
}

type ITag = {
  tag: string
  displayName: string
}

export const tagMap = {
  economy: '經濟學',
  sociology: '社會學',
  psychology: '心理學',
  politics: '政治學',
}

function Pagination({ totalPages, currentPage, lng }: PaginationProps) {
  const pathname = usePathname()
  const { t } = useTranslation(lng, 'articles')
  const basePath = pathname?.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('previous')}
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            {t('previous')}
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('next')}
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            {t('next')}
          </Link>
        )}
      </nav>
    </div>
  )
}

function getTagsCount(posts: CoreContent<Blog>[]) {
  return posts.reduce(
    (prev, curr) => {
      curr.tags.forEach((tag) => {
        if (prev[tag]) {
          prev[tag] += 1
        } else {
          prev[tag] = 1
        }
      })
      return prev
    },
    {} as Record<string, number>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  lng,
}: ListLayoutProps) {
  const pathname = usePathname()
  const { t } = useTranslation(lng, 'articles')
  const { t: tt } = useTranslation(lng, 'tags')
  const tagCounts = getTagsCount(posts)
  const tagKeys: ITag[] = Object.keys(tagCounts).map((tag) => ({ tag, displayName: tagMap[tag] }))
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b.tag] - tagCounts[a.tag])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold uppercase leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname?.startsWith(`${lng}/articles`) ? (
                <h3 className="font-bold uppercase text-primary-500">{t('all categories')}</h3>
              ) : (
                <Link
                  href={`/${lng}/articles`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  {t('all categories')}
                </Link>
              )}
              <ul>
                {sortedTags.map(({ tag, displayName }) => {
                  return (
                    <li key={tag} className="my-3">
                      {pathname?.split('/tags/')[1] === slug(tag) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                          {`${tt(tag)} (${tagCounts[tag]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/${lng}/tags/${slug(tag)}`}
                          className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${displayName}`}
                        >
                          {`${tt(tag)} (${tagCounts[tag]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, lng)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/${lng}/${path}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags
                              ?.map((tag) => ({ tag, displayName: tagMap[tag] }))
                              .map((t) => (
                                <Tag lng={lng} key={t.tag} tag={t.tag} displayName={tt(t.tag)} />
                              ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                lng={lng!}
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
