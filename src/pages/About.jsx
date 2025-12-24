
import { Leaf, Heart, Shield, Award } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="py-20 bg-gradient-to-r from-[#519842] to-[#074658] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-6 drop-shadow-md">
            About Hygiena
          </h1>
          <p className="text-xl text-emerald-50 text-center opacity-95 max-w-2xl mx-auto font-light">
            Freshness Meets Care - The Story of Purity
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* MISSION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-1 w-12 bg-[#519842]"></div>
              <span className="text-[#519842] font-bold tracking-wider uppercase text-sm">Our Mission</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 text-[#074658]">
              Cleanliness as a Way of Life
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
              At Hygiena, we believe that cleanliness is not just a habit, but a way of life. Our mission is to provide premium hygiene products that combine the power of nature with cutting-edge science to deliver exceptional cleaning results while caring for your family and the environment.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              We are committed to making quality hygiene products accessible to every household, ensuring that freshness and care are never compromised. Each product in our range is carefully formulated to meet the highest standards of quality and effectiveness.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-[#074658] rounded-2xl transform translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
            <img
              src="/logo.png"
              alt="About Hygiena"
              className="relative rounded-2xl shadow-2xl bg-white p-8 w-full object-contain h-80 z-10"
            />
          </div>
        </div>

        {/* CERTIFICATIONS SECTION */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#074658] mb-4">Government Approved & Certified</h2>
            <div className="w-24 h-1 bg-[#519842] mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our commitment to quality is backed by recognized industry standards. We are proud to be an ISO 9001:2015 and GMP certified company.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* CERTIFICATE 1 */}
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center group">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-100 border border-gray-200">
                {/* Placeholder for Certificate 1 */}
                <img
                  src="/ISO.png"
                  alt="ISO 9001:2015 Certificate"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x800/e6f4f1/074658?text=Upload+ISO+Cert'; e.target.style.padding = '20px'; }}
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#074658] mb-1">ISO 9001:2015</h3>
                <p className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full inline-block">Quality Management System</p>
              </div>
            </div>

            {/* CERTIFICATE 2 */}
            <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center group">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-100 border border-gray-200">
                {/* Placeholder for Certificate 2 */}
                <img
                  src="/GMP.png"
                  alt="GMP Certificate"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://placehold.co/600x800/e6f4f1/074658?text=Upload+GMP+Cert'; e.target.style.padding = '20px'; }}
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#074658] mb-1">GMP Certified</h3>
                <p className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full inline-block">Good Manufacturing Practice</p>
              </div>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#074658]">
            Why Choose Hygiena
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, color: '#6fae68', title: "Natural Ingredients", text: "Made with carefully selected natural extracts and plant-based ingredients." },
              { icon: Shield, color: '#519842', title: "Safe & Tested", text: "All our products undergo rigorous quality testing for safety." },
              { icon: Heart, color: '#18889c', title: "Family First", text: "Formulated with your family's health in mind, gentle on skin." },
              { icon: Award, color: '#1d5e02', title: "Quality Assured", text: "Premium quality products at affordable prices." }
            ].map((item, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-50">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full shadow-inner" style={{ backgroundColor: item.color }}>
                    <item.icon size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#074658]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-12 text-center bg-gradient-to-r from-[#519842] to-[#074658] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-4xl font-bold text-white mb-6 relative z-10">
            Join the Hygiena Family
          </h2>
          <p className="text-lg text-emerald-50 opacity-90 mb-8 max-w-3xl mx-auto relative z-10 font-light">
            Experience the perfect blend of nature and science. Clean living starts with Hygiena.
          </p>
          <a
            href="/products"
            className="inline-block px-10 py-4 rounded-full bg-white text-[#074658] font-bold text-lg hover:bg-gray-100 hover:scale-105 shadow-xl transition-all relative z-10"
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
