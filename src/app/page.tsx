import { client } from '@/lib/sanity.client'
import { homepageQuery, settingsQuery, servicesQuery, locationsQuery, projectsQuery } from '@/lib/queries'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import Hero from '@/components/Hero'
import ReviewsSection, { Review as FrontendReview } from '@/components/ReviewsSection'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import { HomepageData, SiteSettings, Service, Project, MissionValue, Location, SocialLink } from '@/lib/types'
import { unstable_cache } from 'next/cache'

const getHomepageCached = unstable_cache(
  async () => client.fetch(homepageQuery) as Promise<HomepageData>,
  ['sanity:homepage'],
  { tags: ['sanity:homepage'] }
)

const getSettingsCached = unstable_cache(
  async () => client.fetch(settingsQuery) as Promise<SiteSettings>,
  ['sanity:siteSettings'],
  { tags: ['sanity:siteSettings'] }
)

const getServicesCached = unstable_cache(
  async () => client.fetch(servicesQuery) as Promise<Service[]>,
  ['sanity:service'],
  { tags: ['sanity:service'] }
)

const getLocationsCached = unstable_cache(
  async () => client.fetch(locationsQuery) as Promise<Location[]>,
  ['sanity:location'],
  { tags: ['sanity:location'] }
)

const getProjectsCached = unstable_cache(
  async () => client.fetch(projectsQuery) as Promise<Project[]>,
  ['sanity:project'],
  { tags: ['sanity:project'] }
)

export default async function Home() {
  const [home, settings, services, locations, projects] = await Promise.all([
    getHomepageCached(),
    getSettingsCached(),
    getServicesCached(),
    getLocationsCached(),
    getProjectsCached(),
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
        <Portfolio data={home} projects={projects || []} />

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

        {/* CONTACT - Now handled by Contact component */}

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
