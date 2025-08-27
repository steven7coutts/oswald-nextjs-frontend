'use client'

import { useState, useEffect } from 'react'
import { UnifiedReview } from '@/lib/reviews-service'

interface ReviewWidgetProps {
  maxDisplay?: number
}

export default function ReviewWidget({ maxDisplay = 3 }: ReviewWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reviews, setReviews] = useState<UnifiedReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        // Try the new Sanity-based API route first, fallback to the old one
        let response = await fetch('/api/reviews-sanity?type=featured&count=' + maxDisplay)
        
        if (!response.ok) {
          // Fallback to old API route
          response = await fetch('/api/reviews?type=featured&count=' + maxDisplay)
        }
        
        if (!response.ok) throw new Error('Failed to fetch reviews')
        
        const data = await response.json()
        setReviews(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [maxDisplay])

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20">
        <div className="text-center text-white/80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading reviews...</p>
        </div>
      </div>
    )
  }

  if (error || !reviews.length) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20">
        <div className="text-center text-white/80">
          <p>Reviews coming soon...</p>
        </div>
      </div>
    )
  }



  const currentReview = reviews[currentIndex]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )
      case 'trustpilot':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
            <path d="M12 4l3.09 9.26L22 13.27l-5.5 4.73 1.5 8.5L12 22l-6-1.5 1.5-8.5L2 13.27l6.91.01z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google':
        return 'text-blue-600'
      case 'trustpilot':
        return 'text-green-600'
      default:
        return 'text-yellow-600'
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20">
      {/* Platform Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 ${getPlatformColor(currentReview.platform)}`}>
          {getPlatformIcon(currentReview.platform)}
          <span className="text-sm font-medium capitalize">
            {currentReview.platform === 'google' ? 'Google' : 
             currentReview.platform === 'trustpilot' ? 'Trustpilot' : 'Review'}
          </span>
          {currentReview.verified && (
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        
        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < currentReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Review Content */}
      <blockquote className="text-white/90 text-sm leading-relaxed mb-4 italic">
        &ldquo;{currentReview.content}&rdquo;
      </blockquote>

      {/* Client Name */}
      <div className="text-white/80 text-sm font-medium">
        — {currentReview.author}
      </div>

              {/* Navigation Dots */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}

      {/* External Link */}
      {currentReview.externalUrl && (
        <a
          href={currentReview.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/80 text-xs mt-3 transition-colors"
        >
          View on {currentReview.platform === 'google' ? 'Google' : 
                   currentReview.platform === 'trustpilot' ? 'Trustpilot' : 'our site'}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  )
}
