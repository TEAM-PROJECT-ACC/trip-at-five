const PaymentInfoBody = ({ className, payInfo }) => {
  return (
    <div className={className}>
      <p>
        결제수단 : <span>{payInfo.payMethod}</span>
      </p>
      <p>
        금액 : <span>{payInfo.payPrice.toLocaleString('ko-KR')} 원</span>
      </p>
    </div>
  );
};

export default PaymentInfoBody;
