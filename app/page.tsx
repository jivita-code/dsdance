import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/home";

const projectImages = [
  ["/images/home/project-elephant.png", "Dance research visual exploring human–elephant relationships", "Tusker Eye", "Movement · Ecology"],
  ["/images/home/project-textile.png", "Dance research visual exploring natural dye and textile practice", "Dye With Movements", "Material · Practice"],
  ["/images/home/project-ability.png", "Inclusive contemporary dance research visual", "Ability Visible", "Access · Performance"],
  ["/images/home/project-heritage.png", "Dance research visual connecting Sri Lankan heritage and contemporary movement", "Dance & Heritage", "Culture · Research"],
] as const;

export default function Home() {
  const content = homeContent;
  return (
    <main className="homePage">
      <section className="homeHero" aria-labelledby="home-title">
        <Image className="homeHeroImage" src="/images/home/hero.png" alt="Contemporary dancers in a dance research rehearsal" fill priority sizes="100vw" />
        <div className="homeHeroShade" />
        <div className="homeShell homeHeroLayout">
          <div className="homeHeroCopy" data-load>
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

      <section className="homeAbout" aria-labelledby="about-title">
        <div className="homeShell homeAboutGrid">
          <div className="homeSectionCopy" data-reveal="text"><p className="homeEyebrow">01 — Introduction</p><h2 id="about-title">{content.about.title}</h2><span className="homeRule" /><p>{content.about.body}</p><Link href="/who-we-are" className="homeTextLink">{content.about.cta}<ArrowRight size={16} /></Link></div>
          <div className="homeAboutMedia" data-reveal="image" data-reveal-delay="1"><Image src="/images/home/mission.png" alt="Dancers collaborating in a movement research studio" fill sizes="(max-width: 760px) 100vw, 48vw" /><span className="homeImageCaption">Movement as knowledge</span></div>
        </div>
      </section>

      <section className="homeFounder" aria-labelledby="founder-title">
        <div className="homeShell homePortraitFeature">
          <div className="homePortraitMedia" data-reveal="image"><Image src="/images/home/founder-portrait.png" alt="Dhanushka Seneviratne" fill sizes="(max-width: 760px) 100vw, 44vw" priority /><span>Founder</span></div>
          <article className="homePortraitCopy" data-reveal="text" data-reveal-delay="1"><p className="homeEyebrow">02 — Perspective</p><h2 id="founder-title">{content.founder.title}</h2><h3>{content.founder.name}</h3>{content.founder.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<ul>{content.founder.credentials.map((credential) => <li key={credential}>{credential}</li>)}</ul></article>
        </div>
      </section>

      <section className="homeValues" aria-label="Our vision and mission">
        <div className="homeShell homeValuesGrid">
          <article className="homeValue"><div className="homeValueImage" data-reveal="image"><Image src="/images/home/vision.png" alt="Solo dancer exploring an expansive movement" fill sizes="(max-width: 760px) 100vw, 43vw" /></div><p className="homeEyebrow" data-reveal="text">03 — Direction</p><h2 data-reveal="text">Our Vision</h2><p data-reveal="text">{content.vision}</p></article>
          <article className="homeValue homeMission"><div className="homeValueImage" data-reveal="image"><Image src="/images/home/mission.png" alt="Dancers collaborating in a movement research studio" fill sizes="(max-width: 760px) 100vw, 43vw" /></div><p className="homeEyebrow" data-reveal="text">04 — Practice</p><h2 data-reveal="text">Our Mission</h2>{content.mission.map((paragraph) => <p data-reveal="text" key={paragraph}>{paragraph}</p>)}</article>
        </div>
      </section>

      <section className="homeMentor" aria-labelledby="mentor-title">
        <div className="homeShell homeMentorGrid">
          <article className="homeMentorCopy" data-reveal="text"><p className="homeEyebrow">05 — Exchange</p><h2 id="mentor-title">{content.mentor.title}</h2><h3>{content.mentor.name}</h3>{content.mentor.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<ul>{content.mentor.credentials.map((credential) => <li key={credential}>{credential}</li>)}</ul></article>
          <div className="homeMentorMedia" data-reveal="image" data-reveal-delay="1"><Image src="/images/home/mentor-portrait.png" alt="Dr Jacek Ludwig Scarso" fill sizes="(max-width: 760px) 100vw, 44vw" /><span>Mentor</span></div>
        </div>
      </section>

      <section className="homeProjects" aria-labelledby="projects-title">
        <div className="homeShell homeProjectsHeader" data-reveal="text"><div><p className="homeEyebrow">06 — Research in progress</p><h2 id="projects-title">{content.projects.title}</h2></div><p>{content.projects.body}</p><Link className="homeButton" href="/research-projects">{content.projects.cta}<ArrowRight size={16} /></Link></div>
        <div className="homeShell homeProjectGrid">{projectImages.map(([src, alt, title, meta], index) => <Link href="/research-projects" className="homeProjectVisual" data-reveal="card" data-reveal-delay={String(index % 4)} key={src}><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 28vw" /><span className="homeProjectNumber" aria-hidden="true">0{index + 1}</span><div className="homeProjectMeta"><p>{meta}</p><h3>{title}</h3></div></Link>)}</div>
      </section>

      <section className="homeUnveiling" aria-labelledby="unveiling-title">
        <div className="homeShell homeUnveilingHeading" data-reveal="text"><p className="homeEyebrow">07 — Forthcoming</p><h2 id="unveiling-title">{content.unveiling}</h2></div>
        <div className="homeShell homeUnveilingGrid"><div data-reveal="image"><Image src="/images/home/unveiling-movement.png" alt="Contemporary movement with natural pigment" width={560} height={800} sizes="(max-width: 760px) 82vw, 32vw" /></div><div data-reveal="image" data-reveal-delay="1"><Image src="/images/home/unveiling-community.png" alt="Dance researchers collaborating in a shared movement space" width={560} height={800} sizes="(max-width: 760px) 82vw, 32vw" /></div></div>
      </section>

    </main>
  );
}
