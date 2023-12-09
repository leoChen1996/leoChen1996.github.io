import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from '../seo'
import Link from '@/components/Link'
import { slug } from 'github-slugger'

export const metadata = genPageMetadata({ title: 'scholars' })

export default function Page() {
  const infos = allAuthors.map((a) => ({
    name: a.name,
    company: a.company,
    occupation: a.occupation,
    slug: a.slug,
  })) as Pick<Authors, 'name' | 'company' | 'occupation' | 'slug'>[]
  const headings = ['姓名', '機構', '職位']

  return (
    <div className="contianer mx-auto flex justify-center">
      <table className="table-auto border-separate border-spacing-8 border text-left">
        <thead>
          <tr>
            {headings.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {infos.map((info, index) => (
            <tr key={index}>
              <td>
                <Link
                  href={`/scholars/${info.slug}`}
                  className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                  aria-label={`View scholar ${info.name}`}
                >
                  {info.name}
                </Link>
              </td>
              <td>{info.company}</td>
              <td>{info.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
