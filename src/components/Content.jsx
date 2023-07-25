import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import CategoriesWrapper from "./CategoriesWrapper";
import { get } from "../lib/fetch";
import { useDispatch } from "react-redux";
import { set } from "../app/restaurantSlice";

function Content({ toggleSubheader, showDetails }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const queryParameters = new URLSearchParams(window.location.search);
  const restId = queryParameters.get("restid");
  const tableNo = queryParameters.get("table");

  //Redux data handlers
  const dispatch = useDispatch();

  //Functions
  const handleCategorySelection = (category) => {
    if (category === currentCategory) {
      setCurrentCategory(null);
    } else {
      setCurrentCategory(category);
    }
  };

  const handleHeightChange = () => {
    setWindowHeight(window.innerHeight);
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
      const data = await get(`/menu/categories/`);
      setCategories(data);
      return data;
    };

    await dataFetch();
  };

  const loadProducts = async (menuId) => {
    const dataFetch = async (menuId) => {
      const params = { menu_id: menuId };
      const data = await get(`/menu/detail/`, params);
      console.log("menu", data);
      setProducts(data);
      return data;
    };

    await dataFetch(menuId);
  };

  // eslint-disable-next-line
  const loadRestaurantInfo = async (id, table) => {
    const data = await get(`/restaurants/`);
    // Find current restaurant and return it's data
    if (data) {
      const restData = data.find((item) => item.id === parseInt(id));

      dispatch(
        set({
          id: parseInt(restData.id),
          name: restData.name,
          address: restData.address,
          menu: parseInt(restData.menu),
          table: table,
        })
      );

      // Get current menu
      loadProducts(restData.menu);
      // And save it to state
      setCurrentMenu(restData.menu);
    } else {
      console.log("Fetching error.");
    }
  };

  // Side effects
  useEffect(() => {
    loadCategories();
    loadRestaurantInfo(restId, tableNo);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadProducts(currentMenu);
  }, [currentCategory]);

  useEffect(() => {
    window.addEventListener("resize", handleHeightChange);
    return () => {
      window.removeEventListener("resize", handleHeightChange);
    };
  }, [windowHeight]);

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
    products && products.items && products.items.length > 0 ? (
      productsByCats(products.items).map((cat) => {
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
