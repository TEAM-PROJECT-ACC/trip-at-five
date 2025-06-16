import { useParams } from 'react-router-dom';
import AdminInput from '../../../components/inputs/input-admin/AdminInput.component';
import AccomFacButton from '../../../components/buttons/admin-fac-button/AccomFacButton.component';
import {
  FaRegCalendarCheck,
  FaTimesCircle,
  MdHourglassTop,
} from '../../../assets/icons/index';
import { useQuery } from '@tanstack/react-query';
import { selectReservationDetail } from '../reservation/api/reservationList.api';
import { HttpStatusCode } from 'axios';
import './ReservationManagementDetail.style.scss';

const ReservationManagementDetail = () => {
  const params = useParams();

  const resCode = params.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminReservationDetail', resCode],
    queryFn: async () => {
      if (!resCode) return null;
      const response = await selectReservationDetail(resCode);

      console.log('예약 상세 조회 데이터:', response.data);
      if (response.status !== HttpStatusCode.Ok) {
        throw new Error('예약 상세 조회에 실패했습니다.');
      }
      return response.data;
    },
    enabled: !!resCode, // resCode가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  return (
    <div className='reservation-detail__container'>
      {!!isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className='reservation-detail-header'>
            <h2 className='reservation-detail-title'>예약 상세 정보</h2>
            <AdminInput
              className={'reservation-detail-res-code'}
              defaultValue={resCode}
              placeholder={resCode}
              disabled
            />
            <div className='reservation-state-button-group'>
              {data?.ckResSt === 'COMPLETED' && (
                <AccomFacButton
                  type='button'
                  title={'예약완료'}
                  icon={<FaRegCalendarCheck />}
                />
              )}
              {data?.ckResSt === 'CANCELED' && (
                <AccomFacButton
                  type='button'
                  title={'예약취소'}
                  icon={<FaTimesCircle />}
                />
              )}
              {data?.ckResSt === 'PROCESSING' && (
                <AccomFacButton
                  type='button'
                  title={'처리중'}
                  icon={<MdHourglassTop />}
                />
              )}
            </div>
          </div>
          <div className='reservation-detail-body'>
            <div className='reservation-detail-body-item'>
              {/* 예약자명, 예약자이메일, 예약자전화번호 */}
              <AdminInput
                className={'item-w-10'}
                placeholder={'예약자명'}
                defaultValue={data?.resName || ''}
                disabled
              />
              <AdminInput
                className={'item-w-30'}
                placeholder={'예약자이메일'}
                defaultValue={data?.resEmailId || ''}
                disabled
              />
              <AdminInput
                className={'item-w-20'}
                placeholder={'예약자전화번호'}
                defaultValue={data?.resPhone || ''}
                disabled
              />
            </div>
            <div className='reservation-detail-body-item'>
              {/* 숙박업소유형, 숙박업소명, 객실명 */}
              <AdminInput
                className={'item-w-10'}
                placeholder={'숙박업소유형'}
                defaultValue={data?.accomTypeName || ''}
                disabled
              />
              <AdminInput
                className={'item-w-50'}
                placeholder={'숙박업소명'}
                defaultValue={data?.accomName || ''}
                disabled
              />
              <AdminInput
                className={'item-w-40'}
                placeholder={'객실명'}
                defaultValue={data?.roomName || ''}
                disabled
              />
            </div>
            <div className='reservation-detail-body-item'>
              {/* 영수증ID, 결제 상태, 결제수단, 결제가격 */}
              <AdminInput
                className={'item-w-30'}
                placeholder={'영수증ID'}
                defaultValue={data?.receiptId || ''}
                disabled
              />
              <AdminInput
                className={'item-w-10'}
                placeholder={'결제수단'}
                defaultValue={data?.payMethod || ''}
                disabled
              />
              <AdminInput
                className={'item-w-20'}
                placeholder={'결제가격'}
                defaultValue={data?.payPrice.toLocaleString('ko-KR') || ''}
                disabled
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationManagementDetail;
