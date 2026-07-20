export default function MapSection() {
  return (
    <section className="bg-zinc-950 px-6 md:px-16 lg:px-24 pt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white font-semibold text-2xl md:text-3xl tracking-wide uppercase text-center mb-8">
          Find Us Here
        </h2>
        <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=Ars%20Musica%20Academy%20Sector%2050%20Gurugram&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
