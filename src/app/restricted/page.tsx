"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Clock, Lock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"

const contacts = [
  { icon: Mail, label: "registry@immanuelcollege.edu.ng", href: "mailto:kdl.ui@gmail.com" },
  { icon: Phone, label: "+234 800 123 4567", href: "tel:+2349032193358" },
  { icon: MessageCircle, label: "+234 800 123 4567", href: "tel:+2348150607963" },
]

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Immanuel+College+of+Theology+Ibadan"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export default function RestrictedPage() {
  // Rendered only after mount so server and client markup match
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4 min-w-0">
            <Image
              src="/logo/logo.png"
              alt="Immanuel College of Theology, Ibadan"
              width={867}
              height={174}
              priority
              className="h-8 sm:h-11 w-auto object-contain shrink-0"
            />
            <span className="hidden lg:block h-8 w-px bg-white/20" aria-hidden />
            <span className="hidden lg:block text-xs font-medium uppercase tracking-[0.18em] text-gold-300 whitespace-nowrap">
              Library · E-Resources
            </span>
          </Link>

          <Link
            href="/e-resources"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold-100 transition-colors hover:bg-gold hover:text-navy hover:border-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to resources
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image
          src="/hero/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-navy/60" aria-hidden />
        <div className="absolute inset-0 bg-dots" aria-hidden />
        <div className="absolute -top-40 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-gold/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-48 -left-32 h-[26rem] w-[26rem] rounded-full bg-navy-500/40 blur-3xl" aria-hidden />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32 md:pt-20 md:pb-40 text-center">
          {/* Emblem */}
          <motion.div
            className="relative mx-auto mb-8 h-24 w-24 sm:h-28 sm:w-28"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-gold/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />
            <div className="absolute inset-3 grid place-items-center rounded-full bg-gradient-to-br from-navy-600 to-navy-900 ring-1 ring-gold/50 shadow-[0_0_40px_-6px_rgb(196_154_69/0.55)]">
              <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12 text-gold" />
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
              <Lock className="h-3.5 w-3.5" />
              On-site access only
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              Visit the <span className="text-gold">Library</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-navy-100">
              This resource is only accessible from within the Library premises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info cards, lifted over the hero */}
      <main className="relative flex-1 container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 pb-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          <InfoCard icon={MapPin} title="Location required">
            <p>You must be physically present in the Library to open this database.</p>
          </InfoCard>

          <InfoCard icon={Clock} title="Current time">
            <p className="text-2xl font-semibold tabular-nums text-navy">
              {now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
            </p>
            <p className="mt-1">
              {now ? now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" }) : " "}
            </p>
          </InfoCard>

          <InfoCard icon={MessageCircle} title="Need help?">
            <ul className="space-y-1.5">
              {contacts.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group/link flex items-center gap-2.5 rounded-lg px-2 py-1.5 -mx-2 text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-gold-600" />
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </InfoCard>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-medium text-white shadow-soft transition-colors hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
          >
            <MapPin className="h-4 w-4 text-gold" />
            Find the Library
            <ArrowUpRight className="h-4 w-4 text-gold" />
          </a>
          <Link
            href="/e-resources"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-navy ring-1 ring-border shadow-soft transition-colors hover:ring-gold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
          >
            Browse other resources
          </Link>
        </motion.div>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 shrink-0 text-gold-600" />
          This restriction is in place to comply with licensing agreements.
        </p>
      </main>

      <Footer />
    </div>
  )
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-gold/50">
      <div className="h-1 bg-gradient-to-r from-navy via-navy-600 to-gold" />
      <div className="p-6">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-navy-50 ring-1 ring-navy-100 transition-colors group-hover:bg-gold-50 group-hover:ring-gold-200">
          <Icon className="h-5 w-5 text-navy" />
        </div>
        <h3 className="mb-2 text-base font-semibold text-navy">{title}</h3>
        <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}
