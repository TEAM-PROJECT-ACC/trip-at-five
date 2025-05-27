import React from 'react';

const AccommodationHeader = ({ name, location, basePrice}) => {
  return (
    <section className="accom-header">
        <div className="accom-header__img">
        </div>
        <div className="accom-header__info">
        <h1 className="accom-header__title">{name}</h1>
        <p className="accom-header__location">{location}</p>
        <div className="accom-header__price">
          <span className="price">₩{basePrice}</span>
          <span className="per-night"> / 1박</span>
        </div>
      </div>
    </section>
  );
};

export default AccommodationHeader;