import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  selectedCategory: '',
  selectedPub: [],
  selectedInroom: [],
  selectedEtc: [],
  priceRange: [0, 500000],
};

export const useFilterStore = create(
    persist(
      (set) => ({
        ...initialState,

        setCategory: (category) => set({ selectedCategory: category }),

        togglePub: (facility) =>
          set((state) => ({
            selectedPub: state.selectedPub.includes(facility)
              ? state.selectedPub.filter((f) => f !== facility)
              : [...state.selectedPub, facility],
          })),

        toggleInroom: (facility) =>
          set((state) => ({
            selectedInroom: state.selectedInroom.includes(facility)
              ? state.selectedInroom.filter((f) => f !== facility)
              : [...state.selectedInroom, facility],
          })),

        toggleEtc: (facility) =>
          set((state) => ({
            selectedEtc: state.selectedEtc.includes(facility)
              ? state.selectedEtc.filter((f) => f !== facility)
              : [...state.selectedEtc, facility],
          })),

        setPriceRange: (range) => set({ priceRange: range }),

        resetFilters: () => set(initialState),
      })   
  )
);