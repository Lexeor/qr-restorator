import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import axios from "../lib/fetch";

const dishes = [52767, 52867, 52793, 53043, 52876];

function Content({ toggleSubheader, showDetails }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const dataFetch = async () => {
      const response = await axios(`/categories.php`);
      setCategories(response.data.categories);
      return response;
    };

    await dataFetch();
  };

  const loadPictures = async () => {
    const productsArr = [];

    const dataFetch = async (item, productsArr) => {
      const response = await axios(`/lookup.php?i=${item}`);
      productsArr.push(response.data.meals[0]);
      return response;
    };

    await dataFetch(dishes[0], productsArr);
    await dataFetch(dishes[1], productsArr);
    await dataFetch(dishes[2], productsArr);
    await dataFetch(dishes[3], productsArr);
    await dataFetch(dishes[4], productsArr);

    setProducts(productsArr);
  };

  useEffect(() => {
    loadPictures();
    loadCategories();
  }, []);

  const renderCards =
    products && products.length > 0 ? (
      products.map((prod) => (
        <ProductCard
          key={prod.idMeal}
          data={prod}
          toggleSubheader={toggleSubheader}
        />
      ))
    ) : (
      <>Loading...</>
    );

  const renderCategories =
    categories && categories.length > 0 ? (
      categories.map((cat) => <CategoryCard key={cat.idCategory} data={cat} />)
    ) : (
      <>Loading...</>
    );

  // Styles
  const mainStyle = showDetails
    ? { maxHeight: "calc(100vh - 110px)" }
    : { maxHeight: "calc(100vh - 70px)" };

  const contentStyle = showDetails
    ? { height: window.innerHeight - 110 }
    : { height: window.innerHeight - 70 };

  return (
    <main style={mainStyle}>
      <div className="content-wrapper" style={contentStyle}>
        <h2>Food Categories</h2>
        <div className="categories-wrapper">{renderCategories}</div>
        <h2>Popular</h2>
        <div className="cards-wrapper">{renderCards}</div>
      </div>
    </main>
  );
}

export default Content;
