import React from "react";

function ProductCard({ data }) {
  return (
    <article className="product-card">
      <img src={data.strMealThumb} alt="" />
      <div className="card-body">
        <div className="card-header">
          <span className="type-span">{data.strCategory}</span>
        </div>
        <h3 className="card-main">{data.strMeal}</h3>
        <div className="card-footer">
          <span className="card-cost">$12</span>
          <button>+</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
