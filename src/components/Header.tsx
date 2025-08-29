'use client'

import { useState, useEffect } from 'react'
import { SiteSettings } from '../lib/types'
import Image from 'next/image'

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
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-brand-beige/20' 
          : 'bg-white/0 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-12 h-12 relative rounded-lg overflow-hidden ring-1 ring-brand-beige/40">
                <Image
                  src="/images/oswald-logo.png"
                  alt="Oswald Joinery & Contractors"
                  width={900}
                  height={900}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className={`font-heading font-bold text-xl transition-colors duration-300 ${
                isScrolled ? 'text-brand-dark' : 'text-white'
              }`}>
                {siteSettings?.brandName?.split(' ')[0] || 'Oswald'}
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-accent font-semibold text-sm uppercase tracking-wider transition-colors duration-300 hover:text-brand-gold ${
                  isScrolled ? 'text-brand-dark' : 'text-white'
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
              className="px-6 py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-accent font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Get a Free Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg border-b border-brand-beige/20 mb-4">
            <nav className="py-6 px-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-accent font-semibold text-sm uppercase tracking-wider text-brand-dark hover:text-brand-gold transition-colors duration-300 py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-brand-beige/20">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-6 py-3 bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-accent font-semibold rounded-lg text-center transition-all duration-300"
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

