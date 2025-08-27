// Google My Business API Integration
// More reliable than Places API and includes business management features

interface GoogleMyBusinessReview {
  reviewId: string
  reviewer: {
    profilePhotoUri: string
    displayName: string
  }
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE'
  comment: string
  createTime: string
  updateTime: string
  reviewReply?: {
    comment: string
    updateTime: string
  }
}

interface GoogleMyBusinessLocation {
  name: string
  title: string
  storeCode: string
  websiteUri: string
  regularHours: {
    periods: Array<{
      openDay: string
      openTime: string
      closeDay: string
      closeTime: string
    }>
  }
  averageRating: number
  totalReviewCount: number
}

export async function fetchGoogleMyBusinessReviews(
  locationId: string, 
  accessToken: string
): Promise<{ location: GoogleMyBusinessLocation; reviews: GoogleMyBusinessReview[] } | null> {
  try {
    const baseUrl = 'https://mybusinessaccountmanagement.googleapis.com/v1'
    
    // Get location details
    const locationResponse = await fetch(`${baseUrl}/accounts/${locationId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!locationResponse.ok) {
      throw new Error(`Failed to fetch location: ${locationResponse.status}`)
    }
    
    const locationData = await locationResponse.json()
    
    // Get reviews for the location
    const reviewsResponse = await fetch(`${baseUrl}/accounts/${locationId}/reviews`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!reviewsResponse.ok) {
      throw new Error(`Failed to fetch reviews: ${reviewsResponse.status}`)
    }
    
    const reviewsData = await reviewsResponse.json()
    
    return {
      location: locationData,
      reviews: reviewsData.reviews || []
    }
  } catch (error) {
    console.error('Error fetching Google My Business reviews:', error)
    return null
  }
}

// Helper function to convert star rating to number
export function convertStarRating(rating: string): number {
  const ratingMap: Record<string, number> = {
    'ONE': 1,
    'TWO': 2,
    'THREE': 3,
    'FOUR': 4,
    'FIVE': 5
  }
  return ratingMap[rating] || 0
}

// Helper function to format review date
export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Legacy function for backward compatibility (deprecated)
export async function fetchGoogleReviews(placeId: string, apiKey: string): Promise<any> {
  console.warn('fetchGoogleReviews is deprecated. Use fetchGoogleMyBusinessReviews instead.')
  return null
}
