import { NextRequest, NextResponse } from 'next/server'
import { ReviewsService } from '@/lib/reviews-service'

// Initialize the reviews service with environment variables
const reviewsService = new ReviewsService(
  process.env.GOOGLE_API_KEY || '',
  process.env.GOOGLE_PLACE_ID || '',
  process.env.TRUSTPILOT_BUSINESS_ID || '',
  process.env.TRUSTPILOT_API_KEY
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'all', 'featured', 'google', 'trustpilot'
    const count = parseInt(searchParams.get('count') || '10')

    let result

    switch (type) {
      case 'featured':
        result = await reviewsService.getFeaturedReviews(count)
        break
      case 'google':
        const allReviews = await reviewsService.fetchAllReviews()
        result = allReviews.latestReviews.filter(r => r.platform === 'google')
        break
      case 'trustpilot':
        const allReviews2 = await reviewsService.fetchAllReviews()
        result = allReviews2.latestReviews.filter(r => r.platform === 'trustpilot')
        break
      default:
        result = await reviewsService.fetchAllReviews()
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in reviews API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
