import { useEffect, useState } from 'react';
import { ensureCompanyBackendless, ProductStore, type ProductRecord } from '../lib/backendless';

export type Product = ProductRecord;

export function useProductsBackendless() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        ensureCompanyBackendless();
        const result = (await ProductStore.find({
          properties: ['objectId', 'name', 'price', 'imageurl'],
        })) as Product[];

        if (isMounted) {
          setProducts(result);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'Gagal mengambil produk dari Backendless');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}