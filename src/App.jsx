import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Cart from "./components/Cart";
import Order from "./components/Order";
import ProductDetails from "./components/ProductDetails";
import Subheader from "./components/Subheader";
import Popup from "./components/Popup";

import { useSelector, useDispatch } from "react-redux";
import { set } from "./app/selectedSlice";
import { toggle } from "./app/popupSlice";

function App() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const cartItems = useSelector((state) => state.cart.itemsList);
  const showPopup = useSelector((state) => state.popup.show);

  // Functions
  function toggleShowCart() {
    setShowOrder(false);
    setShowCart((prev) => !prev);
  }

  function toggleShowOrder() {
    setShowCart(false);
    setShowOrder((prev) => !prev);
  }

  function toggleSubheader(data = {}) {
    dispatch(set(data));
    setShowDetails((prev) => !prev);
  }

  function togglePopup() {
    dispatch(toggle());
  }

  return (
    <div className="App">
      <Header
        showCart={showCart}
        toggleShowCart={toggleShowCart}
        toggleShowOrder={toggleShowOrder}
      />
      <Subheader />
      <Content toggleSubheader={toggleSubheader} showDetails={showDetails} />
      <Cart show={showCart} items={cartItems} toggleShowCart={toggleShowCart} />
      <Order show={showOrder} toggleShowOrder={toggleShowOrder} />
      <ProductDetails show={showDetails} toggleSubheader={toggleSubheader} />
      <Popup
        show={showPopup}
        title="Order created"
        content={<div>Children</div>}
        togglePopup={togglePopup}
      />
    </div>
  );
}

export default App;
