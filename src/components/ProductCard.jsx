import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '../utils/cart';
import { useState } from 'react';

function ProductCard({ product }) {
    const [adding, setAdding] = useState(false);
    const navigate = useNavigate();

    // ADD TO CART FUNCTION
    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setAdding(true);
        addToCart(product, 1);

        // smooth UI effect
        setTimeout(() => setAdding(false), 700);
        window.dispatchEvent(new Event('hygiena_cart_updated'));
    };

    // BUY NOW BUTTON → takes user to product details & auto-selects buy mode
    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/products/${product.id}?buyNow=true`);
    };

    return (
        <Link
            to={`/products/${product.id}`}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 border border-gray-100 flex flex-col overflow-hidden h-full relative"
        >
            <div className="relative overflow-hidden aspect-[4/5] bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />

                <div
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-white text-sm font-bold shadow-md transform group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: '#519842' }}
                >
                    ₹{product.price}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2 text-[#074658] group-hover:text-[#519842] transition-colors">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {product.description}
                </p>

                {/* ---------- BOTTOM BUTTON AREA ---------- */}
                <div className="flex items-center justify-between mt-auto gap-3">

                    {/* BUY NOW BUTTON */}
                    <button
                        onClick={handleBuyNow}
                        className="
                            flex-1
                            bg-gradient-to-r from-[#074658] to-[#0a6c8a]
                            text-white text-sm font-bold
                            px-4 py-3 rounded-xl
                            hover:from-[#053745] hover:to-[#074658]
                            hover:shadow-lg transform active:scale-95
                            transition-all duration-200
                        "
                    >
                        Buy Now
                    </button>

                    {/* CART BUTTON */}
                    <button
                        aria-label={`Add ${product.name} to cart`}
                        className="
                            p-3 rounded-xl 
                            bg-green-100 text-green-700 
                            hover:bg-[#519842] hover:text-white 
                            transition-all duration-300 shadow-sm hover:shadow-md
                            active:scale-90
                        "
                        onClick={handleAdd}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
