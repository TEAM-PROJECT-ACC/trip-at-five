import { classNames } from '../../../../utils';
import { DisplayStarList } from '../display-star-list/DisplayStarList.component';
import './background.style.scss';

export const Background = ({ className, starList }) => {
  return (
    <div
      className={classNames(
        'global-star-rating__background',
        'ground',
        'star-list'
      )}
    >
      {
        <DisplayStarList
          className={className}
          starList={starList}
        />
      }
    </div>
  );
};
