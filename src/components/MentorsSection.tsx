import Image from "next/image";

const mentors = [
  {
    name: "Nawin Rai - Ars Musica Academy",
    description:
      "He is also an accomplished drummer and percussionist, Nawin performs with well-known rock bands such as Squarez Attached and Esmond Lama. He is regularly invited for collaborations and special sessions with leading bands and artists across the NCR music scene, earning him respect as both a performer and a collaborator.",
    imageSrc: "/mentors/nawin.jpg",
    imageAlt: "Nawin Rai playing drums",
  },
  {
    name: "Aro Phungshok \u2013 Piano Instructor",
    description:
      "Aro Phungshok is a passionate and dedicated piano teacher with a strong commitment to nurturing musical talent and inspiring students through the art of piano. With a warm and encouraging teaching approach, she focuses on helping students develop not only strong technical skills but also confidence, creativity, and a deep appreciation for music.",
    imageSrc: "/mentors/aro.jpg",
    imageAlt: "Aro Phungshok at piano",
  },
  {
    name: "Ranjan Dewan \u2013 Guitar Educator",
    description:
      "Ranjan Dewan is a dedicated guitar educator and performer originally from Darjeeling, with over two decades of experience in teaching and performing music. He holds an ATCL certification in Western Classical Guitar from Trinity College London, which laid the foundation for his strong musical training and technical expertise.",
    imageSrc: "/mentors/ranjan.jpg",
    imageAlt: "Ranjan Dewan with guitar",
  },
];

export default function MentorsSection() {
  return (
    <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="w-12 h-[3px] bg-white rounded-full" />
          <h2 className="text-center">
            <span className="text-red-700 font-black text-4xl md:text-5xl tracking-tight uppercase">
              Our Ment
            </span>
            <span className="text-zinc-500 font-black text-4xl md:text-5xl tracking-tight uppercase">
              ors
            </span>
          </h2>
        </div>

        {/* Mentor cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="bg-zinc-900/50 border border-zinc-800 rounded-t-[80px] rounded-b-lg overflow-hidden flex flex-col"
            >
              {/* Arch-shaped image */}
              <div className="relative h-72 mx-4 mt-4 rounded-t-[72px] overflow-hidden">
                <Image
                  src={mentor.imageSrc}
                  alt={mentor.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text content */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="w-8 h-[2px] bg-white rounded-full" />
                <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight leading-tight">
                  {mentor.name}
                </h3>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                  {mentor.description}
                </p>
                <div className="w-6 h-[1px] bg-zinc-600 rounded-full mt-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
