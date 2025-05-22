import { useMemo, useRef, useState } from 'react';
import { classNames } from '../../../../utils';
import { Star } from '../star/Star.component';
import './starList.style.scss';

export const StarList = ({
  score,
  starList,
  starCount,
  onClick,
  isDisabled,
}) => {
  const selectedScore = useMemo(() => {
    const offset = Number.isInteger(score) ? 1 : score - Math.floor(score);
    const index = Number.isInteger(score) ? score - 1 : score - offset;

    return {
      index: index,
      offset: Number(offset.toFixed(1)),
      width: 1,
    };
  }, [score]);

  const [selectedStars, setSelectedStars] = useState(() => selectedScore);
  const container = useRef();

  const handleClick = () => {
    if (isDisabled) {
      return;
    }
    const { index, offset, width } = selectedStars;
    const rateScore = index + (width / 2 > offset ? 0.5 : 1);

    if (onClick) {
      onClick({ rateScore });
    }
  };

  const handleMouseMove = (event) => {
    if (isDisabled) {
      return;
    }
    const containerRect = container.current.getBoundingClientRect();
    const containerLeft = containerRect.left;

    const starWidth = containerRect.width / starCount;
    const starIndex = Math.floor((event.pageX - containerLeft) / starWidth);
    const starOffset = (event.pageX - containerLeft) % starWidth;

    setSelectedStars((prev) => {
      return {
        ...prev,
        index: starIndex,
        width: starWidth,
        offset: starOffset,
      };
    });
  };

  const handleMouseLeave = () => {
    if (isDisabled) {
      return;
    }
    setSelectedStars(() => selectedScore);
  };

  return (
    <div
      className={classNames('global-star-rating__star-list', 'star-list')}
      ref={container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {starList.length > 0 &&
        starList.map((_, idx) => {
          return (
            <RateStar
              key={idx}
              index={idx}
              selectedStars={selectedStars}
            />
          );
        })}
    </div>
  );
};

const RateStar = ({ index, selectedStars }) => {
  const isMouseOver = useMemo(
    () => index <= selectedStars.index,
    [index, selectedStars.index]
  );

  const isHalfOver = useMemo(
    () =>
      selectedStars.index === index &&
      selectedStars.offset <= selectedStars.width / 2,
    [index, selectedStars.index, selectedStars.offset, selectedStars.width]
  );

  return (
    <div
      className={classNames(
        'global-star-rating__rate-star-container',
        isMouseOver ? 'hover' : '',
        isHalfOver ? 'half-hover' : ''
      )}
    >
      <div className='global-star-rating__rate-star'>
        <Star className={classNames()} />
      </div>
    </div>
  );
};
