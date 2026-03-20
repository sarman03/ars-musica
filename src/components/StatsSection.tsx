const stats = [
  { value: "18+", label: "Years in music" },
  { value: "700+", label: "Live Performance" },
  { value: "7+", label: "Courses Offered" },
  { value: "1,000+", label: "Students Trained" },
];

export default function StatsSection() {
  return (
    <section className="bg-zinc-950 border-b border-zinc-800">
      <div className="grid grid-cols-2 md:grid-cols-4 w-full px-6 md:px-16 lg:px-24 py-16">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center text-center py-4">
            <p className="text-zinc-300 font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
              {stat.value}
            </p>
            <p className="text-zinc-400 text-sm md:text-base mt-3 font-normal">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
