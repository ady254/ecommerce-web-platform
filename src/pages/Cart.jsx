import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { products } from "../data/products";

function Cart() {
  const { cart, updateQuantity, removeItem } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  // Empty Cart UI
  if (cart.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Cart is empty.
        <Link to="/products" className="text-blue-600 ml-2 underline">
          Shop now
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {/* CART ITEMS */}
      {cart.map((item) => (
        <div
          key={item.id + item.size}
          className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>Size: {item.size}</p>
            <p>Price: ₹{item.price}</p>

            {/* QUANTITY CONTROLS */}
            <div className="flex items-center mt-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() =>
                  updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))
                }
              >
                -
              </button>

              <span className="px-4">{item.quantity}</span>

              <button
                className="px-3 py-1 bg-gray-300 rounded"
                onClick={() =>
                  updateQuantity(item.id, item.size, item.quantity + 1)
                }
              >
                +
              </button>
            </div>

            {/* REMOVE BUTTON */}
            <button
              className="text-red-600 mt-3"
              onClick={() => removeItem(item.id, item.size)}
            >
              Remove
            </button>
          </div>

          {/* ITEM TOTAL */}
          <div className="text-xl font-bold">₹{item.price * item.quantity}</div>
        </div>
      ))}

      {/* BILLING SUMMARY */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <p className="text-xl flex justify-between">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </p>

        <p className="text-xl flex justify-between">
          <span>GST (18%):</span>
          <span>₹{tax}</span>
        </p>

        <hr className="my-3" />

        <p className="text-2xl font-bold flex justify-between">
          <span>Total:</span>
          <span>₹{total}</span>
        </p>

        {/* CHECKOUT BUTTON */}
        <Link
          to={`/payment?total=${total}`}
          className="block bg-green-600 text-white text-center mt-4 py-3 rounded-lg"
        >
          Proceed to Checkout
        </Link>

        {/* CONTINUE SHOPPING */}
        <Link to="/products" className="block text-center text-blue-600 underline mt-4">
          ← Continue Shopping
        </Link>

        {/* RECOMMENDED PRODUCTS */}
        <h2 className="text-2xl font-bold mt-12 mb-4">You May Also Like</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.id}`}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 font-semibold">{item.name}</p>
              <p className="text-green-600 font-bold">₹{item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
