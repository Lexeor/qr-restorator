import React from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/cartSlice";

function Cart({ show, items }) {
  const containerClass = show ? "panel cart" : "panel cart hidden";

  const totalPrice = useSelector((state) =>
    state.cart.itemsList?.reduce((acc, item) => {
      return acc + item.totalPrice;
    }, 0)
  );
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const renderItems = items.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  return (
    <div className={containerClass}>
      <div className="content-wrapper">
        <h2>Your order</h2>
        <section className="cart-items-wrapper">{renderItems}</section>
        <hr />
        <div className="total-row">
          <span>Total</span>
          <strong>${totalPrice}</strong>
        </div>
        <button className="btn-primary">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
