import React, { useState, useRef } from "react";

function CategoriesWrapper({ children }) {
  const wrapperRef = useRef(null);
  const [positionLeft, setPositionLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  //Functions
  const handleScroll = () => {
    const el = wrapperRef.current;
    setPositionLeft(el.scrollLeft);
    setScrollWidth(el.scrollWidth);
  };

  //Classes & Styles
  const fadeClass = () => {
    let result = "fade-wrapper";
    if (positionLeft === 0) {
      result += " scrolled-left";
      return result;
    }
    if (
      wrapperRef &&
      scrollWidth - positionLeft === wrapperRef.current.offsetWidth
    ) {
      result += " scrolled-right";
    }
    return result;
  };

  return (
    <div className={fadeClass()}>
      <div
        className="categories-wrapper"
        ref={wrapperRef}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
}

export default CategoriesWrapper;
