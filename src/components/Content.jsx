import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const dishes = [52767, 53063, 52769];

function Content() {
  // set loading to true initially
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const loadPictures = async () => {
    const productsArr = [];

    const dataFetch = async (item, productsArr) => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`
      );
      const data = await response.json();
      productsArr.push(data.meals[0]);
    };

    await dataFetch(dishes[0], productsArr);
    await dataFetch(dishes[1], productsArr);
    await dataFetch(dishes[2], productsArr);

    setProducts(productsArr);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPictures();
  }, []);

  const renderCards =
    products && products.length > 0 ? (
      products.map((prod) => <ProductCard key={prod.idMeal} data={prod.data} />)
    ) : (
      <>Loading...</>
    );

  return (
    <main>
      <div className="cards-wrapper">{renderCards}</div>
    </main>
  );
}

export default Content;
