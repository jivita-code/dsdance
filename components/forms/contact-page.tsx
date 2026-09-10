import { InquiryForm } from "@/components/forms/inquiry-form";
import { PageHero } from "@/components/ui/page-hero";

export function ContactPage({ type }: { type: "CONTACT" | "JOIN_US" }) {
  const join = type === "JOIN_US";
  return <section className="formPage">
    <PageHero eyebrow={join ? "COLLABORATE" : "GET IN TOUCH"} title={join ? "Join Us" : "Contact"} body={join ? "Join the DS Dance Research Lab community and help shape the future of dance and performative practice." : "We welcome questions, collaborations and new conversations."} image={join ? "/images/home/mission.png" : "/images/home/journal-editorial.png"} />
    <div className="formLayout"><aside data-reveal="text"><p className="eyebrow gold">DS DANCE RESEARCH LAB</p><h2>Where Dance Meets Discovery</h2><a href="mailto:dsdanceresearchlab@gmail.com">dsdanceresearchlab@gmail.com</a><a href="tel:+447375567669">+44 7375 567669</a></aside><InquiryForm type={type} /></div>
  </section>;
}
