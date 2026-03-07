

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Backendless from 'backendless';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ensureCompanyBackendless,
  ProductStore,
  TestimonyStore,
  type ProductRecord,
  type TestimonyRecord,
} from '../lib/backendless';
import useTotalCartStore from '../store/useTotalCartStore';

const GRIND_OPTIONS = ['WHOLE BEANS', 'FINE', 'MEDIUM', 'COARSE'];

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-sm' : 'text-lg';
  return (
    <div className={`flex gap-0.5 ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductsPageDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductRecord | null>(null);
  const [testimonies, setTestimonies] = useState<TestimonyRecord[]>([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingTestimonies, setLoadingTestimonies] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGrind, setSelectedGrind] = useState('FINE');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useTotalCartStore();

  const handleAddToCart = () => {
    if (!product || !id) return;
    addToCart({
      id,
      name: product.name,
      price: product.price,
      imageurl: product.imageurl,
      grindSize: selectedGrind,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    const total = product.price * quantity;
    alert(
      `Pembelian Berhasil!\n\nProduk: ${product.name}\nGrind Size: ${selectedGrind}\nKuantitas: ${quantity}\nTotal: Rp${total.toLocaleString('id-ID')}\n\nTerima kasih telah berbelanja di Anomali Caffee!`
    );
  };

  useEffect(() => {
    if (!id) return;
    ensureCompanyBackendless();

    // Fetch product by id
    (ProductStore.findById(id) as Promise<ProductRecord>)
      .then((p) => setProduct(p))
      .catch(() => setError('Produk tidak ditemukan.'))
      .finally(() => setLoadingProduct(false));

    // Fetch testimonies for this product
    const query = Backendless.DataQueryBuilder.create()
      .setWhereClause(`productObjectId = '${id}'`)
      .setSortBy(['created DESC'])
      .setPageSize(20);

    (TestimonyStore.find(query) as Promise<TestimonyRecord[]>)
      .then((t) => setTestimonies(t))
      .catch(() => {})
      .finally(() => setLoadingTestimonies(false));
  }, [id]);

  const avgRating =
    testimonies.length
      ? Math.round((testimonies.reduce((sum, t) => sum + t.rating, 0) / testimonies.length) * 10) / 10
      : 0;

  if (loadingProduct) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#77100f] rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <p className="text-red-600 text-lg">{error || 'Produk tidak ditemukan.'}</p>
          <Link to="/company-page/products" className="text-[#77100f] underline hover:opacity-80">
            ← Kembali ke Products
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 py-4 text-sm text-gray-500">
        <Link to="/company-page/products" className="hover:text-[#77100f] transition">
          Products
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{product.name}</span>
      </div>

      {/* ── Product Detail ── */}
      <section className="max-w-5xl mx-auto px-6 pb-12 flex flex-col md:flex-row gap-10">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src={product.imageurl}
            alt={product.name}
            className="w-full rounded-xl object-cover shadow-md"
          />
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 flex flex-col gap-5">
          {/* Badges + Name */}
          <div>
            <div className="flex gap-2 mb-3">
              <span className="bg-[#77100f] text-white text-xs font-bold px-2 py-0.5 rounded">
                Mall
              </span>
              <span className="border border-[#77100f] text-[#77100f] text-xs font-bold px-2 py-0.5 rounded">
                ORI
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">{product.name}</h1>
          </div>

          {/* Rating summary (if testimonies exist) */}
          {testimonies.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold text-gray-800">{avgRating}</span>
              <StarRating rating={avgRating} size="sm" />
              <span className="text-gray-300">|</span>
              <span>{testimonies.length} Penilaian</span>
            </div>
          )}

          {/* Price */}
          <p className="text-3xl font-bold text-[#77100f]">
            Rp{product.price.toLocaleString('id-ID')}
          </p>

          <hr className="border-gray-200" />

          {/* Info rows */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="w-28 text-gray-400">Pengiriman</span>
            <span>🚚 Layanan Tidak Tersedia</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="w-28 text-gray-400">Jaminan</span>
            <span>🛡️ 15 Hari Pengembalian · 100% Original</span>
          </div>

          <hr className="border-gray-200" />

          {/* Grind Size */}
          <div className="flex items-start gap-4">
            <span className="text-sm text-gray-400 w-28 pt-2">Grind Size</span>
            <div className="flex flex-wrap gap-2">
              {GRIND_OPTIONS.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrind(g)}
                  className={`border px-4 py-1.5 text-sm font-medium rounded transition ${
                    selectedGrind === g
                      ? 'border-[#77100f] text-[#77100f] bg-red-50'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 w-28">Kuantitas</span>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-lg text-gray-600 hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="px-5 py-1.5 text-sm font-medium border-x border-gray-300 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 text-lg text-gray-600 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 border-2 py-3 rounded-lg font-semibold transition ${
                addedToCart
                  ? 'border-green-600 text-green-600 bg-green-50'
                  : 'border-[#77100f] text-[#77100f] hover:bg-red-50'
              }`}
            >
              {addedToCart ? '✓ Ditambahkan!' : '🛒 Masukkan Keranjang'}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#77100f] text-white py-3 rounded-lg font-semibold hover:bg-[#5c0c0b] transition">
              Beli Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Deskripsi Produk</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {product.description || 'Tidak ada deskripsi untuk produk ini.'}
        </p>
      </section>

      {/* ── Testimonies ── */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 mb-16">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Penilaian Produk</h2>

        {/* Average rating card */}
        {testimonies.length > 0 && (
          <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl mb-8">
            <div className="text-center">
              <p className="text-6xl font-bold text-[#77100f]">{avgRating}</p>
              <p className="text-sm text-gray-400 mt-1">dari 5</p>
            </div>
            <div>
              <StarRating rating={avgRating} size="lg" />
              <p className="text-sm text-gray-500 mt-2">
                Berdasarkan <span className="font-semibold text-gray-700">{testimonies.length}</span> ulasan
              </p>
              {/* Rating breakdown bars */}
              <div className="mt-3 flex flex-col gap-1">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = testimonies.filter((t) => Math.round(t.rating) === star).length;
                  const pct = testimonies.length ? (count / testimonies.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-4 text-right">{star}</span>
                      <span className="text-yellow-400 text-sm">★</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {loadingTestimonies && (
          <p className="text-gray-400 text-sm">Memuat ulasan…</p>
        )}
        {!loadingTestimonies && testimonies.length === 0 && (
          <p className="text-gray-400 text-sm italic">Belum ada ulasan untuk produk ini.</p>
        )}

        <div className="flex flex-col gap-4">
          {testimonies.map((t) => (
            <div
              key={t.objectId}
              className="bg-white border border-gray-100 shadow-sm rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-800">{t.reviewer}</span>
                <span className="text-xs text-gray-400">
                  {t.created ? new Date(t.created).toLocaleDateString('id-ID') : ''}
                </span>
              </div>
              <StarRating rating={t.rating} size="sm" />
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{t.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
