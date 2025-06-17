import {
	ButtonPrimary,
	ButtonSecondary,
} from '../../../../../../../components';
import {
	reservationCancellationUpdate,
	reservationCancelUpdate,
} from '../../../../../../../services/user/userService';
import { infoAlert } from '../../../../../../../utils/toastUtils/toastUtils';
import { BOOK_STATE } from '../../../utils/getBookState.util';
import './bookHistoryItemModal.style.scss';

export const BookHistoryItemModalModal = ({ onClose, ckResSt, resCd, onRefresh }) => {
	const reservationCancel = async () => {
		const response = await reservationCancelUpdate(resCd);
		if (response.status === 200) {
			infoAlert('예약취소가 접수되었습니다.');
			onRefresh();
		}
	};

	const reservationCancellation = async () => {
		const response = await reservationCancellationUpdate(resCd);
		if (response.status === 200) {
			infoAlert('예약취소 요청을 취소했습니다.');
			onRefresh();
		}
	};

	return (
		<div className='deactive-acc-modal__container'>
			{ckResSt === BOOK_STATE.completed ? (
				<div className='deactive-acc-modal__title'>예약 취소하시겠습니까?</div>
			) : (
				<div className='deactive-acc-modal__title'>
					취소 요청을 취소하시겠습니까?
				</div>
			)}
			<div className='deactive-acc-modal__input-container'>
				{/* grid 1fr 1fr */}
			</div>
			<div className='deactive-acc-modal__btn-container'>
				{/* 비활성화 */}
				{/* TODO: disabled 작업해야 함 */}
				<ButtonSecondary
					className='deactive-acc-modal__button'
					onClick={
						ckResSt === BOOK_STATE.completed
							? reservationCancel
							: reservationCancellation
					}
				>
					예
				</ButtonSecondary>
				{/* 취소 */}
				<ButtonPrimary
					className='deactive-acc-modal__button'
					onClick={onClose}
				>
					아니오
				</ButtonPrimary>
			</div>
		</div>
	);
};
