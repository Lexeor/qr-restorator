import React from "react";
import { useSelector } from "react-redux";

const NavBar = ({ showCart, toggleShowCart }) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header>
      <div className="nav-location">
        <div className="nav-location-title">Shakespeare</div>
        <div className="nav-location-place">
          <i className="ri-map-pin-fill"></i>
          Akdeniz Blv. No:53
        </div>
      </div>
      <div className="nav-buttons">
        <button className="menu" onClick={() => toggleShowCart()}>
          {showCart ? (
            <i className="ri-bill-line"></i>
          ) : (
            <i className="ri-shopping-cart-line"></i>
          )}
          {totalQuantity > 0 && (
            <div className="cart-count">{totalQuantity}</div>
          )}
        </button>
      </div>
    </header>
  );
};

export default NavBar;
