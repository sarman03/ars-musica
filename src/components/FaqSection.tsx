"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What age groups do you teach?",
    answer:
      "We teach students of all ages, from young children to adults. Our programs are tailored to suit different age groups and skill levels.",
  },
  {
    question: "Do I need prior experience to join?",
    answer:
      "No prior experience is needed. We welcome complete beginners as well as intermediate and advanced students looking to refine their skills.",
  },
  {
    question: "How are classes structured?",
    answer:
      "Classes are structured with a mix of theory and practical sessions. Each lesson builds on the previous one, ensuring steady progress and skill development.",
  },
  {
    question: "What courses do you offer?",
    answer:
      "We offer courses in drums, guitar, vocals, piano, keyboard, ukulele, and exam preparation for Trinity College London, Rockschool London, and ABRSM.",
  },
  {
    question: "How do classes work?",
    answer:
      "Classes are conducted one-on-one or in small groups, either in-person or online. Each session is customized to the student's pace and goals.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="w-12 h-[2px] rounded-full mb-6" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
          <h2 className="text-brand-red font-black text-3xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-none whitespace-nowrap">
            Everything You Need To Know
          </h2>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ background: "linear-gradient(to right, #27272a, #18181b 50%, #0f0f0f)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer gap-6"
                >
                  <span
                    className="font-black text-sm md:text-base uppercase tracking-tight bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(to right, #a1a1aa, white 30%, white 80%, #52525b)" }}
                  >
                    {faq.question}
                  </span>
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-700 text-white text-xl font-light">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-zinc-400 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
