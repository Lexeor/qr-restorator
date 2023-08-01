import React from "react";
import { serverUrl } from "../data/urls";
import nullImage from "../assets/NullImage.png";
import Price from "./Price";

function OrderItem({ item }) {
  return (
    <article className="order-item">
      <img src={item.image ? serverUrl + item.image : nullImage} alt="" />
      <div className="order-item-body">
        <div className="order-item-main">
          <strong>{item.name}</strong>
        </div>
        <span className="order-item-quantity">{item.quantity}</span>
        <strong className="order-item-price">
          <Price>{item.price}</Price>
        </strong>
      </div>
    </article>
  );
}

export default OrderItem;
