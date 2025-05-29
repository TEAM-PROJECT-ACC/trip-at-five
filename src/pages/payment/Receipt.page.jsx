import ReceiptArea from './local-components/ReceiptArea.component';
import { PageContainer } from '../../components';
import './Receipt.style.scss';

const Receipt = () => {
  return (
    <PageContainer className='receipt__container'>
      <ReceiptArea />
    </PageContainer>
  );
};

export default Receipt;
