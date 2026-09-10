import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import { Footer, Header } from "@/components/site-client";
import { MotionController } from "@/components/motion-controller";
export const metadata: Metadata = { title: { default: "DS Dance Research Lab", template: "%s | DS Dance Research Lab" }, description: "International platform for dance and performative practices, research and innovation." };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><MotionController/><Header/><div id="page-content">{children}</div><Footer/></body></html>; }
