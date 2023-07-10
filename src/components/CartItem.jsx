import React from "react";
import { serverUrl } from "../data/urls";
import nullImage from "../assets/NullImage.png";
import Price from "./Price";
import BtnAddRemove from "./BtnAddRemove";

function CartItem({ item }) {
  return (
    <article className="cart-item">
      <img src={item.cover ? serverUrl + item.cover : nullImage} alt="" />
      <div className="cart-item-body">
        <div className="card-item-main">
          <span>{item.name}</span>
          <strong>
            <Price>{item.totalPrice}</Price>
          </strong>
        </div>
        <BtnAddRemove item={item} />
      </div>
    </article>
  );
}

export default CartItem;
