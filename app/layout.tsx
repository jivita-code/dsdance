import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import { Footer, Header } from "@/components/site-client";
export const metadata: Metadata = { title: { default: "DS Dance Research Lab", template: "%s | DS Dance Research Lab" }, description: "International platform for dance and performative practices, research and innovation." };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>; }
