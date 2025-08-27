'use client'

import { HomepageData } from '../lib/types'

interface AboutProps {
  data: HomepageData
}

export default function About({ data }: AboutProps) {
  if (!data) return null

  return (
    <section id="about" className="py-24 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-brand-gold/20 border border-brand-gold/30 rounded-full text-brand-gold font-accent text-sm uppercase tracking-wider mb-6">
              About Us
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-beige mb-8">
              {data.aboutHeading || 'Craftsmanship with Integrity'}
            </h2>
            
            <div className="space-y-6 text-brand-beige/90">
              <p className="font-body text-lg leading-relaxed">
                {data.aboutBody || 'We combine traditional skills with modern tooling to deliver flawless finishes and long-lasting results.'}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-brand-gold/20">
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-brand-gold mb-2">10+</div>
                <div className="font-accent text-sm text-brand-beige/70 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-brand-gold mb-2">500+</div>
                <div className="font-accent text-sm text-brand-beige/70 uppercase tracking-wider">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-brand-gold mb-2">100%</div>
                <div className="font-accent text-sm text-brand-beige/70 uppercase tracking-wider">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-brand-gold/20 to-brand-medium/20 rounded-2xl p-8 border border-brand-gold/30">
              <div className="w-full h-full bg-gradient-to-br from-brand-beige/10 to-brand-gold/10 rounded-xl flex items-center justify-center">
                <svg className="w-32 h-32 text-brand-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-gold rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-medium rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

