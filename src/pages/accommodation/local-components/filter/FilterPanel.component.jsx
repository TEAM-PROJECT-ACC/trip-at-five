import './filterPanel.style.scss';
import CategoryFilter from './components/CategoryFilter.component';
import PriceFilter from './components/PriceFilter.component';
import FacilityFilter from './components/FacilityFilter.component';
import { useFilterStore } from '../../../../states/accom-filter/filterStore';
import { shallow } from 'zustand/shallow';
const FilterPanel = ({ className }) => {

  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const selectedPub = useFilterStore((state) => state.selectedPub);
  const selectedInroom = useFilterStore((state) => state.selectedInroom);
  const selectedEtc = useFilterStore((state) => state.selectedEtc);
  const priceRange = useFilterStore((state) => state.priceRange);

  const setCategory = useFilterStore((state) => state.setCategory);
  const togglePub = useFilterStore((state) => state.togglePub);
  const toggleInroom = useFilterStore((state) => state.toggleInroom);
  const toggleEtc = useFilterStore((state) => state.toggleEtc);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);

  return (
    <div className={`filter-panel__container ${className ? className : ''}`}>
      <CategoryFilter selectedCategory={selectedCategory} setCategory={setCategory} />
      <div className='line'></div>
      <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
      <div className='line'></div>
      <div className='filter-group'>
        <h3 className='sub-title'>시설</h3>
      </div>
      <FacilityFilter
        selectedPub={selectedPub}
        selectedInroom={selectedInroom}
        selectedEtc={selectedEtc}
        togglePub={togglePub}
        toggleInroom={toggleInroom}
        toggleEtc={toggleEtc}
      />
    </div>
  );
};
export default FilterPanel;
