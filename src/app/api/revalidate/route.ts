import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'Missing secret' }, { status: 500 })
  }

  let payload: any
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const provided = request.nextUrl.searchParams.get('secret') || payload?.secret
  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  // Sanity default webhook payloads often include _type
  const docType = payload?._type || payload?.type || payload?.document?._type

  // Map Sanity types to cache tags used in the app
  const typeToTags: Record<string, string[]> = {
    homepage: ['sanity:homepage'],
    siteSettings: ['sanity:siteSettings'],
    service: ['sanity:service'],
    location: ['sanity:location'],
    project: ['sanity:project'],
    testimonial: ['sanity:homepage'],
  }

  const tags = (docType && typeToTags[docType]) || []

  if (tags.length === 0) {
    // Fallback: revalidate everything we know about
    const allTags = Array.from(
      new Set(Object.values(typeToTags).flat())
    )
    allTags.forEach((t) => revalidateTag(t))
    return NextResponse.json({ ok: true, revalidated: 'all' })
  }

  tags.forEach((t) => revalidateTag(t))
  return NextResponse.json({ ok: true, revalidated: tags })
}

export const runtime = 'edge'

