import './filterPanel.style.scss';
import CategoryFilter from './components/CategoryFilter.component';
import PriceFilter from './components/PriceFilter.component';
import FacilityFilter from './components/FacilityFilter.component';

const FilterPanel = ({ className }) => {
  return (
    <div className={`filter-panel__container ${className ? className : ''}`}>
      <CategoryFilter />
      <div className='line'></div>
      <PriceFilter />
      <div className='line'></div>
      <div className='filter-group'>
        <h3 className='sub-title'>시설</h3>
      </div>
      <FacilityFilter />
    </div>
  );
};
export default FilterPanel;
