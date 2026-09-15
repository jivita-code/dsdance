import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionController } from "@/components/motion/motion-controller";
export const metadata: Metadata = { title: { default: "DS Dance Research Lab", template: "%s | DS Dance Research Lab" }, description: "International platform for dance and performative practices, research and innovation.", icons: { icon: "/images/home/logo.png", shortcut: "/images/home/logo.png", apple: "/images/home/logo.png" } };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><MotionController/><SiteHeader/><div id="page-content">{children}</div><SiteFooter/></body></html>; }
