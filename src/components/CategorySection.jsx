import { Link } from 'react-router-dom';
import { categories } from '../data/products';

function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#074658' }}>
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600">
            Discover our complete range of hygiene solutions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 aspect-[4/5] transform hover:-translate-y-2 border-4 border-white"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"
              ></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-1 tracking-wide">{category.name}</h3>
                <p className="text-sm opacity-90 mb-4 font-light text-gray-200">{category.description}</p>

                <button
                  className="px-6 py-2 rounded-full text-white text-sm font-semibold bg-[#519842] hover:bg-[#3f7a32] shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  Explore Collection
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
