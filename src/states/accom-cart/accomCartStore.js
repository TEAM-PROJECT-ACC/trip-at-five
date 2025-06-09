import { create } from 'zustand';

const initialState = {
  selectedItems: [],
};

export const useAccomCartStore = create((set, get) => ({
  ...initialState,
  actions: {
    toggleItem: (item) => {
      const selectedItems = get().selectedItems;
      const idx = selectedItems.findIndex(
        (i) =>
          i.accomNo === item.accomNo &&
          i.roomSq === item.roomSq &&
          i.roomPrice === item.roomPrice
      );
      if (idx !== -1) {
        // 이미 존재 => 삭제
        set({
          selectedItems: selectedItems.filter(
            (i) =>
              !(
                i.accomNo === item.accomNo &&
                i.roomSq === item.roomSq &&
                i.roomPrice === item.roomPrice
              )
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
