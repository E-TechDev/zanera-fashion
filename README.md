# Zanera Fashion E-commerce

A modern, minimal luxury fashion e-commerce website built with Next.js and Sanity CMS.

## Features

- **Homepage**: Hero banner, featured products, category sections
- **Category Pages**: Dynamic routes for product categories
- **Product Details**: Image gallery, size selection, add to cart
- **Shopping Cart**: Add/remove items, quantity management, WhatsApp checkout
- **Admin Dashboard**: Protected insights dashboard with product statistics
- **WhatsApp Integration**: Direct ordering via WhatsApp
- **Google Analytics**: Page views, product views, add to cart events
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity CMS
- **State Management**: React Context API
- **Deployment**: Netlify

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zanera-fashion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Sanity CMS**
   - Create a new Sanity project
   - Copy the project ID and dataset to `.env.local`
   - Run `npx sanity dev` to start the Sanity Studio

4. **Configure environment variables**
   - Update `.env.local` with your Sanity credentials
   - Add your Google Analytics measurement ID

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Sanity Schema

The CMS includes a product schema with:
- Name, price, category
- Sizes array, images array
- Description, inStock boolean
- Featured boolean, createdAt datetime

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

## Project Structure

```
zanera-fashion/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── cart/              # Cart page
│   ├── category/[slug]/   # Category pages
│   ├── product/[id]/      # Product detail pages
│   └── dashboard/         # Admin dashboard
├── components/            # React components
├── context/               # React Context for cart
├── lib/                   # Sanity client setup
├── sanity/                # Sanity configuration and schemas
├── styles/                # Global styles
└── utils/                 # Utility functions
```

## Analytics Events

- Page views (automatic)
- Product views
- Add to cart events
- WhatsApp checkout clicks

## Admin Dashboard

Access the dashboard at `/dashboard` with password `admin123`. Features:
- Total products count
- Featured products count
- Category distribution
- Link to Sanity Studio

## WhatsApp Integration

Orders are processed via WhatsApp with formatted messages including:
- Product details and quantities
- Selected sizes
- Total price
- Direct link to WhatsApp: `https://wa.me/0745759290`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.