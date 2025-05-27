import { Button, ButtonPrimary } from '../../../../../../components';
import { classNames } from '../../../../../../utils';
import './bottomButtons.style.scss';

export const BottomButtons = () => {
  return (
    <div className={classNames('user-page', 'bottom-btns__container')}>
      <ButtonPrimary className='bottom-button update'>정보 수정</ButtonPrimary>
      <Button className='bottom-button deactivate'>계정 비활성화</Button>
    </div>
  );
};
