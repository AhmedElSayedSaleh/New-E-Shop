import React from "react";
import { ChooseUs, MainSlider, Newsletter } from "../components";

const Home = () => {
  return (
    <div className={"home"}>
      <div className="home__slider">
        <MainSlider />
      </div>
      <div className=" pt-5 home__content">
        <div className={"container"}>
          <div className="row">
            <ChooseUs />
          </div>
          <div className="row">
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
