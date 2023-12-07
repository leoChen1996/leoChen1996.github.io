import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  tag: string
  displayName: string
}

const Tag = ({ tag, displayName }: Props) => {
  return (
    <Link
      href={`/tags/${slug(tag)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {displayName.split(' ').join('-')}
    </Link>
  )
}

export default Tag
