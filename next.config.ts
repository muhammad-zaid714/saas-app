import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images:{
    remotePatterns:[
      {hostname:'img.clerk.com'}
    ]
  },
  // Enable sourcemaps in development, disable in production
  productionBrowserSourceMaps: false,
  
  // Configure Turbopack for better development experience
  turbopack: {
    resolveAlias: {
      // Add any alias configurations if needed
    }
  },
  
  // Webpack configuration for better sourcemap handling
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = 'cheap-module-source-map';
    }
    return config;
  },
}

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "ibm-wtp",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // tunnelRoute: "/monitoring",

  // Sentry webpack plugin options
  // Suppress sourcemap warnings in development
  hideSourceMaps: process.env.NODE_ENV === 'development',
});
