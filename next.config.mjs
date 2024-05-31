/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "th.bing.com",
      },
      {
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
