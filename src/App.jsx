import { useState } from "react";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Cart from "./components/Cart";
import Subheader from "./components/Subheader";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  function toggleShowCart() {
    setShowCart((prev) => !prev);
  }

  function toggleSubheader() {
    setShowDetails((prev) => !prev);
  }

  return (
    <div className="App">
      <NavBar showCart={showCart} toggleShowCart={toggleShowCart} />
      <Subheader />
      <Content toggleSubheader={toggleSubheader} showDetails={showDetails} />
      <Cart show={showCart} />
    </div>
  );
}

export default App;
