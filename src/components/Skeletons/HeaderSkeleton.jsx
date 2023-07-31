import React from "react";

function HeaderSkeleton() {
  return (
    <>
      <div className="skeleton-line  skeleton"></div>
      <div className="nav-location-place">
        <i className="ri-map-pin-fill"></i>
        <div className="skeleton-line  skeleton"></div>
      </div>
    </>
  );
}

export default HeaderSkeleton;
