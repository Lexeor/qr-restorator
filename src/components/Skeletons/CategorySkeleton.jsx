import React from "react";

function CategorySkeleton() {
  const arr = [0, 1, 2, 3];

  const renderArray = arr.map((item) => (
    <div key={item} className="skeleton-category-wrapper">
      <div className="skeleton-category skeleton"></div>
      <div className="skeleton-category-title skeleton"></div>
    </div>
  ));

  return <>{renderArray}</>;
}

export default CategorySkeleton;
