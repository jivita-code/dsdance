export const navigation = [
  { href: "/", label: "Home" },
  { href: "/who-we-are", label: "Who We Are", children: [{ href: "/founder", label: "Founder" }, { href: "/advisory-committee", label: "Advisory Committee" }] },
  { href: "/research-projects", label: "Research Projects", children: [{ href: "/research-projects/past", label: "Past Projects" }, { href: "/research-projects/ongoing", label: "Ongoing Projects" }, { href: "/research-projects/upcoming", label: "Upcoming Projects" }] },
  { href: "/news-events", label: "News & Events" },
  { href: "/blogs", label: "Resources", children: [{ href: "/blogs", label: "Blogs" }, { href: "/podcasts", label: "Podcasts" }] },
  { href: "/contact", label: "Contact" },
] as const;
