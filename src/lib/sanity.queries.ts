import { client } from './sanity.client'

// Site Settings
export async function getSiteSettings() {
  return await client.fetch(`*[_type == "siteSettings"][0]`)
}

// Homepage
export async function getHomepage() {
  return await client.fetch(`*[_type == "homepage"][0]{
    ...,
    featuredServices[]->,
    featuredProjects[]->
  }`)
}

// Services
export async function getServices() {
  return await client.fetch(`*[_type == "service"] | order(title asc)`)
}

// Projects
export async function getProjects() {
  return await client.fetch(`*[_type == "project"] | order(_createdAt desc)`)
}

// Locations
export async function getLocations() {
  return await client.fetch(`*[_type == "location"] | order(name asc)`)
}

// Testimonials
export async function getTestimonials() {
  return await client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`)
}

