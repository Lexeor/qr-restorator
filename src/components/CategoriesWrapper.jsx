import React, { useState, useEffect, useRef } from "react";

function CategoriesWrapper({ children }) {
  const wrapperRef = useRef(null);
  const [positionLeft, setPositionLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [currentWidth, setCurentWidth] = useState();
  console.log(positionLeft);
  console.log(scrollWidth);

  //Functions
  const handleScroll = () => {
    const el = wrapperRef.current;
    setPositionLeft(el.scrollLeft);
    setScrollWidth(el.scrollWidth);
  };

  // Side effects
  useEffect(() => {
    console.log(
      "width",
      wrapperRef.current ? wrapperRef.current.offsetWidth : 0
    );
  }, []);

  //Classes & Styles
  const wrapperClass =
    positionLeft === 0
      ? "categories-wrapper scrolled-left"
      : "categories-wrapper";

  return (
    <div className={wrapperClass} ref={wrapperRef} onScroll={handleScroll}>
      {children}
    </div>
  );
}

export default CategoriesWrapper;
