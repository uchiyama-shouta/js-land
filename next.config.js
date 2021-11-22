const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  swcMinify: true,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.microcms-assets.io", "firebasestorage.googleapis.com"],
  },
});
