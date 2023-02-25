import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { stat } from "fs";
interface cartSlice {
  showCart: boolean;
  cartItems: any[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
}
const initialState: cartSlice = {
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    showCart(state) {
      state.showCart = true;
    },
    hideCart(state) {
      state.showCart = false;
    },
    increaseQty(state) {
      state.qty++;
    },
    decreaseQty(state) {
      if (state.qty === 1) {
        return;
      }
      state.qty--;
    },
    addToCart(state, action) {
      state.totalPrice +=
        +action.payload.product.price * +action.payload.quantity;
      state.totalQuantities += +action.payload.quantity;
      const isItemInCart = state.cartItems.find(
        item => item._id === action.payload.product._id
      );
      if (isItemInCart) {
        isItemInCart.quantity += action.payload.quantity;
        isItemInCart.price += +action.payload.price * +action.payload.quantity;
      } else {
        state.cartItems.push({
          ...action.payload.product,
          quantity: +action.payload.quantity,
        });
      }
      toast.success("Successfully added!");
    },
    incTotalQuantity(state, action) {
      let foundedProduct;
      foundedProduct = state.cartItems.find(
        item => item._id === action.payload
      );
      state.totalQuantities++
      foundedProduct.quantity++;
      state.totalPrice += foundedProduct.price;
    },
    decTotalQuantity(state, action) {
      let foundedProduct;
      foundedProduct = state.cartItems.find(
        item => item._id === action.payload
      );
      if (foundedProduct.quantity >= 1) {
        state.totalQuantities--;
        foundedProduct.quantity--;
        state.totalPrice -= foundedProduct.price;
      }
    },
    removeFromCart(state,action){
      let foundedProduct;
      foundedProduct = state.cartItems.find(
        item => item._id === action.payload._id
      );
      state.cartItems=state.cartItems.filter((item)=>item._id!==action.payload._id);
      state.totalPrice-= (+foundedProduct.price) * (+foundedProduct.quantity);
      state.totalQuantities-= +foundedProduct.quantity;
    },
    emptyCart(state){
      state.cartItems=[]
    },
    zeroTotalPrice(state){
      state.totalPrice=0;
    },
    zeroTotalQuantities(state){
      state.totalQuantities=0
    }
  },
});

export const {
  increaseQty,
  decreaseQty,
  addToCart,
  showCart,
  hideCart,
  incTotalQuantity,
  decTotalQuantity,
  removeFromCart,
  emptyCart,
  zeroTotalPrice,
  zeroTotalQuantities

} = CartSlice.actions;
export default CartSlice.reducer;
