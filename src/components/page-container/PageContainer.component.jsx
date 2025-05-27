import { classNames } from '../../utils/index';
import './pageContainer.style.scss';

export const PageContainer = ({ className, children }) => {
  return (
    <div className={classNames('global-page-container', className)}>
      {children}
    </div>
  );
};
