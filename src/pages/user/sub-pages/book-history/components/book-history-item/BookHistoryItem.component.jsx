import { ButtonPrimary, Label, Modal } from '../../../../../../components';
import {
	reservationCancellationUpdate,
	reservationCancelUpdate,
} from '../../../../../../services/user/userService';
import { classNames, getDateLocaleString } from '../../../../../../utils';
import {
	BOOK_STATE,
	getBookStateClass,
	getBookStateText,
} from '../../utils/getBookState.util';
import './bookHistoryItem.style.scss';
import { infoAlert } from '../../../../../../utils/toastUtils/toastUtils';
import { useModal } from '../../../../../../hooks/use-modal/useModal.hook';
import { BookHistoryItemModalModal } from './ookHistoryItem-acc-modal/BookHistoryItemModal.component';

export const BookHistoryItem = ({ onRefresh, bookHistory }) => {
	const {
		resCd,
		resName,
		resPhone,
		checkInDt,
		// chekcoutDt,
		ckResSt, // CANCEL PROCESSING COMPLETED
		accomName,
		roomName,
		roomNo,
	} = bookHistory;
	const { isModalOpen, handleModalOpen } = useModal();

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
		<article className='user-page book-history-item__container'>
			<div className='book-history-item__img-container'>
				<img
					className='book-history-item__img'
					src='/assets/images/room-page/sample1.png'
					alt='Room picture'
				/>
			</div>
			<div className='book-history-item__info-container'>
				<Label
					className={classNames(
						'book-history-item__state',
						getBookStateClass(ckResSt)
					)}
				>
					{getBookStateText(ckResSt)}
				</Label>
				{/* 예약 날짜 */}
				<div className='book-history-item__date'>
					{getDateLocaleString(checkInDt)}
				</div>
				<div className='book-history-item__acc-name'>{accomName}</div>
				<div className='book-history-item__room-name'>{roomName}</div>
				<div className='book-history-item__book-person-info'>
					<div className='book-history-item__book-person-name'>{resName}</div>
					<div className='book-history-item__book-person-phone'>{resPhone}</div>
				</div>
				{/* 예약 취소 버튼 */}

				{/* TODO: 예약 상태가 예약 중인경우 표시 */}
				{ckResSt === BOOK_STATE.completed && (
					<div className='book-history-item__btn-container'>
						<ButtonPrimary
							className='book-history-item__button'
							onClick={handleModalOpen}
						>
							예약 취소
						</ButtonPrimary>
					</div>
				)}

				{ckResSt === BOOK_STATE.processing && (
					<div className='book-history-item__btn-container'>
						<ButtonPrimary
							className='book-history-item__button'
							onClick={handleModalOpen}
						>
							요청 취소
						</ButtonPrimary>
					</div>
				)}

				{isModalOpen && (
					<Modal modalHandler={handleModalOpen}>
						{ckResSt === BOOK_STATE.completed ? (
							<BookHistoryItemModalModal
								onClose={handleModalOpen}
								ckResSt={ckResSt}
								resCd={resCd}
								onRefresh={onRefresh}
							/>
						) : (
							<BookHistoryItemModalModal
								onClose={handleModalOpen}
								ckResSt={ckResSt}
								resCd={resCd}
								onRefresh={onRefresh}
							/>
						)}
					</Modal>
				)}
			</div>
		</article>
	);
};
