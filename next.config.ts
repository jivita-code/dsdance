import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'" },
    ] }];
  },
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
