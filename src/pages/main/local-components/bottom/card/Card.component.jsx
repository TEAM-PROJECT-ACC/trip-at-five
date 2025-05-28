import { Link } from 'react-router-dom';
import { useAccomSearchStore } from '../../../../../states/accom-search/accomSearchStore';

const Card = ({ cardText, ...props }) => {
  // 해당 카드 텍스트 값을 검색상태의 keyword 값으로 저장하기
  const { setKeywordState } = useAccomSearchStore();

  const setKeywordStateHandler = () => {
    setKeywordState(cardText);
  };

  return (
    <Link
      to='/accommodations'
      onClick={setKeywordStateHandler}
      {...props}
    >
      <span>{cardText}</span>
    </Link>
  );
};

export default Card;
