'use client'

import { useState, useMemo } from 'react'
import { HomepageData, Project, SanityImage } from '../lib/types'
import Image from 'next/image'
import { urlFor } from '../lib/sanity.image'

interface PortfolioProps {
  data: HomepageData
  projects: Project[]
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

// Project Modal Component
function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 shadow-lg"
        >
          <svg className="w-6 h-6 text-[#3A2B1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Project Header */}
        <div className="relative h-64 md:h-80 rounded-t-2xl overflow-hidden">
          {project.cover ? (
            <Image
              src={urlFor(project.cover as SanityImage).width(1600).height(900).fit('crop').url()}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F4E1C6] to-[#C5862B]/20" />
          )}
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <div className="px-4 py-2 bg-[#C5862B] text-[#3A2B1A] font-accent text-sm font-bold rounded-full shadow-lg">
                ⭐ Featured Project
              </div>
            </div>
          )}

          {/* Location & Project Type */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#3A2B1A] font-accent text-sm rounded-full">
              📍 {project.location}
            </span>
            {project.projectType && (
              <span className="px-3 py-1 bg-[#3A2B1A]/90 text-white font-accent text-sm rounded-full">
                🏗️ {project.projectType}
              </span>
            )}
          </div>

          {/* Project Title Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A2B1A]/90 via-transparent to-transparent flex items-end">
            <div className="p-6 text-white">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">{project.title}</h2>
              <p className="font-body text-[#F4E1C6]/90 text-lg">{project.summary}</p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6 md:p-8">
          {/* Project Description */}
          <div className="mb-8">
            <h3 className="font-heading text-2xl font-bold text-[#3A2B1A] mb-4">Project Overview</h3>
            <p className="font-body text-[#2E2B29]/80 text-lg leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Services Used */}
            <div>
              <h4 className="font-heading text-xl font-bold text-[#3A2B1A] mb-3">Services Provided</h4>
              <div className="space-y-2">
                {project.services.map((service) => (
                  <div key={service._id} className="flex items-center gap-3 p-3 bg-[#F4E1C6]/20 rounded-lg border border-[#C5862B]/20">
                    <div className="w-3 h-3 bg-[#C5862B] rounded-full"></div>
                    <span className="font-body text-[#2E2B29] font-medium">{service.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Specifications */}
            <div>
              <h4 className="font-heading text-xl font-bold text-[#3A2B1A] mb-3">Project Details</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[#C5862B]">📍</span>
                  <span className="font-body text-[#2E2B29]">Location: {project.location}</span>
                </div>
                {project.projectType && (
                  <div className="flex items-center gap-3">
                    <span className="text-[#C5862B]">🏗️</span>
                    <span className="font-body text-[#2E2B29]">Type: {project.projectType}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-[#C5862B]">⭐</span>
                  <span className="font-body text-[#2E2B29]">Featured: {project.featured ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Cover Image */}
          {project.cover && (
            <div className="mb-8">
              <h4 className="font-heading text-xl font-bold text-[#3A2B1A] mb-4">Project Image</h4>
              <div className="rounded-lg overflow-hidden aspect-video relative">
                <Image
                  src={urlFor(project.cover as SanityImage).width(1600).height(900).fit('crop').url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              </div>
            </div>
          )}

          {/* Gallery */}
          {(project.gallery || project.images)?.length ? (
            <div className="mb-8">
              <h4 className="font-heading text-xl font-bold text-[#3A2B1A] mb-4">Gallery</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {((project.gallery || project.images) as SanityImage[]).slice(0, 9).map((img, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(img).width(800).height(600).fit('crop').url()}
                      alt={img.alt || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-8 py-4 bg-[#C5862B] text-[#3A2B1A] rounded-full font-accent font-semibold hover:bg-[#C5862B]/90 transition-colors duration-300 shadow-lg">
              Get Similar Quote
            </a>
            <button onClick={onClose} className="px-8 py-4 bg-[#3A2B1A] text-white rounded-full font-accent font-semibold hover:bg-[#6B4226] transition-colors duration-300 shadow-lg">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio({ data, projects }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'specialist'>('all')
  const [selectedService, setSelectedService] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get all unique services for filtering
  const allServices = useMemo(() => {
    const serviceSet = new Set<string>()
    if (projects) {
      projects.forEach(project => {
        project.services.forEach(service => {
          serviceSet.add(service._id)
        })
      })
    }
    return Array.from(serviceSet)
  }, [projects])

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    if (!projects) return []
    
    let filtered = projects

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => 
        project.services.some(service => service.category === activeFilter)
      )
    }

    // Filter by specific service
    if (selectedService !== 'all') {
      filtered = filtered.filter(project => 
        project.services.some(service => service._id === selectedService)
      )
    }

    return filtered
  }, [projects, activeFilter, selectedService])

  // Handle project selection
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  if (!data || !projects) return null

  return (
    <>
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#C5862B]/20 border border-[#C5862B]/30 rounded-full text-[#C5862B] font-accent text-sm uppercase tracking-wider mb-6">
              Our Work
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#3A2B1A] mb-6">
              See Our Craftsmanship in Action
            </h2>
            <p className="font-body text-xl text-[#2E2B29]/80 max-w-3xl mx-auto leading-relaxed">
              {data.portfolioIntro || 'Our portfolio showcases the detail, finish, and care that goes into every Oswald project.'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { key: 'all', label: 'All Projects', count: projects.length },
              { key: 'residential', label: 'Residential', count: projects.filter(p => p.services.some(s => s.category === 'residential')).length },
              { key: 'commercial', label: 'Commercial', count: projects.filter(p => p.services.some(s => s.category === 'commercial')).length },
              { key: 'specialist', label: 'Specialist', count: projects.filter(p => p.services.some(s => s.category === 'specialist')).length }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as 'all' | 'residential' | 'commercial' | 'specialist')}
                className={`
                  px-6 py-3 rounded-full font-accent font-semibold transition-all duration-300
                  ${activeFilter === filter.key
                    ? 'bg-[#3A2B1A] text-white shadow-lg scale-105'
                    : 'bg-white/80 text-[#3A2B1A] hover:bg-white hover:scale-105 border border-[#F4E1C6]/50'
                  }
                `}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Service Filter */}
          {allServices.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setSelectedService('all')}
                className={`
                  px-4 py-2 rounded-full font-accent text-sm font-medium transition-all duration-300
                  ${selectedService === 'all'
                    ? 'bg-[#C5862B] text-[#3A2B1A] shadow-md'
                    : 'bg-[#F4E1C6]/50 text-[#3A2B1A] hover:bg-[#F4E1C6]/70'
                  }
                `}
              >
                All Services
              </button>
              {projects.flatMap(p => p.services)
                .filter((service, index, arr) => arr.findIndex(s => s._id === service._id) === index)
                .map((service) => (
                  <button
                    key={service._id}
                    onClick={() => setSelectedService(service._id)}
                    className={`
                      px-4 py-2 rounded-full font-accent text-sm font-medium transition-all duration-300
                      ${selectedService === service._id
                        ? 'bg-[#C5862B] text-[#3A2B1A] shadow-md'
                        : 'bg-[#F4E1C6]/50 text-[#3A2B1A] hover:bg-[#F4E1C6]/70'
                      }
                    `}
                  >
                    {service.title}
                  </button>
                ))}
            </div>
          )}

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                onClick={() => handleProjectClick(project)}
                className={`
                  group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                  transition-all duration-500 transform hover:-translate-y-2 cursor-pointer
                  ${project.featured ? 'ring-2 ring-[#C5862B] ring-opacity-50' : ''}
                `}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 bg-[#C5862B] text-[#3A2B1A] font-accent text-sm font-bold rounded-full shadow-lg">
                      Featured
                    </div>
                  </div>
                )}

                {/* Project Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {project.cover ? (
                    <Image
                      src={urlFor(project.cover as SanityImage).width(800).height(600).fit('crop').url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F4E1C6] to-[#C5862B]/20" />
                  )}
                  <div className="absolute inset-0 bg-[#3A2B1A]/20 group-hover:bg-[#3A2B1A]/40 transition-colors duration-500"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#3A2B1A] font-accent text-sm rounded-full">
                      {project.location}
                    </span>
                    {project.projectType && (
                      <span className="px-3 py-1 bg-[#3A2B1A]/90 text-white font-accent text-sm rounded-full">
                        {project.projectType}
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3A2B1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 text-white">
                      <h4 className="font-heading text-xl font-bold mb-2">{project.title}</h4>
                      <p className="font-body text-[#F4E1C6]/90 text-sm">{project.summary}</p>
                    </div>
                  </div>

                  {/* Click Indicator */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-[#C5862B] rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-[#3A2B1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-[#3A2B1A] mb-3 group-hover:text-[#C5862B] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-body text-[#2E2B29]/70 text-sm mb-4">
                    {project.summary}
                  </p>

                  {/* Service Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.map((service) => (
                      <span
                        key={service._id}
                        className="px-3 py-1 rounded-full font-accent text-xs font-medium bg-[#F4E1C6]/50 text-[#3A2B1A] border border-[#C5862B]/30"
                      >
                        {service.title}
                      </span>
                    ))}
                  </div>
                  
                  {/* Click to View Text */}
                  <div className="inline-flex items-center gap-2 text-[#C5862B] font-accent font-semibold text-sm group">
                    <span>Click to View Details</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-8 text-[#2E2B29]/60 font-body">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>

          {/* CTA Section removed for one-page site */}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
