import { client } from '@/lib/sanity.client'
import { homepageQuery, settingsQuery, servicesQuery, locationsQuery, projectsQuery } from '@/lib/queries'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ReviewsSection from '@/components/ReviewsSection'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'
import { HomepageData, SiteSettings, Service, Project, MissionValue, Location } from '@/lib/types'
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
      {/* SEO Component */}
      <SEO 
        siteSettings={settings} 
        homepageData={home}
        pageTitle="Oswald Joinery & Contractors | Perth's Premier Joinery Service"
        pageDescription="Expert joinery services in Perthshire: bespoke kitchens, wardrobes, windows, staircases, flooring, and commercial joinery. Quality craftsmanship with over 10 years experience."
        canonicalUrl="https://oswaldjoinery.co.uk"
      />

      {/* HEADER - Using Header Component */}
      <Header siteSettings={settings} />

      <main className="min-h-screen" role="main">
        {/* HERO - Using Hero Component */}
        <Hero data={home} />

        {/* SERVICES */}
        <Services data={home} services={services} />

        {/* REVIEWS */}
        <ReviewsSection reviews={home?.reviews || []} />

        {/* PORTFOLIO */}
        <Portfolio data={home} projects={projects || []} />

        {/* ABOUT & MISSION */}
        <section id="about" className="py-24 bg-white" aria-labelledby="about-heading">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 text-sm font-semibold text-yellow-600 bg-yellow-50 rounded-full mb-6 border border-yellow-200">
                About Us
              </span>
              <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
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
                
                <div className="mt-10 grid grid-cols-3 gap-6" role="region" aria-label="Company Statistics">
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-yellow-500 mb-2" aria-label="Over 10 years of experience">10+</div>
                    <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-yellow-500 mb-2" aria-label="Over 500 projects completed">500+</div>
                    <div className="text-sm text-gray-600 font-medium">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-yellow-500 mb-2" aria-label="100 percent client satisfaction">100%</div>
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
        <section id="locations" className="py-24 bg-gray-50" aria-labelledby="locations-heading">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 id="locations-heading" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
                Areas We Serve (30 miles of Perth)
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We provide professional joinery services across Perthshire and within 30 miles of Perth.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center" role="region" aria-label="Service Areas">
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
        <Contact data={home} siteSettings={settings} />

        {/* FOOTER */}
        <Footer siteSettings={settings} services={services} />
      </main>
    </>
  )
}
