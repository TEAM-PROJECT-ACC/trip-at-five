import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  selectedItems: [],
  removedItems: [],
};

export const useAccomCartStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      toggleItem: (item) => {
        const selectedItems = get().selectedItems;
        const removedItems = get().removedItems;
        const idx = selectedItems.findIndex((i) => i.roomSq === item.roomSq);

        if (idx !== -1) set({ removedItems: [...removedItems, item] });
        else set({ selectedItems: [...selectedItems, item] });
      },
      resetSelectedCart: () =>
        set({ selectedItems: initialState.selectedItems }),
      resetRemovedCart: () => set({ removedItems: initialState.removedItems }),
    }),
    {
      name: 'accomCartStore',
      getStorage: () => localStorage,
    }
  )
);
