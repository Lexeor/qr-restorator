import React from "react";

const NavBar = ({ showCart, toggleShowCart }) => {
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
        </button>
      </div>
    </header>
  );
};

export default NavBar;
