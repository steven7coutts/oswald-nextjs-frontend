import imageUrlBuilder from '@sanity/image-url'
import { SanityImage } from './types'

const client = {
  projectId: 'tzflc62u',
  dataset: 'production',
}

export const urlFor = (source: SanityImage) => imageUrlBuilder(client).image(source)


