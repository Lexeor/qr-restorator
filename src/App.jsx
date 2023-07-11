import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import Subheader from "./components/Subheader";

import { useSelector, useDispatch } from "react-redux";
import { set } from "./app/selectedSlice";
import { fetchCurrency } from "./app/currencySlice";

function App() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const cartItems = useSelector((state) => state.cart.itemsList);

  // Functions
  function toggleShowCart() {
    setShowCart((prev) => !prev);
  }

  function toggleSubheader(data = {}) {
    dispatch(set(data));
    setShowDetails((prev) => !prev);
  }

  //Side effects
  useEffect(() => {
    dispatch(fetchCurrency());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <NavBar showCart={showCart} toggleShowCart={toggleShowCart} />
      <Subheader />
      <Content toggleSubheader={toggleSubheader} showDetails={showDetails} />
      <Cart show={showCart} items={cartItems} />
      <ProductDetails show={showDetails} toggleSubheader={toggleSubheader} />
    </div>
  );
}

export default App;
