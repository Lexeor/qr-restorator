import React from "react";

function CartItem({ item }) {
  return (
    <article className="cart-item">
      <img src={item.cover} alt="" />
      {item.quantity} {item.name} ${item.totalPrice}
    </article>
  );
}

export default CartItem;
