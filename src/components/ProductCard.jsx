import React from "react";
import { serverUrl } from "../data/urls";
import nullImage from "../assets/NullImage.png";
import Price from "./Price";
import BtnAddRemove from "./BtnAddRemove";

function ProductCard({ data, toggleSubheader }) {
  return (
    <article className="product-card" onClick={() => toggleSubheader(data)}>
      <img
        src={data.image ? serverUrl + data.image : nullImage}
        alt=""
        loading="lazy"
      />
      <div className="card-body">
        <div className="card-header">
          <span className="type-span">{data.category.name}</span>
        </div>
        <h3 className="card-main">{data.name}</h3>
        <div className="card-footer">
          <span className="card-cost small">
            <Price>{data.price}</Price>
          </span>
          <BtnAddRemove item={data} />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
