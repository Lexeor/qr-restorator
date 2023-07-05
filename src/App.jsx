import { useState } from "react";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Cart from "./components/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);

  function toggleShowCart() {
    setShowCart((prev) => !prev);
  }

  return (
    <div className="App">
      <NavBar showCart={showCart} toggleShowCart={toggleShowCart} />
      <Content />
      <Cart show={showCart} />
    </div>
  );
}

export default App;
