import { classNames } from '../../../../../../utils';
import { ContentsRow, InfoInputLabel } from '../index';
import { FcGoogle } from '../../../../../../assets/icons/index';
import './social.style.scss';

export const Social = () => {
  return (
    <ContentsRow>
      <InfoInputLabel>소셜 로그인</InfoInputLabel>
      <div className={classNames('user-page', 'social-row__icon-container')}>
        <FcGoogle className='social-row_icon' />
      </div>
    </ContentsRow>
  );
};
