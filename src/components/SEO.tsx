'use client'

import { SiteSettings, HomepageData } from '../lib/types'

interface SEOProps {
  siteSettings: SiteSettings
  homepageData?: HomepageData
  pageTitle?: string
  pageDescription?: string
  canonicalUrl?: string
  ogImage?: string
}

export default function SEO({ 
  siteSettings, 
  homepageData, 
  pageTitle, 
  pageDescription, 
  canonicalUrl,
  ogImage 
}: SEOProps) {
  const title = pageTitle || `${siteSettings?.brandName || 'Oswald Joinery & Contractors'} | Perth's Premier Joinery Service`
  const description = pageDescription || homepageData?.aboutBody || 'Expert joinery services in Perthshire: bespoke kitchens, wardrobes, windows, staircases, flooring, and commercial joinery. Quality craftsmanship with over 10 years experience.'
  const url = canonicalUrl || 'https://oswaldjoinery.co.uk'
  const image = ogImage || '/images/oswald-joinery-hero.jpg'
  const businessName = siteSettings?.brandName || 'Oswald Joinery & Contractors'
  const phone = siteSettings?.phone || '07494734546'
  const email = siteSettings?.email || 'dougie@oswaldjoinery.com'
  const address = siteSettings?.address || 'Perth, Perthshire'

  // JSON-LD Schema for Local Business
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "description": description,
    "url": url,
    "telephone": phone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Perth",
      "addressRegion": "Perthshire",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 56.3950,
      "longitude": -3.4308
    },
    "openingHours": "Mo-Fr 08:00-17:00",
    "priceRange": "££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "areaServed": [
      "Perth",
      "Scone", 
      "Bridge of Earn",
      "Abernethy",
      "Dunkeld",
      "Crieff",
      "Auchterarder",
      "Blairgowrie",
      "Coupar Angus",
      "Kinross",
      "Pitlochry",
      "Methven",
      "Alyth",
      "Dunning"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 56.3950,
        "longitude": -3.4308
      },
      "geoRadius": "30000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Joinery Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bespoke Kitchens",
            "description": "Custom kitchen design and installation"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Wardrobes & Storage",
            "description": "Custom wardrobe and storage solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Doors & Windows",
            "description": "Custom doors and window installation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Staircases & Balustrades", 
            "description": "Custom staircase design and installation"
          }
        }
      ]
    },
    "sameAs": siteSettings?.social?.map(social => social.url) || [],
    "image": image,
    "logo": siteSettings?.logo ? `${url}/images/oswald-logo.png` : undefined
  }

  return (
    <>
      {/* Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="joinery, Perth, Perthshire, bespoke kitchens, wardrobes, windows, staircases, flooring, commercial joinery, carpentry, woodwork" />
      <meta name="author" content={businessName} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={businessName} />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Local Business Meta */}
      <meta name="geo.region" content="GB-PER" />
      <meta name="geo.placename" content="Perth" />
      <meta name="geo.position" content="56.3950;-3.4308" />
      <meta name="ICBM" content="56.3950, -3.4308" />
      
      {/* Business Hours */}
      <meta name="business:contact_data:street_address" content="Perth, Perthshire" />
      <meta name="business:contact_data:locality" content="Perth" />
      <meta name="business:contact_data:region" content="Perthshire" />
      <meta name="business:contact_data:postal_code" content="PH1" />
      <meta name="business:contact_data:country_name" content="United Kingdom" />
      <meta name="business:contact_data:phone_number" content={phone} />
      <meta name="business:contact_data:email" content={email} />
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  )
}
