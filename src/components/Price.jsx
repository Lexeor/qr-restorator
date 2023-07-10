import React from "react";
import { useSelector } from "react-redux";

function Price({ children }) {
  const currency = useSelector((state) => state.currency);

  // Render component
  const renderPrice = () => {
    if (currency.position === "left") {
      return (
        <>
          {currency.symbol}
          {currency.separated ? " " : ""}
          {children}
        </>
      );
    } else {
      return (
        <>
          {children}
          {currency.separated ? " " : ""}
          {currency.symbol}
        </>
      );
    }
  };

  return <>{renderPrice()}</>;
}

export default Price;
