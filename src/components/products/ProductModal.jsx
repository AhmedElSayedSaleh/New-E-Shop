import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "..";
import { addToCart } from "../../store/slices/CartSlice";
import { ColorSelect } from ".";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../firebase/firebase";

import "react-toastify/dist/ReactToastify.css";

const ProductModal = ({ modalView }) => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.userAuth.isAuth);
  const navigate = useNavigate();

  const handleAddToCart = useCallback(
    (product) => {
      if (!isAuthorized) {
        const modalEl = document.querySelector("#exampleModal");
        const backdrop = document.querySelector(".modal-backdrop");
        if (modalEl) modalEl.classList.remove("show");
        if (backdrop) backdrop.remove();
        navigate("/login");
        return;
      }

      dispatch(addToCart({ product: product, uid: auth.currentUser.uid }));
      toast.success("Product added to cart", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        theme: "dark",
      });
    },
    [dispatch, isAuthorized, navigate]
  );

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className={"d-flex justify-content-start pb-3"}>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <img
                  loading="lazy"
                  className={"w-100 product__head__img"}
                  src={modalView.primaryImage}
                  alt={modalView.name}
                />
              </div>
              <div className="col-12 col-lg-6">
                <div>
                  <h2 className="modal-title" id="exampleModalLabel">
                    {modalView.name}
                  </h2>
                  <div className={"d-flex py-4"}>
                    <Link
                      className={"product-modal__link"}
                      onClick={() => {
                        const body = document.body;
                        const backdrop =
                          document.querySelector(".modal-backdrop");
                        if (backdrop) backdrop.remove();
                        body.classList.remove("modal-open");
                        body.style.overflow = "auto";
                        body.style.paddingRight = "0";
                      }}
                      to={`/product/${modalView.productId}`}
                      aria-label="Close"
                    >
                      <p>View full details</p>
                    </Link>
                  </div>
                  <div className={"d-flex"}>
                    <p>Price: </p>
                    <p className={"ps-3 product-modal__price"}>
                      {modalView.currentPrice}
                    </p>
                    <span className={"ps-2 product-modal__currency"}>$</span>
                  </div>
                  <ColorSelect colorData={modalView} />
                </div>
                <div className={"d-flex justify-content-center"}>
                  {/* <Quantity /> */}
                  <Button
                    children={"ADD TO CART"}
                    type={"button"}
                    onClick={() => handleAddToCart(modalView)}
                  />
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
