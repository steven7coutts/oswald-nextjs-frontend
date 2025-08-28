// Trustpilot Reviews API Integration
// Trustpilot has a public API for business reviews

interface TrustpilotReview {
  id: string
  stars: number
  title: string
  text: string
  consumer: {
    displayName: string
    profileImageUrl?: string
  }
  createdAt: string
  isVerified: boolean
  language: string
  url: string
}

interface TrustpilotBusiness {
  id: string
  name: string
  displayName: string
  numberOfReviews: {
    total: number
    oneStar: number
    twoStars: number
    threeStars: number
    fourStars: number
    fiveStars: number
  }
  trustScore: number
  stars: number
  logoUrl?: string
  websiteUrl?: string
}

interface TrustpilotResponse {
  business: TrustpilotBusiness
  reviews: TrustpilotReview[]
}

export async function fetchTrustpilotReviews(businessId: string, apiKey?: string): Promise<TrustpilotResponse | null> {
  try {
    // Trustpilot public API endpoint
    const businessUrl = `https://api.trustpilot.com/v1/business-units/${businessId}`
    const reviewsUrl = `https://api.trustpilot.com/v1/business-units/${businessId}/reviews`
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    }
    
    // Add API key if available (optional for public data)
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }
    
    // Fetch business details and reviews in parallel
    const [businessResponse, reviewsResponse] = await Promise.all([
      fetch(businessUrl, { headers }),
      fetch(reviewsUrl, { headers })
    ])
    
    if (!businessResponse.ok || !reviewsResponse.ok) {
      throw new Error(`API request failed: ${businessResponse.status} ${reviewsResponse.status}`)
    }
    
    const businessData = await businessResponse.json()
    const reviewsData = await reviewsResponse.json()
    
    return {
      business: {
        id: businessData.id,
        name: businessData.name,
        displayName: businessData.displayName,
        numberOfReviews: businessData.numberOfReviews,
        trustScore: businessData.trustScore,
        stars: businessData.stars,
        logoUrl: businessData.logoUrl,
        websiteUrl: businessData.websiteUrl
      },
      reviews: reviewsData.reviews.map((review: {
        id: string
        stars: number
        title: string
        text: string
        consumer: { displayName: string; profileImageUrl?: string }
        createdAt: string
        isVerified: boolean
        language: string
        url: string
      }) => ({
        id: review.id,
        stars: review.stars,
        title: review.title,
        text: review.text,
        consumer: {
          displayName: review.consumer.displayName,
          profileImageUrl: review.consumer.profileImageUrl
        },
        createdAt: review.createdAt,
        isVerified: review.isVerified,
        language: review.language,
        url: review.url
      }))
    }
  } catch (error) {
    console.error('Error fetching Trustpilot reviews:', error)
    return null
  }
}

// Alternative: Scrape Trustpilot reviews (fallback)
export async function scrapeTrustpilotReviews(businessUrl: string): Promise<TrustpilotReview[]> {
  // This would require a server-side implementation
  // as client-side scraping is blocked by CORS
  console.warn('Trustpilot review scraping requires server-side implementation')
  return []
}
