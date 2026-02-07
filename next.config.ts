import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/partner/dashboard", destination: "/admin/dashboard", permanent: true },
      { source: "/partner/slots", destination: "/admin/slots", permanent: true },
      { source: "/partner/recommendations", destination: "/admin/recommendations", permanent: true },
      { source: "/ai/resume", destination: "/admin/ai/resume", permanent: true },
      { source: "/ai/diagnosis", destination: "/admin/ai/diagnosis", permanent: true },
    ];
  },
};

export default nextConfig;
