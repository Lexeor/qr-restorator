import React from "react";

function ProductDetails({ show }) {
  const containerClass = show ? "panel product" : "panel product hidden";

  return (
    <div className={containerClass}>
      <div className="content-wrapper">
        <h2>Product details</h2>
      </div>
    </div>
  );
}

export default ProductDetails;
