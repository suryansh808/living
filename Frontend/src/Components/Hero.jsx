import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../assets/hero/1.png"
import img2 from "../assets/hero/2.webp"
import img3 from "../assets/hero/3.jpeg"
import img4 from "../assets/hero/4.png"
import img5 from "../assets/hero/5.jpeg"
import img6 from "../assets/hero/6.jpeg"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

const slides = [
  {
    id: 1,
    image: `${img1}`,
    title: "Celebrate Sankranti with Anantha",
    subtitle: "Embrace tradition, balance, and inner renewal",
  },
  {
    id: 2,
    image: `${img2}`,
    title: "Soul Reset 2026",
    subtitle: "A guided journey to clarity and conscious living",
  },
  {
    id: 3,
    image: `${img3}`,
    title: "Anantha Tourism",
    subtitle: "Travel with purpose, culture, and awareness",
  },
  {
    id: 4,
    image: `${img4}`,
    title: "Maha Magh Snan 2026 | Prayagraj",
    subtitle: "A sacred convergence of faith and purification",
  },
  {
    id: 5,
    image: `${img5}`,
    title: "Anantha Living",
    subtitle: "Design a lifestyle rooted in harmony",
  },
  {
    id: 6,
    image: `${img6}`,
    title: "Create Your Vision Board Now",
    subtitle: "Turn intention into focused action",
  },
];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      id="home"
      className="relative w-full px-2.5 py-85 lg:py-95 overflow-hidden"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/50" />

          {/* Content */}
          <div className="absolute  inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="mb-6 max-w-4xl font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {slide.title}
            </h2>
            <p className="max-w-2xl text-lg text-white/90 sm:text-xl md:text-2xl">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 transition hover:scale-110 hover:bg-white/40"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 transition hover:scale-110 hover:bg-white/40"
      >
        <ChevronRight size={24} className="text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all ${
              index === currentSlide
                ? "h-2 w-8 rounded-full bg-white"
                : "h-2 w-2 rounded-full bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
