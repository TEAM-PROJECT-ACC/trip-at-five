import './filterPanel.style.scss';
import CategoryFilter from './components/CategoryFilter.component';
import PriceFilter from './components/PriceFilter.component';
import FacilityFilter from './components/FacilityFilter.component';
import { useFilterStore } from '../../../../states/accom-filter/filterStore';
import { shallow } from 'zustand/shallow';
const FilterPanel = ({ className }) => {
  const filterState = useFilterStore((state) => state);

  return (
    <div className={`filter-panel__container ${className ? className : ''}`}>
      <CategoryFilter
        selectedCategory={filterState.selectedCategory}
        setCategory={filterState.setCategory}
      />
      <div className='line'></div>
      <PriceFilter
        priceRange={filterState.priceRange}
        setPriceRange={filterState.setPriceRange}
      />
      <div className='line'></div>
      <div className='filter-group'>
        <h3 className='sub-title'>시설</h3>
      </div>
      <FacilityFilter
        selectedPub={filterState.selectedPub}
        selectedInroom={filterState.selectedInroom}
        selectedEtc={filterState.selectedEtc}
        togglePub={filterState.togglePub}
        toggleInroom={filterState.toggleInroom}
        toggleEtc={filterState.toggleEtc}
      />
    </div>
  );
};
export default FilterPanel;
