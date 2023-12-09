import { getTranslation } from '../../i18n'

export default async function ContactPage({ params: { lng } }) {
  const { t } = await getTranslation(lng, 'contact')
  return (
    <>
      <div className="pb-6 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('title')}
        </h1>
      </div>
      <div className="text-lg font-bold">
        <p className="leading-10">
          <span>{t('email')}:</span>
          <a href="example@mail.com">example@mail.com</a>
        </p>
        <p className="leading-10">
          <span>{t('address')}:</span>
          香港xxxxxxxxxxxxxx
        </p>
      </div>
    </>
  )
}
