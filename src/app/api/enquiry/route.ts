import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('API route called')
  try {
    const formData = await request.formData()
    console.log('FormData received:', formData)
    
    // Check honeypot field for spam protection
    const honeypot = formData.get('honeypot')
    if (honeypot && honeypot !== '') {
      // Bot filled out hidden field, reject
      return NextResponse.json({ success: false, error: 'Invalid submission' }, { status: 400 })
    }
    
    // Extract form data
    const enquiryData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      postcode: formData.get('postcode') as string,
      service: formData.get('service') as string,
      budget: formData.get('budget') as string,
      preferredTime: formData.get('preferredTime') as string,
      projectDetails: formData.get('projectDetails') as string,
      consent: formData.get('consent') === 'true',
      submittedAt: new Date().toISOString(),
      files: formData.getAll('files') as File[]
    }
    
    // Basic validation
    if (!enquiryData.name || !enquiryData.phone || !enquiryData.email || !enquiryData.postcode || !enquiryData.service || !enquiryData.projectDetails || !enquiryData.consent) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(enquiryData.email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 })
    }
    
    // TODO: Here you would:
    // 1. Create a new document in Sanity (enquiry type)
    // 2. Send email notification to your team
    // 3. Optionally send confirmation email to customer
    // 4. Handle file uploads to your preferred storage
    
    console.log('New enquiry received:', {
      ...enquiryData,
      files: enquiryData.files.map(f => ({ name: f.name, size: f.size, type: f.type }))
    })
    
    // For now, just return success
    // Later you can replace this with actual Sanity create and email sending
    const response = { 
      success: true, 
      message: 'Enquiry received successfully',
      enquiryId: `ENQ-${Date.now()}` // Temporary ID until Sanity integration
    }
    console.log('Sending response:', response)
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error processing enquiry:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}


