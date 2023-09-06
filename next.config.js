
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com', 'localhost', '46.226.110.124'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost:3000/",
      },
      {
        protocol: "http",
        hostname: "46.226.110.124:5000",
      },
      {
        protocol: "http",
        hostname: "46.226.110.124:1337",
      },
    ],
  },
}

module.exports = nextConfig
