import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import CategoriesWrapper from "./CategoriesWrapper";
import { get } from "../lib/fetch";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../app/restaurantSlice";
import { set as setCurrency } from "../app/currencySlice";
import { set as setMenu } from "../app/menuSlice";
import CategorySkeleton from "./Skeletons/CategorySkeleton";
import MenuSkeleton from "./Skeletons/MenuSkeleton";

function Content({ toggleSubheader, showDetails }) {
  const products = useSelector((state) => state.menu);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const queryParameters = new URLSearchParams(window.location.search);
  const restId = queryParameters.get("restid");
  const tableNo = queryParameters.get("table");

  //Redux data handlers
  const dispatch = useDispatch();

  const currency = useSelector((state) => state.currency);

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
    let products = [];
    let set = new Set([]);

    if (currentCategory) {
      arr = arr.filter((item) => item.category === currentCategory);
    }

    arr.forEach((item) => {
      const category = categories.find((cat) => cat.id === item.category);

      if (category) {
        if (!set.has(item.category)) {
          set.add(category.name);
          products.push({
            name: category.name,
            items: [{ ...item }],
          });
        } else {
          products[products.length - 1].items.push({ ...item });
        }
      }
    });

    return products;
  };

  // Fetch data
  // eslint-disable-next-line
  const loadRestaurantInfo = async (id, table) => {
    const restaurant = await get(`/client/restaurants/${id}`);
    // Find current restaurant and return it's data
    if (restaurant) {
      dispatch(
        set({
          id: parseInt(restaurant.id),
          name: restaurant.name,
          address: restaurant.address,
          menu: parseInt(restaurant.menu),
          table: table,
        })
      );

      // Load current menu
      await loadProducts(restaurant.menu);
    } else {
      console.log("Fetching error.");
    }
  };

  const loadProducts = async (menuId) => {
    const dataFetch = async (menuId) => {
      const menuData = await get(`/client/menus/${menuId}`);
      // Set currency if it's still null
      if (!currency.char_code && menuData) {
        dispatch(setCurrency(menuData.currency));
      }

      // Set categories
      const categories = Object.values(menuData.categories);
      setCategories(categories);

      dispatch(setMenu(menuData.items));
      return menuData;
    };

    await dataFetch(menuId);
  };

  // Side effects
  useEffect(() => {
    loadRestaurantInfo(restId, tableNo);
    // eslint-disable-next-line
  }, []);

  // Rerender component if currentCategory changes
  useEffect(() => {
    // eslint-disable-next-line
  }, [currentCategory]);

  useEffect(() => {
    window.addEventListener("resize", handleHeightChange);
    return () => {
      window.removeEventListener("resize", handleHeightChange);
    };
  }, [windowHeight]);

  // Render lists
  const renderCategories =
    categories?.length > 0 ? (
      categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          data={cat}
          handleCategorySelection={handleCategorySelection}
          currentCategory={currentCategory}
        />
      ))
    ) : (
      <CategorySkeleton />
    );

  const renderCards =
    products?.items?.length > 0 && categories?.length > 0 ? (
      productsByCats(products.items).map((cat) => {
        return (
          <div key={cat.name} className="category-wrapper">
            <h2>{cat.name}</h2>
            {cat.items &&
              cat.items.map((prod) => {
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
      <>
        <MenuSkeleton />
      </>
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
