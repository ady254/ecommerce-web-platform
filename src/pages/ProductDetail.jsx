import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Package, ArrowLeft, ShieldCheck, Truck, RotateCcw, CheckCircle, Star } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/cartcontext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [showBuyModal, setShowBuyModal] = useState(false);

  // Handle multiple images
  const images = product && product.images && product.images.length > 0 ? product.images : (product ? [product.image] : []);
  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Product Not Found</div>;
  }

  // Trust Badges Data
  const trustBadges = [
    { icon: <ShieldCheck size={24} className="text-[#519842]" />, text: "100% Original Products" },
    { icon: <RotateCcw size={24} className="text-[#519842]" />, text: "Easy 7-Day Returns" },
    { icon: <Truck size={24} className="text-[#519842]" />, text: "Fast & Secure Delivery" },
    { icon: <CheckCircle size={24} className="text-[#519842]" />, text: "Quality Assured" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* BREADCRUMB / BACK BUTTON */}
        <Link to="/products" className="inline-flex items-center text-[#074658] font-medium mb-8 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft size={20} className="mr-2" /> Back to Products
        </Link>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT COLUMN - Sticky Image Section */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6 animate-slideUp">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group">
              <div className="relative aspect-square flex items-center justify-center p-6 bg-gray-50/50">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full max-w-md object-contain transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 justify-center overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img
                      ? "border-[#519842] ring-2 ring-[#519842]/20 scale-105"
                      : "border-transparent hover:border-gray-300"
                    }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Product Info */}
          <div className="space-y-8 animate-fadeIn">

            {/* Header */}
            <div className="border-b pb-6 space-y-4">
              <div className="flex items-center gap-4 text-sm text-[#519842] font-bold tracking-wider uppercase">
                <span className="bg-[#e5f5e0] px-3 py-1 rounded-full">In Stock</span>
                <span className="flex items-center gap-1"><CheckCircle size={14} /> Verified Authentic</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-[#074658] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="currentColor" />)}
                </div>
                <span className="text-gray-500 text-sm font-medium">(120+ Verified Reviews)</span>
              </div>

              <div className="flex items-end gap-3 pt-2">
                <span className="text-5xl font-bold text-[#519842]">₹{product.price}</span>
                <span className="text-xl text-gray-400 line-through mb-2">₹{Math.round(product.price * 1.2)}</span>
                <span className="text-sm font-bold text-red-500 mb-3 bg-red-100 px-2 py-0.5 rounded">20% OFF</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-200 ${selectedSize === size
                        ? "border-[#519842] bg-[#519842] text-white shadow-lg shadow-green-200 scale-105"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#519842]"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Quantity</h3>
              <div className="inline-flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                >
                  -
                </button>
                <span className="w-16 text-center font-bold text-xl text-[#074658]">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setShowBuyModal(true)}
                className="flex-1 py-4 px-8 rounded-xl bg-gradient-to-r from-[#519842] to-[#3d7a2f] text-white font-bold text-lg shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={22} /> Buy Now
              </button>

              <button
                onClick={() => {
                  addToCart(product, selectedSize, quantity);
                  navigate("/cart");
                }}
                className="flex-1 py-4 px-8 rounded-xl bg-[#074658] text-white font-bold text-lg shadow-xl shadow-cyan-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Package size={22} /> Add to Cart
              </button>

              <Link
                to={`/contact?bulk=true&product=${encodeURIComponent(product.name)}`}
                className="flex-none py-4 px-6 rounded-xl border-2 border-[#074658] text-[#074658] font-bold text-lg hover:bg-[#074658] hover:text-white transition-all flex items-center justify-center"
              >
                Bulk Order
              </Link>
            </div>

            {/* Trust Badges - User Trust Builder */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50 hover:bg-[#e5f5e0]/30 transition-colors">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    {badge.icon}
                  </div>
                  <span className="font-medium text-gray-700 text-sm">{badge.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* BUY OPTIONS MODAL */}
        {showBuyModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative transform transition-all scale-100">
              <button
                onClick={() => setShowBuyModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:rotate-90 transition-all"
              >
                <span className="text-3xl">&times;</span>
              </button>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-extrabold text-[#074658]">Choose Seller</h3>
                <p className="text-gray-500 mt-2">Select your preferred platform to complete the purchase securely.</p>
              </div>

              <div className="space-y-4">
                {/* 1. Official Store */}
                <button
                  onClick={() => {
                    navigate(`/payment?productId=${product.id}&price=${product.price}&size=${selectedSize}&qty=${quantity}`);
                    setShowBuyModal(false);
                  }}
                  className="w-full py-4 px-6 bg-[#519842] hover:bg-[#3d7a2f] text-white rounded-xl font-bold flex items-center justify-between group transition-all"
                >
                  <span>Official Hygiena Store</span>
                  <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">OR VIA PARTNERS</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* 2. Flipkart */}
                <a
                  href="https://www.flipkart.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-[#2874f0] text-white rounded-xl font-bold flex items-center justify-between hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                >
                  <span>Flipkart</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Recommended</span>
                </a>

                {/* 3. JioMart */}
                <a
                  href="https://www.jiomart.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-[#008ecc] text-white rounded-xl font-bold flex items-center justify-between hover:shadow-lg hover:shadow-blue-400/20 transition-all hover:-translate-y-0.5"
                >
                  <span>JioMart</span>
                </a>

                {/* 4. Meesho */}
                <a
                  href="https://www.meesho.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-[#f43397] text-white rounded-xl font-bold flex items-center justify-between hover:shadow-lg hover:shadow-pink-500/20 transition-all hover:-translate-y-0.5"
                >
                  <span>Meesho</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default ProductDetail;
