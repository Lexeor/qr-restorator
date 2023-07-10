import React from "react";
import { useSelector } from "react-redux";
import { serverUrl } from "../data/urls";
import nullImage from "../assets/NullImage.png";
import Price from "./Price";
import BtnAddRemove from "./BtnAddRemove";

function ProductDetails({ show, toggleSubheader }) {
  // Redux section
  const product = useSelector((state) => state.selected.item);

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
          <BtnAddRemove item={product} mini={false} />
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
