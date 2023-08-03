import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../app/popupSlice";
import PaymentSelector from "./PaymentSelector";

const titles = {
  orderCreate: "Order created",
  orderReplenish: "Order replenished",
  checkConfirm: "Check request",
};

const contents = {
  orderCreate:
    "A waiter will come to you shortly to check and confirm your order.",
  orderReplenish:
    "A waiter will come to you shortly to check and confirm your order additions.",
  checkConfirm:
    "Please choose and confirm payment method below, after which our waiter will come to you to complete the payment.",
};

function Popup({ show = false }) {
  // Redux handlers
  const dispatch = useDispatch();

  const type = useSelector((state) => state.popup.type);

  // Functions
  const handleOkClick = () => {
    dispatch(closePopup());
  };

  const handleCancelClick = () => {
    dispatch(closePopup());
  };

  const handleConfirmCheckClick = () => {
    console.log("Check please!");
  };

  // Styles & Classes
  const layoutClass = show ? "popup-layout" : "popup-layout hidden";

  return (
    <div className={layoutClass}>
      <div className="popup-panel">
        {type && <h2>{titles[type]}</h2>}
        {type === "checkConfirm" ? (
          // Confirm check
          <>
            <div>{contents[type]}</div>
            <PaymentSelector />
            <div className="buttons-row">
              <button
                className="btn-outlined w-100"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className="btn-primary w-100"
                onClick={handleConfirmCheckClick}
              >
                Confirm
              </button>
            </div>
          </>
        ) : (
          // Order created / replenished
          <>
            {contents[type]}
            <button className="btn-primary w-100" onClick={handleOkClick}>
              OK
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
