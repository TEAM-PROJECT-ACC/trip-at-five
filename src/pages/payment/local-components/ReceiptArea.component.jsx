import PaymentInfo from './payment-info/PaymentInfo.component';
import ReceiptDetail from './receipt-detail/ReceiptDetail.component';
import { LinkButton } from '../../../components';
import './ReceiptArea.style.scss';

const ReceiptArea = () => {
  return (
    <div className='receipt-area__container'>
      <ReceiptDetail className='card__container' />
      <PaymentInfo className='card__container' />
      <LinkButton
        className='link-button--move'
        to='/'
        children={'메인페이지로 이동'}
      />
    </div>
  );
};

export default ReceiptArea;
