import './filterPanel.style.scss';
import CategoryFilter from './components/CategoryFilter.component';
import PriceFilter from './components/PriceFilter.component';
import FacilityFilter from './components/FacilityFilter.component';

const FilterPanel = ({ className, filterHook }) => {
  const { filter, setCategory, toggleFacility, setPriceRange } = filterHook;
  const { selectedCategory, priceRange, selectedFacilities } = filter;

  return (
    <div className={`filter-panel__container ${className ? className : ''}`}>
      <CategoryFilter
        selectedCategory={selectedCategory}
        setCategory={setCategory}
      />
      <div className='line'></div>
      <PriceFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <div className='line'></div>
      <div className='filter-group'>
        <h3 className='sub-title'>시설</h3>
      </div>
      <FacilityFilter
        selectedFacilities={selectedFacilities}
        toggleFacility={toggleFacility}
      />
    </div>
  );
};
export default FilterPanel;
