import { fetchGoogleMyBusinessReviews, convertStarRating, formatReviewDate } from './google-reviews'
import { fetchTrustpilotReviews } from './trustpilot-reviews'

export interface UnifiedReview {
  id: string
  platform: 'google' | 'trustpilot'
  author: string
  rating: number
  title?: string
  content: string
  date: string
  verified: boolean
  profileImage?: string
  externalUrl: string
  relativeTime: string
}

export interface ReviewsSummary {
  totalReviews: number
  averageRating: number
  platformBreakdown: {
    google: { count: number; rating: number }
    trustpilot: { count: number; rating: number }
  }
  latestReviews: UnifiedReview[]
}

export class ReviewsService {
  private googleApiKey: string
  private googlePlaceId: string
  private trustpilotBusinessId: string
  private trustpilotApiKey?: string

  constructor(
    googleApiKey: string,
    googlePlaceId: string,
    trustpilotBusinessId: string,
    trustpilotApiKey?: string
  ) {
    this.googleApiKey = googleApiKey
    this.googlePlaceId = googlePlaceId
    this.trustpilotBusinessId = trustpilotBusinessId
    this.trustpilotApiKey = trustpilotApiKey
  }

  async fetchAllReviews(): Promise<ReviewsSummary> {
    try {
      // Fetch reviews from both platforms in parallel
      const [googleData, trustpilotData] = await Promise.all([
        // Note: Google My Business API requires OAuth2 setup
        // For now, we'll use a placeholder until OAuth2 is configured
        Promise.resolve(null), // Placeholder for Google reviews
        fetchTrustpilotReviews(this.trustpilotBusinessId, this.trustpilotApiKey)
      ])

      // Convert to unified format
      const googleReviews: UnifiedReview[] = []
      // TODO: Implement Google My Business API integration with OAuth2
      // const googleReviews: UnifiedReview[] = (googleData?.reviews || []).map(review => ({
      //   id: `google-${review.reviewId}`,
      //   platform: 'google',
      //   author: review.reviewer.displayName,
      //   rating: convertStarRating(review.starRating),
      //   content: review.comment,
      //   date: review.createTime,
      //   verified: true,
      //   profileImage: review.reviewer.profilePhotoUri,
      //   externalUrl: '',
      //   relativeTime: formatReviewDate(review.createTime)
      // }))

      const trustpilotReviews: UnifiedReview[] = (trustpilotData?.reviews || []).map(review => ({
        id: `trustpilot-${review.id}`,
        platform: 'trustpilot',
        author: review.consumer.displayName,
        rating: review.stars,
        title: review.title,
        content: review.text,
        date: review.createdAt,
        verified: review.isVerified,
        profileImage: review.consumer.profileImageUrl,
        externalUrl: review.url,
        relativeTime: this.getRelativeTime(review.createdAt)
      }))

      // Combine and sort by date (newest first)
      const allReviews = [...googleReviews, ...trustpilotReviews]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      // Calculate summary statistics
      const totalReviews = allReviews.length
      const averageRating = totalReviews > 0 
        ? allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
        : 0

      const googleReviewsFiltered = allReviews.filter(r => r.platform === 'google')
      const trustpilotReviewsFiltered = allReviews.filter(r => r.platform === 'trustpilot')

      const platformBreakdown = {
        google: {
          count: googleReviewsFiltered.length,
          rating: googleReviewsFiltered.length > 0 
            ? googleReviewsFiltered.reduce((sum, r) => sum + r.rating, 0) / googleReviewsFiltered.length 
            : 0
        },
        trustpilot: {
          count: trustpilotReviewsFiltered.length,
          rating: trustpilotReviewsFiltered.length > 0 
            ? trustpilotReviewsFiltered.reduce((sum, r) => sum + r.rating, 0) / trustpilotReviewsFiltered.length 
            : 0
        }
      }

      return {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        platformBreakdown,
        latestReviews: allReviews.slice(0, 10) // Get latest 10 reviews
      }
    } catch (error) {
      console.error('Error fetching all reviews:', error)
      return {
        totalReviews: 0,
        averageRating: 0,
        platformBreakdown: {
          google: { count: 0, rating: 0 },
          trustpilot: { count: 0, rating: 0 }
        },
        latestReviews: []
      }
    }
  }

  async getFeaturedReviews(count: number = 3): Promise<UnifiedReview[]> {
    const summary = await this.fetchAllReviews()
    return summary.latestReviews
      .filter(review => review.rating >= 4) // Only 4+ star reviews
      .slice(0, count)
  }

  private getRelativeTime(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }
}

// Environment variables for API configuration
export const reviewsService = new ReviewsService(
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '',
  process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_ID || '',
  process.env.NEXT_PUBLIC_TRUSTPILOT_API_KEY
)
