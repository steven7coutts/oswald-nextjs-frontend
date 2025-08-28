'use client'

import { HomepageData, SiteSettings } from '../lib/types'

interface ContactProps {
  data: HomepageData
  siteSettings: SiteSettings
}

export default function Contact({ data, siteSettings }: ContactProps) {
  if (!data || !siteSettings) return null

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-brand-gold/20 border border-brand-gold/30 rounded-full text-brand-gold font-accent text-sm uppercase tracking-wider mb-6">
            Get In Touch
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6">
            Start Your Project Today
          </h2>
          <p className="font-body text-xl text-brand-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            {data.contactIntro || 'Ready to discuss your next project? Get in touch and let&apos;s bring your ideas to life.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-brand-beige/30 rounded-2xl p-8 border border-brand-beige/50">
            <h3 className="font-heading text-2xl font-bold text-brand-dark mb-6">Request a Free Quote</h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-accent font-semibold text-brand-dark mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-brand-beige/50 rounded-lg focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300 font-body"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block font-accent font-semibold text-brand-dark mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-brand-beige/50 rounded-lg focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300 font-body"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-accent font-semibold text-brand-dark mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-brand-beige/50 rounded-lg focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300 font-body"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block font-accent font-semibold text-brand-dark mb-2">Service Required</label>
                <select className="w-full px-4 py-3 border border-brand-beige/50 rounded-lg focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300 font-body">
                  <option>Select a service</option>
                  <option>Kitchens</option>
                  <option>Wardrobes & Storage</option>
                  <option>Doors & Windows</option>
                  <option>Flooring</option>
                  <option>Staircases</option>
                  <option>Extensions & Renovations</option>
                  <option>Commercial Joinery</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block font-accent font-semibold text-brand-dark mb-2">Project Details</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-brand-beige/50 rounded-lg focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all duration-300 font-body resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="#services" className="w-full text-center bg-white border border-brand-gold text-brand-dark font-accent font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-brand-beige/40">
                  Explore Services
                </a>
                <button
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-accent font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-bold text-brand-dark mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-accent font-semibold text-brand-dark">Phone</div>
                    <div className="font-body text-brand-charcoal/80">{siteSettings.phone || '01738 000000'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-accent font-semibold text-brand-dark">Email</div>
                    <div className="font-body text-brand-charcoal/80">{siteSettings.email || 'info@oswaldjoinery.co.uk'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-accent font-semibold text-brand-dark">Address</div>
                    <div className="font-body text-brand-charcoal/80">{siteSettings.address || 'Perth, Perthshire'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-accent font-semibold text-brand-dark">Business Hours</div>
                    <div className="font-body text-brand-charcoal/80">{siteSettings.hours || 'Mon–Fri 8am–6pm'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div>
              <h4 className="font-heading text-xl font-bold text-brand-dark mb-4">Service Areas</h4>
              <p className="font-body text-brand-charcoal/80 mb-4">
                We proudly serve Perth and surrounding areas within 30 miles, including:
              </p>
              <div className="flex flex-wrap gap-2">
                {['Perth', 'Scone', 'Dunkeld', 'Crieff', 'Stirling', 'Dundee'].map((location) => (
                  <span key={location} className="px-3 py-1 bg-brand-gold/20 text-brand-dark font-accent text-sm rounded-full">
                    {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

