import { ButtonPrimary } from '../../../../../../components';
import { getDateLocaleString } from '../../../../../../utils';
import './coupon.style.scss';

export const Coupon = ({ coupon }) => {
	const { couponName, couponPrice, couponRegDt } = coupon;
	return (
		<article className='user-page coupon__container'>
			<div className='coupon__name'>{couponName}</div>
			<div className='coupon__info-container'>
				<div className='coupon__date'>{getDateLocaleString(couponRegDt)}</div>
				<div className='coupon__price'>
					{couponPrice.toLocaleString('ko-KR')} 원
				</div>
				<div className='coupon__btn-container'>
					<ButtonPrimary className='coupon__button'>
						쿠폰 사용하기
					</ButtonPrimary>
				</div>
			</div>
		</article>
	);
};
