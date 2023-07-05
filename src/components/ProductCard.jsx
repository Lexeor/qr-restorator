import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/cartSlice";

function ProductCard({ data, toggleSubheader }) {
  const dispatch = useDispatch();
  const quantityInCart = useSelector(
    (state) =>
      state.cart.itemsList.find((item) => item.id === data.idMeal)?.quantity
  );

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
          {!quantityInCart ? (
            <button
              className="btn-add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.idMeal,
                    price: 10,
                    name: data.strMeal,
                    cover: data.strMealThumb,
                  })
                )
              }
            >
              <i className="ri-add-line"></i>
            </button>
          ) : (
            <div className="btn-addRemove">
              <button
                onClick={() =>
                  dispatch(
                    removeFromCart({
                      id: data.idMeal,
                      price: 10,
                    })
                  )
                }
              >
                <i className="ri-subtract-line"></i>
              </button>
              <span className="current-qty">{quantityInCart}</span>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: data.idMeal,
                      price: 10,
                      name: data.strMeal,
                      cover: data.strMealThumb,
                    })
                  )
                }
              >
                <i className="ri-add-line"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
