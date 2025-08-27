# Google & Trustpilot Reviews API Integration

This guide explains how to set up real-time reviews from Google and Trustpilot on your website.

## 🚀 Quick Setup

### 1. Google Places API Setup

1. **Get Google API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the **Places API**
   - Go to **Credentials** → **Create Credentials** → **API Key**
   - Copy your API key

2. **Get Google Place ID:**
   - Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Search for "Oswald Joinery Perth"
   - Copy the Place ID (looks like: `ChIJ...`)

3. **Update Environment Variables:**
   ```bash
   # In web/.env.local
   NEXT_PUBLIC_GOOGLE_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_GOOGLE_PLACE_ID=your_actual_place_id_here
   ```

### 2. Trustpilot API Setup

1. **Get Trustpilot Business ID:**
   - Go to your Trustpilot business page
   - The URL will look like: `https://www.trustpilot.com/review/your-business-name.com`
   - The business ID is in the URL or page source

2. **Get Trustpilot API Key (Optional):**
   - Go to [Trustpilot Developer Portal](https://developer.trustpilot.com/)
   - Create an account and get an API key
   - This gives you higher rate limits

3. **Update Environment Variables:**
   ```bash
   # In web/.env.local
   NEXT_PUBLIC_TRUSTPILOT_BUSINESS_ID=your_actual_business_id_here
   NEXT_PUBLIC_TRUSTPILOT_API_KEY=your_actual_api_key_here  # Optional
   ```

## 🔧 How It Works

### Frontend Components
- **ReviewWidget**: Shows featured reviews in hero section
- **ReviewsSection**: Displays latest reviews below services
- Both components fetch data from the Next.js API route

### API Route
- **`/api/reviews`**: Server-side endpoint that fetches from both platforms
- Keeps API keys secure (not exposed to client)
- Handles CORS and rate limiting

### Data Flow
1. User visits website
2. Components call `/api/reviews`
3. API route fetches from Google Places API and Trustpilot API
4. Data is unified and returned to frontend
5. Reviews are displayed with platform-specific styling

## 📊 API Endpoints

### Get All Reviews
```
GET /api/reviews
```

### Get Featured Reviews (4+ stars)
```
GET /api/reviews?type=featured&count=3
```

### Get Google Reviews Only
```
GET /api/reviews?type=google&count=5
```

### Get Trustpilot Reviews Only
```
GET /api/reviews?type=trustpilot&count=5
```

## 🎨 Customization

### Styling
- Platform-specific colors (Google: blue, Trustpilot: green)
- Platform-specific icons
- Responsive design for all screen sizes

### Content
- Shows author name, rating, review text
- Links to original review platforms
- Verification badges for trusted reviews

## ⚠️ Important Notes

### Rate Limits
- **Google Places API**: 1000 requests/day (free tier)
- **Trustpilot API**: Varies by plan
- Consider caching responses to avoid hitting limits

### CORS
- Google and Trustpilot APIs may block direct browser requests
- Our Next.js API route handles this server-side

### API Keys
- Never expose API keys in client-side code
- Use environment variables and server-side API routes
- Consider using API key restrictions in Google Cloud Console

## 🐛 Troubleshooting

### Common Issues
1. **"Failed to fetch reviews"**: Check API keys and place IDs
2. **CORS errors**: Ensure using the Next.js API route, not direct API calls
3. **Rate limit exceeded**: Implement caching or upgrade API plans

### Debug Mode
Check browser console and network tab for detailed error messages.

## 📈 Next Steps

1. **Set up environment variables** with your actual API credentials
2. **Test the integration** by visiting your website
3. **Customize styling** to match your brand
4. **Implement caching** to improve performance
5. **Monitor API usage** to stay within limits

## 🔗 Useful Links

- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [Trustpilot API Documentation](https://developer.trustpilot.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
