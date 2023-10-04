'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavMenu() {
  return (
    <nav className='border-solid border-[thin] border-gray-400 rounded-lg p-1'>
      <RouteLink path='/' name='Home' />
      <RouteLink path='/store' name='Store' />
    </nav>
  )
}

function RouteLink({ path, name }: any) {
  const pathname = usePathname()
  const routeStyle =
    path === pathname
      ? 'text-gray-300 bg-gray-700'
      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700'
  return (
    <Link
      href={path}
      className={`inline-block py-1 px-2 rounded-lg no-underline ${routeStyle}`}>
      {name}
    </Link>
  )
}
