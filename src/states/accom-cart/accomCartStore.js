import { create } from 'zustand';

const initialState = {
  selectedItems: [],
};

export const useAccomCartStore = create((set, get) => ({
  ...initialState,
  actions: {
    toggleItem: (item) => {
      const selectedItems = get().selectedItems;
      const idx = selectedItems.findIndex((i) => i.roomSq === item.roomSq);
      if (idx !== -1) {
        // 이미 존재 => 삭제
        set({
          selectedItems: selectedItems.filter(
            (i) => !(i.roomSq === item.roomSq)
          ),
        });
      } else {
        // 없으면 => 추가
        set({ selectedItems: [...selectedItems, item] });
      }
    },
    resetCart: () => set(initialState),
  },
}));
