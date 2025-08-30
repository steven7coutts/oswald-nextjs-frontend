'use client'

import { Review } from '../lib/types'

interface ReviewsSectionProps {
  reviews: Review[]
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <section id="reviews" className="relative isolate bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-[#C5862B]">Testimonials</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-[#3A2B1A] sm:text-5xl">
              What Our Clients Say
            </p>
            <p className="mt-4 text-lg text-[#2E2B29]/70">
              No reviews available at the moment.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Create a featured review (first review gets special treatment)
  const featuredReview = reviews[0]
  
  // Group remaining reviews into columns for responsive layout
  const remainingReviews = reviews.slice(1)
  const column1 = remainingReviews.slice(0, Math.ceil(remainingReviews.length / 2))
  const column2 = remainingReviews.slice(Math.ceil(remainingReviews.length / 2))

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'google':
        return (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
        )
      case 'trustpilot':
        return (
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
              <path d="M12 4l3.09 9.26L22 13.27l-5.5 4.73 1.5 8.5L12 22l-6-1.5 1.5-8.5L2 13.27l6.91.01z"/>
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        )
    }
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <section id="reviews" className="relative isolate bg-white py-24 sm:py-32">
      {/* Background decorative elements */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="ml-[max(50%,38rem)] aspect-1313/771 w-328.25 bg-gradient-to-tr from-[#C5862B] to-[#F4E1C6]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="-ml-88 aspect-1313/771 w-328.25 flex-none origin-top-right rotate-30 bg-gradient-to-tr from-[#C5862B] to-[#F4E1C6] xl:mr-[calc(50%-12rem)] xl:ml-0"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold text-[#C5862B]">Testimonials</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-[#3A2B1A] sm:text-5xl">
            What Our Clients Say
          </p>
          <p className="mt-4 text-lg text-[#2E2B29]/70">
            Don&apos;t just take our word for it - see what our clients have to say about our work
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm text-[#2E2B29] sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          {/* Featured Review */}
          <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-[#F4E1C6]/20 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold tracking-tight text-[#3A2B1A] sm:p-12 sm:text-xl">
              <p>&ldquo;{featuredReview.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-[#F4E1C6]/20 px-6 py-4 sm:flex-nowrap">
              {getPlatformIcon(featuredReview.platform)}
              <div className="flex-auto">
                <div className="font-semibold text-[#3A2B1A]">{featuredReview.client}</div>
                <div className="text-[#2E2B29]/70">Verified Client</div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < featuredReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </figcaption>
          </figure>

          {/* Review Columns */}
          <div className="space-y-8 xl:contents xl:space-y-0">
            {/* Column 1 */}
            <div className="space-y-8">
              {column1.map((review) => (
                <figure
                  key={review._id}
                  className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-[#F4E1C6]/20"
                >
                  <blockquote className="text-[#2E2B29]">
                    <p>&ldquo;{review.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    {getPlatformIcon(review.platform)}
                    <div>
                      <div className="font-semibold text-[#3A2B1A]">{review.client}</div>
                      <div className="text-[#2E2B29]/70">Verified Client</div>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              {column2.map((review) => (
                <figure
                  key={review._id}
                  className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-[#F4E1C6]/20"
                >
                  <blockquote className="text-[#2E2B29]">
                    <p>&ldquo;{review.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    {getPlatformIcon(review.platform)}
                    <div>
                      <div className="font-semibold text-[#3A2B1A]">{review.client}</div>
                      <div className="text-[#2E2B29]/70">Verified Client</div>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
