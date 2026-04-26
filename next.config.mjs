/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: new URL("https://api-stage-ecommerce-clicon.vercel.app")
          .hostname,
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: new URL("https://api-stage-ecommerce-clicon.vercel.app")
          .hostname,
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
