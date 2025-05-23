import { Star } from '../star/Star.component';

export const DisplayStarList = ({ className, starList }) => {
  return (
    <>
      {starList.length > 0 &&
        starList.map((_, idx) => {
          return (
            <Star
              key={idx}
              className={className}
            />
          );
        })}
    </>
  );
};
