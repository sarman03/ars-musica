const stats = [
  { value: "5+", label: "Years in music" },
  { value: "50+", label: "Live Performance" },
  { value: "7+", label: "Courses Offered" },
  { value: "500+", label: "Students Trained" },
];

export default function StatsSection() {
  return (
    <section className="bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-zinc-400 font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
                {stat.value}
              </p>
              <p className="text-zinc-500 text-sm md:text-base mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
