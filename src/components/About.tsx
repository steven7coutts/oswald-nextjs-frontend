'use client'

import { HomepageData } from '../lib/types'

interface AboutProps {
  data: HomepageData
}

export default function About({ data }: AboutProps) {
  if (!data) return null

  return (
    <section id="about" className="py-12 md:py-16 lg:py-24 bg-[#3A2B1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 py-2 md:px-4 md:py-2 bg-[#C5862B]/20 border border-[#C5862B]/30 rounded-full text-[#C5862B] font-accent text-xs md:text-sm uppercase tracking-wider mb-4 md:mb-6">
              About Us
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F4E1C6] mb-6 md:mb-8 leading-tight">
              {data.aboutHeading || 'Craftsmanship with Integrity'}
            </h2>
            
            <div className="space-y-4 md:space-y-6 text-[#F4E1C6]/90">
              <p className="font-body text-base md:text-lg leading-relaxed">
                {data.aboutBody || 'We combine traditional skills with modern tooling to deliver flawless finishes and long-lasting results.'}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-12 pt-8 md:pt-12 border-t border-[#C5862B]/20">
              <div className="text-center">
                <div className="font-heading text-2xl md:text-3xl font-bold text-[#C5862B] mb-1 md:mb-2">10+</div>
                <div className="font-accent text-xs md:text-sm text-[#F4E1C6]/70 uppercase tracking-wider leading-tight">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-2xl md:text-3xl font-bold text-[#C5862B] mb-1 md:mb-2">500+</div>
                <div className="font-accent text-xs md:text-sm text-[#F4E1C6]/70 uppercase tracking-wider leading-tight">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-2xl md:text-3xl font-bold text-[#C5862B] mb-1 md:mb-2">100%</div>
                <div className="font-accent text-xs md:text-sm text-[#F4E1C6]/70 uppercase tracking-wider leading-tight">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="aspect-square bg-gradient-to-br from-[#C5862B]/20 to-[#6B4226]/20 rounded-2xl p-6 md:p-8 border border-[#C5862B]/30">
              <div className="w-full h-full bg-gradient-to-br from-[#F4E1C6]/10 to-[#C5862B]/10 rounded-xl flex items-center justify-center">
                <svg className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-[#C5862B]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            
            {/* Floating Elements - Responsive positioning */}
            <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#C5862B] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#6B4226] rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

