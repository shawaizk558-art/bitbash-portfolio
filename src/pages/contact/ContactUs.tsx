import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import ContactUsCardsSection from "@/pages/contact/ContactUsCardsSection";
import HeroBanner from "./HeroBanner";
import TechLogos from "./TechLogos";
// no routing helpers needed here

function ContactUs() {

  return (
    <div className="min-h-screen">
      <Navigation />

      <HeroBanner />

      <section className="bg-white py-8 sm:py-10">
        <ContactUsCardsSection />
      </section>

      <TechLogos />

      {/* bottom CTA removed per request */}

      {/* FAQ Section */}
      <FAQ variant="contact" />

      <Footer isHomepage={false} />
    </div>
  );
}

export default ContactUs;


