import React from 'react';
import Price from './Price';
import { useSelector } from 'react-redux';

function Order({show}) {

  // Redux data handlers
  const menuItems = useSelector((state) => state.menu.items);
  
  let orderItems = useSelector((state) => state.order.itemsList);

  if(orderItems.length > 0 && menuItems.length > 0) {
    orderItems = orderItems.map(item => {
      const mitem = menuItems.find(mitem => mitem.id === item.id);
      
      return ({
        id: item.id,
        name: mitem.name,
        description: mitem.description,
        price: mitem.price,
        image: mitem.image,
        quantity: item.quantity,
      })});
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
  const renderItems = orderItems.length > 0 ?
  (orderItems.map((item, index) => (
    <div key={index}>{item.name} {item.quantity}</div>
  ))) : (
    <></>
  );

  return (
    <div className={containerClass}>
      <div className="content-wrapper cart" style={cartContentStyle}>
          <div className="panel-header">
            <h2>Your current check</h2>
          </div>
          <section className="cart-items-wrapper">
            {renderItems}
            </section>
          <hr />
          <div className="totals">
            <div className="total-row">
              <span>Total</span>
              <strong>
                <Price>100</Price>
              </strong>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Order