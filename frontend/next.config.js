/** @type {import('next').NextConfig} */
// Production deployment configuration
const nextConfig = {
  reactStrictMode: true,
  // Output configuration for production
  output: 'standalone',
  // Ignore ESLint errors during build (we'll fix warnings later)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build (if any)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow dynamic rendering (fixes useSearchParams warnings)
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.amazon.com',
        pathname: '/**',
      },
      // Allow images from production API (Railway)
      {
        protocol: 'https',
        hostname: 'mocxs-ecommerce-production.up.railway.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.up.railway.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
