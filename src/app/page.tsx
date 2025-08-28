import { client } from '@/lib/sanity.client'
import { homepageQuery, settingsQuery, servicesQuery, locationsQuery, projectsQuery } from '@/lib/queries'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import Hero from '@/components/Hero'
import ReviewsSection, { Review as FrontendReview } from '@/components/ReviewsSection'
import Services from '@/components/Services'
import { HomepageData, SiteSettings, Service, Project, MissionValue, Location, SocialLink } from '@/lib/types'

export default async function Home() {
  const [home, settings, services, locations, projects] = await Promise.all([
    client.fetch(homepageQuery) as Promise<HomepageData>,
    client.fetch(settingsQuery) as Promise<SiteSettings>,
    client.fetch(servicesQuery) as Promise<Service[]>,
    client.fetch(locationsQuery) as Promise<Location[]>,
    client.fetch(projectsQuery) as Promise<Project[]>,
  ])

  return (
    <>
      {/* HEADER - Radiant Style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center">
              {settings?.logo ? (
                <Image
                  src={urlFor(settings.logo).width(900).height(900).url()}
                  alt={settings.brandName || 'Oswald Joinery'}
                  width={900}
                  height={900}
                  priority
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-4xl md:text-5xl lg:text-6xl">O</span>
                </div>
              )}
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-white/90 hover:text-yellow-400 transition-colors font-medium text-lg">Home</a>
              <a href="#services" className="text-white/90 hover:text-yellow-400 transition-colors font-medium text-lg">Services</a>
              <a href="#portfolio" className="text-white/90 hover:text-yellow-400 transition-colors font-medium text-lg">Portfolio</a>
              <a href="#about" className="text-white/90 hover:text-yellow-400 transition-colors font-medium text-lg">About</a>
              <a href="#contact" className="text-white/90 hover:text-yellow-400 transition-colors font-medium text-lg">Contact</a>
            </nav>
            
            {/* CTA Button */}
            <a 
              href="#contact" 
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg text-lg"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </header>

      <main className="min-h-screen">
        {/* HERO - Using Hero Component */}
        <Hero data={home} />

        {/* SERVICES */}
        <Services data={home} services={services} />

        {/* REVIEWS */}
        <ReviewsSection reviews={(home?.reviews || []).map((r) => ({
          _id: r._id || r.client,
          client: r.client,
          quote: r.quote,
          rating: r.rating,
          platform: (r.platform === 'google' || r.platform === 'trustpilot' || r.platform === 'direct') ? r.platform : 'direct',
          verified: Boolean(r.verified),
          externalUrl: r.externalUrl,
          reviewDate: r.reviewDate,
        })) as FrontendReview[]} />

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-24 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 text-sm font-semibold text-yellow-600 bg-yellow-50 rounded-full mb-6 border border-yellow-200">
                Our Work
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
                See Our Craftsmanship in Action
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {home?.portfolioIntro || 'Our portfolio showcases the detail, finish, and care that goes into every Oswald project.'}
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {(home?.featuredProjects || projects || []).slice(0, 6).map((p: Project) => (
                <article key={p.title} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all duration-300">
                  {p.cover ? (
                    <Image
                      src={urlFor(p.cover).width(800).height(600).url()}
                      alt={p.title}
                      width={800}
                      height={600}
                      className="aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
                      <span className="text-6xl text-yellow-400">🏠</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">{p.title}</h3>
                    {p.location && (
                      <span className="inline-block px-3 py-1 text-sm font-medium text-yellow-600 bg-yellow-50 rounded-full border border-yellow-200 mb-3">
                        {p.location}
                      </span>
                    )}
                    {p.summary && <p className="text-gray-600 text-sm leading-relaxed">{p.summary}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT & MISSION */}
        <section id="about" className="py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 text-sm font-semibold text-yellow-600 bg-yellow-50 rounded-full mb-6 border border-yellow-200">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
                {home?.aboutHeading || 'Craftsmanship with Integrity'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Oswald Joinery & Contractors is a Perth-based joinery business dedicated to delivering exceptional workmanship with a personal touch. Led by Dougie Oswald, we combine years of hands-on experience with a modern approach to design, materials, and customer service.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Whether it&apos;s a single room upgrade or a large-scale renovation, our focus is always the same: honest advice, flawless finishes, and long-lasting results.
                  </p>
                </div>
                
                <div className="mt-10 grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-yellow-500 mb-2">10+</div>
                    <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-yellow-500 mb-2">500+</div>
                    <div className="text-sm text-gray-600 font-medium">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-yellow-500 mb-2">100%</div>
                    <div className="text-sm text-gray-600 font-medium">Satisfaction</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {home?.aboutImage ? (
                  <Image
                    src={urlFor(home.aboutImage).width(600).height(400).url()}
                    alt="About Oswald Joinery"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-xl"
                  />
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-8xl text-yellow-400">🏗️</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
                {home?.missionTitle || 'What We Stand For'}
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Our mission is simple: to craft joinery that enhances lives, adds value, and stands the test of time.
              </p>
              
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {(home?.missionValues || [
                  { title: 'Quality First', body: 'Every cut, joint, and finish meets the highest standard.' },
                  { title: 'Customer Care', body: 'We listen, we plan, and we deliver exactly what&apos;s promised.' },
                  { title: 'Sustainability', body: 'Whenever possible, we source local, sustainable materials.' },
                  { title: 'Community Roots', body: 'Serving Perthshire and the surrounding areas with pride.' }
                ]).map((v: MissionValue) => (
                  <div key={v.title} className="rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-300 bg-white">
                    <h4 className="font-heading font-semibold text-gray-900 mb-3 text-lg">{v.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LOCATIONS */}
        <section id="locations" className="py-24 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
                Areas We Serve (30 miles of Perth)
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We provide professional joinery services across Perthshire and within 30 miles of Perth.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {locations?.map((l: Location) => (
                <span key={l.slug?.current || l.name} className="rounded-full border border-gray-200 px-6 py-3 text-sm bg-white text-gray-900 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300 font-medium">
                  {l.name}
                </span>
              )) || ['Perth', 'Scone', 'Bridge of Earn', 'Abernethy', 'Dunkeld', 'Crieff', 'Auchterarder', 'Blairgowrie', 'Coupar Angus', 'Kinross', 'Pitlochry', 'Methven', 'Alyth', 'Dunning'].map((location) => (
                <span key={location} className="rounded-full border border-gray-200 px-6 py-3 text-sm bg-white text-gray-900 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300 font-medium">
                  {location}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 text-sm font-semibold text-yellow-600 bg-yellow-50 rounded-full mb-6 border border-yellow-200">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
                Start Your Project Today
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {home?.contactIntro || 'Ready to discuss your next project? Get in touch and let&apos;s bring your ideas to life.'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">Request a Quote</h3>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <input type="text" placeholder="Name" className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-lg" />
                    <input type="tel" placeholder="Phone" className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-lg" />
                  </div>
                  <input type="email" placeholder="Email" className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-lg" />
                  <select className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-lg">
                    <option>Select Service</option>
                    {services?.map((s: Service) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    )) || ['Kitchens', 'Wardrobes & Storage', 'Doors & Windows', 'Flooring', 'Staircases', 'Commercial Joinery'].map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  <textarea rows={5} placeholder="Project Details" className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 text-lg resize-none"></textarea>
                  <button type="submit" className="w-full bg-yellow-500 text-white py-4 px-8 rounded-lg hover:bg-yellow-600 transition-all duration-300 font-semibold text-lg hover:scale-105">
                    Send Request
                  </button>
                </form>
              </div>
              
              <div>
                <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {settings?.phone && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center border border-yellow-200">
                        <span className="text-xl">📞</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">Phone</div>
                        <div className="text-gray-600">{settings.phone}</div>
                      </div>
                    </div>
                  )}
                  
                  {settings?.email && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center border border-yellow-200">
                        <span className="text-xl">✉️</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">Email</div>
                        <div className="text-gray-600">{settings.email}</div>
                      </div>
                    </div>
                  )}
                  
                  {settings?.address && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center border border-yellow-200">
                        <span className="text-xl">📍</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">Address</div>
                        <div className="text-gray-600">{settings.address}</div>
                      </div>
                    </div>
                  )}
                  
                  {settings?.hours && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center border border-yellow-200">
                        <span className="text-xl">🕒</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">Hours</div>
                        <div className="text-gray-600">{settings.hours}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 bg-gray-900 text-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-heading font-semibold text-yellow-400 mb-6">
                  {settings?.brandName || 'Oswald Joinery & Contractors'}
                </h3>
                <p className="text-gray-300 mb-6 text-lg">Crafted with Precision. Built to Last.</p>
                {settings?.phone && <p className="text-gray-400 mb-2">{settings.phone}</p>}
                {settings?.email && <p className="text-gray-400 mb-2">{settings.email}</p>}
                {settings?.address && <p className="text-gray-400">{settings.address}</p>}
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-yellow-400 mb-6 text-lg">Our Services</h4>
                <ul className="space-y-3">
                  {services?.slice(0, 6).map((s: Service) => (
                    <li key={s.title}>
                      <a href="#services" className="text-gray-300 hover:text-yellow-300 transition-colors duration-300">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-yellow-400 mb-6 text-lg">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="#home" className="text-gray-300 hover:text-yellow-300 transition-colors duration-300">Home</a></li>
                  <li><a href="#services" className="text-gray-300 hover:text-yellow-300 transition-colors duration-300">Services</a></li>
                  <li><a href="#portfolio" className="text-gray-300 hover:text-yellow-300 transition-colors duration-300">Portfolio</a></li>
                  <li><a href="#about" className="text-gray-300 hover:text-yellow-300 transition-colors duration-300">About</a></li>
                  <li><a href="#contact" className="text-gray-300 hover:text-yellow-300 transition-colors duration-300">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 sm:mb-0">
                © {new Date().getFullYear()} {settings?.brandName || 'Oswald Joinery & Contractors'}. All Rights Reserved.
              </p>
              <div className="flex gap-6">
                {(settings?.social || []).map((s: SocialLink) => (
                  <a key={s.label} href={s.url} className="text-gray-400 hover:text-yellow-300 transition-colors duration-300">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
