import React, {useRef} from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import {TiDeleteOutline} from "react-icons/ti";
import {toast, Toast} from "react-hot-toast";
import {urlFor} from "../lib/Client";
import {useDispatch, useSelector} from "react-redux";
import {
  decTotalQuantity,
  hideCart,
  incTotalQuantity,
  removeFromCart,
} from "../redux/CartSlice";
import Link from "next/link";
import getStripe from "../lib/GetStripe";
import produce from "immer";

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const cart = useSelector(state => state);
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(hideCart());
  };
  const decrease = (id: string) => {
    dispatch(decTotalQuantity(id));
  };
  const increase = (id: string) => {
    dispatch(incTotalQuantity(id));
  };
  const remove = (item: any) => {
    dispatch(removeFromCart(item));
  };
  const handleCheckout = async () => {
    const products=cart.cartReducer.cartItems;
    
    
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    const data = await response.json();
    console.log(data);
    toast.loading('Redirecting...')
    stripe.redirectToCheckout({sessionId:data.id})
  };
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={closeCart}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">
            ({cart.cartReducer.totalQuantities} items)
          </span>
        </button>
        {!cart.cartReducer.cartItems.length && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type="button" className="btn" onClick={closeCart}>
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cart.cartReducer.cartItems.length >= 1 &&
            cart.cartReducer.cartItems.map(item => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item.image[0])}
                  className="cart-product-image"
                  alt=""
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => decrease(item._id)}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => increase(item._id)}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => remove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cart.cartReducer.cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${cart.cartReducer.totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
