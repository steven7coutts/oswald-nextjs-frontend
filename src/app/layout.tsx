import type { Metadata } from "next";
import { Inter, Playfair_Display, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Favicon from "@/components/Favicon";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oswald Joinery & Contractors | Perth's Premier Joinery Service",
    template: "%s | Oswald Joinery & Contractors"
  },
  description: "Expert joinery services in Perthshire: bespoke kitchens, wardrobes, windows, staircases, flooring, and commercial joinery. Quality craftsmanship with over 10 years experience.",
  keywords: ["joinery", "Perth", "Perthshire", "bespoke kitchens", "wardrobes", "windows", "staircases", "flooring", "commercial joinery", "carpentry", "woodwork"],
  authors: [{ name: "Oswald Joinery & Contractors" }],
  creator: "Oswald Joinery & Contractors",
  publisher: "Oswald Joinery & Contractors",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://oswaldjoinery.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://oswaldjoinery.co.uk',
    siteName: 'Oswald Joinery & Contractors',
    title: "Oswald Joinery & Contractors | Perth's Premier Joinery Service",
    description: "Expert joinery services in Perthshire: bespoke kitchens, wardrobes, windows, staircases, flooring, and commercial joinery. Quality craftsmanship with over 10 years experience.",
    images: [
      {
        url: '/images/oswald-joinery-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Oswald Joinery & Contractors - Perth Joinery Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Oswald Joinery & Contractors | Perth's Premier Joinery Service",
    description: "Expert joinery services in Perthshire: bespoke kitchens, wardrobes, windows, staircases, flooring, and commercial joinery.",
    images: ['/images/oswald-joinery-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Favicon />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${robotoCondensed.variable} font-body antialiased`}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
