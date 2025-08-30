'use client'

import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'
import TrustIndicators from './TrustIndicators'
import { HomepageData, HeroCTA } from '../lib/types'

interface HeroProps {
  data: HomepageData
}

export default function Hero({ data }: HeroProps) {
  if (!data) return null
  const heroTitle: string = data.heroTitle || 'Bespoke Joinery. Crafted with Precision. Built to Last.'
  const titleParts = heroTitle.split('.').filter(Boolean)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#3A2B1A] via-[#6B4226] to-[#2E2B29] pt-32 sm:pt-36 md:pt-40 lg:pt-44 xl:pt-48 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-28 scroll-mt-32 sm:scroll-mt-36 md:scroll-mt-40 lg:scroll-mt-44 xl:scroll-mt-48">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Background Image Overlay */}
      {data.heroBg && (
        <div className="absolute inset-0 z-0">
          <Image
            fill
            priority
            src={urlFor(data.heroBg).url()}
            alt="Premium joinery craftsmanship"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(0,12,24,0.60),rgba(0,10,20,0.85))]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 xl:px-12 max-w-4xl sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
        {/* Pre-title Badge */}
        <div className="mb-3 sm:mb-4 lg:mb-6 xl:mb-8">
          <span className="inline-block px-2.5 sm:px-3 lg:px-4 xl:px-5 py-1.5 sm:py-2 lg:py-2.5 xl:py-3 bg-[#C5862B]/20 border border-[#C5862B]/30 rounded-full text-[#C5862B] font-accent text-xs sm:text-sm lg:text-base xl:text-lg uppercase tracking-wider shadow-lg backdrop-blur-sm">
            Perth&apos;s Premier Joinery
          </span>
        </div>

        {/* Main Title - Responsive Typography */}
        <h1 className="font-heading font-bold mb-4 sm:mb-6 lg:mb-8 xl:mb-10 leading-tight tracking-tight">
          {/* Mobile: 3 lines for optimal legibility */}
          <div className="md:hidden space-y-1.5 sm:space-y-2 lg:space-y-2.5">
            <span className="block text-[#F4E1C6] text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
              {titleParts[0] || 'Bespoke Joinery'}
            </span>
            <span className="block text-[#C5862B] text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
              {titleParts[1] || 'Crafted with Precision'}
            </span>
            <span className="block text-[#F4E1C6] text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
              {titleParts[2] || 'Built to Last'}
            </span>
          </div>

          {/* Desktop: Single elegant line */}
          <span className="hidden md:block text-[#F4E1C6] text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl">
            {heroTitle}
          </span>
        </h1>
        
        {/* Subtitle - Responsive sizing and spacing */}
        <p className="font-body font-light text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-6 sm:mb-8 lg:mb-10 xl:mb-12 max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-[#F4E1C6]/90 leading-relaxed px-4">
          {data.heroSubtitle || 'Perth-based joinery delivering premium kitchens, storage, staircases and commercial fit-outs.'}
        </p>

        {/* CTAs - Touch-friendly and responsive */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 xl:gap-6 justify-center items-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
          {data.heroCTAs && data.heroCTAs.length > 0 ? (
            data.heroCTAs.map((cta: HeroCTA) => (
              <a
                key={cta._key}
                href={cta.href}
                className={`
                  group relative inline-flex items-center justify-center min-h-[36px] sm:min-h-[40px] lg:min-h-[44px] xl:min-h-[48px]
                  px-2.5 sm:px-3 lg:px-5 xl:px-6 py-2 sm:py-2.5 lg:py-3 xl:py-3.5 rounded-lg font-accent font-semibold 
                  text-xs sm:text-sm lg:text-base xl:text-lg transition-all duration-300 ease-out
                  focus:outline-none focus:ring-2 focus:ring-[#C5862B] focus:ring-offset-2 focus:ring-offset-[#3A2B1A]
                  ${/quote/i.test(cta.label)
                    ? 'bg-[#C5862B] hover:bg-[#C5862B]/90 text-[#3A2B1A] shadow-lg hover:shadow-xl hover:shadow-[#C5862B]/25 transform hover:-translate-y-0.5 active:translate-y-0'
                    : 'bg-transparent hover:bg-[#F4E1C6]/10 text-[#F4E1C6] border-2 border-[#F4E1C6]/50 hover:border-[#F4E1C6] hover:text-white hover:bg-[#F4E1C6]/5'
                  }
                `}
              >
                <span className="relative z-10 inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                  {/view/i.test(cta.label) && (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  )}
                  {cta.label}
                  {/quote/i.test(cta.label) && (
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.1 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.81-.59a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/></svg>
                  )}
                </span>
                {/quote/i.test(cta.label) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C5862B] to-[#C5862B]/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-xl" />
                )}
              </a>
            ))
          ) : (
            <>
              {/* Fallback CTA buttons */}
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center min-h-[36px] sm:min-h-[40px] lg:min-h-[44px] xl:min-h-[48px] px-2.5 sm:px-3 lg:px-5 xl:px-6 py-2 sm:py-2.5 lg:py-3 xl:py-3.5 rounded-lg font-accent font-semibold text-xs sm:text-sm lg:text-base xl:text-lg transition-all duration-300 ease-out bg-[#C5862B] hover:bg-[#C5862B]/90 text-[#3A2B1A] shadow-lg hover:shadow-xl hover:shadow-[#C5862B]/25 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#C5862B] focus:ring-offset-2 focus:ring-offset-[#3A2B1A]"
              >
                <span className="relative z-10 inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.1 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.81-.59a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/></svg>
                  Get a Free Quote
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C5862B] to-[#C5862B]/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-lg" />
              </a>
              
              <a
                href="#portfolio"
                className="group inline-flex items-center justify-center min-h-[36px] sm:min-h-[40px] lg:min-h-[44px] xl:min-h-[48px] px-2.5 sm:px-3 lg:px-5 xl:px-6 py-2 sm:py-2.5 lg:py-3 xl:py-3.5 rounded-lg font-accent font-semibold text-xs sm:text-sm lg:text-base xl:text-lg transition-all duration-300 ease-out bg-transparent hover:bg-[#F4E1C6]/10 text-[#F4E1C6] border-2 border-[#F4E1C6]/50 hover:border-[#F4E1C6] hover:text-white hover:bg-[#F4E1C6]/5 focus:outline-none focus:ring-2 focus:ring-[#F4E1C6] focus:ring-offset-2 focus:ring-offset-[#3A2B1A]"
              >
                <span className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                  View Our Work
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </span>
              </a>
            </>
          )}
        </div>

        {/* Trust Indicators - Responsive spacing with reduced bottom margin */}
        <div className="mt-6 sm:mt-8 lg:mt-10 xl:mt-12 mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28">
          <TrustIndicators />
        </div>
      </div>

      {/* Scroll indicator - More visible and prominent */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 xl:bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 sm:w-7 sm:h-12 md:w-8 md:h-14 lg:w-9 lg:h-16 xl:w-10 xl:h-18 border-2 border-[#F4E1C6]/50 rounded-full flex justify-center bg-[#3A2B1A]/20 backdrop-blur-sm">
          <div className="w-1.5 h-2.5 sm:h-3 md:h-4 lg:h-5 xl:h-6 bg-[#C5862B] rounded-full mt-2 animate-pulse shadow-lg"></div>
        </div>
      </div>
    </section>
  )
}
