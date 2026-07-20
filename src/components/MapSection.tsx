export default function MapSection() {
  return (
    <section className="bg-zinc-950 px-6 md:px-16 lg:px-24 pt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white font-semibold text-2xl md:text-3xl tracking-wide uppercase text-center mb-8">
          Find Us Here
        </h2>
        <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.4357777176166!2d77.05369557593259!3d28.42536597577884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19502bdf8b7f:0xee0534ba34404f43!2sArs%20Musica%20Academy!5e0!3m2!1sen!2sin!4v1721516200000!5m2!1sen!2sin"
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
