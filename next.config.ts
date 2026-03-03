import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pixxicrm.ae",
        pathname: "/api/profile/upload/**",
      },
      // Optional: generic fallback pattern
      {
        protocol: "https",
        hostname: "www.pixxicrm.ae",
        pathname: "/**", // يسمح لأي path من هالhost
      },
    ],
  },

};

export default nextConfig;
