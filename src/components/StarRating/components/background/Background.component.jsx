import { classNames } from '../../../../utils';
import { DisplayStarList } from '../display-star-list/DisplayStarList.component';
import './background.style.scss';

export const Background = ({ starList }) => {
  return (
    <div
      className={classNames(
        'global-star-rating__background',
        'ground',
        'star-list'
      )}
    >
      {<DisplayStarList starList={starList} />}
    </div>
  );
};
