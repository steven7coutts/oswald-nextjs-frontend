import { client } from '@/lib/sanity.client'
import { settingsQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity.image'

export default async function Favicon() {
  const settings = await client.fetch(settingsQuery)
  
  if (!settings?.logo) {
    return null
  }

  const logoUrl = urlFor(settings.logo).width(32).height(32).url()
  
  return (
    <>
      <link rel="icon" type="image/png" sizes="32x32" href={logoUrl} />
      <link rel="icon" type="image/png" sizes="16x16" href={logoUrl} />
      <link rel="apple-touch-icon" sizes="180x180" href={logoUrl} />
      <link rel="icon" href={logoUrl} />
    </>
  )
}

