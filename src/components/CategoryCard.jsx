import React from "react";
import { serverUrl } from "../data/urls";

function CategoryCard({ data, currentCategory, handleCategorySelection }) {
  // Styles & Classes
  const imgClass =
    currentCategory === data.id ? "img-wrapper active" : "img-wrapper";

  return (
    <div className="card-cat" onClick={() => handleCategorySelection(data.id)}>
      <div className={imgClass}>
        <img src={serverUrl + data.image} alt="" loading="lazy" />
      </div>
      <span>{data.name}</span>
    </div>
  );
}

export default CategoryCard;
