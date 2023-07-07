import React from "react";

function CategoryCard(props) {
  const imgClass =
    props.currentCategory === props.data.strCategory
      ? "img-wrapper active"
      : "img-wrapper";

  return (
    <div
      className="card-cat"
      onClick={() => props.handleCategorySelection(props.data.strCategory)}
    >
      <div className={imgClass}>
        <img src={props.data.strCategoryThumb} alt="" loading="lazy" />
      </div>
      <span>{props.data.strCategory}</span>
    </div>
  );
}

export default CategoryCard;
