
import { MAX_ITEMS } from "@/src/lib/utils";
import { OrderItem } from "@/src/types";
import { Product } from "@prisma/client";
import { create } from "zustand";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product['id']) => void;
  decreaseQuantity: (id: Product['id']) => void;
  removeProductFromOrder: (id: Product['id']) => void;
  clearOrder: () => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder(product) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId, image, ...data } = product
    let order: OrderItem[] = []

    if (get().order.find((item) => item.id === product.id)) {
      order = get().order.map(item => {
        if (item.id === product.id && item.quantity < MAX_ITEMS) {
          return {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * data.price
          }
        } else {
          return item
        }
      })
    } else {
      order = [...get().order, {
        ...data,
        quantity: 1,
        subtotal: 1 * data.price
      }]
    }
    set(() => ({
      order
    }))
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map(item => item.id === id ? {
        ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price
      } : item)
    }))
  },
  decreaseQuantity: (id) => {
    const order = get().order.map(item => item.id === id ? {
      ...item,
      quantity: item.quantity - 1,
      subtotal: (item.quantity - 1) * item.price
    } : item)
    set(() => ({
      order
    }))
  },
  removeProductFromOrder: (id) => {
    //const order = get().order.filter(item => item.id !== id)
    set(() => ({
      order: get().order.filter(item => item.id !== id)
    }))
  },

  clearOrder: () => {
    set(() => ({
      order: []
    }))
  }
}))