'use client'


import { SiteSettings } from '../lib/types'
import Image from 'next/image'
import { urlFor } from '../lib/sanity.image'


interface HeaderProps {
  siteSettings: SiteSettings
}

export default function Header({ siteSettings }: HeaderProps) {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Mission', href: '#mission' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent border-none shadow-none backdrop-blur-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5 lg:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-3 sm:gap-4 lg:gap-5 group">
              {siteSettings?.logo && (
                <div className="overflow-visible w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] lg:w-[140px] lg:h-[140px] xl:w-[180px] xl:h-[180px] flex-shrink-0">
                  <Image
                    src={urlFor(siteSettings.logo).width(300).height(300).fit('crop').url()}
                    alt={siteSettings.brandName || 'Oswald Joinery'}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              )}

            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-accent font-semibold text-sm lg:text-base uppercase tracking-wider transition-colors duration-300 hover:text-[#C5862B] text-white font-heading"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#C5862B] hover:bg-[#C5862B]/90 text-[#3A2B1A] font-accent font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-sm lg:text-base"
            >
              Get a Free Quote
            </a>
          </div>

          {/* CTA Button - Mobile */}
          <div className="lg:hidden">
            <a
              href="#contact"
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#C5862B] hover:bg-[#C5862B]/90 text-[#3A2B1A] font-accent font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-xs sm:text-sm"
            >
              Get a Free Quote
            </a>
          </div>
        </div>


      </div>
    </header>
  )
}

