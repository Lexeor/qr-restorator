import React from "react";

function Cart({ show }) {
  const containerClass = show ? "cart" : "cart hidden";

  return (
    <div className={containerClass}>
      <div className="content-wrapper">
        <h2>Your order</h2>
      </div>
    </div>
  );
}

export default Cart;
