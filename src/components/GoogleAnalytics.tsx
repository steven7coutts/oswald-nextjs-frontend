'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Google Analytics 4 Measurement ID - Replace with your actual GA4 ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Google Analytics 4 Configuration
const GA_CONFIG = {
  measurement_id: GA_MEASUREMENT_ID,
  page_title: 'Oswald Joinery & Contractors',
  page_location: typeof window !== 'undefined' ? window.location.href : '',
  debug_mode: process.env.NODE_ENV === 'development',
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: GA_CONFIG.page_title,
      page_location: window.location.href,
      debug_mode: GA_CONFIG.debug_mode,
    })
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string, formType: string) => {
  trackEvent('form_submit', 'engagement', `${formName}_${formType}`)
}

// Track phone calls
export const trackPhoneCall = (phoneNumber: string) => {
  trackEvent('phone_call', 'engagement', phoneNumber)
}

// Track email clicks
export const trackEmailClick = (emailAddress: string) => {
  trackEvent('email_click', 'engagement', emailAddress)
}

// Track service interest
export const trackServiceInterest = (serviceName: string) => {
  trackEvent('service_interest', 'engagement', serviceName)
}

// Track portfolio views
export const trackPortfolioView = (projectName: string) => {
  trackEvent('portfolio_view', 'engagement', projectName)
}

// Track quote requests
export const trackQuoteRequest = (serviceType: string) => {
  trackEvent('quote_request', 'conversion', serviceType, 1)
}

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  if (depth === 25 || depth === 50 || depth === 75 || depth === 90) {
    trackEvent('scroll_depth', 'engagement', `${depth}%`)
  }
}

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  if (seconds >= 30) {
    trackEvent('time_on_page', 'engagement', `${Math.floor(seconds / 30) * 30}s+`)
  }
}

// Enhanced ecommerce tracking
export const trackEcommerceEvent = (eventName: string, parameters: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Main Google Analytics Component
export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views when route changes
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname, searchParams])

  // Track scroll depth
  useEffect(() => {
    if (typeof window === 'undefined') return

    let scrollTimeout: NodeJS.Timeout
    let lastScrollDepth = 0

    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset
        const docHeight = document.body.offsetHeight
        const winHeight = window.innerHeight
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100
        
        const currentScrollDepth = Math.floor(scrollPercent / 25) * 25
        
        if (currentScrollDepth > lastScrollDepth) {
          trackScrollDepth(currentScrollDepth)
          lastScrollDepth = currentScrollDepth
        }
      }, 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track time on page
  useEffect(() => {
    if (typeof window === 'undefined') return

    const startTime = Date.now()
    
    const trackTime = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      trackTimeOnPage(timeSpent)
    }

    const interval = setInterval(trackTime, 30000) // Check every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics Measurement ID not configured. Please set NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable.')
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: '${GA_CONFIG.page_title}',
              page_location: window.location.href,
              debug_mode: ${GA_CONFIG.debug_mode},
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure',
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
            });
            
            // Enhanced ecommerce
            gtag('config', '${GA_MEASUREMENT_ID}', {
              custom_map: {
                'custom_parameter_1': 'service_type',
                'custom_parameter_2': 'project_type',
                'custom_parameter_3': 'location',
              }
            });
          `,
        }}
      />
      
      {/* Google Tag Manager (Optional - for advanced tracking) */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
      )}
    </>
  )
}

// Declare global gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: any
    ) => void
    dataLayer: any[]
  }
}
