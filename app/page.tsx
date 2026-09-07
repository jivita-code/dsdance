import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { homeContent } from "@/lib/home-content";

const projectImages = [
  ["/images/home/project-elephant.png", "Dance research visual exploring human–elephant relationships"],
  ["/images/home/project-textile.png", "Dance research visual exploring natural dye and textile practice"],
  ["/images/home/project-ability.png", "Inclusive contemporary dance research visual"],
  ["/images/home/project-heritage.png", "Dance research visual connecting Sri Lankan heritage and contemporary movement"],
] as const;

export default function Home() {
  const content = homeContent;
  return (
    <main className="homePage">
      <section className="homeHero" aria-labelledby="home-title">
        <Image className="homeHeroImage" src="/images/home/hero.png" alt="Contemporary dancers in a dance research rehearsal" fill priority sizes="100vw" />
        <div className="homeHeroShade" />
        <div className="homeShell homeHeroLayout">
          <div className="homeHeroCopy">
            <p className="homeEyebrow">Dance · Research · Performance</p>
            <h1 id="home-title">{content.hero.title}</h1>
            <span className="homeRule" />
            <p className="homeHeroStatement">{content.hero.statement}</p>
            <p className="homeLocation">{content.hero.location}</p>
            <Link href="/join-us" className="homeButton">{content.hero.cta}<ArrowRight size={16} /></Link>
          </div>
          <p className="homeHeroIndex" aria-hidden="true">01 / 08</p>
        </div>
      </section>

      <section className="homeQuote" aria-label="DS Dance Research Lab statement">
        <div className="homeQuoteInner homeShell"><Quote aria-hidden="true" /><div><p>“{content.quote.text}”</p><span>{content.quote.attribution}</span></div></div>
      </section>

      <section className="homeAbout" aria-labelledby="about-title">
        <div className="homeShell homeAboutGrid">
          <div className="homeSectionCopy"><p className="homeEyebrow">01 — Introduction</p><h2 id="about-title">{content.about.title}</h2><span className="homeRule" /><p>{content.about.body}</p><Link href="/who-we-are" className="homeTextLink">{content.about.cta}<ArrowRight size={16} /></Link></div>
          <div className="homeAboutMedia"><Image src="/images/home/mission.png" alt="Dancers collaborating in a movement research studio" fill sizes="(max-width: 760px) 100vw, 48vw" /><span className="homeImageCaption">Movement as knowledge</span></div>
        </div>
      </section>

      <section className="homeFounder" aria-labelledby="founder-title">
        <div className="homeShell homePortraitFeature">
          <div className="homePortraitMedia"><Image src="/images/home/founder-portrait.png" alt="Dhanushka Seneviratne" fill sizes="(max-width: 760px) 100vw, 44vw" priority /><span>Founder</span></div>
          <article className="homePortraitCopy"><p className="homeEyebrow">02 — Perspective</p><h2 id="founder-title">{content.founder.title}</h2><h3>{content.founder.name}</h3>{content.founder.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<ul>{content.founder.credentials.map((credential) => <li key={credential}>{credential}</li>)}</ul></article>
        </div>
      </section>

      <section className="homeValues" aria-label="Our vision and mission">
        <div className="homeShell homeValuesGrid">
          <article className="homeValue"><div className="homeValueImage"><Image src="/images/home/vision.png" alt="Solo dancer exploring an expansive movement" fill sizes="(max-width: 760px) 100vw, 43vw" /></div><p className="homeEyebrow">03 — Direction</p><h2>Our Vision</h2><p>{content.vision}</p></article>
          <article className="homeValue homeMission"><div className="homeValueImage"><Image src="/images/home/mission.png" alt="Dancers collaborating in a movement research studio" fill sizes="(max-width: 760px) 100vw, 43vw" /></div><p className="homeEyebrow">04 — Practice</p><h2>Our Mission</h2>{content.mission.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>
        </div>
      </section>

      <section className="homeMentor" aria-labelledby="mentor-title">
        <div className="homeShell homeMentorGrid">
          <article className="homeMentorCopy"><p className="homeEyebrow">05 — Exchange</p><h2 id="mentor-title">{content.mentor.title}</h2><h3>{content.mentor.name}</h3>{content.mentor.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<ul>{content.mentor.credentials.map((credential) => <li key={credential}>{credential}</li>)}</ul></article>
          <div className="homeMentorMedia"><Image src="/images/home/mentor-portrait.png" alt="Dr Jacek Ludwig Scarso" fill sizes="(max-width: 760px) 100vw, 44vw" /><span>Mentor</span></div>
        </div>
      </section>

      <section className="homeProjects" aria-labelledby="projects-title">
        <div className="homeShell homeProjectsHeader"><div><p className="homeEyebrow">06 — Research in progress</p><h2 id="projects-title">{content.projects.title}</h2></div><p>{content.projects.body}</p><Link className="homeButton" href="/research-projects">{content.projects.cta}<ArrowRight size={16} /></Link></div>
        <div className="homeShell homeProjectGrid">{projectImages.map(([src, alt], index) => <div className="homeProjectVisual" key={src}><Image src={src} alt={alt} fill sizes="(max-width: 760px) 50vw, 25vw" /><span aria-hidden="true">0{index + 1}</span></div>)}</div>
      </section>

      <section className="homeUnveiling" aria-labelledby="unveiling-title">
        <div className="homeShell homeUnveilingHeading"><p className="homeEyebrow">07 — Forthcoming</p><h2 id="unveiling-title">{content.unveiling}</h2></div>
        <div className="homeShell homeUnveilingGrid"><div><Image src="/images/home/unveiling-movement.png" alt="Contemporary movement with natural pigment" width={560} height={800} sizes="(max-width: 760px) 82vw, 32vw" /></div><div><Image src="/images/home/unveiling-community.png" alt="Dance researchers collaborating in a shared movement space" width={560} height={800} sizes="(max-width: 760px) 82vw, 32vw" /></div></div>
      </section>
    </main>
  );
}
