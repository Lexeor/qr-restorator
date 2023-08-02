import React from "react";
import { useSelector } from "react-redux";
import { AutoTextSize } from "auto-text-size";

function Subheader({ show }) {
  const product = useSelector((state) => state.selected.item);

  const subheaderClass = show ? "subheader show" : "subheader";

  return (
    <div className={subheaderClass}>
      <AutoTextSize mode="oneline" minFontSizePx={10} maxFontSizePx={24}>
        {product ? product.name : ""}
      </AutoTextSize>
    </div>
  );
}

export default Subheader;
