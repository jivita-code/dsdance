import Image from "next/image";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  image?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, body, image = "/images/home/hero.png", className = "" }: PageHeroProps) {
  return <section className={`pageHero ${className}`}>
    <Image className="pageHeroImage" src={image} alt="" fill priority sizes="100vw" />
    <div className="pageHeroContent" data-load><p className="eyebrow gold">{eyebrow || "DS DANCE RESEARCH LAB"}</p><h1>{title}</h1>{body && <p>{body}</p>}<span className="pageHeroRule" /></div>
    <p className="pageHeroMarker" aria-hidden="true">Movement · Research · Practice</p>
  </section>;
}
