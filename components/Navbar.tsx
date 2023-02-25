import Link from 'next/link';
import React from 'react';
import {AiOutlineShopping} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { showCart } from '../redux/CartSlice';
import Cart from './Cart';

const Navbar = () => {
  const dispatch=useDispatch()
  const cart=useSelector(state=>state)
    return (
        <div className="navbar-container">
          <p className="logo">
            <Link href="/">JSM Headphones</Link>  
          </p>  
          <button className='cart-icon' type="button" onClick={()=>{dispatch(showCart())}}>
            <AiOutlineShopping/>
            <span className="cart-item-qty">{cart.cartReducer.totalQuantities}</span>
          </button>
          {cart.cartReducer.showCart && <Cart/>}
        </div>
    );
};

export default Navbar;