import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Header } from '@/demos/nature/components/Header'
import { Footer } from '@/demos/nature/components/Footer'
import { DemoBar } from '@/components/portfolio/DemoBar'

export const Route = createFileRoute('/demo/nature')({
  component: NatureLayout,
})

function NatureLayout() {
  return (
    <div data-demo="nature" className="flex flex-col min-h-screen">
      <DemoBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
