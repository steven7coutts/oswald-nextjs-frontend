# Email Integration Guide for Contact Form

## Overview
This guide shows you how to set up email notifications for contact form submissions using various email services. The system automatically sends emails when new enquiries are created in Sanity.

## 🚀 **Option 1: SendGrid Integration (Recommended)**

### Setup Steps:

1. **Create SendGrid Account**
   - Go to [SendGrid](https://sendgrid.com/)
   - Sign up for free account (100 emails/day free)
   - Verify your sender email

2. **Install SendGrid Package**
   ```bash
   npm install @sendgrid/mail
   ```

3. **Update API Route** (`src/app/api/enquiry/route.ts`)
   ```typescript
   import sgMail from '@sendgrid/mail'
   
   // Initialize SendGrid
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
   
   // Update sendEmailNotification function
   async function sendEmailNotification(enquiryData: any) {
     try {
       const msg = {
         to: process.env.NOTIFICATION_EMAIL!,
         from: process.env.SENDGRID_FROM_EMAIL!,
         subject: `New Contact Enquiry - ${enquiryData.service}`,
         html: `
           <h2>New Contact Enquiry Received</h2>
           <p><strong>Customer:</strong> ${enquiryData.name}</p>
           <p><strong>Phone:</strong> ${enquiryData.phone}</p>
           <p><strong>Email:</strong> ${enquiryData.email}</p>
           <p><strong>Postcode:</strong> ${enquiryData.postcode}</p>
           <p><strong>Service:</strong> ${enquiryData.service}</p>
           ${enquiryData.budget ? `<p><strong>Budget:</strong> ${enquiryData.budget}</p>` : ''}
           ${enquiryData.preferredTime ? `<p><strong>Preferred Time:</strong> ${enquiryData.preferredTime}</p>` : ''}
           <p><strong>Project Details:</strong></p>
           <p>${enquiryData.projectDetails}</p>
           ${enquiryData.files.length > 0 ? `<p><strong>Files Attached:</strong> ${enquiryData.files.length} file(s)</p>` : ''}
           <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-GB')}</p>
         `
       }
       
       await sgMail.send(msg)
       console.log('Email sent via SendGrid')
     } catch (error) {
       console.error('SendGrid error:', error)
     }
   }
   ```

4. **Environment Variables**
   ```bash
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=info@oswaldjoinery.co.uk
   NOTIFICATION_EMAIL=info@oswaldjoinery.co.uk
   ```

## 📧 **Option 2: Mailgun Integration**

### Setup Steps:

1. **Create Mailgun Account**
   - Go to [Mailgun](https://www.mailgun.com/)
   - Sign up for free account (5,000 emails/month free)
   - Verify your domain

2. **Install Mailgun Package**
   ```bash
   npm install mailgun.js
   ```

3. **Update API Route**
   ```typescript
   import formData from 'form-data'
   import Mailgun from 'mailgun.js'
   
   const mailgun = new Mailgun(formData)
   const mg = mailgun.client({
     username: 'api',
     key: process.env.MAILGUN_API_KEY!
   })
   
   async function sendEmailNotification(enquiryData: any) {
     try {
       const msg = {
         from: process.env.MAILGUN_FROM_EMAIL!,
         to: process.env.NOTIFICATION_EMAIL!,
         subject: `New Contact Enquiry - ${enquiryData.service}`,
         html: `...` // Same HTML content
       }
       
       await mg.messages.create(process.env.MAILGUN_DOMAIN!, msg)
       console.log('Email sent via Mailgun')
     } catch (error) {
       console.error('Mailgun error:', error)
     }
   }
   ```

4. **Environment Variables**
   ```bash
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_domain.com
   MAILGUN_FROM_EMAIL=info@your_domain.com
   NOTIFICATION_EMAIL=info@oswaldjoinery.co.uk
   ```

## 🔗 **Option 3: Sanity Webhook + External Email Service**

### Setup Steps:

1. **Create Email Service Endpoint**
   - Deploy a simple API endpoint (Vercel, Netlify, etc.)
   - Handle webhook from Sanity
   - Send emails using any email service

2. **Webhook Endpoint Example**
   ```typescript
   // api/webhook/email.ts
   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ message: 'Method not allowed' })
     }
     
     const { data } = req.body
     
     // Send email using your preferred service
     await sendEmail(data)
     
     res.status(200).json({ success: true })
   }
   ```

3. **Configure Sanity Webhook**
   - In Sanity Studio: Settings → Webhooks
   - Add new webhook pointing to your endpoint
   - Trigger on `contactEnquiry` document create

## 📱 **Option 4: Slack Notifications**

### Setup Steps:

1. **Create Slack App**
   - Go to [Slack API](https://api.slack.com/)
   - Create new app
   - Get webhook URL

2. **Update API Route**
   ```typescript
   async function sendSlackNotification(enquiryData: any) {
     try {
       const response = await fetch(process.env.SLACK_WEBHOOK_URL!, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           text: `New Contact Enquiry from ${enquiryData.name}`,
           blocks: [
             {
               type: 'section',
               text: {
                 type: 'mrkdwn',
                 text: `*New Contact Enquiry*\n*Customer:* ${enquiryData.name}\n*Service:* ${enquiryData.service}\n*Phone:* ${enquiryData.phone}`
               }
             }
           ]
         })
       })
       
       if (response.ok) {
         console.log('Slack notification sent')
       }
     } catch (error) {
       console.error('Slack error:', error)
     }
   }
   ```

3. **Environment Variables**
   ```bash
   SLACK_WEBHOOK_URL=your_slack_webhook_url
   ```

## 🎯 **Recommended Setup for Production:**

### **Primary: SendGrid + Slack**
- SendGrid for professional email delivery
- Slack for instant team notifications
- Both triggered from the same API endpoint

### **Environment Variables Template**
```bash
# Email Service (Choose one)
SENDGRID_API_KEY=your_sendgrid_key
# OR
MAILGUN_API_KEY=your_mailgun_key

# Email Configuration
SENDGRID_FROM_EMAIL=info@oswaldjoinery.co.uk
NOTIFICATION_EMAIL=info@oswaldjoinery.co.uk

# Slack (Optional)
SLACK_WEBHOOK_URL=your_slack_webhook

# Sanity
SANITY_API_TOKEN=your_sanity_token
NEXT_PUBLIC_SANITY_PROJECT_ID=tzflc62u
NEXT_PUBLIC_SANITY_DATASET=production
```

## 🔧 **Testing Your Email Setup**

1. **Test Form Submission**
   - Fill out contact form
   - Submit and check console logs
   - Verify email received

2. **Check Sanity Studio**
   - New enquiry should appear
   - Status should be "new"

3. **Monitor Email Delivery**
   - Check spam folders
   - Verify sender address
   - Test with different email addresses

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **"API key not valid"**
   - Check API key spelling
   - Verify service account permissions

2. **"Sender not verified"**
   - Verify sender email in email service
   - Check domain authentication

3. **"Rate limit exceeded"**
   - Check free tier limits
   - Upgrade plan if needed

4. **"Webhook not triggering"**
   - Verify webhook URL
   - Check authentication headers
   - Test endpoint separately

## 📊 **Email Analytics & Monitoring**

### **SendGrid Dashboard:**
- Delivery rates
- Bounce rates
- Spam reports
- Open/click tracking

### **Mailgun Dashboard:**
- Email logs
- Delivery statistics
- Bounce management
- Domain reputation

## 🔒 **Security Best Practices**

1. **API Keys**: Store in environment variables
2. **Rate Limiting**: Implement on your API endpoint
3. **Input Validation**: Sanitize all form data
4. **SPF/DKIM**: Authenticate your sending domain
5. **Monitoring**: Set up alerts for failures

## 📞 **Support Resources**

- **SendGrid**: [Documentation](https://sendgrid.com/docs/)
- **Mailgun**: [Documentation](https://documentation.mailgun.com/)
- **Slack**: [API Documentation](https://api.slack.com/)
- **Sanity**: [Webhooks Guide](https://www.sanity.io/docs/webhooks)

Choose the option that best fits your needs and budget. SendGrid is recommended for most businesses due to its reliability and generous free tier.
