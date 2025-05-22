import { FaStar } from '../../../../assets/icons/index';
import { classNames } from '../../../../utils';
import './star.style.scss';

export const Star = ({ className, ...props }) => {
  return (
    <div
      className={classNames('global-star-rating__star-container', className)}
      {...props}
    >
      <FaStar className={classNames('global-star-rating__star', className)} />
    </div>
  );
};
