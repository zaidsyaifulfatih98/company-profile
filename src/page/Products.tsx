import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useProductsBackendless } from './useProductsCompany';
import { ensureCompanyBackendless, TestimonyStore, type TestimonyRecord } from '../lib/backendless';

function useProductRatings() {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  useEffect(() => {
    ensureCompanyBackendless();
    (TestimonyStore.find({ properties: ['productObjectId', 'rating'] }) as Promise<TestimonyRecord[]>)
      .then((list) => {
        const map: Record<string, number[]> = {};
        list.forEach((t) => {
          if (!map[t.productObjectId]) map[t.productObjectId] = [];
          map[t.productObjectId].push(t.rating);
        });
        const avg: Record<string, number> = {};
        Object.entries(map).forEach(([pid, vals]) => {
          avg[pid] = Math.round((vals.reduce((s, v) => s + v, 0) / vals.length) * 10) / 10;
        });
        setRatings(avg);
      })
      .catch(() => {});
  }, []);

  return ratings;
}

export default function ProductPageCompany() {
    const { products, loading, error } = useProductsBackendless();
    const ratings = useProductRatings();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Gagal memuat produk: {error}</div>;

    return (
        <>
            <Navbar />
            {products.length === 0 && <div className='px-20 py-6'>Belum ada produk.</div>}
            <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-4 md:px-20 py-10 gap-3'>
                {products.map((item, index: number) => (
                    <div key={item.objectId || index} className='bg-white rounded-lg overflow-hidden flex flex-col shadow-sm'>
                        <Link to={`/products/${item.objectId}`} className="block">
                        <div className='h-[180px] overflow-hidden'>
                            <img
                                className='w-full h-full object-cover hover:scale-105 transition-transform duration-200'
                                src={item.imageurl}
                            />
                        </div>
                        <div className="h-[48px] overflow-hidden px-2 pt-2">
                            <h3 className="font-bold text-sm hover:text-[#77100f] transition line-clamp-2 leading-snug">{item.name}</h3>
                        </div>
                        </Link>
                        <div className='px-2 pb-2 mt-1'>
                          <h4 className='text-sm font-semibold text-[#77100f]'>Rp{item.price.toLocaleString('id-ID')}</h4>
                          <div className='mt-0.5 flex items-center gap-1 text-sm'>
                            {item.objectId && ratings[item.objectId] !== undefined ? (
                              <>
                                <span className='text-yellow-400'>★</span>
                                <span className='font-semibold text-gray-700 text-xs'>{ratings[item.objectId].toFixed(1)}</span>
                              </>
                            ) : (
                              <span className='text-gray-400 text-xs'>Belum ada ulasan</span>
                            )}
                          </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}