import { FaInfoCircle } from '../../../../../assets/icons/index';
import './ReceiptDetailBody.style.scss';

const ReceiptDetailBody = ({ className, resInfo }) => {
  return (
    <div className={className}>
      <h2 className='receipt-detail-body-item'>
        <FaInfoCircle />
        &nbsp;예약 정보
      </h2>
      {resInfo.map((value, idx) => {
        return (
          <div
            key={idx}
            className='reservation-info__container'
          >
            <div className='reservation-info-item'>
              <div className='accom-name'>
                <h2>{value.accomName}</h2>
              </div>
              <div className='room-name-list'>
                <div className='room-name-item'>
                  <div className='room-resCode'>
                    <span>{value.resCd}</span>
                    <span>⬆️예약코드를 꼭 기억해주세요⬆️</span>
                  </div>
                  <div>
                    <p>{value.roomName}</p>
                    <p>{`${value.checkInDt.slice(
                      0,
                      10
                    )} ~ ${value.checkOutDt.slice(0, 10)}`}</p>
                    <p className='room-price'>
                      {value.roomPrice.toLocaleString('ko-KR')} 원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReceiptDetailBody;
