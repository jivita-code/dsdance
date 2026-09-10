"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, LoaderCircle, Menu, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import type { Media } from "@/lib/content";

const nav = [
  { href: "/", label: "Home" },
  { href: "/who-we-are", label: "Who We Are", children: [{ href: "/founder", label: "Founder" }, { href: "/advisory-committee", label: "Advisory Committee" }] },
  { href: "/research-projects", label: "Research Projects", children: [{ href: "/research-projects/past", label: "Past Projects" }, { href: "/research-projects/ongoing", label: "Ongoing Projects" }, { href: "/research-projects/upcoming", label: "Upcoming Projects" }, { href: "/workshops-gallery", label: "Workshops & Gallery" }] },
  { href: "/news-events", label: "News & Events" },
  { href: "/blogs", label: "Resources", children: [{ href: "/blogs", label: "Blogs" }, { href: "/podcasts", label: "Podcasts" }] },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const close = () => { setOpen(false); setExpanded(null); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { close(); }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menuOpen", open);
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.classList.remove("menuOpen"); window.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  return <header className={`siteHeader ${scrolled ? "isScrolled" : ""} ${open ? "hasOpenMenu" : ""}`}>
    <Link href="/" className="brand" aria-label="DS Dance Research Lab home" onClick={close}><img src="/images/home/logo.png" alt="DS Dance Research Lab" /></Link>
    <button className="navToggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? "Close menu" : "Open menu"}><span>{open ? "Close" : "Menu"}</span>{open ? <X size={22} /> : <Menu size={22} />}</button>
    <nav id="primary-navigation" className={open ? "nav open" : "nav"} aria-label="Primary navigation">
      <p className="mobileMenuLabel" aria-hidden="true">Explore the lab</p>
      {nav.map((item, index) => item.children ? <div className={`navGroup ${expanded === item.label ? "expanded" : ""}`} key={item.label}>
        <div className="navGroupTrigger"><Link href={item.href} onClick={close}><span className="mobileNavIndex">0{index + 1}</span>{item.label}</Link><button type="button" onClick={() => setExpanded(expanded === item.label ? null : item.label)} aria-expanded={expanded === item.label} aria-label={`Show ${item.label} pages`}><ChevronDown size={15} /></button></div>
        <div className="subNav" aria-hidden={expanded !== item.label}>{item.children.map((child) => <Link href={child.href} onClick={close} tabIndex={expanded === item.label ? 0 : -1} key={child.href}>{child.label}</Link>)}</div>
      </div> : <Link onClick={close} href={item.href} key={item.href}><span className="mobileNavIndex">0{index + 1}</span>{item.label}</Link>)}
      <Link className="joinButton" onClick={close} href="/join-us">Join Us <ArrowRight size={15} /></Link>
      <div className="mobileMenuContact"><a href="mailto:dsdanceresearchlab@gmail.com">dsdanceresearchlab@gmail.com</a><span>London · Sri Lanka</span></div>
    </nav>
  </header>;
}

export function Footer() {
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

export function Gallery({ title, media }: { title: string; media: Media[] }) {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (active === null) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") setActive((active - 1 + media.length) % media.length);
      if (event.key === "ArrowRight") setActive((active + 1) % media.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, media.length]);
  if (!media.length) return null;
  const shown = active === null ? null : media[active];
  return <><div className="galleryGrid">{media.map((item, index) => <button className="galleryTile" data-reveal="card" data-reveal-delay={String(index % 4)} key={`${item.url}-${index}`} onClick={() => setActive(index)}><img src={item.url} alt={`${title} — image ${index + 1}`} loading="lazy" /><span>View image</span></button>)}</div>{shown && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`}><button className="lightboxClose" aria-label="Close gallery" onClick={() => setActive(null)}><X /></button><button aria-label="Previous image" onClick={() => setActive((active! - 1 + media.length) % media.length)}><ChevronLeft /></button><figure><img src={shown.url} alt={`${title} — enlarged image ${(active || 0) + 1}`} /><figcaption>{String((active || 0) + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</figcaption></figure><button aria-label="Next image" onClick={() => setActive((active! + 1) % media.length)}><ChevronRight /></button></div>}</>;
}

export function InquiryForm({ type }: { type: "CONTACT" | "JOIN_US" }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setState("loading"); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ type, name: form.get("name"), email: form.get("email"), areaOfInterest: form.get("areaOfInterest"), message: form.get("message"), website: form.get("website") }) });
      if (!response.ok) throw new Error((await response.json()).message || "Please try again.");
      setState("success"); event.currentTarget.reset();
    } catch (reason: unknown) { setState("error"); setError(reason instanceof Error ? reason.message : "Please try again."); }
  };
  if (state === "success") return <div className="formSuccess" role="status"><h3>Thank you.</h3><p>Your message has been received.</p></div>;
  return <form className="inquiryForm" data-reveal="text" onSubmit={submit}><label>Name<input name="name" required maxLength={160} /></label><label>Email<input name="email" type="email" required maxLength={254} /></label>{type === "JOIN_US" && <label>Area of interest<select name="areaOfInterest" required><option value="">Select an option</option><option>Associate Artist</option><option>Residency Programs</option><option>Workshops &amp; Training</option><option>Research Collaborator</option><option>Community Engagement</option><option>Volunteer/Supporter</option><option>International Exchange</option><option>Other</option></select></label>}<label>Message<textarea name="message" required rows={6} maxLength={10000} /></label><input className="trap" name="website" tabIndex={-1} autoComplete="off" /><button className="goldButton" disabled={state === "loading"}>{state === "loading" ? <><LoaderCircle className="spin" size={16} /> Sending</> : <>Send message <ArrowRight size={16} /></>}</button>{state === "error" && <p className="formError" role="alert">{error}</p>}</form>;
}
