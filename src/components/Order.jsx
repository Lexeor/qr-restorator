import React from "react";
import Price from "./Price";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

function Order({ show }) {
  // Redux data handlers
  const menuItems = useSelector((state) => state.menu.items);
  const orderId = useSelector((state) => state.order.orderId);
  const totalPrice = useSelector((state) => state.order.totalPrice);

  let orderItems = useSelector((state) => state.order.items);

  if (orderItems.length > 0 && menuItems.length > 0) {
    orderItems = orderItems.map((item) => {
      const mitem = menuItems.find((mitem) => mitem.id === item.product_id);

      return {
        id: item.id,
        name: mitem.name,
        description: mitem.description,
        price: item.price * item.count,
        image: mitem.image,
        quantity: item.count,
      };
    });
  }

  // Functions
  function handleRequestCheck() {
    console.log("Check please!");
  }

  // Styles & Classes
  const containerClass = show ? "panel cart" : "panel cart hidden";

  const contentStyle = {
    height: window.innerHeight - 70,
  };

  const cartContentStyle = {
    maxHeight: window.innerHeight - 70,
  };

  // Renders
  const renderItems =
    orderItems.length > 0 ? (
      orderItems.map((item, index) => <OrderItem key={index} item={item} />)
    ) : (
      <></>
    );

  return (
    <div className={containerClass}>
      <div className="content-wrapper order" style={cartContentStyle}>
        <div className="panel-header order">
          <h2>Your current check</h2>
          <span>Order # {orderId}</span>
        </div>
        <div className="order-table-headers">
          <span id="name">Name</span>
          <span id="qty">Qty</span>
          <span id="total">Total</span>
        </div>
        <section className="order-items-wrapper">{renderItems}</section>
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
          onClick={() => handleRequestCheck()}
        >
          Request check
        </button>
      </div>
    </div>
  );
}

export default Order;
