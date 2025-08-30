// Core shared types for Oswald Next.js frontend

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface Service {
  _id: string
  title: string
  category: 'residential' | 'commercial' | 'specialist'
  serviceType: string
  iconName?: string
  icon?: SanityImage
  slug?: string
  excerpt: string
  featured?: boolean
  order?: number
}

export interface Project {
  _id: string
  title: string
  location: string
  projectType?: string
  cover?: SanityImage
  gallery?: SanityImage[]
  images?: SanityImage[]
  slug?: string
  summary: string
  featured?: boolean
  order?: number
  services: Service[]
}

export interface Testimonial {
  _id: string
  client: string
  quote: string
  rating: number
  platform: string
  verified: boolean
  featured?: boolean
  externalUrl?: string
  reviewDate: string
}

export interface MissionValue {
  _key?: string
  title: string
  body: string
}

export interface HeroCTA {
  _key?: string
  label: string
  href: string
}

export interface SocialLink {
  label: string
  url: string
}

export interface HomepageData {
  heroTitle?: string
  heroSubtitle?: string
  heroBg?: SanityImage
  heroCTAs?: HeroCTA[]
  servicesIntro?: string
  portfolioIntro?: string
  aboutHeading?: string
  aboutBody?: string
  aboutImage?: SanityImage
  aboutStats?: Array<{ number: string; label: string }>
  aboutAdditionalContent?: string
  missionTitle?: string
  missionValues?: MissionValue[]
  contactIntro?: string
  mapEmbedUrl?: string
  trustIndicators?: Array<{ number: string; label: string }>
  featuredServices?: Service[]
  featuredProjects?: Project[]
  reviews?: Testimonial[]
  seo?: unknown
}

export interface SiteSettings {
  brandName?: string
  logo?: SanityImage
  phone?: string
  email?: string
  address?: string
  hours?: string
  social?: SocialLink[]
  seo?: unknown
}

export interface Location {
  _id: string
  name: string
  slug?: { current: string }
}