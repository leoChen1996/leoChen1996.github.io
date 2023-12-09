import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { getTranslation } from '../app/i18n'
import { languages } from '../app/i18n/settings'

const Header = async ({ lng }) => {
  const { t } = await getTranslation(lng, 'header')
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href={`/${lng}`} aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-10 text-4xl font-semibold sm:block">{t('title')}</div>
            ) : (
              t('title')
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={`/${lng}` + link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {t(link.title)}
            </Link>
          ))}
        {/*<SearchButton />*/}
        <ThemeSwitch />
        {languages
          .filter((l) => lng !== l)
          .map((l, index) => {
            return (
              <span key={l}>
                {index > 0 && ' or '}
                <Link href={`/${l}`}>{t(l)}</Link>
              </span>
            )
          })}
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
