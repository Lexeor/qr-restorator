import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/cartSlice";
import { serverUrl } from "../data/urls";
import nullImage from "../assets/NullImage.png";
import Price from "./Price";

function ProductDetails({ show, toggleSubheader }) {
  // Redux section
  const product = useSelector((state) => state.selected.item);
  const dispatch = useDispatch();

  const quantityInCart = useSelector(
    (state) =>
      state.cart.itemsList.find((item) => item.id === product.id)?.quantity
  );

  // Functions
  const addHandler = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        id: product.id,
        price: product.price,
        name: product.name,
        cover: product.cover,
      })
    );
  };

  const removeHandler = (e) => {
    e.stopPropagation();

    dispatch(
      removeFromCart({
        id: product.id,
        price: product.price,
      })
    );
  };

  // Styles & Classes
  const productPageStyle = {
    height: window.innerHeight - 70 - 40,
  };

  const containerClass = show ? "panel product" : "panel product hidden";

  return (
    <div className={containerClass}>
      <div className="content-wrapper product" style={productPageStyle}>
        <button
          className="btn-panel absolute"
          onClick={() => toggleSubheader()}
        >
          <i className="ri-close-line"></i>
        </button>
        <img
          src={product.cover ? serverUrl + product.cover : nullImage}
          alt=""
          className="product-details-img"
        />
        <section className="product-details">{product.description}</section>
        <section className="product-footer">
          <div className="price-container">
            <span>Price</span>
            <strong>
              <Price>{product.price}</Price>
            </strong>
          </div>
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
