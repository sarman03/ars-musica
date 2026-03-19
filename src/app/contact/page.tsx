import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";

export default function ContactPage() {
  return (
    <main className="relative">
      <Navbar />
      <ContactForm />
      <FaqSection />
      <Footer />
    </main>
  );
}
