import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SiteFooter() {
  return <footer className="footer">
    <div className="footerCta siteShell" data-reveal="text"><p className="eyebrow gold">Collaborate with us</p><h2>Join Us</h2><p>International platform for Dance &amp; Performative practices, Research &amp; Innovation</p><Link className="goldButton" href="/join-us">Join Us <ArrowRight size={16} /></Link></div>
    <div className="footerBase siteShell">
      <div className="footerBrand" data-reveal="text"><img src="/images/home/logo.png" alt="DS Dance Research Lab" /><p>Where Dance Meets Discovery</p></div>
      <div data-reveal="text" data-reveal-delay="1"><b>Explore</b><Link href="/who-we-are">Who We Are</Link><Link href="/research-projects">Research Projects</Link><Link href="/news-events">News &amp; Events</Link><Link href="/workshops-gallery">Workshops &amp; Gallery</Link></div>
      <div data-reveal="text" data-reveal-delay="2"><b>Resources</b><Link href="/blogs">Blogs</Link><Link href="/podcasts">Podcasts</Link><Link href="/contact">Contact</Link><Link href="/join-us">Join Us</Link></div>
      <div data-reveal="text" data-reveal-delay="3"><b>Contact</b><span>London, United Kingdom</span><span>SS17 7BP</span><a href="tel:+447375567669">+44 7375 567669</a><a href="mailto:dsdanceresearchlab@gmail.com">dsdanceresearchlab@gmail.com</a></div>
    </div>
    <p className="copyright">Copyright © 2025 Ds Dance Research Lab</p>
  </footer>;
}
