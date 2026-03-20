export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden"
    >
      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[500px] bg-gradient-to-b from-white/15 via-white/5 to-transparent blur-[60px] rotate-[5deg]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/3 w-[150px] h-[400px] bg-gradient-to-b from-white/10 via-white/3 to-transparent blur-[40px] -rotate-[8deg]" />

      {/* Bottom fog */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-900/50 to-transparent" />

      <div className="relative z-[1] text-center">
        <div className="w-12 h-[2px] rounded-full mx-auto mb-6" style={{ background: "linear-gradient(to right, transparent, white, transparent)" }} />
        <h2 className="text-white font-black text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-tight">
          Let&apos;s Get
          <br />
          In Touch
        </h2>
      </div>
    </section>
  );
}
