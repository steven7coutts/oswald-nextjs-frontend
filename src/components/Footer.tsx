'use client'

import { SiteSettings, Service, SocialLink } from '../lib/types'

interface FooterProps {
  siteSettings: SiteSettings
  services: Service[]
}

export default function Footer({ siteSettings, services }: FooterProps) {
  if (!siteSettings || !services) return null

  return (
    <footer className="bg-[#3A2B1A] text-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#F4E1C6] mb-3 sm:mb-4 md:mb-6 leading-tight">
                {siteSettings.brandName || 'Oswald Joinery & Contractors'}
              </h3>
              <p className="font-body text-sm sm:text-base md:text-lg text-[#F4E1C6]/80 leading-relaxed">
                Crafted with Precision. Built to Last. Perth&apos;s premier joinery service delivering exceptional craftsmanship and attention to detail for over a decade.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3 text-[#F4E1C6]/80">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5862B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-body text-sm sm:text-base">{siteSettings.phone || '01738 000000'}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-[#F4E1C6]/80">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5862B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-body text-sm sm:text-base">{siteSettings.email || 'info@oswaldjoinery.co.uk'}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-[#F4E1C6]/80">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5862B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-body text-sm sm:text-base">{siteSettings.address || 'Perth, Perthshire'}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-base sm:text-lg md:text-xl font-bold text-[#F4E1C6] mb-4 sm:mb-6">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service._id}>
                  <a 
                    href={`#services`}
                    className="font-body text-sm sm:text-base text-[#F4E1C6]/70 hover:text-[#C5862B] transition-colors duration-300"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base sm:text-lg md:text-xl font-bold text-[#F4E1C6] mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#services" className="font-body text-sm sm:text-base text-[#F4E1C6]/70 hover:text-[#C5862B] transition-colors duration-300">Services</a></li>
              <li><a href="#portfolio" className="font-body text-sm sm:text-base text-[#F4E1C6]/70 hover:text-[#C5862B] transition-colors duration-300">Portfolio</a></li>
              <li><a href="#about" className="font-body text-sm sm:text-base text-[#F4E1C6]/70 hover:text-[#C5862B] transition-colors duration-300">About</a></li>
              <li><a href="#mission" className="font-body text-sm sm:text-base text-[#F4E1C6]/70 hover:text-[#C5862B] transition-colors duration-300">Mission</a></li>
              <li><a href="#contact" className="font-body text-sm sm:text-base text-[#F4E1C6]/70 hover:text-[#C5862B] transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#C5862B]/20 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright */}
            <div className="font-body text-[#F4E1C6]/60 text-xs sm:text-sm text-center md:text-left">
              © 2025 {siteSettings.brandName || 'Oswald Joinery & Contractors'}. All Rights Reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              {siteSettings.social?.map((social: SocialLink) => (
                <a
                  key={social.url || social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C5862B]/20 hover:bg-[#C5862B]/30 rounded-full flex items-center justify-center transition-all duration-300 group"
                >
                  <span className="font-accent text-[#C5862B] group-hover:text-[#F4E1C6] transition-colors duration-300 text-sm sm:text-base">
                    {social.label === 'Facebook' ? 'f' : social.label === 'Instagram' ? 'ig' : social.label.charAt(0)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

