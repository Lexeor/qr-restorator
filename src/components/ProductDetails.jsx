import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/cartSlice";

function ProductDetails({ show, toggleSubheader }) {
  const product = useSelector((state) => state.selected.item);
  const containerClass = show ? "panel product" : "panel product hidden";

  const dispatch = useDispatch();
  const quantityInCart = useSelector(
    (state) =>
      state.cart.itemsList.find((item) => item.id === product.idMeal)?.quantity
  );

  const addHandler = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        id: product.idMeal,
        price: 10,
        name: product.strMeal,
        cover: product.strMealThumb,
      })
    );
  };

  const removeHandler = (e) => {
    e.stopPropagation();

    dispatch(
      removeFromCart({
        id: product.idMeal,
        price: 10,
      })
    );
  };

  const productDetailsStyle = {
    height: window.innerHeight - 70 - 40 - 16 - 200 - 35 - 24 - 16,
  };

  return (
    <div className={containerClass}>
      <div className="content-wrapper product">
        <button
          className="btn-panel absolute"
          onClick={() => toggleSubheader()}
        >
          <i className="ri-close-line"></i>
        </button>
        <img
          src={product.strMealThumb}
          alt=""
          className="product-details-img"
        />
        <section className="product-details" style={productDetailsStyle}>
          {product.strInstructions}
        </section>
        <div className="product-dummy"></div>
        <section className="product-footer">
          <strong>$12</strong>
          {!quantityInCart ? (
            <button className="btn-primary" onClick={addHandler}>
              Add to order
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
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
