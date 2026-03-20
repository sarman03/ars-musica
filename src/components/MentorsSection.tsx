import Image from "next/image";

const mentors = [
  {
    name: "Nawin Rai - Ars Musica Academy",
    description:
      "He is also an accomplished drummer and percussionist, Nawin performs with well-known rock bands such as Squarez Attached and Esmond Lama. He is regularly invited for collaborations and special sessions with leading bands and artists across the NCR music scene, earning him respect as both a performer and a collaborator.",
    imageSrc: "/mentors/mentor_1.jpeg",
    imageAlt: "Nawin Rai playing drums",
  },
  {
    name: "Aro Phungshok \u2013 Piano Instructor",
    description:
      "Aro Phungshok is a passionate and dedicated piano teacher with a strong commitment to nurturing musical talent and inspiring students through the art of piano. With a warm and encouraging teaching approach, she focuses on helping students develop not only strong technical skills but also confidence, creativity, and a deep appreciation for music.",
    imageSrc: "/mentors/mentor_2.jpeg",
    imageAlt: "Aro Phungshok at piano",
  },
  {
    name: "Ranjan Dewan \u2013 Guitar Educator",
    description:
      "Ranjan Dewan is a dedicated guitar educator and performer originally from Darjeeling, with over two decades of experience in teaching and performing music. He holds an ATCL certification in Western Classical Guitar from Trinity College London, which laid the foundation for his strong musical training and technical expertise.",
    imageSrc: "/mentors/mentor_3.jpeg",
    imageAlt: "Ranjan Dewan with guitar",
  },
  {
    name: "Bonita Solomon \u2013 Piano & Music Theory Instructor | Pianist | Vocalist",
    description:
      "Bonita Solomon is a passionate musician and dedicated educator with over 18 years of experience in music performance and teaching. A trained pianist and vocalist, Bonita holds certifications from Trinity College London, UK, and has completed Grade 5 in Music Theory from ABRSM, reflecting her strong academic grounding in music.",
    imageSrc: "/mentors/mentor_4.jpeg",
    imageAlt: "Bonita Solomon",
  },
  {
    name: "Rosemary Deosa \u2013 Co-Founder | Vocal Instructor | Singer | Performer | Songwriter | Composer",
    description:
      "Rosemary Deosa is a passionate and accomplished vocalist, performer, and music educator with over 11 years of experience in teaching and live performance. As the Co-Founder of Ars Musica Academy, she plays a vital role in shaping the academy's artistic vision, nurturing a culture that is student-focused, expressive, and rooted in musical excellence.",
    imageSrc: "/mentors/mentor_5.jpeg",
    imageAlt: "Rosemary Deosa performing",
  },
];

function MentorCard({ mentor }: { mentor: (typeof mentors)[0] }) {
  return (
    <div className="bg-zinc-900 rounded-t-[999px] rounded-b-3xl overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[3/4] rounded-t-[999px] overflow-hidden">
        <Image
          src={mentor.imageSrc}
          alt={mentor.imageAlt}
          fill
          className="object-cover object-top"
        />
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="w-8 h-[2px] bg-white rounded-full" />
        <h3 className="text-white font-black text-sm md:text-base uppercase tracking-tight leading-snug">
          {mentor.name}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          {mentor.description}
        </p>
        <div className="w-6 h-[1px] bg-zinc-600 rounded-full mt-2" />
      </div>
    </div>
  );
}

export default function MentorsSection() {
  return (
    <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-16">
          <div className="w-12 h-[3px] bg-white rounded-full mb-6" />
          <h2 className="text-brand-red font-black text-4xl md:text-6xl tracking-tight uppercase">
            Our Mentors
          </h2>
        </div>

        {/* Mentor cards — row 1: 3 cards, row 2: 2 centered */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.slice(0, 3).map((mentor) => (
              <MentorCard key={mentor.name} mentor={mentor} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-[16.67%]">
            {mentors.slice(3).map((mentor) => (
              <MentorCard key={mentor.name} mentor={mentor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
