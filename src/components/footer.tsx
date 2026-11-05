"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"

const links = [
  { name: "University Website", href: "https://www.immanuelcollege.edu.ng/" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-navy-950 text-navy-200">
      <div className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="flex flex-col gap-3">
          <Image
            src="/logo/logo.png"
            alt="Immanuel College of Theology, Ibadan"
            width={867}
            height={174}
            className="h-11 w-auto object-contain self-start"
          />
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold-300">Library · E-Resources</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-300"
            >
              {link.name}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <p className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center md:text-left text-xs text-navy-300">
          © {currentYear} Immanuel College of Theology E-Resources. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
