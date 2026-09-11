"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/config/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const close = () => { setOpen(false); setExpanded(null); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { close(); }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menuOpen", open);
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menuOpen");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return <header className={`siteHeader ${scrolled ? "isScrolled" : ""} ${open ? "hasOpenMenu" : ""}`}>
    <Link href="/" className="brand" aria-label="DS Dance Research Lab home" onClick={close}><img src="/images/brand/ds-dance-research-lab.png" alt="DS Dance Research Lab" /></Link>
    <button className="navToggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? "Close menu" : "Open menu"}><span>{open ? "Close" : "Menu"}</span>{open ? <X size={22} /> : <Menu size={22} />}</button>
    <nav id="primary-navigation" className={open ? "nav open" : "nav"} aria-label="Primary navigation">
      <p className="mobileMenuLabel" aria-hidden="true">Explore the lab</p>
      {navigation.map((item, index) => "children" in item ? <div className={`navGroup ${expanded === item.label ? "expanded" : ""}`} key={item.label}>
        <div className="navGroupTrigger"><Link href={item.href} onClick={close}><span className="mobileNavIndex">0{index + 1}</span>{item.label}</Link><button type="button" onClick={() => setExpanded(expanded === item.label ? null : item.label)} aria-expanded={expanded === item.label} aria-label={`Show ${item.label} pages`}><ChevronDown size={15} /></button></div>
        <div className="subNav" aria-hidden={expanded !== item.label}>{item.children.map((child) => <Link href={child.href} onClick={close} tabIndex={expanded === item.label ? 0 : -1} key={child.href}>{child.label}</Link>)}</div>
      </div> : <Link onClick={close} href={item.href} key={item.href}><span className="mobileNavIndex">0{index + 1}</span>{item.label}</Link>)}
      <Link className="joinButton" onClick={close} href="/join-us">Join Us <ArrowRight size={15} /></Link>
      <div className="mobileMenuContact"><a href="mailto:dsdanceresearchlab@gmail.com">dsdanceresearchlab@gmail.com</a><span>London · Sri Lanka</span></div>
    </nav>
  </header>;
}
