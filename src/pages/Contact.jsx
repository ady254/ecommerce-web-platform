import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

function Contact() {
  const [searchParams] = useSearchParams();
  const isBulkOrder = searchParams.get('bulk') === 'true';
  const productName = searchParams.get('product');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: isBulkOrder ? `Bulk Order Inquiry${productName ? ` - ${productName}` : ''}` : '',
    message: isBulkOrder ? 'I am interested in placing a bulk order. Please provide details about pricing and minimum order quantities.' : ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      alert('Thank you for contacting us! We will get back to you shortly.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* PROFESSIONAL HEADER */}
      <div className="py-20 bg-gradient-to-r from-[#519842] to-[#074658] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            Get in Touch
          </h1>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto font-light">
            We'd love to hear from you. Questions, feedback, or bulk orders - we're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">

        {isBulkOrder && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#6fae68] to-[#519842] text-white shadow-lg animate-bounce-in">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle size={28} /> Bulk Order Inquiry
            </h2>
            <p className="opacity-90">
              You're making a great choice! Fill out the form and we'll get you our best wholesale pricing.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* CONTACT FORM */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100 animate-slideRight">
            <h2 className="text-3xl font-bold mb-8 text-[#074658]">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-[#519842] transition-colors">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#519842] focus:ring-4 focus:ring-[#519842]/10 outline-none transition-all placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-[#519842] transition-colors">Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#519842] focus:ring-4 focus:ring-[#519842]/10 outline-none transition-all placeholder-gray-400"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-[#519842] transition-colors">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#519842] focus:ring-4 focus:ring-[#519842]/10 outline-none transition-all placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-[#519842] transition-colors">Subject *</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#519842] focus:ring-4 focus:ring-[#519842]/10 outline-none transition-all placeholder-gray-400"
                  placeholder="How can we help?"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within:text-[#519842] transition-colors">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#519842] focus:ring-4 focus:ring-[#519842]/10 outline-none transition-all placeholder-gray-400 resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg hover:shadow-xl hover:scale-[1.02] transform transition-all flex items-center justify-center gap-2 ${submitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#074658] hover:bg-[#0a6c8a]'}`}
              >
                {submitted ? 'Sending...' : <>Send Message <Send size={20} /></>}
              </button>
            </form>
          </div>

          {/* SIDEBAR INFO */}
          <div className="space-y-8 animate-slideLeft delay-100">

            {/* INFO CARDS */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#074658]">Contact Information</h3>

              <div className="space-y-8">
                {[
                  { icon: Phone, title: 'Phone', lines: ['+91 98989 0000'], color: '#6fae68' },
                  { icon: Mail, title: 'Email', lines: ['hygiena@gmail.com'], color: '#519842' },
                  { icon: MapPin, title: 'Address', lines: [' Area Phase 1', 'New Delhi, Delhi, India'], color: '#18889c' },
                  { icon: Clock, title: 'Business Hours', lines: ['Mon - Fri: 9am - 6pm', 'Sat: 9am - 2pm'], color: '#1d5e02' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="p-4 rounded-2xl shadow-sm group-hover:shadow-md transition-all text-white" style={{ backgroundColor: item.color }}>
                      <item.icon size={26} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#074658] text-lg mb-1">{item.title}</h4>
                      {item.lines.map((line, i) => <p key={i} className="text-gray-600">{line}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP */}
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sNewDelhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Hygiena Location"
                className="filter grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideRight { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideLeft { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideRight { animation: slideRight 0.6s ease-out forwards; }
        .animate-slideLeft { animation: slideLeft 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default Contact;
