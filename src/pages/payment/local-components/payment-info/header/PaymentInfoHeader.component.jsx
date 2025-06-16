import { RiMoneyDollarCircleLine } from '../../../../../assets/icons/index';
import './PaymentInfoHeader.style.scss';

const PaymentInfoHeader = ({ className, payInfo }) => {
  return (
    <div className={className}>
      <h2 className='pay-info-header-item'>
        <RiMoneyDollarCircleLine />
        &nbsp;결제 정보 : {payInfo.receiptId}
      </h2>
    </div>
  );
};

export default PaymentInfoHeader;
