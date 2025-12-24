import { RotateCcw, AlertTriangle, CheckCircle, Truck, HelpCircle, Mail, Phone } from 'lucide-react';

function RefundCancellation() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="py-20 bg-gradient-to-r from-[#519842] to-[#074658] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeInUp">
          <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20">
            <RotateCcw className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            Refund & Cancellation
          </h1>
          <p className="text-lg text-emerald-50 opacity-90 max-w-2xl mx-auto">
            Hassle-free returns and clear policies. Last updated: December 2025
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-12 animate-slideUp">

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#074658] flex items-center gap-3">
              <span className="bg-[#fff7ed] p-2 rounded-xl text-[#9a3412]"><AlertTriangle size={24} /></span> Order Cancellation
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#f0fdf4] border border-[#dcfce7] hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-3 text-[#1d5e02] text-xl">Before Shipment</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cancel anytime before shipping for a <span className="font-bold">full refund</span>. Use your account dashboard or contact support immediately.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#fff7ed] border border-[#ffedd5] hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-3 text-[#9a3412] text-xl">After Shipment</h3>
                <p className="text-gray-700 leading-relaxed">
                  Shipped orders cannot be cancelled instantly. You may refuse delivery or initiate a return after receiving the package.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#074658] flex items-center gap-3">
              <span className="bg-[#ecfccb] p-2 rounded-xl text-[#3f6212]"><CheckCircle size={24} /></span> Return Policy
            </h2>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-gray-700 mb-4 font-medium">Conditions for return:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Within 7 days of delivery',
                  'Unopened & original packaging',
                  'Seals & labels intact',
                  'Original invoice included'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#519842]" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#074658] flex items-center gap-3">
              <span className="bg-[#e0f2fe] p-2 rounded-xl text-[#0369a1]"><RotateCcw size={24} /></span> Refund Process
            </h2>
            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200">
              {[
                { title: 'Inspection', desc: 'We inspect the product within 2-3 business days', color: '#519842' },
                { title: 'Approval', desc: 'If approved, refund is initiated to original source', color: '#18889c' },
                { title: 'Processing', desc: 'Refunds processed within 5-7 business days', color: '#074658' }
              ].map((step, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10" style={{ backgroundColor: step.color }}>
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#074658] flex items-center gap-3">
              <span className="bg-[#fce7f3] p-2 rounded-xl text-[#9d174d]"><HelpCircle size={24} /></span> Need Help?
            </h2>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border border-[#bbf7d0]">
              <p className="text-[#14532d] font-semibold mb-6 text-lg">
                Contact our support team to initiate a return:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="p-3 bg-[#e5f5e0] rounded-full text-[#519842]"><Mail size={24} /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Email Us</p>
                    <p className="font-bold text-gray-800">Unicarehygiena@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="p-3 bg-[#e5f5e0] rounded-full text-[#519842]"><Phone size={24} /></div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Call Us</p>
                    <p className="font-bold text-gray-800">+91 98186 39425</p>
                  </div>
                </div>
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

export default RefundCancellation;
