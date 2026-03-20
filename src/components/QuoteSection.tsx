export default function QuoteSection() {
  return (
    <section className="bg-black flex items-end min-h-screen px-6 pb-16">
      <div className="w-full flex flex-col items-center text-center gap-1">
        <p className="text-brand-red/80 font-black text-xl md:text-3xl lg:text-4xl tracking-tight uppercase">
          Every Musician Starts With A Single Note
        </p>
        <p className="text-brand-red/30 font-black text-xl md:text-3xl lg:text-4xl tracking-tight uppercase">
          Practice Turns Notes Into Music
        </p>
        <p className="text-brand-red/15 font-black text-xl md:text-3xl lg:text-4xl tracking-tight uppercase">
          Confidence Turns Music Into Performance
        </p>
      </div>
    </section>
  );
}
