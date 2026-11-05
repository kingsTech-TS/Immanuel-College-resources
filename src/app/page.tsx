"use client"
import Source from "@/app/e-resources/page"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface">
      <main>
      <Source />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
