import { Link } from 'react-router-dom';

const Card = ({ cardText, ...props }) => {
  return (
    <Link to='/accommodations' {...props}>
      <span>{cardText}</span>
    </Link>
  );
};

export default Card;
