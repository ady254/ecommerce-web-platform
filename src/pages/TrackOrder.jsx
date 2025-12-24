import { useState } from 'react';
import { Package, CheckCircle, Truck, MapPin, Search, AlertCircle, Loader } from 'lucide-react';

function TrackOrder() {
  const [awb, setAwb] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!awb.trim()) return;

    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      // Use relative URL to leverage proxy or assume same origin
      const response = await fetch(`http://localhost:5000/api/tracking/${awb}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tracking details');
      }

      setTrackingData(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please check your AWB code.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to map status to icon and completion
  const getStepStatus = (stepName, history) => {
    const stepIndex = history.findIndex(h => h.toLowerCase().includes(stepName.toLowerCase()));
    // If found, it's completed.
    // In a real scenario, you might want to check the *latest* status to see if it's passed this step.
    // For simplicity with the mock/Shiprocket data:
    // We assume the history list contains ALL passed states.
    const isCompleted = stepIndex !== -1;

    // Find the exact date if available (Shiprocket provides history with dates, but our mock is simple list strings for now, 
    // unless we parse the complex object. The mock returns a simple array of strings in 'status_history').
    // Let's assume the API returns { status_history: [ { status: '...', date: '...' } ] } or just strings.
    // The current mock returns strings. Let's adapt.

    return { isCompleted };
  };

  const steps = [
    { label: 'Order Created', icon: Package },
    { label: 'Shipped', icon: Truck },
    { label: 'Out for Delivery', icon: MapPin },
    { label: 'Delivered', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="py-20 bg-gradient-to-r from-[#519842] to-[#074658] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeInUp">
          <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20">
            <Package className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            Track Your Order
          </h1>
          <p className="text-lg text-emerald-50 opacity-90 max-w-2xl mx-auto">
            Enter your Tracking Number (AWB) to see exactly where your package is.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">

        {/* TRACK FORM */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-slideUp">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#074658] mb-2 uppercase tracking-wide">
                Tracking Number (AWB)
              </label>
              <input
                type="text"
                value={awb}
                onChange={(e) => setAwb(e.target.value)}
                required
                placeholder="e.g., AWB12345678"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#519842] focus:ring-4 focus:ring-[#519842]/10 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-white font-bold text-lg hover:shadow-xl hover:scale-[1.02] transform transition-all flex items-center justify-center gap-2 bg-[#519842] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <Loader className="animate-spin" size={24} /> : <>Track Now <Search size={20} /></>}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-fadeInUp">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* TRACKING RESULTS */}
        {trackingData && (
          <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-fadeInUp">
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#074658]">AWB: {trackingData.awb}</h2>
                <p className="text-gray-500 text-sm mt-1">Status: {trackingData.current_status || 'In Transit'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 font-bold uppercase">Last Updated</p>
                <p className="text-lg font-bold text-[#519842]">
                  {trackingData.updated_on ? new Date(trackingData.updated_on).toLocaleDateString() : 'Just Now'}
                </p>
              </div>
            </div>

            <div className="space-y-0 relative pl-4 border-l-2 border-gray-100 ml-4">
              {(trackingData.status_history || []).map((stepName, index) => {
                // For the mock, status_history is just an array of strings. 
                // In real Shiprocket, it's more complex. We'll just list what we get.
                return (
                  <div key={index} className="relative pl-8 pb-10 last:pb-0">
                    <div className="absolute -left-[1.35rem] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg bg-[#519842]">
                      <Truck size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#074658]">{stepName}</h3>
                      <p className="text-sm text-gray-500 mt-1">Completed</p>
                    </div>
                  </div>
                )
              })}

              {(!trackingData.status_history || trackingData.status_history.length === 0) && (
                <p className="text-gray-500 italic">No tracking history available yet.</p>
              )}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-[#f0fdf4] border border-[#dcfce7] flex items-start gap-3">
              <MapPin className="text-[#519842] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#1d5e02]">Updates</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Check back later for more updates on your shipment.
                </p>
              </div>
            </div>
          </div>
        )}
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

export default TrackOrder;
