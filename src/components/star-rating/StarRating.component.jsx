import { classNames } from '../../utils';
import { Background } from './components/background/Background.component';
import { StarList } from './components/star-list/StarList.component';
import { setStarList } from './utils/set-star-list/setStarList.util';
import './starRating.style.scss';

/**
 *
 * @param {
 *  className
 *  score 점수 값
 *  starCount 필요한 별 개수, default = 5
 *  onClick 점수를 전달 받을 함수 (0 ~ 5) .5 단위로 증가
 *  isDisabled 별점 표시만 필요한 경우 설정 값
 * }
 */

export const StarRating = ({
  className,
  score,
  starCount = 5,
  onClick,
  isDisabled,
}) => {
  const starList = setStarList({ starCount });
  console.log(className);

  const handleClick = ({ rateScore }) => {
    if (onClick) {
      onClick(rateScore);
    }
  };

  return (
    <div
      className={classNames(
        'global-star-rating__container',
        className,
        isDisabled ? 'disabled' : ''
      )}
    >
      <StarList
        className={className}
        starList={starList}
        starCount={starCount}
        score={score}
        onClick={handleClick}
        isDisabled={isDisabled}
      />
      <Background
        className={className}
        starList={starList}
      />
    </div>
  );
};
