'use client'

import { HomepageData, MissionValue } from '../lib/types'

interface MissionProps {
  data: HomepageData
}

export default function Mission({ data }: MissionProps) {
  if (!data) return null

  return (
    <section id="mission" className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-[#F4E1C6]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-[#C5862B]/20 border border-[#C5862B]/30 rounded-full text-[#C5862B] font-accent text-xs sm:text-sm md:text-base uppercase tracking-wider mb-4 sm:mb-6 md:mb-8">
            Our Mission
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#3A2B1A] mb-4 sm:mb-6 md:mb-8 leading-tight">
            {data.missionTitle || 'What We Stand For'}
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-[#2E2B29]/80 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            Our mission is simple: to craft joinery that enhances lives, adds value, and stands the test of time.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {data.missionValues?.map((value: MissionValue, index: number) => (
            <div
              key={value._key}
              className="group text-center p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#F4E1C6]/50 hover:border-[#C5862B]/30"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#C5862B] to-[#6B4226] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {index === 0 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  )}
                  {index === 1 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  )}
                  {index === 2 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  )}
                  {index === 3 && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  )}
                </svg>
              </div>

              {/* Content */}
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-[#3A2B1A] mb-3 sm:mb-4 md:mb-6 group-hover:text-[#C5862B] transition-colors duration-300 leading-tight">
                {value.title}
              </h3>
              <p className="font-body text-sm sm:text-base md:text-lg text-[#2E2B29]/70 leading-relaxed">
                {value.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-[#3A2B1A] text-white rounded-full font-accent font-semibold hover:bg-[#6B4226] transition-colors duration-300 cursor-pointer group shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg">
            <span>Learn More About Us</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

