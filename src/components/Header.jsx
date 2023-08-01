import React from "react";
import { useSelector } from "react-redux";
import HeaderSkeleton from "./Skeletons/HeaderSkeleton";

const Header = ({ showCart, toggleShowCart }) => {
  // Redux data handlers
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const orderTotalQuantity = 1;
  const restName = useSelector((state) => state.restaurant.name);
  const restAddress = useSelector((state) => state.restaurant.address);

  return (
    <header>
      <div className="nav-location">
        {restName && (
          <>
            <div className="nav-location-title">{restName}</div>
            <div className="nav-location-place">
              <i className="ri-map-pin-fill"></i>
              {restAddress}
            </div>
          </>
        )}
        {!restName && <HeaderSkeleton />}
      </div>

      <div className="nav-buttons">
        <button className="menu" onClick={() => toggleShowCart()}>
          {showCart ? (
            <i className="ri-bill-line"></i>
          ) : (
            <i className="ri-shopping-cart-line"></i>
          )}
          {cartTotalQuantity > 0 && (
            <div className="cart-count">{cartTotalQuantity}</div>
          )}
        </button>
          {orderTotalQuantity > 0 && (
            <button className="menu">
              <i className="ri-restaurant-2-fill"></i>
                <div className="cart-count">{orderTotalQuantity}</div>
            </button>
          )}
      </div>
    </header>
  );
};

export default Header;
