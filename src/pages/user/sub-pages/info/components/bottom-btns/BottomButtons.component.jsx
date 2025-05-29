import { Button, ButtonPrimary, Modal } from '../../../../../../components';
import { classNames } from '../../../../../../utils';
import { useModal } from '../../../../../../hooks/use-modal/useModal.hook';
import './bottomButtons.style.scss';
import { DeactiveAccModal } from './deactive-acc-modal/DeactiveAccModal.component';

export const BottomButtons = () => {
  const { isModalOpen, handleModalOpen } = useModal();

  return (
    <div className={classNames('user-page', 'bottom-btns__container')}>
      <ButtonPrimary className='bottom-button update'>정보 수정</ButtonPrimary>
      <Button
        className='bottom-button deactivate'
        onClick={handleModalOpen}
      >
        계정 비활성화
      </Button>
      {isModalOpen && (
        <Modal modalHandler={handleModalOpen}>
          <DeactiveAccModal onClose={handleModalOpen} />
        </Modal>
      )}
    </div>
  );
};
