import { Mail } from 'lucide-react';
import { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! You will receive updates at ' + email);
    setEmail('');
  };

  return (
    <section className="py-16" style={{ backgroundColor: '#519842' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <Mail size={32} className="text-white" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated with Hygiena
        </h2>
        <p className="text-lg text-white opacity-90 mb-8">
          Subscribe to our newsletter for exclusive offers, new products, and hygiene tips.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-transform"
            style={{ backgroundColor: '#074658' }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
