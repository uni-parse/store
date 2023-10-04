import NavMenu from '@/components/NavMenu'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <NavMenu />
      <Component {...pageProps} />
    </>
  )
}
