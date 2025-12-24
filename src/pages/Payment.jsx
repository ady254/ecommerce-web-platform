import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, ShieldCheck, Lock, CreditCard, Truck, MapPin, Award, RefreshCw, HeadphonesIcon } from "lucide-react";

function Payment() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  // URL DATA
  const cartTotal = searchParams.get("total");
  const productPrice = Number(searchParams.get("price")) || 0;
  const size = searchParams.get("size") || "Default";
  const qty = Number(searchParams.get("qty")) || 1;

  // PRICE CALCULATION
  const shipping = 0;
  const baseAmount = productPrice * qty;
  const calculatedTax = Math.round(baseAmount * 0.18);
  const calculatedTotal = baseAmount + calculatedTax + shipping;

  // Use cart total if available, otherwise use calculated total
  const totalPrice = cartTotal ? Number(cartTotal) : calculatedTotal;
  const tax = cartTotal ? "Included" : `₹${calculatedTax}`;

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // PAYMENT HANDLER
  const handlePayment = async () => {
    if (loading) return;

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill all fields");
      return;
    }

    if (!Number.isFinite(totalPrice) || totalPrice <= 0) {
      alert("Invalid payment amount");
      return;
    }

    setLoading(true);

    try {
      // CREATE ORDER (SEND RUPEES ONLY)
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const order = await res.json();

      if (!res.ok || !order.id) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const options = {
        key: order.key,
        amount: order.amount,
        currency: "INR",
        name: "Hygiena Store",
        description: `Product Size: ${size}`,
        order_id: order.id,

        handler: async function (response) {
          // VERIFY PAYMENT
          const verifyRes = await fetch(
            "http://localhost:5000/api/payment/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyRes.json();

          if (!verifyData.success) {
            alert("Payment verification failed ❌");
            setLoading(false);
            return;
          }

          // MOCK ORDER CREATION
          setTrackingData({
            awb_code: "MOCK123456",
            shipment_id: "SHIP123456",
            tracking_url: "https://shiprocket.co/track",
          });

          setOrderPlaced(true);
          setLoading(false);
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled");
            setLoading(false);
          },
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },

        theme: { color: "#519842" },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        setLoading(false);
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
      setLoading(false);
    }
  };

  // SUCCESS PAGE
  if (orderPlaced && trackingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle size={64} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mt-4 text-gray-800">Order Placed!</h2>
          <p className="text-gray-500 mt-2">Your payment was successful.</p>

          <div className="bg-gray-50 rounded-xl p-6 mt-6 text-left border border-gray-100">
            <p className="mb-2"><span className="text-gray-500 text-sm">AWB Code</span><br /><span className="font-semibold">{trackingData.awb_code}</span></p>
            <p><span className="text-gray-500 text-sm">Shipment ID</span><br /><span className="font-semibold">{trackingData.shipment_id}</span></p>
          </div>

          <a
            href={trackingData.tracking_url}
            target="_blank"
            className="block text-[#074658] font-semibold hover:underline mt-6 flex items-center justify-center"
          >
            <Truck className="mr-2" size={18} /> Track Your Order
          </a>

          <a
            href="/"
            className="block mt-6 bg-[#074658] hover:bg-[#053745] text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  // PAYMENT FORM - REDESIGNED
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#e6f4f1] text-[#074658] px-4 py-2 rounded-full flex items-center font-semibold text-sm shadow-sm border border-[#bce3de]">
            <ShieldCheck size={18} className="mr-2" />
            100% Secure SSL Encrypted Checkout
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT: FORM */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#074658]"></div>

              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <MapPin className="mr-3 text-[#074658]" /> Shipping Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
                  <input
                    name="name"
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#074658] focus:ring-4 focus:ring-[#074658]/10 transition-all outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#074658] focus:ring-4 focus:ring-[#074658]/10 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Phone Number</label>
                    <input
                      name="phone"
                      onChange={handleChange}
                      placeholder="98765 43210"
                      maxLength={10}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#074658] focus:ring-4 focus:ring-[#074658]/10 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Delivery Address</label>
                  <textarea
                    name="address"
                    onChange={handleChange}
                    placeholder="House No, Street, Landmark, City, Pincode"
                    rows="3"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#074658] focus:ring-4 focus:ring-[#074658]/10 transition-all outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Lock size={20} className="mr-2 text-green-600" />
                <span className="text-sm">Payments are processed securely by Razorpay</span>
              </div>
              <img src="https://cdn.razorpay.com/static/assets/logo/payment_methods_branding.png" alt="Payment Methods" className="h-6 opacity-70" />
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                <CreditCard className="mr-2 text-[#074658]" /> Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{baseAmount || totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                {tax !== "Included" && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18% GST)</span>
                    <span>{tax}</span>
                  </div>
                )}
                <hr className="border-dashed border-gray-200 my-2" />
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-[#074658]">₹{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transform transition-all flex items-center justify-center ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white hover:-translate-y-1 hover:shadow-xl'
                  }`}
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <Lock size={20} className="mr-2" /> Pay Securely ₹{totalPrice}
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-400 mt-4">
                By placing this order, you agree to Hygiena's terms of service and privacy policy.
              </p>
            </div>

            {/* TRUST & SUPPORT WIDGET */}
            <div className="bg-[#f8fcfb] p-6 rounded-2xl border border-[#bce3de] mt-6">
              <h3 className="font-bold text-[#074658] mb-4 flex items-center">
                <ShieldCheck size={18} className="mr-2" /> Why Shop with Us?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-white p-1 rounded-full shadow-sm mr-3 text-green-600 mt-0.5">
                    <Award size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">100% Original Products</p>
                    <p className="text-xs text-gray-500">Sourced directly from manufacturers</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-1 rounded-full shadow-sm mr-3 text-blue-600 mt-0.5">
                    <RefreshCw size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Easy 7-Day Returns</p>
                    <p className="text-xs text-gray-500">No questions asked return policy</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-1 rounded-full shadow-sm mr-3 text-purple-600 mt-0.5">
                    <HeadphonesIcon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">24/7 Customer Support</p>
                    <p className="text-xs text-gray-500">support@hygiena.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
