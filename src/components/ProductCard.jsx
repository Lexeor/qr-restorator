import React from "react";

function ProductCard(meal) {
  return (
    <article className="product-card">
      <img src={meal.strMealThumb} alt="" />
      <div className="card__body">{meal.strMeal}</div>
    </article>
  );
}

export default ProductCard;
