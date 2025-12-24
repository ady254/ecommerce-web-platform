import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/products';

function Testimonials() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth; // Scroll one viewport width
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-[#e6f4f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER & CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="text-center md:text-left w-full md:w-auto mb-6 md:mb-0">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#074658] tracking-tight">
              Loved by Thousands
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl font-light">
              Real stories from our happy customers
            </p>
          </div>

          {/* ARROWS */}
          <div className="flex space-x-4 hidden md:flex">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white shadow-lg text-[#074658] hover:bg-[#074658] hover:text-white transition-all transform hover:-translate-x-1"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white shadow-lg text-[#074658] hover:bg-[#074658] hover:text-white transition-all transform hover:-translate-x-1"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div className="relative group">

          {/* MOBILE ARROWS (Overlay) */}
          <button
            onClick={() => scroll('left')}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-r-xl bg-white/80 shadow-md text-[#074658]"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-l-xl bg-white/80 shadow-md text-[#074658]"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="
                        flex-shrink-0 
                        w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] 
                        snap-center
                        bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col justify-between h-auto min-h-[320px]
                    "
              >
                <div>
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-[#519842] text-[#519842]" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed font-medium line-clamp-4">"{testimonial.text}"</p>
                </div>

                <div className="flex items-center space-x-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-[#e6f4f1] flex items-center justify-center text-[#074658] font-bold text-lg flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#074658]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#18889c] font-medium">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS INDICATOR (Optional visual aid) */}
        <div className="flex justify-center space-x-2 mt-4 md:hidden">
          {testimonials.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
