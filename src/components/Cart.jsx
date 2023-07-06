import React from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../app/cartSlice";

function Cart({ show, items }) {
  const containerClass = show ? "panel cart" : "panel cart hidden";
  const dispatch = useDispatch();

  const clearHandler = () => {
    dispatch(clearCart());
  };

  const totalPrice = useSelector((state) =>
    state.cart.itemsList?.reduce((acc, item) => {
      return acc + item.totalPrice;
    }, 0)
  );

  const renderItems = items.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  return (
    <div className={containerClass}>
      <div className="content-wrapper">
        <div className="panel-header">
          <h2>Your order</h2>
          <span className="action-link" onClick={clearHandler}>
            Remove all
          </span>
        </div>
        <section className="cart-items-wrapper">{renderItems}</section>
        <hr />
        <div className="totals">
          <div className="total-row">
            <span>Total</span>
            <strong>${totalPrice}</strong>
          </div>
        </div>
        <button className="btn-primary">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
