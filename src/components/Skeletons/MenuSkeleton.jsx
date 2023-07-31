import React from "react";

function MenuSkeleton() {
  const arr = [
    [0, 1, 2],
    [3, 4],
  ];

  const renderArray = arr.map((cat, index) => (
    <div key={index} className="category-wrapper">
      <div className="skeleton-header skeleton"></div>
      {cat.map((item) => (
        <div key={item} className="skeleton-card skeleton"></div>
      ))}
    </div>
  ));

  return <>{renderArray}</>;
}

export default MenuSkeleton;
