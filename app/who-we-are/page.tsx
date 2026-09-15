import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { whoWeAreContent } from "@/content/who-we-are";

export const metadata: Metadata = { title: "Who We Are" };

export default function WhoWeArePage() {
  const content = whoWeAreContent;
  return <article className="staticPage whoWeArePage">
    <PageHero eyebrow="01 / WHO WE ARE" title="Who We Are" image="/images/who-we-are-collaboration.png" className="whoWeAreHero" />
    <section className="whoWeAreIntroduction siteShell" aria-labelledby="who-we-are-statement">
      <div className="whoWeAreIndex" data-reveal="text" aria-hidden="true">01</div>
      <div className="whoWeAreLead"><p className="eyebrow gold" data-reveal="text">Independent platform</p><h2 id="who-we-are-statement" data-reveal="text">{content.heading}</h2><p data-reveal="text" data-reveal-delay="1">{content.paragraphs[0]}</p></div>
    </section>
    <section className="whoWeArePractice"><div className="siteShell whoWeArePracticeGrid"><div className="whoWeArePortrait" data-reveal="image"><Image src="/images/who-we-are-inquiry.png" alt="Dance researcher exploring movement through a written score" fill sizes="(max-width: 860px) 100vw, 42vw" /></div><div className="whoWeArePracticeCopy"><p className="eyebrow gold" data-reveal="text">02 / Practice</p><p data-reveal="text">{content.paragraphs[1]}</p></div></div></section>
    <section className="whoWeAreClosing siteShell"><span className="whoWeAreRule" aria-hidden="true" /><p data-reveal="text">{content.paragraphs[2]}</p></section>
  </article>;
}
