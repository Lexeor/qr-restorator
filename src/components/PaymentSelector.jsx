import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPaymentType } from "../app/orderSlice";

function PaymentSelector() {
  // Redux handlers
  const dispatch = useDispatch();
  const paymentType = useSelector((state) => state.order.paymentType);

  // Functions
  const handleSelection = (type) => {
    dispatch(setPaymentType(type));
  };

  // Styles & Classes
  const dummyStyle = paymentType === "cash" ? { width: "0" } : { width: "50%" };

  return (
    <div className="selector-body">
      <div className="selector-wrapper">
        <div className="selector-dummy" style={dummyStyle}></div>
        <div className="selector-selection"></div>
      </div>
      <div className="selector-items-wrapper">
        <div className="selector-item" onClick={() => handleSelection("cash")}>
          <i className="ri-cash-line"></i>
          <span>Cash</span>
        </div>
        <div className="selector-item" onClick={() => handleSelection("card")}>
          <i className="ri-bank-card-line"></i>
          <span>Card</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSelector;
