import React from 'react';
import ReceiptArea from './local-components/ReceiptArea.component';
import './Receipt.style.scss';
import { PageContainer } from '../../components';

const Receipt = () => {
  return (
    <PageContainer className='receipt__container'>
      <ReceiptArea />
    </PageContainer>
  );
};

export default Receipt;
