import React from "react";

function CategoryCard(props) {
  return (
    <div className="card-cat">
      <div className="img-wrapper">
        <img src={props.data.strCategoryThumb} alt="" loading="lazy" />
      </div>
      <span>{props.data.strCategory}</span>
    </div>
  );
}

export default CategoryCard;
