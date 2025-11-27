import React from "react";
import { Link } from "react-router-dom";

// components
import { Icon } from "..";
import { ProductModal, HeadNotice } from ".";

const SingleProduct = ({ product, modalHandle, modalView }) => {
  return (
    <div className={"single-product"}>
      <div className={"px-3 single-product__inner"}>
        <div className={"single-product__head"}>
          <Link to={`/product/${product.productId}`}>
            <img
              loading="lazy"
              className={"w-100 h-100 single-product__head__img"}
              src={product.primaryImage}
              alt={product.name}
            />
          </Link>
          <HeadNotice discount={product.discount}>
            {product.discount}%
          </HeadNotice>
          <HeadNotice isNew={product.isNew}>NEW</HeadNotice>
          <div className={"w-100 d-flex justify-content-center"}>
            <button
              type={"button"}
              className={"btn px-5 d-none single-product__btn"}
              onClick={() => modalHandle(product)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              QUICK SHOP
            </button>
          </div>
          {/*modal>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> here*/}

          <ProductModal modalView={modalView} />

          {/*modal>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> here*/}
        </div>
        <div className={"single-product__body py-3"}>
          <p className={"single-product__body__title"}>{product.name}</p>
          <div className={"d-flex justify-content-between"}>
            <div
              className={
                "d-flex justify-content-evenly single-product__body__price"
              }
            >
              <span
                className={
                  "d-inline-block pe-5 single-product__body__price__current"
                }
              >
                ${product.currentPrice}
              </span>
              <span
                className={
                  product.discount > 0
                    ? "text-decoration-line-through single-product__body__price__raw"
                    : "d-none"
                }
              >
                ${product.rawPrice}
              </span>
            </div>
            <div className={"single-product__body__likes"}>
              <Icon
                icon="heart"
                size={"2rem"}
                className={"me-3 single-product__body__likes__icon"}
              />
              <span className={"single-product__body__likes__count"}>
                ({product.likesCount})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
