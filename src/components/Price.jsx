import React from "react";
import { useSelector } from "react-redux";

function Price({ children }) {
  const currency = useSelector((state) => state.currency);

  // Render component
  const renderPrice = () => {
    if (currency.from_left) {
      return (
        <>
          {currency.sign}
          {currency.separated ? " " : ""}
          {children}
        </>
      );
    } else {
      return (
        <>
          {children}
          {currency.separated ? " " : ""}
          {currency.sign}
        </>
      );
    }
  };

  return <>{renderPrice()}</>;
}

export default Price;
