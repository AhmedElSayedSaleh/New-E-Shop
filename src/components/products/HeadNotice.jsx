import React from "react";

function HeadNotice({ children, discount, isNew }) {
  if (discount) {
    return (
      <span
        className={
          discount !== 0 ? "head-notice head-notice--discount" : "d-none"
        }
      >
        {children}
      </span>
    );
  }
  return (
    <span className={isNew ? "head-notice head-notice--new" : "d-none"}>
      {children}
    </span>
  );
}

export default HeadNotice;
