import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from ".";

// import "../styles/components/breadcrumb.scss";

function Breadcrumb({ product }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item breadcrumb-item-icon">
          <NavLink to="/">
            <Icon icon="home" size={"1.5rem"} />
          </NavLink>
        </li>
        <li className="breadcrumb-item">
          <NavLink to={`/${product.category}`}>{product.category}</NavLink>
        </li>
        <li className="breadcrumb-item">
          <NavLink to={`/${product.category}`}>{product.subcategory}</NavLink>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {product.name}
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
