import React from 'react';

export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        backgroundColor: '#5500ff',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        left: '5px',
        zIndex: 100,
      }}
      onClick={onClick}
    />
  );
}
