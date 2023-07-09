import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import CategoriesWrapper from "./CategoriesWrapper";
import axios from "../lib/fetch";

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

  /** Parsing function.
   *  @input raw products array.
   *  @returns array filtered by category.
   */
  const productsByCats = (arr) => {
    let result = [];
    let set = new Set([]);

    if (currentCategory) {
      arr = arr.filter((item) => item.category.name === currentCategory);
    }

    arr.forEach((item) => {
      if (!set.has(item.category.name)) {
        set.add(item.category.name);
        result.push({
          name: item.category.name,
          items: [{ ...item }],
        });
      } else {
        result[result.length - 1].items.push({ ...item });
      }
    });
    return result;
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

  const renderCards =
    products && products.length > 0 ? (
      productsByCats(products).map((cat) => {
        return (
          <div className="category-wrapper" key={cat.name}>
            <h2>{cat.name}</h2>
            {cat.items.map((prod) => {
              return (
                <ProductCard
                  key={prod.id}
                  data={prod}
                  toggleSubheader={toggleSubheader}
                />
              );
            })}
          </div>
        );
      })
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
        <CategoriesWrapper>{renderCategories}</CategoriesWrapper>
        <div className="cards-wrapper">{renderCards}</div>
      </div>
    </main>
  );
}

export default Content;
