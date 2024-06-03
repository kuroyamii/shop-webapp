/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "image.com",
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
      },
    ],
  },
};

export default nextConfig;
