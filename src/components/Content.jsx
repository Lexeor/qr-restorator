import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";

const dishes = [52767, 52867, 52793, 53043, 52876];

function Content() {
  // set loading to true initially
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const dataFetch = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      const data = await response.json();
      // productsArr.push(data.meals[0]);
      setCategories(data.categories);
    };

    await dataFetch();
  };

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
    await dataFetch(dishes[3], productsArr);
    await dataFetch(dishes[4], productsArr);

    setProducts(productsArr);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPictures();
    loadCategories();
  }, []);

  const renderCards =
    products && products.length > 0 ? (
      products.map((prod) => <ProductCard key={prod.idMeal} data={prod} />)
    ) : (
      <>Loading...</>
    );

  const renderCategories =
    categories && categories.length > 0 ? (
      categories.map((cat) => <CategoryCard key={cat.idCategory} data={cat} />)
    ) : (
      <>Loading...</>
    );

  return (
    <main>
      <div
        className="content-wrapper"
        style={{ height: window.innerHeight - 70 }}
      >
        <h2>Food Categories</h2>
        <div className="categories-wrapper">{renderCategories}</div>
        <h2>Popular</h2>
        <div className="cards-wrapper">{renderCards}</div>
      </div>
    </main>
  );
}

export default Content;
