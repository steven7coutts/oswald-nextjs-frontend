'use client'

import { urlFor } from '@/lib/sanity.image'
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-dark via-brand-medium to-brand-charcoal">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Background Image Overlay */}
      {data.heroBg && (
        <div className="absolute inset-0 z-0">
          <img
            src={urlFor(data.heroBg).url()}
            alt="Premium joinery craftsmanship"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(0,12,24,0.60),rgba(0,10,20,0.85))]" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Pre-title */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-brand-gold/20 border border-brand-gold/30 rounded-full text-brand-gold font-accent text-sm uppercase tracking-wider">
            Perth&apos;s Premier Joinery
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-heading font-bold mb-6 md:mb-8 leading-[1.18] tracking-[-0.01em] text-[clamp(28px,4.5vw,56px)] md:text-[clamp(36px,5vw,64px)] text-shadow-soft">
          {/* Mobile: 3 lines for legibility */}
          <span className="block text-brand-beige md:hidden">
            {titleParts[0] || 'Bespoke Joinery'}
          </span>
          <span className="block text-brand-gold md:hidden">
            {titleParts[1] || 'Crafted with Precision'}
          </span>
          <span className="block text-brand-beige md:hidden">
            {titleParts[2] || 'Built to Last'}
          </span>

          {/* Desktop: single line */}
          <span className="hidden md:block text-brand-beige">
            {heroTitle}
          </span>
        </h1>
        
        {/* Subtitle - Single, elegant line */}
        <p className="font-body font-light text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto text-brand-beige/80 leading-relaxed">
          {data.heroSubtitle || 'Perth-based joinery delivering premium kitchens, storage, staircases and commercial fit-outs.'}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          {data.heroCTAs && data.heroCTAs.length > 0 ? (
            data.heroCTAs.map((cta: HeroCTA) => (
              <a
                key={cta._key}
                href={cta.href}
                className={`
                  group relative min-h-[48px] px-6 md:px-8 py-3 md:py-4 rounded-[10px] font-accent font-semibold text-base md:text-lg transition-all duration-500 overflow-hidden
                  ${/quote/i.test(cta.label)
                    ? 'bg-brand-gold hover:bg-brand-gold/90 text-brand-dark shadow-2xl hover:shadow-brand-gold/25 transform hover:-translate-y-1'
                    : 'bg-transparent hover:bg-brand-beige/10 text-brand-beige border-2 border-brand-beige/50 hover:border-brand-beige hover:text-white'
                  }
                `}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {/view/i.test(cta.label) && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  )}
                  {cta.label}
                  {/quote/i.test(cta.label) && (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.1 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.81-.59a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/></svg>
                  )}
                </span>
                {/quote/i.test(cta.label) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-brand-gold/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                )}
              </a>
            ))
          ) : (
            <>
              {/* Fallback CTA buttons */}
              <a
                href="#contact"
                className="group relative min-h-[48px] px-6 md:px-8 py-3 md:py-4 rounded-[10px] font-accent font-semibold text-base md:text-lg transition-all duration-500 overflow-hidden bg-brand-gold hover:bg-brand-gold/90 text-brand-dark shadow-2xl hover:shadow-brand-gold/25 transform hover:-translate-y-1"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.1 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L9 10a16 16 0 0 0 5 5l.81-.59a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/></svg>
                  Get a Free Quote
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold to-brand-gold/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </a>
              
              <a
                href="#portfolio"
                className="group min-h-[48px] px-6 md:px-8 py-3 md:py-4 rounded-[10px] font-accent font-semibold text-base md:text-lg transition-all duration-500 bg-transparent hover:bg-brand-beige/10 text-brand-beige border-2 border-brand-beige/50 hover:border-brand-beige hover:text-white"
              >
                <span className="inline-flex items-center gap-2">
                  View Our Work
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </span>
              </a>
            </>
          )}
        </div>



        {/* Trust Indicators */}
        <div className="mt-10 md:mt-12">
          <TrustIndicators />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-beige/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
