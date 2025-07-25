import CartBody from './body/CartBody.component';
import CartHeader from './header/CartHeader.component';
import { PageContainer } from '../../components';
import './CartMain.style.scss';

const CartMain = () => {
  return (
    <PageContainer className='cart-container'>
      <CartHeader className='cart-header' />
      <CartBody className='cart-list-container' />
    </PageContainer>
  );
};

export default CartMain;
