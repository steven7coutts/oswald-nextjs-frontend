'use client'

import { useState, useEffect } from 'react'
import { SiteSettings } from '../lib/types'
import Image from 'next/image'
import { urlFor } from '../lib/sanity.image'


interface HeaderProps {
  siteSettings: SiteSettings
}

export default function Header({ siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Mission', href: '#mission' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-[#F4E1C6]/20' 
          : 'bg-white/0 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5 lg:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-3 sm:gap-4 lg:gap-5 group">
              {siteSettings?.logo && (
                <div className="overflow-visible w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] lg:w-[140px] lg:h-[140px] xl:w-[180px] xl:h-[180px] flex-shrink-0">
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
              <div className={`font-heading font-bold text-base sm:text-lg lg:text-xl xl:text-2xl transition-colors duration-300 ${
                isScrolled ? 'text-[#3A2B1A]' : 'text-white'
              }`}>
                {siteSettings?.brandName?.split(' ')[0] || 'Oswald'}
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-accent font-semibold text-sm lg:text-base uppercase tracking-wider transition-colors duration-300 hover:text-[#C5862B] ${
                  isScrolled ? 'text-[#3A2B1A]' : 'text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#C5862B] hover:bg-[#C5862B]/90 text-[#3A2B1A] font-accent font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-sm lg:text-base"
            >
              Get a Free Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 sm:p-3 rounded-lg transition-colors duration-300 hover:bg-white/10"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg border-b border-[#F4E1C6]/20 mb-4">
            <nav className="py-4 sm:py-6 px-4 sm:px-6 space-y-3 sm:space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-accent font-semibold text-sm sm:text-base uppercase tracking-wider text-[#3A2B1A] hover:text-[#C5862B] transition-colors duration-300 py-2 sm:py-3"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 sm:pt-4 border-t border-[#F4E1C6]/20">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#C5862B] hover:bg-[#C5862B]/90 text-[#3A2B1A] font-accent font-semibold rounded-lg text-center transition-all duration-300 text-sm sm:text-base"
                >
                  Get a Free Quote
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

