'use client'

import { useState } from 'react'
import Image from 'next/image'

interface TrustIndicatorsProps {
  className?: string
}

export default function TrustIndicators({ className = '' }: TrustIndicatorsProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews')
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const trustPlatforms = [
    {
      id: 'google',
      name: 'Google',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      color: 'text-blue-600',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      id: 'trustpilot',
      name: 'Trustpilot',
      icon: (
        <Image src="/trustpilot.svg" alt="Trustpilot" width={24} height={24} />
      ),
      color: 'text-green-600',
      bgColor: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    }
  ]

  return (
    <div className={`trust-indicators ${className}`}>
      <div className="flex items-center gap-6">
        {trustPlatforms.map((platform) => (
          <button
            key={platform.id}
            onClick={scrollToReviews}
            onMouseEnter={() => setIsHovered(platform.id)}
            onMouseLeave={() => setIsHovered(null)}
            className={`
              group flex items-center gap-3 px-4 py-3 rounded-lg
              bg-white/10 backdrop-blur-sm border border-white/20
              transition-all duration-300 cursor-pointer
              hover:bg-white/20 hover:border-white/40 hover:scale-105
              ${isHovered === platform.id ? 'bg-white/20 border-white/40' : ''}
            `}
            aria-label={`View our ${platform.name} reviews`}
          >
            {/* Platform Icon */}
            <div className={`
              p-2 rounded-full ${platform.bgColor} ${platform.hoverColor}
              transition-colors duration-300
            `}>
              <div className="text-white">
                {platform.icon}
              </div>
            </div>
            
            {/* Platform Info */}
            <div className="text-left">
              <div className="text-white/80 text-sm font-medium">
                {platform.name}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Arrow Icon */}
            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        ))}
      </div>
      
      {/* Trust Text */}
      <div className="text-center mt-4">
        <p className="text-white/70 text-sm font-medium">
          Trusted by our clients • Click to see reviews
        </p>
      </div>
    </div>
  )
}
