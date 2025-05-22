import { Star } from '../star/Star.component';

export const DisplayStarList = ({ starList }) => {
  return (
    <>
      {starList.length > 0 &&
        starList.map((_, idx) => {
          return <Star key={idx} />;
        })}
    </>
  );
};
