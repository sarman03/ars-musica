"use client";

import { useEffect } from "react";

export default function MapSection() {
  useEffect(() => {
    console.log("=== MAP SECTION DEBUG ===");
    console.log("Viewport Width:", window.innerWidth);
    console.log("Viewport Height:", window.innerHeight);
    const iframe = document.querySelector('iframe[title="Ars Musica Academy Location"]') as HTMLIFrameElement | null;
    if (iframe) {
      console.log("Iframe elements found. Current iframe src URL:", iframe.src);
    } else {
      console.error("Map iframe not found in DOM!");
    }
    console.log("=========================");
  }, []);
  return (
    <section className="bg-zinc-950 px-6 md:px-16 lg:px-24 pt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white font-semibold text-2xl md:text-3xl tracking-wide uppercase text-center mb-8">
          Find Us Here
        </h2>
        <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=Ars+Musica+Academy,+B-8,+Pocket+C,+Mayfield+Garden,+Sector+50,+Gurugram,+Haryana+122018&ll=28.425366,77.0562705&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ars Musica Academy Location"
          />
        </div>
      </div>
    </section>
  );
}
