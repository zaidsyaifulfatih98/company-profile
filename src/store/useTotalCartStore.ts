import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageurl: string;
  grindSize?: string;
  quantity: number;
}

type UseTotalCart = {
  totalCart: number;
  itemsCart: CartItem[];
  addToCart: (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const useTotalCartStore = create<UseTotalCart>()(
  persist(
    (set) => ({
      totalCart: 0,
      itemsCart: [],

      addToCart: (newItem) =>
        set((state) => {
          const current = [...state.itemsCart];
          const idx = current.findIndex((item) => item.id === newItem.id);
          if (idx === -1) {
            const added = [...current, { ...newItem, quantity: newItem.quantity ?? 1 }];
            return { itemsCart: added, totalCart: added.length };
          } else {
            current[idx] = {
              ...current[idx],
              quantity: current[idx].quantity + (newItem.quantity ?? 1),
            };
            return { itemsCart: [...current] };
          }
        }),

      removeFromCart: (id) =>
        set((state) => {
          const filtered = state.itemsCart.filter((item) => item.id !== id);
          return { itemsCart: filtered, totalCart: filtered.length };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity < 1) return state;
          return {
            itemsCart: state.itemsCart.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ itemsCart: [], totalCart: 0 }),
    }),
    { name: 'cart-store' }
  )
);

export default useTotalCartStore;