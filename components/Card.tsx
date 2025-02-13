import siteMetadata from '@/data/siteMetadata'
import Image from './Image'
import Link from './Link'
import { formatDate } from 'pliny/utils/formatDate'
import { getTranslation } from '../app/i18n'

const Card = async ({ title, description, imgSrc, href, date, place, lng }) => {
  const { t } = await getTranslation(lng, 'activity')
  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          ))}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          {date ? (
            <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
              時間：
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </p>
          ) : (
            ''
          )}
          {place ? (
            <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">地點：{place}</p>
          ) : (
            ''
          )}
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              {t('learn more')}&rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
