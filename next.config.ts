/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pixxicrm.ae", // <-- remove www
        pathname: "/api/profile/upload/**",
      },
      // Optional: allow all paths under this host
      {
        protocol: "https",
        hostname: "pixxicrm.ae",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;