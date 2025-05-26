import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useFilterStore from '../../store/useFilterStore';
import './Filter.style.scss';

const PriceFilter = () => {
  const priceRange = useFilterStore((state) => state.priceRange);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);

  const handleChange = (value) => {
    setPriceRange(value);
    console.log('Selected price range:', value);
  };

  return (
    <div className='filter-group'>
      <h3 className='title'>가격</h3>
      <div className='slider-style-length'>
        <Slider
          range
          min={0}
          max={1000000}
          step={10000}
          value={priceRange}
          onChange={handleChange}
          trackStyle={[{ backgroundColor: '#5500ff' }]}
          handleStyle={[{ borderColor: '#5500ff' }, { borderColor: '#5500ff' }]}
        />
      </div>
      <p className='price-range'>
        ₩{priceRange[0].toLocaleString()} ~ ₩{priceRange[1].toLocaleString()}
      </p>
    </div>
  );
};

export default PriceFilter;
