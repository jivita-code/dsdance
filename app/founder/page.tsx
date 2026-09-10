import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { founderContent } from "@/content/founder";

export const metadata: Metadata = { title: "Dhanushka Seneviratne — Founder" };

export default function FounderPage() {
  const content = founderContent;
  return <article className="staticPage founderEditorial">
    <PageHero eyebrow="FOUNDER & ARTISTIC DIRECTOR" title={content.name} image="/images/home/founder-portrait.png" className="founderHero" />
    <section className="founderIntroduction siteShell" aria-labelledby="founder-biography"><div data-reveal="text"><p className="eyebrow gold">01 / Biography</p><h2 id="founder-biography">{content.name}</h2></div><p className="founderLead" data-reveal="text" data-reveal-delay="1"><strong>{content.qualifications}</strong>, {content.paragraphs[0]}</p></section>
    <section className="founderResearch"><div className="siteShell founderResearchGrid"><p data-reveal="text">{content.paragraphs[1]}</p><div className="founderResearchImage" data-reveal="image"><Image src="/images/founder-research-practice.png" alt="Researchers and dancers studying archival movement material together" fill sizes="(max-width: 860px) 100vw, 56vw" /></div><p className="founderResearchStatement" data-reveal="text">{content.paragraphs[2]}</p></div></section>
    <section className="founderScholarship siteShell"><div className="founderScholarshipIndex" data-reveal="text">02</div><div className="founderScholarshipCopy"><p className="eyebrow gold" data-reveal="text">International scholarship</p><p data-reveal="text">{content.paragraphs[3]}</p><p data-reveal="text" data-reveal-delay="1">{content.paragraphs[4]}</p></div></section>
    <section className="founderClosing"><div className="siteShell" data-reveal="text"><span aria-hidden="true" /><p>{content.paragraphs[5]}</p></div></section>
  </article>;
}
