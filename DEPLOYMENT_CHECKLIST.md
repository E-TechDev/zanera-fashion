# Zanera Fashion - Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables ✓
- [x] `.env.local` created with Sanity credentials
- [ ] Verify `NEXT_PUBLIC_SANITY_PROJECT_ID=g547njgm`
- [ ] Verify `NEXT_PUBLIC_SANITY_DATASET=production`
- [ ] Add `GA_MEASUREMENT_ID` if using Google Analytics
- [ ] Create `.env.production` for production-specific variables

### 2. GitHub Setup
- [ ] Create GitHub repository: `https://github.com/E-TechDev/zanera-fashion`
- [ ] Push code: `git add . && git commit -m "Initial commit" && git push -u origin master`
- [ ] Verify `.gitignore` excludes: `.env.local`, `node_modules/`, `.next/`

### 3. Build & Testing
- [ ] Run `npm run build` locally - ensure no errors
- [ ] Run `npm run dev` - test all routes:
  - [ ] Homepage `/`
  - [ ] Category pages `/category/[slug]`
  - [ ] Product details `/product/[id]`
  - [ ] Shopping cart `/cart`
  - [ ] Dashboard `/dashboard`
  - [ ] Sanity Studio `/studio` (if embedded)
- [ ] Test Sanity CMS integration - verify data loads
- [ ] Test responsive design on mobile/tablet
- [ ] Verify Google Analytics tracking (if enabled)

### 4. Sanity CMS Setup
- [ ] Project ID confirmed: `g547njgm`
- [ ] Dataset set to: `production`
- [ ] Content published in Sanity
- [ ] CORS origins configured in Sanity (includes Netlify domain)
- [ ] API tokens generated if needed for server-side queries

### 5. Netlify Configuration
- [ ] Create `netlify.toml` ✓ (already created)
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`
- [ ] Node version specified (optional): `18.x`

---

## GitHub Push

```bash
# Navigate to project root
cd /path/to/zanera-fashion

# Add all files
git add .

# Commit
git commit -m "Initial commit: Zanera fashion e-commerce with Next.js, Sanity CMS, and Tailwind"

# Push to GitHub (replace with actual repo)
git remote add origin https://github.com/E-TechDev/zanera-fashion.git
git branch -M master
git push -u origin master
```

---

## Netlify Deployment

### Step 1: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub account
3. Click "Add new site" → "Import an existing project"
4. Select "Deploy with GitHub"
5. Authorize Netlify to access your GitHub account
6. Select `zanera-fashion` repository

### Step 2: Configure Build Settings
Netlify should auto-detect from `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: (leave blank)

### Step 3: Set Environment Variables
In Netlify Dashboard → Site settings → Environment variables, add:
```
NEXT_PUBLIC_SANITY_PROJECT_ID = g547njgm
NEXT_PUBLIC_SANITY_DATASET = production
GA_MEASUREMENT_ID = your_ga_id (if using)
```

### Step 4: Deploy
- Click "Deploy site"
- Monitor build progress in Netlify dashboard
- Once complete, site is live at: `https://[your-site-name].netlify.app`

---

## Post-Deployment

### 1. Sanity CMS Configuration
- [ ] Add Netlify domain to CORS origins in Sanity
  - Go to Sanity project settings → API → CORS origins
  - Add: `https://[your-site-name].netlify.app`

### 2. Custom Domain (Optional)
- [ ] Register domain (Namecheap, GoDaddy, etc.)
- [ ] In Netlify: Site settings → Domain management
- [ ] Add custom domain and update DNS records
- [ ] Enable HTTPS (automatic with Netlify)

### 3. Form Submissions & Contact (If Applicable)
- [ ] Set up Netlify Forms or email service
- [ ] Configure contact form submission handling
- [ ] Test form submissions

### 4. Performance & SEO
- [ ] Check Lighthouse scores in Chrome DevTools
- [ ] Verify meta tags and Open Graph tags
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics tracking ID verification

### 5. Monitoring
- [ ] Set up Netlify deploy notifications
- [ ] Enable error tracking (Sentry, LogRocket optional)
- [ ] Monitor build logs for warnings
- [ ] Test critical user flows monthly

### 6. Continuous Deployment
- [ ] Verify automatic deploys on GitHub push
- [ ] Test branch previews (optional)
- [ ] Set up deploy hooks for notifications

---

## Troubleshooting

### Build Fails on Netlify
1. Check build logs: Site → Deploys → Failed deploy → Build log
2. Common issues:
   - Missing env variables → Add to Netlify settings
   - Sanity API errors → Verify project ID and dataset
   - TypeScript errors → Run `npm run build` locally first

### Sanity Data Not Loading
1. Verify CORS origin is added to Sanity project
2. Check Sanity dataset is set to `production`
3. Verify content is published in Sanity Studio
4. Check browser console for API errors

### Next.js Issues with Sanity 5
- Using `--legacy-peer-deps` to allow compatibility
- If issues persist, consider using Sanity 3 client (more stable with Next.js 14)

---

## Quick Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm lint

# Sanity development (if running separately)
sanity dev

# Git operations
git add .
git commit -m "your message"
git push origin master
```

---

## Important Links

- **GitHub Repository**: https://github.com/E-TechDev/zanera-fashion
- **Netlify Dashboard**: https://app.netlify.com
- **Sanity Project**: https://sanity.io/manage
- **Sanity Docs**: https://www.sanity.io/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Last Updated**: April 18, 2026
**Status**: Ready for Deployment
