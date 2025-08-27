# Vercel Deployment Guide

## Production Routing Fixes Applied

This project has been configured for proper routing on Vercel. The following files have been created/updated:

### 1. `vercel.json`

- Configures Vercel to serve `index.html` for all routes
- Ensures client-side routing works correctly

### 2. `public/_redirects`

- Backup routing configuration
- Fallback for SPA routing

### 3. `vite.config.js`

- Updated with production-optimized settings
- Configured build output directory
- Set proper base path

## Deployment Steps

1. **Build the project locally to test:**

   ```bash
   npm run build
   npm run preview
   ```

2. **Deploy to Vercel:**

   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect this is a Vite project
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

3. **Environment Variables (if needed):**

   - Add any environment variables in Vercel dashboard
   - Prefix client-side variables with `VITE_`

## Troubleshooting

- **404 on refresh**: The `vercel.json` configuration should fix this
- **Assets not loading**: Check that all imports use relative paths
- **API endpoints**: Ensure API base URLs are correct for production

## Recommended Vercel Settings

- Node.js Version: 18.x or higher
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
