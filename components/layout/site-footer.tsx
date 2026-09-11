import Link from "next/link";
import { ArrowRight } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ds-dance-research-lab-30a44b361/", icon: "linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/@DSDanceResearchLab", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/ds_dance_research_lab/", icon: "instagram" },
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/dance-connect/id1837786505", icon: "apple-podcasts" },
  { label: "Spotify", href: "https://creators.spotify.com/pod/profile/ds-dance-research-lab", icon: "spotify" },
  { label: "Substack", href: "https://substack.com/@dhanushkaseneviratne?utm_source=global-search", icon: "substack" },
] as const;

export function SiteFooter() {
  return <footer className="footer">
    <div className="footerCta siteShell">
      <p className="eyebrow gold" data-reveal="text">Collaborate with us</p>
      <h2 data-reveal="text">Join Us</h2>
      <p data-reveal="text">International platform for Dance &amp; Performative practices, Research &amp; Innovation</p>
      <Link className="goldButton" data-reveal="text" href="/join-us">Join Us <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
      <div className="footerBase siteShell">
        <div className="footerBrand" data-reveal="text">
        <div className="footerLogos">
          <img src="/images/brand/ds-dance-research-lab.png" alt="DS Dance Research Lab" />
          <img src="/images/brand/one-dance-uk.png" alt="One Dance UK" />
        </div>
        <p>Where Dance Meets Discovery</p>
        <div className="footerSocial" aria-label="Follow and listen to DS Dance Research Lab">
          <b>Follow &amp; Listen</b>
          <div className="footerSocialLinks">
            {socialLinks.map(({ label, href, icon }) => <a aria-label={label} href={href} key={label} rel="noreferrer" target="_blank" title={label}><span aria-hidden="true" className={`footerSocialMark footerSocialMark--${icon}`} /></a>)}
          </div>
        </div>
      </div>
      <div data-reveal="text" data-reveal-delay="1"><b>Explore</b><Link href="/who-we-are">Who We Are</Link><Link href="/research-projects">Research Projects</Link><Link href="/news-events">News &amp; Events</Link><Link href="/workshops-gallery">Workshops &amp; Gallery</Link></div>
      <div data-reveal="text" data-reveal-delay="2"><b>Resources</b><Link href="/blogs">Blogs</Link><Link href="/podcasts">Podcasts</Link><Link href="/contact">Contact</Link><Link href="/join-us">Join Us</Link></div>
      <div data-reveal="text" data-reveal-delay="3"><b>Contact</b><span>London, United Kingdom</span><span>SS17 0BP</span><a href="tel:+447375567669">+44 7375 567669</a><a href="mailto:dsdanceresearchlab@gmail.com">dsdanceresearchlab@gmail.com</a></div>
    </div>
    <p className="copyright">Copyright © {new Date().getFullYear()} Ds Dance Research Lab</p>
  </footer>;
}
