import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 초기값
const initialState = {
  selectedCategory: '',
  selectedPub: [],
  selectedInroom: [],
  selectedEtc: [],
  priceRange: [0, 500000],
};

export const useFilterStore = create(
  persist((set) => ({
    ...initialState,
    setCategory: (cat) => set({ selectedCategory: cat }),

    // 여러개 할 수 있어서
    togglePub: (fac) =>
      set((state) => ({
        selectedPub: state.selectedPub.includes(fac)
          ? state.selectedPub.filter((f) => f !== fac)
          : [...state.selectedPub, fac],
      })),

    toggleInroom: (fac) =>
      set((state) => ({
        selectedInroom: state.selectedInroom.includes(fac)
          ? state.selectedInroom.filter((f) => f !== fac)
          : [...state.selectedInroom, fac],
      })),

    toggleEtc: (fac) =>
      set((state) => ({
        selectedEtc: state.selectedEtc.includes(fac)
          ? state.selectedEtc.filter((f) => f !== fac)
          : [...state.selectedEtc, fac],
      })),

    setPriceRange: (range) => set({ priceRange: range }),
    // 초기화
    resetFilters: () => set(initialState),
  }))
);
