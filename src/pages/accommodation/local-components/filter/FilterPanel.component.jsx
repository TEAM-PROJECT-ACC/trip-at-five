import './filterPanel.style.scss';
import CategoryFilter from './components/CategoryFilter.component';
import PriceFilter from './components/PriceFilter.component';
import FacilityFilter from './components/FacilityFilter.component';
import useFilterStore from '../store/useFilterStore';

const FilterPanel = ({ className, filterHook }) => {
  // const selectedCategory = useFilterStore((state) => state.selectedCategory);
  // const setCategory = useFilterStore((state) => state.setCategory);

  // const selectedFacilities = useFilterStore(
  //   (state) => state.selectedFacilities
  // );
  // const toggleFacility = useFilterStore((state) => state.toggleFacility);

  // const priceRange = useFilterStore((state) => state.priceRange);
  // const setPriceRange = useFilterStore((state) => state.setPriceRange);

  return (
    <div className={`filter-panel__container ${className ? className : ''}`}>
      <CategoryFilter
        selectedCategory={filterHook.selectedCategory}
        setCategory={filterHook.setCategory}
      />
      <div className='line'></div>
      <PriceFilter
        priceRange={filterHook.priceRange}
        setPriceRange={filterHook.setPriceRange}
      />
      <div className='line'></div>
      <div className='filter-group'>
        <h3 className='sub-title'>시설</h3>
      </div>
      <FacilityFilter
        selectedFacilities={filterHook.selectedFacilities}
        toggleFacility={filterHook.toggleFacility}
      />
    </div>
  );
};
export default FilterPanel;
