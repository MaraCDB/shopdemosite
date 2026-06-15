import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/demos/classic/components/Header'
import { Footer } from '@/demos/classic/components/Footer'
import { DemoBar } from '@/components/portfolio/DemoBar'

export const Route = createFileRoute('/demo/classic')({
  component: ClassicLayout,
})

function ClassicLayout() {
  return (
    <div data-demo="classic" className="flex flex-col min-h-screen">
      <DemoBar />
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
