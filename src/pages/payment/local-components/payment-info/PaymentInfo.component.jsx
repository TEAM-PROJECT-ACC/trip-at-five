import PaymentInfoBody from './body/PaymentInfoBody.component';
import PaymentInfoHeader from './header/PaymentInfoHeader.component';
import './PaymentInfo.style.scss';

const PaymentInfo = ({ payInfo, ...props }) => {
  return (
    <div {...props}>
      <PaymentInfoHeader className='pay-info-header' />
      <PaymentInfoBody
        className='pay-info-body'
        payInfo={payInfo}
      />
    </div>
  );
};

export default PaymentInfo;
