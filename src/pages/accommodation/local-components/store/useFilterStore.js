import { create } from "zustand";

const useFilterStore = create((set) => ({
  selectedCategory: "",
  selectedFacilities: [],
  priceRange: [0, 1000000],

  setCategory: (category) => set({ selectedCategory: category }),
  toggleFacility: (facility) =>
    set((state) => ({
      selectedFacilities: state.selectedFacilities.includes(facility)
        ? state.selectedFacilities.filter((f) => f !== facility)
        : [...state.selectedFacilities, facility],
    })),

  setPriceRange: (range) => set({ priceRange: range }),

  resetFilters: () =>
    set({
      selectedCategory: "",
      selectedFacilities: [],
      priceRange: [30000, 200000],
    }),
}));

export default useFilterStore;
