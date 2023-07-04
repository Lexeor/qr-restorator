import React from "react";

function ProductCard({ data }) {
  console.log(data);
  return (
    <article className="product-card">
      <img src={data.strMealThumb} alt="" />
      <div className="card__body">{data.strMeal}</div>
    </article>
  );
}

export default ProductCard;
