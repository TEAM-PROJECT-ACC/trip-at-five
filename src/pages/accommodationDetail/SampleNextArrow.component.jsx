import React from 'react';

export function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'absolute',
        display: 'flex',
        backgroundColor: '#5500ff',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        left: '1190px',
        zIndex: 100,
      }}
      onClick={onClick}
    />
  );
}
