import React from "react";

function ProductDetails({ show, toggleSubheader }) {
  const containerClass = show ? "panel product" : "panel product hidden";

  return (
    <div className={containerClass}>
      <div className="content-wrapper">
        <h2>Product details</h2>
        <button className="menu" onClick={() => toggleSubheader()}>
          <i className="ri-close-line"></i>
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
