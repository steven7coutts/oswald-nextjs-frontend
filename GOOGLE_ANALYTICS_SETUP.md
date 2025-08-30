# Google Analytics Setup Guide

## 🚀 Quick Setup

### 1. Environment Variables
Create a `.env.local` file in your project root with:

```bash
# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager (Optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### 2. Get Your GA4 Measurement ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or select existing
3. Go to **Admin** > **Data Streams**
4. Create a new **Web Stream**
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Get Your GTM ID (Optional)
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new account or select existing
3. Copy the **Container ID** (format: `GTM-XXXXXXX`)

## 📊 What's Being Tracked

### Page Views
- ✅ All page visits
- ✅ Route changes
- ✅ Scroll depth (25%, 50%, 75%, 90%)
- ✅ Time on page (30s intervals)

### User Interactions
- ✅ Service card clicks
- ✅ Contact form submissions
- ✅ Quote requests
- ✅ Portfolio views

### Conversions
- ✅ Form submissions
- ✅ Service inquiries
- ✅ Quote requests
- ✅ Contact interactions

### Enhanced Features
- ✅ Custom event parameters
- ✅ Service type tracking
- ✅ Geographic targeting
- ✅ User journey analysis

## 🔧 Configuration Options

### Privacy Settings
- ✅ IP anonymization enabled
- ✅ Cookie security (SameSite=None;Secure)
- ✅ GDPR compliance ready
- ✅ No personal data collection

### Performance
- ✅ Script loading optimization
- ✅ Non-blocking execution
- ✅ Conditional loading
- ✅ Error handling

## 📱 Testing

### Development Mode
- Analytics run in debug mode
- Console warnings for missing IDs
- No data sent to production

### Production Mode
- Full tracking enabled
- Real-time data collection
- Performance optimized

## 🎯 Key Metrics to Monitor

### Traffic Sources
- Organic search performance
- Direct traffic
- Referral sources
- Social media impact

### User Behavior
- Page engagement rates
- Service interest patterns
- Form completion rates
- Conversion funnels

### Local SEO
- Geographic performance
- Service area coverage
- Local search terms
- Mobile vs desktop usage

## 🚨 Troubleshooting

### Common Issues
1. **No data appearing**: Check GA4 ID format
2. **Script errors**: Verify environment variables
3. **Blocked by ad blockers**: Test in incognito mode
4. **Delayed data**: Allow 24-48 hours for processing

### Debug Steps
1. Check browser console for errors
2. Verify `.env.local` file exists
3. Confirm GA4 property is active
4. Test with Google Analytics Debugger extension

## 📈 Next Steps

### After Setup
1. **Verify tracking** in GA4 Real-Time reports
2. **Set up goals** for quote requests
3. **Configure audiences** for remarketing
4. **Monitor Core Web Vitals** in PageSpeed Insights

### Advanced Features
1. **Enhanced ecommerce** tracking
2. **Custom dimensions** for services
3. **User ID tracking** (if applicable)
4. **Cross-domain tracking** (if needed)

## 🔒 Privacy & Compliance

### GDPR Compliance
- ✅ User consent ready
- ✅ Data anonymization
- ✅ Cookie management
- ✅ Privacy policy integration

### Data Retention
- ✅ Configurable retention periods
- ✅ Data deletion options
- ✅ Export capabilities
- ✅ Audit logging

---

**Need Help?** Check the Google Analytics [Help Center](https://support.google.com/analytics) or contact your development team.
