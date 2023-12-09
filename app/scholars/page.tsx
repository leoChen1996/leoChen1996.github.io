import { Authors, allAuthors } from 'contentlayer/generated'
import { genPageMetadata } from '../seo'
import Link from '@/components/Link'

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
    <>
      <div className="pb-6 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          研究學者
        </h1>
      </div>
      <div className="contianer mx-auto flex justify-center">
        <table className="w-full table-auto border-separate border-spacing-8 border text-left">
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
    </>
  )
}
