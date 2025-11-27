import React from "react";
import { Link } from "react-router-dom";
import { Icon } from ".";

function GoBackLink(props) {
  return (
    <div className="my-auto">
      <Link
        to={props.location}
        className="text-black go-back-link"
        role="button"
      >
        <div className="d-inline-block go-back-link__icon">
          <Icon icon="arrow-left" size={"1.3rem"} disableFill />
        </div>
        <p className="mb-0 ps-5 d-inline-block">{props.children}</p>
      </Link>
    </div>
  );
}

export default GoBackLink;
