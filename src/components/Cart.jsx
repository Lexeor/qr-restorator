import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/cartSlice";

function Cart({ show, items }) {
  const containerClass = show ? "panel cart" : "panel cart hidden";

  const renderItems = items.map((item) => (
    <div key={item.id}>
      {item.quantity} {item.name} ${item.totalPrice}
    </div>
  ));

  return (
    <div className={containerClass}>
      <div className="content-wrapper">
        <h2>Your order</h2>
        {renderItems}
      </div>
    </div>
  );
}

export default Cart;
