import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Gallery, InquiryForm } from "@/components/site-client";
import { getContent, staticPages, text, type Blog, type Project } from "@/lib/content";

const phaseFromPath: Record<string, "PAST" | "ONGOING" | "UPCOMING"> = { past: "PAST", ongoing: "ONGOING", upcoming: "UPCOMING" };
const localProjectImages: Record<string, string> = {
  "tusker-eye": "/images/home/project-elephant.png",
  "dye-with-movements": "/images/home/project-textile.png",
  "ability-visible": "/images/home/project-ability.png",
  "sri-lankan-dance-masks": "/images/home/project-heritage.png",
  "dance-connect": "/images/home/podcast-editorial.png",
  "movement-workshop": "/images/home/workshop-editorial.png",
};

function Title({ eyebrow, title, body, image = "/images/home/hero.png", className = "" }: { eyebrow?: string; title: string; body?: string; image?: string; className?: string }) {
  return <section className={`pageHero ${className}`}>
    <Image className="pageHeroImage" src={image} alt="" fill priority sizes="100vw" />
    <div className="pageHeroContent" data-load><p className="eyebrow gold">{eyebrow || "DS DANCE RESEARCH LAB"}</p><h1>{title}</h1>{body && <p>{body}</p>}<span className="pageHeroRule" /></div>
    <p className="pageHeroMarker" aria-hidden="true">Movement · Research · Practice</p>
  </section>;
}

const whoWeAre = {
  heading: "Ds Dance Research Lab",
  paragraphs: [
    "DS Dance Research Lab is an independent platform rooted in creative exploration, critical inquiry, and contemporary performance practice. Founded by artist scholar Dhanushka Senaviratne, the lab serves as a bridge between dance research, education, and innovation particularly focusing on South Asian and Sri Lankan dance traditions.",
    "We believe dance is not just movement it’s a powerful medium for identity, resistance, and transformation. Our platform brings together artists, researchers, educators, and thinkers from around the world to engage in interdisciplinary dialogue, practice based research, and community driven work.",
    "At DS Dance Research Lab, we challenge conventions, explore emerging trends, and open space for bold ideas and meaningful collaborations in the field of dance and performance."
  ]
};

function WhoWeArePage() {
  return <article className="staticPage whoWeArePage">
    <Title eyebrow="01 / WHO WE ARE" title="Who We Are" image="/images/who-we-are-collaboration.png" className="whoWeAreHero" />
    <section className="whoWeAreIntroduction siteShell" aria-labelledby="who-we-are-statement">
      <div className="whoWeAreIndex" data-reveal="text" aria-hidden="true">01</div>
      <div className="whoWeAreLead">
        <p className="eyebrow gold" data-reveal="text">Independent platform</p>
        <h2 id="who-we-are-statement" data-reveal="text">{whoWeAre.heading}</h2>
        <p data-reveal="text" data-reveal-delay="1">{whoWeAre.paragraphs[0]}</p>
      </div>
    </section>
    <section className="whoWeArePractice">
      <div className="siteShell whoWeArePracticeGrid">
        <div className="whoWeArePortrait" data-reveal="image"><Image src="/images/who-we-are-inquiry.png" alt="Dance researcher exploring movement through a written score" fill sizes="(max-width: 860px) 100vw, 42vw" /></div>
        <div className="whoWeArePracticeCopy">
          <p className="eyebrow gold" data-reveal="text">02 / Practice</p>
          <p data-reveal="text">{whoWeAre.paragraphs[1]}</p>
        </div>
      </div>
    </section>
    <section className="whoWeAreClosing siteShell">
      <span className="whoWeAreRule" aria-hidden="true" />
      <p data-reveal="text">{whoWeAre.paragraphs[2]}</p>
    </section>
  </article>;
}

const founderBio = {
  name: "Dhanushka Seneviratne",
  qualifications: "Dhanushka Seneviratne, MA, MPA, BA 1st class (Hons)",
  paragraphs: [
    "is the visionary Founder and Artistic Director of DS Dance Research Lab (DSDRL). A distinguished, award winning professional dancer and a choreographer, Ballet director, interdisciplinary artist, international research scholar, and academic, and Sri Lankan born dance artist, based in London, brings a wealth of expertise and a unique global perspective to the lab. Her journey from Sri Lanka to the United Kingdom culminated in her Master’s degree in Public Art and Performative Practices from London Metropolitan University in 2023.",
    "Her academic contributions include her role as a lecturer in dance choreography theory and practice, and dance research at the Department of Fine Arts at the University of Kelaniya, Sri Lanka. Here, she not only shapes the minds of the future Artists who supervise undergraduate and postgraduate research, but also coordinates the Performing Arts programs degree and engages with curriculum design.",
    "As a professional dancer, researcher, collaborative filmmaker, and choreographer, she has created and performed internationally, establishing a significant presence in the global arts scene. Her expansive interdisciplinary practice showcases remarkable versatility. Her research encompasses Sri Lankan dance, Dance/Movement Therapy (DMT), dance history and archival studies, Public Art and performative practices, dance and community engagement, dance science, dance biomechanics, injury prevention, and dance on screen. She has delivered and published her academic work internationally.",
    "She is an international research scholar who collaborates with renowned researchers in the dance industry, both in the UK and worldwide. In 2025, she became the first Sri Lankan dance artist to present her research work at the University of Oxford. Additionally, she presented her collaborative research on Sri Lankan low-country dance and Dance Movement Therapy (DMT) at the American Dance Therapy Association(ADTA) conference in the USA. Furthermore, she shared her findings as a dance science researcher at the Dance Medicine and Science Symposium at the University of Wolverhampton. Recently, she participated in the final research conference of the Arts and Humanities Research Council (AHRC) Dance Research Matters Festival at the University of Coventry, UK, hosted by the Centre for Dance Research.",
    "Her commitment to advancing the creative arts extends beyond her direct artistic practice; she currently serves on the Europe Committee representing the UK for the International Association for Creative Arts in Education and Therapy (IACAET) and is also a proud member of the Dance and History e.v. Association Germany.",
    "Through DSDRL, Dhanushka channels her passion for pushing artistic boundaries and fostering a deeper understanding of dance as a powerful form of research, collaboration, knowledge exchange, and expression"
  ]
};

function FounderPage() {
  return <article className="staticPage founderEditorial">
    <Title eyebrow="FOUNDER & ARTISTIC DIRECTOR" title={founderBio.name} image="/images/home/founder-portrait.png" className="founderHero" />
    <section className="founderIntroduction siteShell" aria-labelledby="founder-biography">
      <div data-reveal="text"><p className="eyebrow gold">01 / Biography</p><h2 id="founder-biography">Dhanushka Seneviratne</h2></div>
      <p className="founderLead" data-reveal="text" data-reveal-delay="1"><strong>{founderBio.qualifications}</strong>, {founderBio.paragraphs[0]}</p>
    </section>
    <section className="founderResearch">
      <div className="siteShell founderResearchGrid">
        <p data-reveal="text">{founderBio.paragraphs[1]}</p>
        <div className="founderResearchImage" data-reveal="image"><Image src="/images/founder-research-practice.png" alt="Researchers and dancers studying archival movement material together" fill sizes="(max-width: 860px) 100vw, 56vw" /></div>
        <p className="founderResearchStatement" data-reveal="text">{founderBio.paragraphs[2]}</p>
      </div>
    </section>
    <section className="founderScholarship siteShell">
      <div className="founderScholarshipIndex" data-reveal="text">02</div>
      <div className="founderScholarshipCopy"><p className="eyebrow gold" data-reveal="text">International scholarship</p><p data-reveal="text">{founderBio.paragraphs[3]}</p><p data-reveal="text" data-reveal-delay="1">{founderBio.paragraphs[4]}</p></div>
    </section>
    <section className="founderClosing">
      <div className="siteShell" data-reveal="text"><span aria-hidden="true" /><p>{founderBio.paragraphs[5]}</p></div>
    </section>
  </article>;
}

function coverFor(item: Project) {
  return localProjectImages[item.slug] || item.coverImageUrl || item.media[0]?.url || "/images/home/vision.png";
}

function mediaFor(item: Project) {
  const local = localProjectImages[item.slug];
  return local ? [{ url: local, type: "image" as const }] : item.media;
}

function ProjectList({ items, prefix }: { items: Project[]; prefix: string }) {
  if (!items.length) return <section className="emptyState"><p className="eyebrow gold">DS DANCE RESEARCH LAB</p><h2>Research Projects</h2></section>;
  return <div className="listing">{items.map((item, index) => <article className="listingCard" data-reveal="card" data-reveal-delay={String(index % 4)} key={item.slug}>
    <Link className="listingMedia" href={`${prefix}/${item.slug}`}><Image src={coverFor(item)} alt="" fill sizes="(max-width: 760px) 100vw, 42vw" /><span>{String(index + 1).padStart(2, "0")}</span></Link>
    <div className="listingCopy"><p className="eyebrow gold">{item.projectPhase || item.contentType.replace("_", " ")}</p><h2>{item.title}</h2><p>{item.summary}</p><Link className="textLink" href={`${prefix}/${item.slug}`}>Read more <ArrowRight size={16} /></Link></div>
  </article>)}</div>;
}

function BlogList({ items }: { items: Blog[] }) {
  return <div className="listing">{items.map((blog, index) => <article className="listingCard" data-reveal="card" data-reveal-delay={String(index % 4)} key={blog.slug}>
    <Link className="listingMedia" href={`/blogs/${blog.slug}`}><Image src={blog.coverImageUrl || "/images/home/journal-editorial.png"} alt="" fill sizes="(max-width: 760px) 100vw, 42vw" /><span>{String(index + 1).padStart(2, "0")}</span></Link>
    <div className="listingCopy"><p className="eyebrow gold">Journal</p><h2>{blog.title}</h2><p>{blog.excerpt}</p><Link className="textLink" href={`/blogs/${blog.slug}`}>Read article <ArrowRight size={16} /></Link></div>
  </article>)}</div>;
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const path = (await params).slug;
  const key = path.join("/");
  const content = await getContent();
  const projects = content.projects.filter((item) => item.contentType === "RESEARCH_PROJECT");

  if (key === "who-we-are") return <WhoWeArePage />;

  if (key === "founder") return <FounderPage />;

  if (key === "advisory-committee") {
    const people = staticPages.advisory.body.split("\n").filter(Boolean);
    return <article className="staticPage"><Title title={staticPages.advisory.title} image="/images/home/journal-editorial.png" /><section className="peopleGrid">{people.map((person, index) => <article data-reveal="card" data-reveal-delay={String(index % 4)} key={person}><span>{String(index + 1).padStart(2, "0")}</span><h2>{person}</h2></article>)}</section></article>;
  }

  if (key === "research-projects") return <><Title eyebrow="RESEARCH" title="Research Projects" body="Discover our diverse initiatives that blend dance, research, and education." image="/images/home/project-heritage.png" /><ProjectList items={projects} prefix="/research-projects" /></>;
  if (key.startsWith("research-projects/")) {
    const rest = path[1];
    if (phaseFromPath[rest]) { const phase = phaseFromPath[rest]; return <><Title eyebrow="RESEARCH" title={`${phase[0] + phase.slice(1).toLowerCase()} Projects`} image="/images/home/project-textile.png" /><ProjectList items={projects.filter((item) => item.projectPhase === phase)} prefix="/research-projects" /></>; }
    const item = projects.find((project) => project.slug === rest); if (!item) notFound(); return <ProjectDetail item={item} back="/research-projects" />;
  }
  if (key === "news-events") { const events = content.projects.filter((item) => item.contentType === "EVENT"); return <><Title eyebrow="WHAT'S ON" title="News & Events" image="/images/home/workshop-editorial.png" /><ProjectList items={events} prefix="/news-events" /></>; }
  if (key.startsWith("news-events/")) { const item = content.projects.find((project) => project.contentType === "EVENT" && project.slug === path[1]); if (!item) notFound(); return <ProjectDetail item={item} back="/news-events" />; }
  if (key === "podcasts") { const podcasts = content.projects.filter((item) => item.contentType === "PODCAST"); return <><Title eyebrow="LISTEN" title="Podcasts" image="/images/home/podcast-editorial.png" /><ProjectList items={podcasts} prefix="/podcasts" /></>; }
  if (key.startsWith("podcasts/")) { const item = content.projects.find((project) => project.contentType === "PODCAST" && project.slug === path[1]); if (!item) notFound(); return <ProjectDetail item={item} back="/podcasts" />; }
  if (key === "blogs") return <><Title eyebrow="JOURNAL" title="Blogs" image="/images/home/journal-editorial.png" /><BlogList items={content.blogs} /></>;
  if (key.startsWith("blogs/")) { const blog = content.blogs.find((item) => item.slug === path[1]); if (!blog) notFound(); return <article className="detail"><Link className="back" data-reveal="text" href="/blogs"><ArrowLeft size={16} /> All blogs</Link><Title eyebrow="JOURNAL" title={blog.title} body={blog.excerpt || undefined} image={blog.coverImageUrl || "/images/home/journal-editorial.png"} /><p className="bodyCopy" data-reveal="text">{text(blog.content.body)}</p></article>; }
  if (key === "workshops-gallery") return <><Title eyebrow="ARCHIVE" title="Workshops & Gallery" body="A visual record of our projects, practices and collaborations." image="/images/home/workshop-editorial.png" /><section className="galleryPage">{projects.filter((item) => item.media.length).map((item, index) => <article key={item.slug}><div className="galleryHeading" data-reveal="text"><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2></div><Gallery title={item.title} media={mediaFor(item)} /></article>)}</section></>;
  if (key === "join-us" || key === "contact") { const join = key === "join-us"; return <section className="formPage"><Title eyebrow={join ? "COLLABORATE" : "GET IN TOUCH"} title={join ? "Join Us" : "Contact"} body={join ? "Join the DS Dance Research Lab community and help shape the future of dance and performative practice." : "We welcome questions, collaborations and new conversations."} image={join ? "/images/home/mission.png" : "/images/home/journal-editorial.png"} /><div className="formLayout"><aside data-reveal="text"><p className="eyebrow gold">DS DANCE RESEARCH LAB</p><h2>Where Dance Meets Discovery</h2><a href="mailto:dsdanceresearchlab@gmail.com">dsdanceresearchlab@gmail.com</a><a href="tel:+447375567669">+44 7375 567669</a></aside><InquiryForm type={join ? "JOIN_US" : "CONTACT"} /></div></section>; }
  notFound();
}

function ProjectDetail({ item, back }: { item: Project; back: string }) {
  const links = item.content.links && typeof item.content.links === "object" ? Object.entries(item.content.links as Record<string, unknown>).filter((entry): entry is [string, string] => typeof entry[1] === "string") : [];
  return <article className="detail"><Link className="back" data-reveal="text" href={back}><ArrowLeft size={16} /> Back</Link><Title eyebrow={item.contentType.replace("_", " ")} title={item.title} body={item.summary || undefined} image={coverFor(item)} /><div className="detailBody"><p className="bodyCopy" data-reveal="text">{text(item.content.body)}</p>{item.projectUrl && <a className="goldButton" data-reveal="text" href={item.projectUrl} target="_blank" rel="noreferrer">Visit external project <ExternalLink size={16} /></a>}{links.length > 0 && <div className="externalLinks" data-reveal="text">{links.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer">{name} <ExternalLink size={14} /></a>)}</div>}</div><Gallery title={item.title} media={mediaFor(item)} /></article>;
}
