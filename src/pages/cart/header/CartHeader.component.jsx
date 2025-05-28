import { IoCart } from '../../../assets/icons/index';
import './CartHeader.style.scss';

const CartHeader = ({ className }) => {
  return (
    <div className={className}>
      <h1 className='header-title'>
        <span>
          <IoCart className='cart-icon' />
        </span>
        장바구니
      </h1>
    </div>
  );
};

export default CartHeader;
