import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ars Musica Academy, Faridabad. Enquire about music classes, exam prep, fees, and schedule. Call, email, or visit us today!",
  alternates: {
    canonical: "https://arsmusicaacademy.com/contact",
  },
};

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
