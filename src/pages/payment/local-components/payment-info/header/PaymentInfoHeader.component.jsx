import { RiMoneyDollarCircleLine } from '../../../../../assets/icons/index';
import './PaymentInfoHeader.style.scss';

const PaymentInfoHeader = ({ className }) => {
  return (
    <div className={className}>
      <h2 className='pay-info-header-item'>
        <RiMoneyDollarCircleLine />
        &nbsp;결제 정보
      </h2>
    </div>
  );
};

export default PaymentInfoHeader;
