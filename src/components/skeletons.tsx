import type * as React from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

/*
  Loading placeholders that mirror the real page layouts, so nothing jumps
  when the content arrives. Used by the route-level loading.tsx files.
*/

function HeaderSkeleton({ action = "w-36" }: { action?: string }) {
  return (
    <header className="sticky top-0 z-40 bg-navy border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Image
            src="/logo/logo.png"
            alt="Immanuel College of Theology, Ibadan"
            width={867}
            height={174}
            priority
            className="h-9 sm:h-11 w-auto object-contain shrink-0"
          />
          <span className="hidden md:block h-8 w-px bg-white/20" aria-hidden />
          <Skeleton dark className="hidden md:block h-3 w-36" />
        </div>
        <Skeleton dark className={`h-9 rounded-full ${action}`} />
      </div>
    </header>
  )
}

function HeroBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-dots" aria-hidden />
      <div className="absolute -top-40 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-3xl" aria-hidden />
    </>
  )
}

const delayStyle = (seconds: number) => ({ "--skeleton-delay": `${seconds}s` }) as React.CSSProperties

export function DatabaseCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border shadow-soft"
      style={delayStyle(delay)}
    >
      <div className="h-1 bg-gradient-to-r from-navy-100 via-navy-100 to-gold-100" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-11/12" />
          <Skeleton className="h-3.5 w-3/4" />
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-xl bg-surface py-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 px-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-2.5 w-14" />
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2">
          <Skeleton className="h-3 w-24" />
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className={`h-3.5 ${i % 2 ? "w-1/2" : "w-2/3"}`} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {["w-20", "w-24", "w-16", "w-28"].map((w, i) => (
            <Skeleton key={i} className={`h-6 rounded-full ${w}`} />
          ))}
        </div>

        <Skeleton className="mt-6 h-11 w-full rounded-xl" />
      </div>
    </div>
  )
}

export function EResourcesSkeleton() {
  return (
    <div className="min-h-screen bg-surface" role="status" aria-label="Loading e-resources">
      <HeaderSkeleton />

      <section className="relative overflow-hidden bg-navy">
        <HeroBackdrop />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 md:pt-24 md:pb-14">
          <div className="mx-auto max-w-3xl flex flex-col items-center">
            <Skeleton dark className="h-7 w-44 rounded-full" />
            <Skeleton dark className="mt-6 h-11 sm:h-14 w-4/5 max-w-xl rounded-lg" />
            <Skeleton dark className="mt-6 h-4 w-full max-w-2xl" />
            <Skeleton dark className="mt-2.5 h-4 w-3/4 max-w-xl" />
            <div className="mt-10 h-[60px] w-full max-w-2xl rounded-2xl bg-white/95 shadow-lift flex items-center gap-3 px-5">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 max-w-4xl mx-auto">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-navy px-4 py-5 flex flex-col items-center gap-2" style={delayStyle(i * 0.12)}>
                <Skeleton dark className="h-7 sm:h-8 w-20" />
                <Skeleton dark className="h-3 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
            <div className="space-y-2">
              <Skeleton className="h-7 w-52" />
              <Skeleton className="h-3.5 w-60" />
            </div>
            <Skeleton className="h-3.5 w-40" />
          </div>
          <div className="flex gap-2 overflow-hidden sm:flex-wrap py-1">
            {["w-12", "w-24", "w-40", "w-28", "w-24", "w-24", "w-24", "w-28", "w-52", "w-28"].map((w, i) => (
              <Skeleton key={i} delay={i * 0.06} className={`h-9 shrink-0 rounded-full ${w}`} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <DatabaseCardSkeleton key={i} delay={(i % 3) * 0.18} />
          ))}
        </div>
      </main>

      <span className="sr-only">Loading…</span>
    </div>
  )
}

export function RestrictedSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-surface" role="status" aria-label="Loading">
      <HeaderSkeleton action="w-44" />

      <section className="relative overflow-hidden bg-navy">
        <HeroBackdrop />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32 md:pt-20 md:pb-40 flex flex-col items-center">
          <Skeleton dark className="mb-8 h-24 w-24 sm:h-28 sm:w-28 rounded-full" />
          <Skeleton dark className="h-7 w-44 rounded-full" />
          <Skeleton dark className="mt-6 h-11 sm:h-14 w-3/4 max-w-lg rounded-lg" />
          <Skeleton dark className="mt-6 h-4 w-full max-w-md" />
        </div>
      </section>

      <main className="relative flex-1 container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white ring-1 ring-border shadow-soft"
              style={delayStyle(i * 0.18)}
            >
              <div className="h-1 bg-gradient-to-r from-navy-100 via-navy-100 to-gold-100" />
              <div className="p-6">
                <Skeleton className="mb-4 h-11 w-11 rounded-xl" />
                <Skeleton className="mb-3 h-4 w-32" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="mt-2 h-3.5 w-4/5" />
                <Skeleton className="mt-2 h-3.5 w-2/3" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Skeleton className="h-11 w-full sm:w-48 rounded-xl" />
          <Skeleton className="h-11 w-full sm:w-52 rounded-xl" />
        </div>
      </main>

      <span className="sr-only">Loading…</span>
    </div>
  )
}
