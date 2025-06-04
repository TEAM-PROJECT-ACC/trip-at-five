import { ButtonPrimary, ButtonSecondary } from '../../../../components';
import './confirmModal.style.scss';

export const ConfirmModal = ({ onConfirm, onClose }) => {
  return (
    <div className='confirm-modal__container'>
      <div className='confirm-modal__question'>
        삭제된 일지는 복구할 수 없습니다. 일지를 삭제하시겠습니까?
      </div>
      <div className='confirm-modal__btn-container'>
        <ButtonSecondary
          className='confirm-modal__button'
          onClick={onConfirm}
        >
          삭제
        </ButtonSecondary>
        <ButtonPrimary
          className='confirm-modal__button'
          onClick={onClose}
        >
          취소
        </ButtonPrimary>
      </div>
    </div>
  );
};
