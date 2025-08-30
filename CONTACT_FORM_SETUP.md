# Contact Form Setup Guide

## Overview
The contact form has been integrated with Sanity CMS for data storage and email notifications. All form submissions are automatically saved to Sanity and emailed to your team.

## What's Been Added

### 1. Sanity Schema (`schemas/contactEnquiry.ts`)
- **Customer Information**: name, phone, email, postcode
- **Project Details**: service, budget, preferred time, project description
- **File Uploads**: support for images and PDFs
- **System Fields**: status tracking, priority, assignments, notes
- **Anti-spam**: honeypot field protection

### 2. API Endpoint (`src/app/api/enquiry/route.ts`)
- Handles form submissions
- Saves data to Sanity
- Sends email notifications
- Includes validation and error handling

### 3. Updated Contact Component
- Enhanced form submission handling
- Better error reporting
- Form reset after successful submission

## Environment Variables Required

Create a `.env.local` file in your project root with:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=tzflc62u
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token_here

# Email Configuration (Gmail example)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
NOTIFICATION_EMAIL=info@oswaldjoinery.co.uk
```

## Setup Steps

### 1. Get Sanity API Token
1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project (`tzflc62u`)
3. Go to API → Tokens
4. Create a new token with **Editor** permissions
5. Copy the token to your `.env.local`

### 2. Configure Email (Gmail Example)
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password":
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this password in `EMAIL_PASS`

### 3. Alternative Email Services
For other email providers, update the transporter in `src/app/api/enquiry/route.ts`:

```typescript
// Outlook example
const transporter = nodemailer.createTransporter({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
})
```

## Sanity Studio Features

### Contact Enquiry Management
- **Status Tracking**: New → Contacted → Quoted → Follow Up → Converted/Lost
- **Priority Levels**: Low, Medium, High, Urgent
- **Assignment**: Assign enquiries to team members
- **Notes**: Internal notes and follow-up information
- **Sorting**: By date, priority, status

### Preview Configuration
- Shows customer name, service, and email
- Easy identification of new enquiries

## Form Fields

### Required Fields
- ✅ Name
- ✅ Phone
- ✅ Email
- ✅ Postcode
- ✅ Service
- ✅ Project Details
- ✅ Consent

### Optional Fields
- Budget Range
- Preferred Contact Time
- File Uploads (images, PDFs)

### System Fields (Auto-populated)
- Submission Date
- Status
- Priority
- Source (website)
- Honeypot (anti-spam)

## File Upload Handling

Currently, the system stores file metadata. For production file storage:

1. **Option 1**: Upload to Sanity Assets
   ```typescript
   // In the API route
   const asset = await sanityClient.assets.upload('file', file)
   ```

2. **Option 2**: Use external service (AWS S3, Cloudinary)
   ```typescript
   // Upload to external service first
   const fileUrl = await uploadToExternalService(file)
   ```

## Testing

### 1. Test Form Submission
1. Fill out the contact form on your website
2. Submit the form
3. Check Sanity Studio for new enquiry
4. Verify email notification received

### 2. Test Validation
- Try submitting with missing required fields
- Test honeypot field (should reject if filled)
- Test file size limits

## Troubleshooting

### Common Issues

1. **"SANITY_API_TOKEN is not defined"**
   - Check `.env.local` file exists
   - Verify token has write permissions

2. **Email not sending**
   - Check email credentials
   - Verify app password (Gmail)
   - Check email service configuration

3. **Form submission fails**
   - Check browser console for errors
   - Verify API route is accessible
   - Check Sanity project ID and dataset

### Debug Mode
Add logging to the API route:
```typescript
console.log('Form data received:', Object.fromEntries(formData))
console.log('Sanity result:', result)
```

## Security Features

- ✅ **Honeypot Protection**: Hidden anti-spam field
- ✅ **Input Validation**: Server-side validation
- ✅ **File Size Limits**: 10MB per file maximum
- ✅ **Required Field Validation**: Prevents incomplete submissions
- ✅ **Consent Tracking**: GDPR compliance

## Next Steps

1. **Customize Email Template**: Update the email HTML in the API route
2. **Add File Upload**: Implement proper file storage
3. **Enhance Notifications**: Add SMS, Slack, or other notification methods
4. **Analytics**: Track form conversion rates and performance
5. **Automation**: Set up follow-up reminders and workflows

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Test the Sanity connection separately
4. Check email service configuration
