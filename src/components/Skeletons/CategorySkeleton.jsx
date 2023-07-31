import React from "react";

function CategorySkeleton() {
  const arr = [0, 1, 2, 3];

  const renderArray = arr.map((item) => (
    <div className="skeleton-category-wrapper" key={item}>
      <div className="skeleton-category skeleton"></div>
      <div className="skeleton-category-title skeleton"></div>
    </div>
  ));

  return <>{renderArray}</>;
}

export default CategorySkeleton;
