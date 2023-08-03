import React from "react";

function Popup({ show = false, title, content, togglePopup }) {
  // Styles & Classes
  const layoutClass = show ? "popup-layout" : "popup-layout hidden";

  return (
    <div className={layoutClass}>
      <div className="popup-panel">
        {title && <h2>{title}</h2>}
        {content}
        <button className="btn-primary w-100" onClick={togglePopup}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;
