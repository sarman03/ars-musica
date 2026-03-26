export default function MapSection() {
  return (
    <section className="bg-zinc-950 px-6 md:px-16 lg:px-24 pt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white font-semibold text-2xl md:text-3xl tracking-tight uppercase text-center mb-8">
          Find Us Here
        </h2>
        <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.5!2d77.056213!3d28.42506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI1JzMwLjIiTiA3N8KwMDMnMjIuNCJF!5e0!3m2!1sen!2sin!4v1"
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
