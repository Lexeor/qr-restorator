import React from "react";

function Subheader({ show }) {
  const subheaderClass = show ? "subheader show" : "subheader";

  return <div className={subheaderClass}>Subheader</div>;
}

export default Subheader;
