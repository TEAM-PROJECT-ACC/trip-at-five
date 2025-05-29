import {
  ButtonPrimary,
  ButtonSecondary,
  InputPrimary,
} from '../../../../../../../components';
import './deactiveAddModal.style.scss';

export const DeactiveAccModal = ({ onClose }) => {
  return (
    <div className='deactive-acc-modal__container'>
      <div className='deactive-acc-modal__title'>계정 비활성화</div>
      <div className='deactive-acc-modal__input-container'>
        {/* grid 1fr 1fr */}
        {/* 비밀번호 */}
        <div className='deactive-acc-modal__input-label'>비밀번호</div>
        <InputPrimary
          className='deactive-acc-modal__input'
          type='password'
          placeholder='비밀번호를 입력해 주세요'
        />

        {/* 비밀번호 확인 */}
        <div className='deactive-acc-modal__input-label'>비밀번호 확인</div>
        <InputPrimary
          className='deactive-acc-modal__input pwd-check'
          type='password'
          placeholder='비밀번호를 확인해 주세요'
        />
      </div>
      <div className='deactive-acc-modal__btn-container'>
        {/* 비활성화 */}
        {/* TODO: disabled 작업해야 함 */}
        <ButtonSecondary className='deactive-acc-modal__button'>
          비활성화
        </ButtonSecondary>
        {/* 취소 */}
        <ButtonPrimary
          className='deactive-acc-modal__button'
          onClick={onClose}
        >
          취소
        </ButtonPrimary>
      </div>
    </div>
  );
};
