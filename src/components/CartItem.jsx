import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/cartSlice";

function CartItem({ item }) {
  console.log(item);
  const dispatch = useDispatch();
  const quantityInCart = useSelector(
    (state) =>
      state.cart.itemsList.find((cartItem) => cartItem.id === item.id)?.quantity
  );

  const addHandler = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        id: item.id,
        price: 10,
        name: item.name,
        cover: item.cover,
      })
    );
  };

  const removeHandler = (e) => {
    e.stopPropagation();

    dispatch(
      removeFromCart({
        id: item.id,
        price: 10,
      })
    );
  };

  return (
    <article className="cart-item">
      <img src={item.cover} alt="" />
      <div className="cart-item-body">
        <h3 className="card-item-main">{item.name}</h3>
        <div className="total-row">
          <div className="btn-addRemove">
            <button onClick={removeHandler}>
              <i className="ri-subtract-line"></i>
            </button>
            <span className="current-qty">{quantityInCart}</span>
            <button onClick={addHandler}>
              <i className="ri-add-line"></i>
            </button>
          </div>
          <strong>${item.totalPrice}</strong>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
