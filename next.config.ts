import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "jpanel.jivita.lk", pathname: "/api/media/**" },
    ],
  },
  async redirects() { return [
    { source: "/about", destination: "/who-we-are", permanent: true },
    { source: "/services", destination: "/research-projects", permanent: true },
    { source: "/projects", destination: "/news-events", permanent: true },
    { source: "/past-projects", destination: "/research-projects/past", permanent: true },
    { source: "/ongoing-projects", destination: "/research-projects/ongoing", permanent: true },
    { source: "/upcoming-projects", destination: "/research-projects/upcoming", permanent: true },
    { source: "/newsletter", destination: "/join-us", permanent: true }
  ]; }
};
export default nextConfig;
