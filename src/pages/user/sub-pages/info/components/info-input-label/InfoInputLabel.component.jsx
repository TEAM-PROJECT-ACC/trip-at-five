import { classNames } from '../../../../../../utils';
import './infoInputLabel.style.scss';

export const InfoInputLabel = ({ children }) => {
  return (
    <label className={classNames('user-page', 'info__input-label')}>
      {children}
    </label>
  );
};
