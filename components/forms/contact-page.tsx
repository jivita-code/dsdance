import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { socialLinks } from "@/config/social-links";

export function ContactPage({ type }: { type: "CONTACT" | "JOIN_US" }) {
  const join = type === "JOIN_US";
  if (join) return <section className="joinPage formPage">
    <PageHero eyebrow="COLLABORATE" title="Join Us" image="/images/join-us-hero.png" />
    <div className="joinLayout">
      <aside className="joinJourney" data-reveal="text">
        <p className="eyebrow gold">DS DANCE RESEARCH LAB</p>
        <h2>Join Our Journey</h2>
        <p>At <strong>DS Dance Research Lab</strong>, we’re building a vibrant community where creativity, research, and performance come together. Whether you’re a performer, researcher, educator, or simply passionate about dance, this is your chance to connect, collaborate, and grow with us. Together, we can explore new ideas and create projects that inspire across borders.</p>
      </aside>
      <div className="joinForm" data-reveal="text"><InquiryForm type="JOIN_US" /></div>
    </div>
  </section>;

  return <section className="contactPage formPage">
    <PageHero eyebrow="GET IN TOUCH" title="We're Ready, Let's Talk." image="/images/contact-hero.png" />
    <div className="contactLayout">
      <aside className="contactInfo" data-reveal="text">
        <p className="eyebrow">CONTACT</p>
        <h2>Contact Info</h2>
        <dl>
          <div><dt>Address</dt><dd>London, United Kingdom, SS17 0BP</dd></div>
          <div><dt>Email Us</dt><dd><a href="mailto:dsdanceresearchlab@gmail.com">dsdanceresearchlab@gmail.com</a></dd></div>
          <div><dt>Call Us</dt><dd><a href="tel:+447375567669">+44 7375 567669</a></dd></div>
        </dl>
        <div className="contactSocial">
          <h3>Follow Us</h3>
          <div className="contactSocialLinks">
            {socialLinks.map(({ label, href, icon }) => <a aria-label={label} href={href} key={label} rel="noreferrer" target="_blank" title={label}><span aria-hidden="true" className={`footerSocialMark footerSocialMark--${icon}`} /></a>)}
          </div>
        </div>
      </aside>
      <div className="contactForm" data-reveal="text"><InquiryForm type="CONTACT" /></div>
    </div>
  </section>;
}
