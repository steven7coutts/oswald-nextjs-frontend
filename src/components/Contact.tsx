'use client'

import { useState } from 'react'
import { HomepageData, SiteSettings } from '../lib/types'

interface ContactProps {
  data: HomepageData
  siteSettings: SiteSettings
}

export default function Contact({ data, siteSettings }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    postcode: '',
    service: '',
    budget: '',
    preferredTime: '',
    projectDetails: '',
    files: [] as File[],
    consent: false,
    honeypot: '' // Hidden anti-spam field
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required'
    if (!formData.service) newErrors.service = 'Please select a service'
    if (!formData.projectDetails.trim()) newErrors.projectDetails = 'Project details are required'
    if (!formData.consent) newErrors.consent = 'Please accept the terms'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'files') {
          formData.files.forEach(file => formDataToSend.append('files', file))
        } else if (key !== 'honeypot') {
          formDataToSend.append(key, value as string)
        }
      })
      
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        body: formDataToSend
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '', phone: '', email: '', postcode: '', service: '', budget: '', preferredTime: '', projectDetails: '', files: [], consent: false, honeypot: ''
        })
        setErrors({})
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData(prev => ({ ...prev, files: newFiles }))
    }
  }
  
  const removeFile = (index: number) => {
    setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }))
  }

  if (!data || !siteSettings) return null

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-[#C5862B]/20 border border-[#C5862B]/30 rounded-full text-[#C5862B] font-accent text-xs sm:text-sm md:text-base uppercase tracking-wider mb-4 sm:mb-6 md:mb-8">
            Get In Touch
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3A2B1A] mb-4 sm:mb-6 md:mb-8 leading-tight">
            Start Your Project Today
          </h2>
          <p className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-[#2E2B29] max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            {data.contactIntro || 'Ready to discuss your next project? Get in touch and let&apos;s bring your ideas to life.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {/* Contact Form */}
          <div className="bg-[#F4E1C6]/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-[#F4E1C6]/50">
            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#3A2B1A] mb-4 sm:mb-6 md:mb-8">Request a Free Quote</h3>
            
            <form className="space-y-4 sm:space-y-6 md:space-y-8" onSubmit={handleSubmit}>
              {/* Hidden honeypot field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block font-accent font-semibold text-[#3A2B1A] mb-2 text-sm sm:text-base">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#F4E1C6]/50 rounded-lg focus:border-[#C5862B] focus:ring-2 focus:ring-[#C5862B]/20 transition-all duration-300 font-body text-[#2E2B29] placeholder-[#6B4226]/60 text-sm sm:text-base"
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block font-accent font-semibold text-[#3A2B1A] mb-2 text-sm sm:text-base">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#F4E1C6]/50 rounded-lg focus:border-[#C5862B] focus:ring-2 focus:ring-[#C5862B]/20 transition-all duration-300 font-body text-[#2E2B29] placeholder-[#6B4226]/60 text-sm sm:text-base"
                    placeholder="Your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block font-accent font-semibold text-[#3A2B1A] mb-2 text-sm sm:text-base">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#F4E1C6]/50 rounded-lg focus:border-[#C5862B] focus:ring-2 focus:ring-[#C5862B]/20 transition-all duration-300 font-body text-[#2E2B29] placeholder-[#6B4226]/60 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block font-accent font-semibold text-[#3A2B1A] mb-2 text-sm sm:text-base">Postcode *</label>
                  <input
                    type="text"
                    required
                    value={formData.postcode}
                    onChange={(e) => setFormData(prev => ({ ...prev, postcode: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#F4E1C6]/50 rounded-lg focus:border-[#C5862B] focus:ring-2 focus:ring-[#C5862B]/20 transition-all duration-300 font-body text-[#2E2B29] placeholder-[#6B4226]/60 text-sm sm:text-base"
                    placeholder="e.g. PH1 1AA"
                  />
                  {errors.postcode && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.postcode}</p>}
                </div>
              </div>
              
              <div>
                <label className="block font-accent font-semibold text-[#3A2B1A] mb-2 text-sm sm:text-base">Service Required *</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#F4E1C6]/50 rounded-lg focus:border-[#C5862B] focus:ring-2 focus:ring-[#C5862B]/20 transition-all duration-300 font-body text-[#2E2B29] placeholder-[#6B4226]/60 text-sm sm:text-base"
                >
                  <option value="">Select a service</option>
                  <option value="kitchens">Kitchens</option>
                  <option value="wardrobes">Wardrobes & Storage</option>
                  <option value="doors">Doors & Windows</option>
                  <option value="flooring">Flooring</option>
                  <option value="staircases">Staircases</option>
                  <option value="extensions">Extensions & Renovations</option>
                  <option value="commercial">Commercial Joinery</option>
                  <option value="other">Other</option>
                </select>
                {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block font-accent font-semibold text-[#3A2B1A] mb-2 text-sm sm:text-base">Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#F4E1C6]/50 rounded-lg focus:border-[#C5862B] focus:ring-2 focus:ring-[#C5862B]/20 transition-all duration-300 font-body text-[#2E2B29] text-sm sm:text-base"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under £5,000</option>
                    <option value="5k-10k">£5,000 - £10,000</option>
                    <option value="10k-25k">£10,000 - £25,000</option>
                    <option value="25k-50k">£25,000 - £50,000</option>
                    <option value="over-50k">Over £50,000</option>
                  </select>
                </div>
                <div>
                  <label className="block font-accent font-semibold text-[#3A2B1A] mb-2 text-sm sm:text-base">Preferred Contact Time</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#F4E1C6]/50 rounded-lg focus:border-[#C5862B] focus:ring-2 focus:ring-[#C5862B]/20 transition-all duration-300 font-body text-[#2E2B29] text-sm sm:text-base"
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (9am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-5pm)</option>
                    <option value="evening">Evening (5pm-8pm)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block font-accent font-semibold text-[#3A2B1A] mb-2 text-sm sm:text-base">Project Details *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.projectDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDetails: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#F4E1C6]/50 rounded-lg focus:border-[#C5862B] focus:ring-2 focus:ring-[#C5862B]/20 transition-all duration-300 font-body resize-none text-[#2E2B29] placeholder-[#6B4226]/60 text-sm sm:text-base"
                  placeholder="Tell us about your project..."
                ></textarea>
                {errors.projectDetails && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.projectDetails}</p>}
              </div>
              
              {/* File Upload */}
              <div>
                <label className="block font-accent font-semibold text-[#3A2B1A] mb-2 text-sm sm:text-base">Upload Photos/Plans (Optional)</label>
                <div className="border-2 border-dashed border-[#F4E1C6]/50 rounded-lg p-4 sm:p-6 text-center hover:border-[#C5862B]/50 transition-colors duration-300">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-[#C5862B] mb-2">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-[#3A2B1A] font-medium text-sm sm:text-base">Click to upload files</p>
                    <p className="text-[#2E2B29]/60 text-xs sm:text-sm">Images, PDFs up to 10MB total</p>
                  </label>
                </div>
                
                {/* File List */}
                {formData.files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#F4E1C6]/20 rounded-lg">
                        <span className="text-[#3A2B1A] text-sm truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Consent Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-[#C5862B] border-[#F4E1C6]/50 rounded focus:ring-[#C5862B] focus:ring-2"
                />
                <label htmlFor="consent" className="text-[#3A2B1A] text-sm">
                  I consent to Oswald Joinery contacting me about my enquiry and storing my details for this purpose. *
                </label>
              </div>
              {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C5862B] hover:bg-[#C5862B]/90 disabled:bg-[#C5862B]/50 text-[#3A2B1A] font-accent font-semibold py-3 sm:py-4 md:py-5 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed text-sm sm:text-base md:text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#3A2B1A]/20 border-t-[#3A2B1A] rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base">Sending...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                  <p className="font-medium">Thank you! Your enquiry has been sent successfully.</p>
                  <p className="text-sm mt-1">We&apos;ll be in touch within 24 hours.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                  <p className="font-medium">Something went wrong. Please try again.</p>
                  <p className="text-sm mt-1">If the problem persists, please call us directly.</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#3A2B1A] mb-4 sm:mb-6 md:mb-8">Contact Information</h3>
              
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C5862B]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#C5862B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-accent font-semibold text-[#3A2B1A]">Phone</div>
                    <div className="font-body text-[#2E2B29]/80">{siteSettings.phone || '01738 000000'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C5862B]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#C5862B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-accent font-semibold text-[#3A2B1A]">Email</div>
                    <div className="font-body text-[#2E2B29]/80">{siteSettings.email || 'info@oswaldjoinery.co.uk'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C5862B]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#C5862B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-accent font-semibold text-[#3A2B1A]">Address</div>
                    <div className="font-body text-[#2E2B29]/80">{siteSettings.address || 'Perth, Perthshire'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C5862B]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#C5862B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-accent font-semibold text-[#3A2B1A]">Business Hours</div>
                    <div className="font-body text-[#2E2B29]/80">{siteSettings.hours || 'Mon–Fri 8am–6pm'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div>
              <h4 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-[#3A2B1A] mb-3 sm:mb-4 md:mb-6">Service Areas</h4>
              <p className="font-body text-[#2E2B29]/80 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base">
                We proudly serve Perth and surrounding areas within 30 miles, including:
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['Perth', 'Scone', 'Dunkeld', 'Crieff', 'Stirling', 'Dundee'].map((location) => (
                  <span key={location} className="px-2 sm:px-3 py-1 sm:py-2 bg-[#C5862B]/20 text-[#3A2B1A] font-accent text-xs sm:text-sm rounded-full">
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

