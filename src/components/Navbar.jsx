import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMiniCart, setOpenMiniCart] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const { cart } = useCart();

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAllMenus = () => {
    setOpenMiniCart(false);
    setOpenProfile(false);
    setIsMenuOpen(false);
  }

  const toggleProfile = () => {
    const newState = !openProfile;
    closeAllMenus();
    setOpenProfile(newState);
  }

  const toggleCart = () => {
    const newState = !openMiniCart;
    closeAllMenus();
    setOpenMiniCart(newState);
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white shadow-sm py-0'}`}>

      {/* ANIMATED OFFER BAR */}
      <div className={`${scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100 py-2'} bg-[#1d5e02] overflow-hidden transition-all duration-300 ease-in-out w-full relative`}>
        <div className="inline-block text-xs md:text-sm uppercase tracking-widest text-white animate-marquee font-medium whitespace-nowrap">
          Use Coupon Code <strong>ZB10</strong> and get 10% off on orders above INR500 •
          Use Coupon Code <strong>ZB10</strong> and get 10% off on orders above INR500 •
          Use Coupon Code <strong>ZB10</strong> and get 10% off on orders above INR500
        </div>
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 20s linear infinite;
              display: inline-block;
              min-width: 200%;
              padding-left: 20px; 
            }
          `}
        </style>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative z-20">

        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3 group" onClick={closeAllMenus}>
          <img src="/logo.png" alt="logo" className={`transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-14 h-14'}`} />
          <div>
            <h1 className={`font-extrabold transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`} style={{ color: "#074658" }}>
              Hygiena<span className="text-xs align-top">™</span>
            </h1>
            {!scrolled && <p className="text-xs tracking-wide hidden sm:block" style={{ color: "#18889c" }}>Freshness Meets Care</p>}
          </div>
        </Link>

        {/* CENTER MENU (DESKTOP) */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/support", label: "Support" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative group py-2"
              onClick={closeAllMenus}
            >
              <span className={`transition-colors duration-300 ${isActive(item.to) ? "text-[#074658]" : "text-[#1d5e02] group-hover:text-[#074658]"}`}>
                {item.label}
              </span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#519842] transform origin-left transition-transform duration-300 ${isActive(item.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}
        </div>

        {/* RIGHT ICONS (DESKTOP) */}
        <div className="hidden md:flex items-center space-x-6 text-[#074658]">

          <div className="relative">
            <User
              className="cursor-pointer hover:text-[#519842] hover:scale-110 transition-all duration-300"
              size={22}
              onClick={toggleProfile}
            />
            {openProfile && (
              <div className="absolute right-0 top-full mt-4 bg-white/95 backdrop-blur-xl shadow-2xl p-6 rounded-2xl w-72 border border-gray-100 z-50 animate-fadeIn origin-top-right">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#e5f5e0] rounded-full flex items-center justify-center mx-auto mb-3 text-[#519842]">
                    <User size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-[#074658] mb-1">Welcome!</h3>
                  <p className="text-sm text-gray-500 mb-4">You are currently shopping as a guest.</p>

                  <button
                    onClick={() => { setOpenProfile(false); }}
                    className="w-full py-2.5 rounded-xl bg-[#519842] text-white font-semibold hover:bg-[#3d7a2f] transition-colors flex items-center justify-center gap-2"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CART ICON WITH BADGE (DESKTOP) */}
          <div className="relative group">
            <ShoppingCart
              className="cursor-pointer group-hover:text-[#519842] group-hover:scale-110 transition-all duration-300"
              size={24}
              onClick={toggleCart}
            />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-bounce">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        {/* MOBILE ICONS */}
        <div className="flex md:hidden items-center gap-4">
          {/* MOBILE CART */}
          <div className="relative" onClick={toggleCart}>
            <ShoppingCart className="text-[#074658]" size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {cart.length}
              </span>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="text-[#074658]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MINI CART DROPDOWN */}
      {openMiniCart && (
        <div className="absolute right-4 top-full mt-2 bg-white/95 backdrop-blur-xl shadow-2xl p-6 rounded-2xl w-80 border border-gray-100 z-50 transform origin-top-right animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-[#074658]">Your Cart</h3>
            <button onClick={() => setOpenMiniCart(false)} className="text-gray-400 hover:text-red-500"><X size={18} /></button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="mx-auto text-gray-200 mb-2" size={48} />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto mb-4 space-y-3 custom-scrollbar">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-semibold text-[#074658] line-clamp-1">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-[#519842]">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="space-y-2">
              <Link
                to="/cart"
                onClick={() => setOpenMiniCart(false)}
                className="block w-full bg-white border-2 border-[#519842] text-[#519842] hover:bg-[#519842] hover:text-white font-semibold text-center py-2.5 rounded-xl transition-all"
              >
                View Cart
              </Link>

              <Link
                to="/payment"
                onClick={() => setOpenMiniCart(false)}
                className="block w-full bg-gradient-to-r from-[#074658] to-[#0a6c8a] text-white font-bold text-center py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                Checkout Now
              </Link>
            </div>
          )}
        </div>
      )}

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t px-6 py-6 space-y-4 absolute w-full shadow-xl animate-fadeIn top-full left-0">

          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/support", label: "Support" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-lg py-3 border-b border-gray-100 transition-all duration-300 hover:bg-gray-50 hover:pl-4 hover:text-[#519842] active:bg-gray-100 ${isActive(item.to) ? "font-bold text-[#074658] pl-2" : "text-gray-600"}`}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 mt-2">
            <div className="flex items-center text-[#074658] font-bold gap-2" onClick={toggleProfile}>
              <User size={20} /> Guest User
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95) translateY(-10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </nav>
  );
}

export default Navbar;
