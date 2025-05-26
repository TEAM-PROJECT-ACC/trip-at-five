import { classNames } from '../../../../../../utils';
import './contentsRow.style.scss';

export const ContentsRow = ({ className, children }) => {
  return (
    <div className={classNames('user-page', 'info__contents-row', className)}>
      {children}
    </div>
  );
};
