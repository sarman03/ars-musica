import Image from "next/image";

interface GalleryItem {
  src: string;
  alt: string;
  rotate: string;
}

const galleryImages: GalleryItem[] = [
  { src: "/gallery/gallery-1.jpg", alt: "Student receiving certificate",  rotate: "-rotate-2" },
  { src: "/gallery/gallery-2.jpg", alt: "Young student playing drums",    rotate: "rotate-1"  },
  { src: "/gallery/gallery-3.jpg", alt: "Student with music instructor",  rotate: "-rotate-1" },
  { src: "/gallery/gallery-4.jpg", alt: "Certificate presentation",       rotate: "rotate-2"  },
  { src: "/gallery/gallery-5.jpg", alt: "Student practicing drums",       rotate: "-rotate-1" },
  { src: "/gallery/gallery-6.jpg", alt: "Young singer performing",        rotate: "rotate-1"  },
];

function TapedPhotoCard({ src, alt, rotate }: GalleryItem) {
  return (
    <div className={`group relative pt-4 ${rotate} transition-transform duration-300 hover:rotate-0 hover:scale-105`}>
      {/* Gaffer tape */}
      <div
        className="absolute top-0 left-0 right-0 h-4 z-10 rounded-sm shadow-lg transition-all duration-300"
        style={{
          background: "linear-gradient(to right, #707070, #4a4a4a, #333333)",
        }}
      />
      {/* Tape turns white on hover via overlay */}
      <div className="absolute top-0 left-0 right-0 h-4 z-10 rounded-sm bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Photo */}
      <div
        className="relative w-full overflow-hidden rounded-2xl transition-all duration-300 group-hover:brightness-125"
        style={{
          boxShadow: "0 12px 40px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)",
        }}
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-all duration-300 group-hover:brightness-125"
          />
        </div>
      </div>
    </div>
  );
}

export default function GallerySection() {
  return (
    <section className="bg-black px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-20">
          <div className="w-12 h-[3px] bg-white rounded-full mb-4" />
          <h2 className="text-red-600 font-black text-4xl md:text-6xl tracking-tight uppercase">
            Gallery
          </h2>
        </div>

        {/* Taped photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {galleryImages.map((image, i) => (
            <TapedPhotoCard key={i} {...image} />
          ))}
        </div>
      </div>
    </section>
  );
}
