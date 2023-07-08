import React from "react";
import { useSelector } from "react-redux";

function Subheader({ show }) {
  const product = useSelector((state) => state.selected.item);

  const subheaderClass = show ? "subheader show" : "subheader";

  return <div className={subheaderClass}>{product ? product.name : ""}</div>;
}

export default Subheader;
