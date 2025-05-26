import { MdClose } from '../../../../assets/icons/index';
import './diaryModal.style.scss';

export const DiaryModal = ({ onClose }) => {
  return (
    <>
      <div className='diary-modal__container'>
        <div className='diary-modal'>
          <MdClose
            className='diary-modal__close-icon'
            onClick={onClose}
          />
        </div>
      </div>
      <div className='diary-modal__background'></div>
    </>
  );
};
