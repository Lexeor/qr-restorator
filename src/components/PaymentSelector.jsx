import React, { useState } from "react";

function PaymentSelector() {
  const [selected, setSelected] = useState(0);

  // Functions
  const handleSelection = (id) => {
    setSelected(id);
  };

  // Styles & Classes
  const dummyStyle = selected === 1 ? { width: "50%" } : { width: "0" };

  return (
    <div className="selector-body">
      <div className="selector-wrapper">
        <div className="selector-dummy" style={dummyStyle}></div>
        <div className="selector-selection"></div>
      </div>
      <div className="selector-items-wrapper">
        <div className="selector-item" onClick={() => handleSelection(0)}>
          <i className="ri-cash-line"></i>
          <span>Cash</span>
        </div>
        <div className="selector-item" onClick={() => handleSelection(1)}>
          <i className="ri-bank-card-line"></i>
          <span>Card</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSelector;
