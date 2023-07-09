import React from "react";
import { serverUrl } from "../data/urls";

function CategoryCard({ data, currentCategory, handleCategorySelection }) {
  const imgClass =
    currentCategory === data.category ? "img-wrapper active" : "img-wrapper";

  return (
    <div
      className="card-cat"
      onClick={() => handleCategorySelection(data.name)}
    >
      <div className={imgClass}>
        <img src={serverUrl + data.cover} alt="" loading="lazy" />
      </div>
      <span>{data.name}</span>
    </div>
  );
}

export default CategoryCard;
