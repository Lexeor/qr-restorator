import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import CategoriesWrapper from "./CategoriesWrapper";
import { get } from "../lib/fetch";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../app/restaurantSlice";
import { set as setCurrency } from "../app/currencySlice";

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
    let result = [];
    let set = new Set([]);

    console.log(arr);
    console.log("categories", categories);

    if (currentCategory) {
      arr = arr.filter((item) => item.category === currentCategory.id);
    }

    arr.forEach((item) => {
      const category = categories.find((cat) => cat.id === item.category);
      console.log(category);
      if (!set.has(item.category)) {
        set.add(category.name);
        result.push({
          name: category.name,
          items: [{ ...item }],
        });
      } else {
        result[result.length - 1].items.push({ ...item });
      }
    });
    console.log("result", result);
    return result;
  };

  // Fetch data
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

      setProducts(menuData);
      return menuData;
    };

    await dataFetch(menuId);
  };

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

      // Get current menu
      loadProducts(restaurant.menu);
      // And save it to state
      setCurrentMenu(restaurant.menu);
    } else {
      console.log("Fetching error.");
    }
  };

  // Side effects
  useEffect(() => {
    // loadCategories();
    loadRestaurantInfo(restId, tableNo);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentMenu) {
      loadProducts(currentMenu);
    }
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
          <div className="category-wrapper" key={cat.id}>
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
