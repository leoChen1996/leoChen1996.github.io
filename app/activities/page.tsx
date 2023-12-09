import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import { allActivities } from 'contentlayer/generated'

export const metadata = genPageMetadata({ title: 'Activities' })

export default function Activities() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            研討活動
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {allActivities.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                date={d.date}
                place={d.place}
                description={d.summary}
                imgSrc={d.coverImg}
                href={`/activities/${d.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
