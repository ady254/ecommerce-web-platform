import { Shield, Lock, FileText, Eye, Mail, Phone, MapPin } from 'lucide-react';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="py-20 bg-gradient-to-r from-[#519842] to-[#074658] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeInUp">
          <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            Privacy Policy
          </h1>
          <p className="text-lg text-emerald-50 opacity-90 max-w-2xl mx-auto">
            Your privacy is our priority. Last updated: December 2025
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-12 animate-slideUp">

          <section className="group">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-[#074658] group-hover:text-[#519842] transition-colors">
              <span className="bg-[#e5f5e0] p-2 rounded-lg text-[#519842]">1</span> Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you provide directly to us, including but not limited to:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
              {['Name, email address, and phone number', 'Shipping and billing addresses', 'Payment information (processed securely)', 'Order history and preferences', 'Communication preferences'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg hover:bg-[#e5f5e0] transition-colors">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#519842]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-[#074658] group-hover:text-[#519842] transition-colors">
              <span className="bg-[#e5f5e0] p-2 rounded-lg text-[#519842]">2</span> How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
              {['Process and fulfill your orders', 'Send order confirmations and updates', 'Respond to customer service requests', 'Send marketing communications (optional)', 'Improve our products and services', 'Prevent fraud and enhance security'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg hover:bg-[#e5f5e0] transition-colors">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#519842]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-[#074658] group-hover:text-[#519842] transition-colors">
              <span className="bg-[#e5f5e0] p-2 rounded-lg text-[#519842]">3</span> Information Sharing
            </h2>
            <p className="text-gray-600 leading-relaxed bg-blue-50 p-4 rounded-xl border border-blue-100 italic">
              We do not sell, trade, or rent your personal information to third parties.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">We may share your information with:</p>
            <ul className="list-none space-y-2 mt-2 text-gray-700 ml-2">
              <li className="flex items-center gap-2"><Eye size={16} className="text-[#519842]" /> Service providers (payment, shipping)</li>
              <li className="flex items-center gap-2"><Eye size={16} className="text-[#519842]" /> Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-[#074658] group-hover:text-[#519842] transition-colors">
              <span className="bg-[#e5f5e0] p-2 rounded-lg text-[#519842]">4</span> Data Security
            </h2>
            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <Lock className="text-[#519842] flex-shrink-0" size={32} />
              <p className="text-gray-700 leading-relaxed text-sm">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-[#074658]">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-gray-50 hover:bg-[#e5f5e0] transition-colors border border-gray-100 group">
                <Mail className="text-[#519842] mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email</p>
                <p className="text-gray-800 font-medium">Unicarehygiena@gmail.com</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 hover:bg-[#e5f5e0] transition-colors border border-gray-100 group">
                <Phone className="text-[#519842] mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Phone</p>
                <p className="text-gray-800 font-medium">+91 98186 39425</p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 hover:bg-[#e5f5e0] transition-colors border border-gray-100 group md:col-span-1">
                <MapPin className="text-[#519842] mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Address</p>
                <p className="text-gray-800 font-medium text-sm">16 DSIDC SHED Okhla Indl. Area Phase-1, New Delhi - 110020</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default PrivacyPolicy;
