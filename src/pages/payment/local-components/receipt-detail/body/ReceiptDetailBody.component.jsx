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
                  <p>{value.resCode}</p>
                  <p>{value.roomName}</p>
                  <p>{`${value.checkInDt} ~ ${value.checkOutDt}`}</p>
                  <p>{value.roomPrice.toLocaleString()} 원</p>
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
