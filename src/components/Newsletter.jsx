import React from "react";
import { Button, Input } from ".";
import { newsletterBg } from "../assets/images";

const Newsletter = () => {
  return (
    <div
      className="newsletter"
      style={{ backgroundImage: `url(${newsletterBg})` }}
    >
      <div className="d-flex align-items-center newsletter__overlay">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-lg-2 my-auto ps-0">
              <div className="d-flex align-items-center justify-content-center newsletter__discount">
                <span>-10%</span>
              </div>
            </div>
            <div className="col-md-9 col-lg-4 my-auto">
              <p className="newsletter__desc">
                Subscribe to our newsletter and receive exclusive offers every
                week
              </p>
            </div>
            <div className="col-md-8 col-lg-3 my-auto">
              <div className="newsletter__input">
                <Input type={"text"} placeholder={"Enter your email"} />
              </div>
            </div>
            <div className="col-md-4 col-lg-3 my-auto">
              <div className="newsletter__btn">
                <Button children={"get your discount"} type={"button"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
