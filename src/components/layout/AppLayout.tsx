import type { ReactNode } from 'react'
import { Header } from './Header'

interface AppLayoutProps {
  form: ReactNode
  preview: ReactNode
  history: ReactNode
}

export function AppLayout({ form, preview, history }: AppLayoutProps) {
  return (
    <div className="min-h-svh bg-petrol-950">
      <Header />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-2 md:items-start md:gap-8 md:py-10">
        <div className="flex flex-col gap-6 md:order-1">
          {form}
          {history}
        </div>
        <div className="md:sticky md:top-6 md:order-2">{preview}</div>
      </main>
    </div>
  )
}
