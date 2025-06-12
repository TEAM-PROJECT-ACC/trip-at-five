import { useState } from 'react';
import FacilityFilter from '../local-components/filter/components/FacilityFilter.component';

export const useFilterState = () => {
  const [filter, setFilter] = useState({
    selectedCategory: '',
    selectedFacilities: [],
    priceRange: [0, 500000],
    currentPage: 1,
  });

  const setCategory = (category) => {
    setFilter((prev) => ({ ...prev, selectedCategory: category }));
  };

  const toggleFacility = (facility) => {
    setFilter((prev) => ({
      ...prev,
      selectedFacilities: prev.selectedFacilities.includes(facility)
        ? prev.selectedFacilities.filter((f) => f !== facility)
        : [...prev.selectedFacilities, facility],
      currentPage: 1,
    }));
  };
  const setPriceRange = (range) => {
    setFilter((prev) => ({
      ...prev,
      priceRange: range,
    }));
  };
  const setCurrentPage = (page) => {
    setFilter((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };
  const resetFilters = () => {
    setFilter({
      selectedCategory: '',
      selectedFacilities: [],
      priceRange: [0, 500000],
      currentPage: 1,
    });
  };

  return {
    filter,
    setCategory,
    toggleFacility,
    setPriceRange,
    setCurrentPage,
    resetFilters,
  };
};
