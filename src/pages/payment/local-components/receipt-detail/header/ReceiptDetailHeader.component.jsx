import { useParams } from 'react-router-dom';
import {
  BsFillTelephoneFill,
  FaUser,
  IoReceipt,
} from '../../../../../assets/icons/index';
import './ReceiptDetailHeader.style.scss';
import { loginStateStore } from '../../../../../states/login/loginStore';

const ReceiptDetailHeader = ({ className, resUserInfo }) => {
  const memNick = loginStateStore((state) => state.loginInfo.memNick);

  return (
    <div className={className}>
      {resUserInfo && (
        <>
          {/* 백엔드 연동 후 데이터 출력으로 변경할 부분 */}
          <h1 className='receipt-detail-header-item'>
            <IoReceipt />
            &nbsp;여행 다섯시 {memNick}님의 영수증
          </h1>
          <div className='receipt-detail-header-item'>
            <h3>
              <FaUser />
              &nbsp;예약자 : {resUserInfo.resName}
            </h3>
            <h3>
              <BsFillTelephoneFill />
              &nbsp;연락처 : {resUserInfo.resPhone}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default ReceiptDetailHeader;
