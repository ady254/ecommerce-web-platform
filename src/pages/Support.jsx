import { Link } from 'react-router-dom';
import { Package, ShieldCheck, RotateCcw, ChevronRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';

function Support() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: 'How long does delivery take?', answer: 'Standard delivery typically takes 3-5 business days from the date of order confirmation. Express delivery options are also available for faster shipping.' },
    { question: 'Are your products safe for sensitive skin?', answer: 'Yes, all our products are dermatologically tested and safe for sensitive skin. However, we recommend checking the ingredient list if you have specific allergies.' },
    { question: 'Do you offer bulk orders?', answer: 'Yes, we offer special pricing for bulk orders. Please contact us through our bulk order form or call our sales team for more information.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit/debit cards, UPI payments, net banking, and cash on delivery (COD) for eligible orders.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="py-20 bg-gradient-to-r from-[#519842] to-[#074658] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeInUp">
          <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20">
            <MessageCircle className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            Support Center
          </h1>
          <p className="text-lg text-emerald-50 opacity-90 max-w-2xl mx-auto">
            We're here to help you with any questions or concerns.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { to: '/support/track-order', icon: Package, title: 'Track Order', text: 'Check your order status and shipping details in real-time.', color: '#6fae68' },
            { to: '/support/privacy-policy', icon: ShieldCheck, title: 'Privacy Policy', text: 'Learn how we protect your data and personal information.', color: '#519842' },
            { to: '/support/refund-cancellation', icon: RotateCcw, title: 'Returns & Refunds', text: 'Understand our hassle-free return and cancellation policy.', color: '#18889c' }
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 border border-blue-50"
            >
              <div className="flex justify-center mb-6">
                <div className="p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-md text-white" style={{ backgroundColor: item.color }}>
                  <item.icon size={36} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4 text-[#074658] group-hover:text-[#519842] transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-600 text-center leading-relaxed">
                {item.text}
              </p>
            </Link>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#074658]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-[#519842] transition-colors bg-gray-50/50">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-[#074658]">{faq.question}</span>
                  <ChevronRight
                    className={`text-[#519842] transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`}
                    size={24}
                  />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Still can't find what you're looking for?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-bold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-[#519842]/30"
            style={{ backgroundColor: '#519842' }}
          >
            Contact Support <MessageCircle size={20} />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default Support;
