import React from "react";

function Button({ children, type, version, isDisabled }) {
  return (
    <button className={`btn btn-${version}`} type={type} disabled={isDisabled}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "submit",
  version: "secondary",
  isDisabled: false,
};

export default Button;
