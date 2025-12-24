import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

function Hero() {
  const slides = [
    "/handwash1.png",
    "/Banner2.png",
    "/handwash2.png",
    "/banner.png",
  ];

  const [index, setIndex] = useState(0);

  // AUTO SLIDE ALWAYS RUNNING
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setIndex((index + 1) % slides.length);
  const prevSlide = () =>
    setIndex((index - 1 + slides.length) % slides.length);

  return (
    <>
      <div
        className="
          relative w-full 
          h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[92vh]
          overflow-hidden
        "
      >
        {/* SLIDES */}
        {slides.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-[900ms]
              ${i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"}
            `}
          >
            <img
              src={img}
              alt="Hero Banner"
              className="
                      w-full h-full
                      object-cover               /* mobile view keeps full bleed */
                       md:object-cover
                 lg:object-contain         /* desktop: NO CROPPING */
                  bg-black                /* fill background behind image */
                 "
            />

            <div className="absolute inset-0 bg-black/40 sm:bg-black/45 md:bg-black/50"></div>
          </div>
        ))}

        {/* TEXT CONTENT */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
          <h1 className="font-extrabold mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg tracking-tight">
            Freshness Meets <span className="text-[#a3e635]">Care</span>
          </h1>

          <p className="max-w-md md:max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-light opacity-95 mb-8 drop-shadow-md">
            Premium home hygiene products crafted for purity, protection, and everyday freshness.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="px-8 py-4 rounded-full text-white font-bold text-lg bg-gradient-to-r from-[#074658] to-[#0a6c8a] hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 ring-2 ring-white/20"
            >
              <Sparkles size={20} />
              <span>Shop Now</span>
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white backdrop-blur-sm bg-white/10 hover:bg-white hover:text-[#074658] transition-all duration-300 shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-110"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-110"
        >
          <ChevronRight size={22} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-white scale-125" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
