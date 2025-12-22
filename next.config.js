const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true, // Required for static export, but images are still optimized at build time
  },
  trailingSlash: true,
  // Performance budgets and optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Performance budgets - warn on large bundles
      config.performance = {
        maxAssetSize: 500000, // 500KB
        maxEntrypointSize: 500000, // 500KB
        hints: 'warning',
      };
    }
    return config;
  },
}

module.exports = withBundleAnalyzer(nextConfig)

