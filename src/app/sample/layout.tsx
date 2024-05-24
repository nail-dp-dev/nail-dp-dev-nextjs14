'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SampleLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
  }) {
  

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>
        <Link  href="/">
            Home
        </Link>
      </nav>

      {children}
    </section>
  )
}