import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/cartSlice";
import { serverUrl } from "../data/urls";
import nullImage from "../assets/NullImage.png";
import Price from "./Price";

function ProductCard({ data, toggleSubheader }) {
  const dispatch = useDispatch();
  const quantityInCart = useSelector(
    (state) =>
      state.cart.itemsList.find((item) => item.id === data.id)?.quantity
  );

  const vibrate = () => {
    // enable vibration support
    navigator.vibrate =
      navigator.vibrate ||
      navigator.webkitVibrate ||
      navigator.mozVibrate ||
      navigator.msVibrate;

    if (navigator.vibrate) {
      // vibration API supported
      navigator.vibrate(5);
    }
  };

  const addHandler = (e) => {
    e.stopPropagation();
    vibrate();

    dispatch(
      addToCart({
        id: data.id,
        price: data.price,
        name: data.name,
        cover: data.cover,
      })
    );
  };

  const removeHandler = (e) => {
    e.stopPropagation();
    vibrate();

    dispatch(
      removeFromCart({
        id: data.id,
        price: data.price,
      })
    );
  };

  return (
    <article className="product-card" onClick={() => toggleSubheader(data)}>
      <img
        src={data.cover ? serverUrl + data.cover : nullImage}
        alt=""
        loading="lazy"
      />
      <div className="card-body">
        <div className="card-header">
          <span className="type-span">{data.category.name}</span>
        </div>
        <h3 className="card-main">{data.name}</h3>
        <div className="card-footer">
          <span className="card-cost">
            <Price>{data.price}</Price>
          </span>
          {!quantityInCart ? (
            <button className="btn-add" onClick={addHandler}>
              <i className="ri-add-line"></i>
            </button>
          ) : (
            <div className="btn-addRemove">
              <button onClick={removeHandler}>
                <i className="ri-subtract-line"></i>
              </button>
              <span className="current-qty">{quantityInCart}</span>
              <button onClick={addHandler}>
                <i className="ri-add-line"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
