import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    if (category) {
      setSelectedCategory(category);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // FILTER LOGIC
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* PAGE HEADER */}
      <div className="py-20 bg-gradient-to-r from-[#519842] to-[#074658] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-6 drop-shadow-md">
            Our Products
          </h1>
          <p className="text-xl text-emerald-50 text-center max-w-2xl mx-auto font-light leading-relaxed">
            Discover premium hygiene solutions crafted for a cleaner, safer, and fresher home.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* SEARCH BAR */}
        <div className="relative max-w-lg mx-auto mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#519842] to-[#074658] rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white rounded-xl shadow-lg">
            <Search
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#074658] transition-colors"
              size={22}
            />
            <input
              type="text"
              placeholder="Search for freshness..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-xl border-none focus:ring-2 focus:ring-[#074658]/20 text-gray-700 placeholder-gray-400 text-lg transition-all"
            />
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-8 py-3 rounded-full font-bold transition-all transform hover:-translate-y-1 ${selectedCategory === 'all'
              ? 'bg-[#074658] text-white shadow-lg shadow-[#074658]/30 scale-105'
              : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-md border border-gray-200'
              }`}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-8 py-3 rounded-full font-bold transition-all transform hover:-translate-y-1 ${selectedCategory === category.id
                ? 'bg-[#074658] text-white shadow-lg shadow-[#074658]/30 scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-md border border-gray-200'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-fadeIn">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* NO MATCH FOUND */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-gray-400" />
            </div>
            <p className="text-2xl text-gray-600 font-medium">
              No products found matching "{searchQuery}"
            </p>
            <p className="text-gray-400 mt-2">Try checking for typos or using different keywords.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Products;
