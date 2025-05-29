import React from 'react';
import {
  publicFacilities,
  roomFacilities,
  etcFacilities,
} from './roomInfoIcon';

export const getIconsFromRoomInfo = (info = '') => {
  const icons = [];
  const allFacilities = [
    ...publicFacilities,
    ...roomFacilities,
    ...etcFacilities,
  ];

  allFacilities.forEach(({ label, icon }) => {
    if (info?.toLowerCase().includes(label.toLowerCase())) {
      icons.push(
        <span
          key={label}
          className='room-icon-svg'
          title={label}
        >
          {icon}
        </span>
      );
    }
  });

  return icons;
};
