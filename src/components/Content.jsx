import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import axios from "../lib/fetch";

const dishes = [52767, 52867, 52793, 53043, 52876];

function Content({ toggleSubheader, showDetails }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  //Functions
  const handleCategorySelection = (category) => {
    if (category === currentCategory) {
      setCurrentCategory(null);
    } else {
      setCurrentCategory(category);
    }
  };

  // Fetch data
  const loadCategories = async () => {
    const dataFetch = async () => {
      const response = await axios(`/menu/categories/`);
      setCategories(response.data);
      return response;
    };

    await dataFetch();
  };

  const loadProducts = async () => {
    const dataFetch = async () => {
      const response = await axios(`/menu/`);
      setProducts(response.data);
      return response;
    };

    await dataFetch();
  };

  // Side effects
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [currentCategory]);

  // Render lists
  const renderCards =
    products && products.length > 0 ? (
      products.map((prod) => (
        <ProductCard
          key={prod.id}
          data={prod}
          toggleSubheader={toggleSubheader}
        />
      ))
    ) : (
      <>Loading...</>
    );

  const renderCategories =
    categories && categories.length > 0 ? (
      categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          data={cat}
          handleCategorySelection={handleCategorySelection}
          currentCategory={currentCategory}
        />
      ))
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
