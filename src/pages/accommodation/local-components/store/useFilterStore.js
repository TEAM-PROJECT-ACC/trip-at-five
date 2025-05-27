import { create } from 'zustand';

const useFilterStore = create((set) => ({
  selectedCategory: '',
  selectedFacilities: [],
  priceRange: [0, 1000000],
  currentPage: 1,

  setCategory: (category) => set({ selectedCategory: category }),
  toggleFacility: (facility) =>
    set((state) => ({
      selectedFacilities: state.selectedFacilities.includes(facility)
        ? state.selectedFacilities.filter((f) => f !== facility)
        : [...state.selectedFacilities, facility],
      currentPage: 1,
    })),

  setPriceRange: (range) => set({ priceRange: range }),
  setCurrentPage: (page) => set({ currentPage: page }),
  resetFilters: () =>
    set({
      selectedCategory: '',
      selectedFacilities: [],
      priceRange: [30000, 200000],
      currentPage: 1,
    }),
}));

export default useFilterStore;
