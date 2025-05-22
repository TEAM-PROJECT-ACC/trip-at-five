import { classNames } from '../../utils/index';
import './pageContainer.style.scss';

export const PageContainer = ({ children, className }) => {
  return (
    <div className={classNames('global-page-container', className)}>
      {children}
    </div>
  );
};
