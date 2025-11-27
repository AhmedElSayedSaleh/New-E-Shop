import React from "react";
import { Icon } from ".";

const ReviewCard = ({ imgSrc, title, desc }) => {
  return (
    <div className="mb-3" style={{ maxWidth: "540px" }}>
      <div className="row">
        <div className="col-md-1">
          <div style={{ width: "4rem", height: "4rem" }}>
            <img src={imgSrc} className="img-fluid rounded-circle" alt="..." />
          </div>
        </div>
        <div className="col-md-11">
          <div className="card-body pt-0">
            <h5 className="card-title mb-0">{title}</h5>
            <div>
              <Icon
                icon="star-full"
                size={"1rem"}
                className="me-1 product-view__details__reviews__star"
              />
              <Icon
                icon="star-full"
                size={"1rem"}
                className="me-1 product-view__details__reviews__star"
              />
              <Icon
                icon="star-full"
                size={"1rem"}
                className="me-1 product-view__details__reviews__star"
              />
              <Icon
                icon="star-full"
                size={"1rem"}
                className="me-1 product-view__details__reviews__star"
              />
              <Icon
                icon="star-half"
                size={"1rem"}
                className="me-1 product-view__details__reviews__star"
              />
            </div>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.2" }}>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
