/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // login Google
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // login GitHub
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // imagens Cloudinary
      }
    ],
  },
};

module.exports = nextConfig;
