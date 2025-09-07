/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.worldvectorlogo.com",
      "upload.wikimedia.org",
    ],
  },
};

module.exports = nextConfig;
