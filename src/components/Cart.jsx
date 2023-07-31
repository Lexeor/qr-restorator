import React from "react";
import CartItem from "./CartItem";
import Price from "./Price";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../app/cartSlice";
import vibrate from "../utils/vibrate";
import { post } from "../lib/fetch";
import emptyimage from "../assets/NoOrdersImg.png";

function Cart({ show, items }) {
  const dispatch = useDispatch();

  // Redux data handlers
  const totalPrice = useSelector((state) =>
    state.cart.itemsList?.reduce((acc, item) => {
      return acc + Number(item.totalPrice);
    }, 0)
  );

  const totalQuantity = useSelector((state) => {
    return state.cart.totalQuantity;
  });

  const restId = useSelector((state) => {
    return state.restaurant.id;
  });

  const tableId = useSelector((state) => {
    return state.restaurant.table;
  });

  const cartItems = useSelector((state) => {
    return state.cart.itemsList;
  });

  // Functions
  const clearHandler = () => {
    vibrate();
    dispatch(clearCart());
  };

  const handleSubmit = async (data, restId, tableId) => {
    let payload = {
      restaurant_id: restId,
      table_id: tableId,
      items: data.map((item) => ({ id: item.id, count: item.quantity })),
    };
    const response = await post("/order_create/", payload);
    // do something with response
    console.log(response.data);
  };

  // Styles & Classes
  const contentStyle = {
    height: window.innerHeight - 70,
  };

  const cartContentStyle = {
    maxHeight: window.innerHeight - 70,
  };

  const containerClass = show ? "panel cart" : "panel cart hidden";

  // Renders
  const renderItems = items.map((item) => (
    <CartItem key={item.id} item={item} />
  ));

  return (
    <div className={containerClass}>
      {totalQuantity ? (
        <div className="content-wrapper cart" style={cartContentStyle}>
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
              <strong>
                <Price>{totalPrice}</Price>
              </strong>
            </div>
          </div>
          <button
            className="btn-primary w-100"
            onClick={() => handleSubmit(cartItems, restId, tableId)}
          >
            Checkout
          </button>
        </div>
      ) : (
        <div className="content-wrapper empty" style={contentStyle}>
          <img src={emptyimage} alt="" />
          <h3>Your order is empty.</h3>
          <br />
          <button className="btn-outlined">Order something</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
