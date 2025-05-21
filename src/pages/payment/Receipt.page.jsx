import React from 'react';
import ReceiptArea from './local-components/ReceiptArea.component';
import './Receipt.style.scss';

const Receipt = () => {
  return (
    <div className='receipt__container'>
      <ReceiptArea />
    </div>
  );
};

export default Receipt;
