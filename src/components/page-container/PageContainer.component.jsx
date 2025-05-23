import { classNames } from '../../utils/index';
import './pageContainer.style.scss';

export const PageContainer = ({ children }) => {
  return <div className={classNames('global-page-container')}>{children}</div>;
};
