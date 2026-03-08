
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useTotalCartStore from '../store/useTotalCartStore';

export default function CartItems() {
  const { itemsCart, removeFromCart, updateQuantity, clearCart } = useTotalCartStore();
  const navigate = useNavigate();

  const totalPrice = itemsCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = itemsCart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    alert(`Checkout berhasil!\nTotal: Rp${totalPrice.toLocaleString('id-ID')}\nTerima kasih telah berbelanja di Anomali Caffee!`);
    clearCart();
    navigate('/products');
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 min-h-[60vh]">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Keranjang Belanja</h1>

        {itemsCart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
            <span className="text-7xl">🛒</span>
            <p className="text-lg">Keranjang kamu masih kosong.</p>
            <Link
              to="/products"
              className="mt-2 px-6 py-2 bg-[#77100f] text-white rounded-lg font-medium hover:bg-[#5c0c0b] transition"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items list */}
            <div className="flex-1 flex flex-col gap-4">
              {itemsCart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4"
                >
                  {/* Product image */}
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.imageurl}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg hover:opacity-90 transition"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.id}`}>
                      <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 hover:text-[#77100f] transition">
                        {item.name}
                      </h3>
                    </Link>
                    {item.grindSize && (
                      <span className="inline-block mt-1 text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">
                        {item.grindSize}
                      </span>
                    )}
                    <p className="mt-2 font-bold text-[#77100f] text-sm">
                      Rp{item.price.toLocaleString('id-ID')}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity control */}
                      <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition disabled:opacity-30"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 text-sm font-medium border-x border-gray-200 min-w-[36px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal & delete */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700">
                          Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 transition text-lg leading-none"
                          aria-label="Hapus produk"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-5">Ringkasan Pesanan</h2>

                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Total produk ({totalItems} item)</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800">Rp{totalPrice.toLocaleString('id-ID')}</span>
                </div>

                <hr className="border-gray-100 mb-4" />

                <div className="flex justify-between font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span className="text-[#77100f] text-lg">Rp{totalPrice.toLocaleString('id-ID')}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#77100f] text-white py-3 rounded-lg font-semibold hover:bg-[#5c0c0b] transition"
                >
                  Checkout
                </button>

                <Link
                  to="/products"
                  className="block text-center mt-3 text-sm text-[#77100f] hover:underline"
                >
                  ← Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
