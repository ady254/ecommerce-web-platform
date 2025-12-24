import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="text-white bg-gradient-to-r from-[#074658] to-[#042d3a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* BRAND */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="Hygiena Logo" className="w-14 h-14 object-contain drop-shadow-lg" />
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">Hygiena</h3>
                <p className="text-xs text-[#6fae68] tracking-widest uppercase">Freshness Meets Care</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Your trusted partner for home hygiene solutions. Quality products crafted for a cleaner, healthier home environment.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-bold mb-6 text-lg border-b border-[#519842] inline-block pb-2">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Products', 'About Us', 'Contact'].map((item, index) => (
                <li key={index}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} className="text-sm opacity-80 hover:opacity-100 hover:text-[#519842] hover:translate-x-2 transition-all duration-300 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-bold mb-6 text-lg border-b border-[#519842] inline-block pb-2">Support</h4>
            <ul className="space-y-3">
              {[
                { name: 'Track Order', path: '/support/track-order' },
                { name: 'Privacy Policy', path: '/support/privacy-policy' },
                { name: 'Refund & Cancellation', path: '/support/refund-cancellation' }
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="text-sm opacity-80 hover:opacity-100 hover:text-[#519842] hover:translate-x-2 transition-all duration-300 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="font-bold mb-6 text-lg border-b border-[#519842] inline-block pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#519842] transition-colors">
                  <Phone size={16} className="text-white" />
                </div>
                <span className="text-sm opacity-90 mt-1 hover:text-white transition-colors cursor-pointer">+91 98989 0000</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#519842] transition-colors">
                  <Mail size={16} className="text-white" />
                </div>
                <span className="text-sm opacity-90 mt-1 hover:text-white transition-colors cursor-pointer">example@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-[#519842] transition-colors">
                  <MapPin size={16} className="text-white" />
                </div>
                <span className="text-sm opacity-90 mt-1">New Delhi, Delhi, India</span>
              </li>
            </ul>

            {/* SOCIAL ICONS */}
            <div className="flex space-x-4 mt-6">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#519842] hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-xs opacity-60 hover:opacity-100 transition-opacity">
            &copy; {new Date().getFullYear()} Hygiena. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
