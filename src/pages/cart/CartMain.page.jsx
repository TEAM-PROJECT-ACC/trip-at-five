import React from 'react';
import './CartMain.style.scss';
import CartBody from './body/CartBody.component';
import CartHeader from './header/CartHeader.component';
const CartMain = () => {
  return (
    <div className='cart-container'>
      <CartHeader className='cart-header' />
      <CartBody className='cart-list-container' />
    </div>
  );
};

export default CartMain;
