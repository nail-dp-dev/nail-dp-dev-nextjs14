import Link from 'next/link'
import { headers } from 'next/headers'
import { usePathname } from 'next/navigation'

export default async function NotFound() {
  return (
    <div>
      <p>Not Found</p>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/">Home</Link>
      </p>
    </div>
  )
}