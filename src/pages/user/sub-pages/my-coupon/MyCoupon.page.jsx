import { classNames } from '../../../../utils';
import { UserPageContainer } from '../../components/page-container/UserPageContainer.component';
import { Coupon } from './components/coupon/Coupon.component';
import './myCoupon.style.scss';

const dummyData = [
  {
    couponSq: 1,
    couponName: '웰컴 할인 쿠폰',
    couponPrice: 10000,
    couponRegDt: '2025-05-01',
  },
  {
    couponSq: 2,
    couponName: '가정의달 특별할인',
    couponPrice: 15000,
    couponRegDt: '2025-05-05',
  },
  {
    couponSq: 3,
    couponName: '주말 한정 쿠폰',
    couponPrice: 7000,
    couponRegDt: '2025-05-10',
  },
  {
    couponSq: 4,
    couponName: '봄 여행 지원 쿠폰',
    couponPrice: 12000,
    couponRegDt: '2025-04-25',
  },
  {
    couponSq: 5,
    couponName: '리뷰 작성 감사 쿠폰',
    couponPrice: 8000,
    couponRegDt: '2025-05-12',
  },
  {
    couponSq: 6,
    couponName: '3박 이상 숙박 할인',
    couponPrice: 30000,
    couponRegDt: '2025-04-30',
  },
  {
    couponSq: 7,
    couponName: '첫 예약 감사 쿠폰',
    couponPrice: 10000,
    couponRegDt: '2025-05-03',
  },
  {
    couponSq: 8,
    couponName: 'SNS 이벤트 쿠폰',
    couponPrice: 5000,
    couponRegDt: '2025-05-08',
  },
  {
    couponSq: 9,
    couponName: '생일 축하 쿠폰',
    couponPrice: 20000,
    couponRegDt: '2025-05-20',
  },
  {
    couponSq: 10,
    couponName: '단골 고객 감사 쿠폰',
    couponPrice: 25000,
    couponRegDt: '2025-05-15',
  },
];

export const MyCouponPage = () => {
  return (
    <UserPageContainer
      className={classNames('user-page', 'my-coupon__container')}
    >
      {/* TODO: dummyData 삭제 후 couponList map으로 변경 */}
      {dummyData.map((coupon, idx) => {
        return (
          <Coupon
            key={idx}
            coupon={coupon}
          />
        );
      })}
      {/* TODO: totalCount > 10, pagination */}
    </UserPageContainer>
  );
};
