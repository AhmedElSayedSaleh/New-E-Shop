import React from "react";
import { Icon } from ".";

const ChooseUs = () => {
  return (
    <div className="choose-us">
      <div className="text-center pt-3 pb-2 choose-us__title">
        <h2>Why should you choose us?</h2>
      </div>
      <div className="row py-5">
        <div className="col-lg-3 col-md-6 text-lg-start text-center  px-5">
          <div className="my-4 mx-lg-0 mx-auto choose-us__icon">
            <Icon icon="free-shipping" size={"3rem"} disableFill />
          </div>
          <h4 className="py-4">Free Shipping</h4>
          <p>
            All purchases over $199 are eligible for free shipping via USPS
            First Class Mail.
          </p>
        </div>
        <div className="col-lg-3 col-md-6 text-lg-start text-center  px-5">
          <div className="my-4 mx-lg-0 mx-auto choose-us__icon">
            <Icon icon="payment" size={"3rem"} disableFill />
          </div>
          <h4 className="py-4">Easy Payments</h4>
          <p>
            All payments are processed instantly over a secure payment protocol.
          </p>
        </div>
        <div className="col-lg-3 col-md-6 text-lg-start text-center  px-5">
          <div className="my-4 mx-lg-0 mx-auto choose-us__icon">
            <Icon icon="guarantee" size={"3rem"} disableFill />
          </div>
          <h4 className="py-4">Money-Back Guarantee</h4>
          <p>
            If an item arrived damaged or you've changed your mind, you can send
            it back for a full refund.
          </p>
        </div>
        <div className="col-lg-3 col-md-6 text-lg-start text-center  px-5">
          <div className="my-4 mx-lg-0 mx-auto choose-us__icon">
            <Icon icon="materials" size={"3rem"} disableFill />
          </div>
          <h4 className="py-4">Finest Quality</h4>
          <p>
            Designed to last, each of our products has been crafted with the
            finest materials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
