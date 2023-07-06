import React from "react";
import { useSelector, useReducer } from "react-redux";

function ProductDetails({ show, toggleSubheader }) {
  const product = useSelector((state) => state.selected.item);
  const containerClass = show ? "panel product" : "panel product hidden";

  return (
    <div className={containerClass}>
      <button className="btn-panel absolute" onClick={() => toggleSubheader()}>
        <i className="ri-close-line"></i>
      </button>
      <img src={product.strMealThumb} alt="" className="product-details-img" />
      <div className="content-wrapper product">
        <section className="product-details">{product.strInstructions}</section>
        <section className="product-footer">
          <span className="cost">$12</span>
          <button className="btn-primary">Add to order</button>
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
