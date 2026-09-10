import type { Metadata } from "next";
import { ContactPage } from "@/components/forms/contact-page";

export const metadata: Metadata = { title: "Join Us" };
export default function JoinUsPage() { return <ContactPage type="JOIN_US" />; }
