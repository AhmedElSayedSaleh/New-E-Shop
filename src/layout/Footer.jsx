import React from "react";
import { BlackLogo } from "../assets/images";
import { Icon } from "../components";

const Footer = () => {
  return (
    <footer className={"mt-5 footer"}>
      <div className="container">
        <div className="row py-lg-5 flex-lg-row-reverse">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-4 text-center text-md-start">
                <div className="footer__list">
                  <h3>Shopping online</h3>
                  <ul>
                    <li>
                      <a href={"/#"}>Order Status</a>
                    </li>
                    <li>
                      <a href={"/#"}>Shipping and Delivery</a>
                    </li>
                    <li>
                      <a href={"/#"}>Returns</a>
                    </li>
                    <li>
                      <a href={"/#"}>Payment Options</a>
                    </li>
                    <li>
                      <a href={"/#"}>Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 text-center text-md-start">
                <div className="footer__list">
                  <h3>Information</h3>
                  <ul>
                    <li>
                      <a href={"/#"}>Gift Cards</a>
                    </li>
                    <li>
                      <a href={"/#"}>Find a store</a>
                    </li>
                    <li>
                      <a href={"/#"}>Newsletter</a>
                    </li>
                    <li>
                      <a href={"/#"}>Bacome a member</a>
                    </li>
                    <li>
                      <a href={"/#"}>Site feedback</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 text-center text-md-start">
                <div className="footer__list">
                  <h3>Contact</h3>
                  <ul>
                    <li>
                      <a href={"mailto:store@uikit.com"}>store@uikit.com</a>
                    </li>
                    <li>
                      <a href={"tel:+1 131 138 138"}>Hotline: +1 131 138 138</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 my-4 my-lg-0">
            <div className={"footer__logo"}>
              <a href={"/"}>
                <img src={BlackLogo} alt="" />
                <span>E-</span>Shop
              </a>
            </div>
            <div className="w-75 footer__desc">
              <p>
                House My Brand designs clothing for the young, the old &
                everyone in between – but most importantly, for the fashionable
              </p>
            </div>
            <div>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="facebook-logo"
                  size={"2rem"}
                  className={"me-4 footer__icon"}
                  disableFill={true}
                />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="twitter-logo"
                  size={"2rem"}
                  className={"me-4 footer__icon"}
                  disableFill={true}
                />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="linkedin-logo"
                  size={"2rem"}
                  className={"me-4 footer__icon"}
                  disableFill={true}
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="instagram-logo"
                  size={"2rem"}
                  className={"me-4 footer__icon"}
                  disableFill={true}
                />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="youtube-logo"
                  size={"2rem"}
                  className={"me-4 footer__icon"}
                  disableFill={true}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-4 d-flex justify-content-evenly footer__copyright">
        <h5>
          &copy; {new Date().getFullYear()}
          <span> E-</span>Shop
        </h5>
        <h5>All right reserved</h5>
      </div>
    </footer>
  );
};

export default Footer;
