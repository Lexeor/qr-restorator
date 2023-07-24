import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/cartSlice";
import vibrate from "../utils/vibrate";

/**
 * Add/Remove button component
 * @param {object} [item] product item object.
 * @param {boolean} [mini=true] Size of single add button, when item is not presented at the cart. "True" by default.
 * @returns {JSX.Element}
 */
function BtnAddRemove({ item, mini = true }) {
  // Redux section
  const dispatch = useDispatch();
  const quantityInCart = useSelector(
    (state) => state.cart.itemsList.find((itm) => itm.id === item.id)?.quantity
  );

  // Functions
  const addHandler = (e) => {
    e.stopPropagation();
    vibrate();

    dispatch(
      addToCart({
        id: item.id,
        price: item.price,
        name: item.name,
        image: item.image,
      })
    );
  };

  const removeHandler = (e) => {
    e.stopPropagation();
    vibrate();

    dispatch(
      removeFromCart({
        id: item.id,
        price: item.price,
      })
    );
  };

  // Styles & Classes
  const buttonAdditiveClass = mini ? "" : " large";

  return !quantityInCart ? (
    !mini ? (
      <button className="btn-primary" onClick={addHandler}>
        Add to order
      </button>
    ) : (
      <button className="btn-add" onClick={addHandler}>
        <i className="ri-add-line"></i>
      </button>
    )
  ) : (
    <div className={`btn-addRemove${buttonAdditiveClass}`}>
      <button onClick={removeHandler}>
        <i className="ri-subtract-line"></i>
      </button>
      <span className="current-qty">{quantityInCart}</span>
      <button onClick={addHandler}>
        <i className="ri-add-line"></i>
      </button>
    </div>
  );
}

export default BtnAddRemove;
