import React from "react";
import { Icon } from ".";

function CartHeader(props) {
  return (
    <div className="row py-5 mb-5 cart-header">
      <div className="col-12 col-sm-6">
        <h3 className="cart-header__title">{props.title}</h3>
      </div>
      <div className="col-12 col-sm-6">
        <div className=" d-flex justify-content-end align-items-center">
          <div
            className={
              props.cartIcon
                ? "d-flex align-items-center justify-content-center cart-header__icon first-icon"
                : props.checkoutIcon
                ? "d-flex align-items-center justify-content-center cart-header__icon second-icon"
                : "d-flex align-items-center justify-content-center cart-header__icon"
            }
          >
            <Icon icon="cart" size={"1.7rem"} disableFill />
          </div>
          <span className="cart-header__line"></span>
          <div
            className={
              props.cartIcon
                ? "d-flex align-items-center justify-content-center cart-header__icon third-icon"
                : props.checkoutIcon
                ? "d-flex align-items-center justify-content-center cart-header__icon first-icon"
                : "d-flex align-items-center justify-content-center cart-header__icon"
            }
          >
            <Icon icon="delivery" size={"1.7rem"} disableFill />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartHeader;
