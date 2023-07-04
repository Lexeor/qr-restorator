import React from "react";

const NavBar = () => {
  return (
    <nav>
      <div className="nav-location">
        <div className="nav-location-title">Shakespeare</div>
        <div className="nav-location-place">
          <i className="ri-map-pin-2-fill"></i>
          Akdeniz Blv. No:53
        </div>
      </div>
      <div className="nav-buttons">
        <button className="menu">
          <i className="ri-shopping-cart-line"></i>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
