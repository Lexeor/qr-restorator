import React from "react";

function ProductDetails({ show, toggleSubheader }) {
  const containerClass = show ? "panel product" : "panel product hidden";

  return (
    <div className={containerClass}>
      <div className="content-wrapper">
        <div className="panel-header">
          <h2>Product details</h2>
          <button className="btn-panel" onClick={() => toggleSubheader()}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <img src="" alt="" />
        <section className="product-details">Details here</section>
        <section className="product-footer">
          <span className="cost">$12</span>
          <button className="btn-primary">Add to order</button>
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
