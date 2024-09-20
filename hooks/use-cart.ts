import  { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { toast } from "sonner"

import { Product } from "../types"

interface CartStoreProps {
    items: Product[]
    addItem: (data: Product) => void
    removeItem: (id: string) => void
    removeAllItems: () => void
}

const useCart = create(
    persist<CartStoreProps>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items
            const existingItem = currentItems.find((item) => item.id === data.id)

            if(existingItem) {
                return toast.warning("Item already exists in the cart")
            }

            set({ items: [...get().items, data] })
            toast.success("Item added to cart")
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)]})
            toast.success("Item removed from cart")
        },
        removeAllItems: () => set({ items: [] })

    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export default useCart