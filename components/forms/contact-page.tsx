import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";
import { socialLinks } from "@/config/social-links";

export function ContactPage({ type }: { type: "CONTACT" | "JOIN_US" }) {
  const join = type === "JOIN_US";
  if (join) return <section className="formPage">
    <PageHero eyebrow="COLLABORATE" title="Join Us" body="Join the DS Dance Research Lab community and help shape the future of dance and performative practice." image="/images/home/mission.png" />
    <div className="formLayout"><aside data-reveal="text"><p className="eyebrow gold">DS DANCE RESEARCH LAB</p><h2>Where Dance Meets Discovery</h2><a href="mailto:dsdanceresearchlab@gmail.com">dsdanceresearchlab@gmail.com</a><a href="tel:+447375567669">+44 7375 567669</a></aside><InquiryForm type={type} /></div>
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
