import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  CarouselProvider,
  Slider,
  Slide,
  ImageWithZoom,
  Dot,
  Image,
} from "pure-react-carousel";
import {
  Breadcrumb,
  Button,
  Icon,
  ReviewCard,
  Newsletter,
  LoadingBox,
  MessageBox,
} from "../components";
import { ColorSelect, HeadNotice } from "../components/products";

import "pure-react-carousel/dist/react-carousel.es.css";
import {
  MaterialsImg,
  ReviewImg1,
  ReviewImg2,
  ReviewImg3,
} from "../assets/images";

import { fetchProducts } from "../store/slices/ProductsSlice";
import { addToCart } from "../store/slices/CartSlice";
import { auth } from "../firebase/firebase";

const ProductDetails = () => {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});

  const dispatch = useDispatch();
  const allProductsList = useSelector((state) => state.allProducts);
  const isAuthorized = useSelector((state) => state.userAuth.isAuth);
  const navigate = useNavigate();

  const { loading, error, data } = allProductsList;
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    for (const category in data) {
      data[category].map((item) =>
        item.id === +id
          ? setCurrentProduct({
              brand: item.brand,
              brandUrl: item.brand_url,
              category: item.category,
              codCountry: item.codCountry,
              currency: item.currency,
              rawPrice: item.raw_price,
              discount: item.discount,
              productId: item.id,
              primaryImage: item.image_url,
              isNew: item.is_new,
              likesCount: item.likes_count,
              model: item.model,
              name: item.name,
              currentPrice:
                item.current_price !== null
                  ? item.current_price
                  : item.raw_price,
              subcategory: item.subcategory,
              url: item.url,
              variationColor1: item.variation_0_color,
              variationImage1: item.variation_0_image,
              variationThumbnail1: item.variation_0_thumbnail,
              variationColor2: item.variation_1_color,
              variationImage2: item.variation_1_image,
              variationThumbnail2: item.variation_1_thumbnail,
            })
          : null
      );
    }
  }, [data, id]);

  const handleAddToCart = useCallback(
    (product) => {
      if (!isAuthorized) {
        navigate("/login");
        return;
      }

      dispatch(addToCart({ product: product, uid: auth.currentUser.uid }));
      toast.success("Product Added To Cart", {
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
    [dispatch, navigate, isAuthorized]
  );

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : Object.keys(currentProduct).length === 0 ? (
        <div
          className={
            "w-100 bg-dark d-flex align-items-center justify-content-center"
          }
          style={{ height: "200px" }}
        >
          <h2 className={"text-warning"}>Product Not Found</h2>
        </div>
      ) : (
        <div className="product-view pt-5">
          <div className="container">
            <div className="row">
              <Breadcrumb product={currentProduct} />
            </div>
            <div className="row pb-5">
              <div className="col-lg-6 pe-lg-5">
                <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={100}
                  totalSlides={
                    (currentProduct.primaryImage !== "" ? 1 : 0) +
                    (currentProduct.variationImage1 !== "" ? 1 : 0) +
                    (currentProduct.variationImage2 !== "" ? 1 : 0)
                  }
                >
                  <div className="row">
                    <div className="col-md-3">
                      <div className="carousel__dots">
                        <Dot slide={0}>
                          <Image src={currentProduct.primaryImage} />
                        </Dot>
                        <Dot
                          slide={1}
                          className={
                            currentProduct.variationThumbnail1 === ""
                              ? "d-none"
                              : ""
                          }
                        >
                          <Image src={currentProduct.variationThumbnail1} />
                        </Dot>
                        <Dot
                          slide={2}
                          className={
                            currentProduct.variationThumbnail2 === ""
                              ? "d-none"
                              : ""
                          }
                        >
                          <Image src={currentProduct.variationThumbnail2} />
                        </Dot>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <Slider>
                        <Slide index={0}>
                          <ImageWithZoom src={currentProduct.primaryImage} />
                        </Slide>
                        <Slide
                          index={1}
                          className={
                            currentProduct.variationThumbnail1 === ""
                              ? "d-none"
                              : ""
                          }
                        >
                          <ImageWithZoom
                            src={currentProduct.variationImage1}
                            alt={currentProduct.name}
                          />
                        </Slide>
                        <Slide
                          index={2}
                          className={
                            currentProduct.variationThumbnail2 === ""
                              ? "d-none"
                              : ""
                          }
                        >
                          <ImageWithZoom
                            src={currentProduct.variationImage2}
                            alt={currentProduct.name}
                          />
                        </Slide>
                      </Slider>
                    </div>
                  </div>
                </CarouselProvider>
              </div>
              <div className="col-lg-6 ps-5">
                <div
                  className={
                    "d-flex align-items-center justify-content-between"
                  }
                >
                  <div className={"product-view__notice"}>
                    <HeadNotice discount={currentProduct.discount}>
                      Discount
                    </HeadNotice>
                  </div>
                  <div className={"product-view__model"}>
                    Product ID:
                    <p>{currentProduct.model}</p>
                  </div>
                </div>
                <h2 className={"product-view__name py-3"}>
                  {currentProduct.name}
                </h2>
                <div className={"d-flex pb-4 product-view__price"}>
                  <span className={"product-view__price--current"}>
                    ${currentProduct.currentPrice}
                  </span>
                  <span
                    className={
                      currentProduct.discount !== 0
                        ? "product-view__price--raw"
                        : "d-none"
                    }
                  >
                    ${currentProduct.rawPrice}
                  </span>
                  {/* <span className={""}>({currentProduct.likes_count}) likes</span> */}
                </div>
                <div>
                  <p className={"product-view__subtitle"}>Color: </p>
                  <ColorSelect colorData={currentProduct} />
                </div>
                <div className={"product-view__quantity"}>
                  {/* <p className={"product-view__subtitle"}>Quantity:</p> */}
                  <div
                    className={
                      "d-flex align-items-center justify-content-around"
                    }
                  >
                    {/* <Quantity /> */}
                    <hr />
                    <Button
                      children={"Add to cart"}
                      type={"button"}
                      onClick={() => handleAddToCart(currentProduct)}
                    />
                    <ToastContainer />
                    <div
                      className={
                        "d-flex align-items-center justify-content-center product-view__quantity__icon"
                      }
                    >
                      <Icon icon="heart" size={"1.5rem"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5 pt-5 product-view__details">
              <nav className="d-flex justify-content-center">
                <div className="nav" id="nav-tab" role="tablist">
                  <button
                    className="product-view__details__tab active"
                    id="nav-description-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-description"
                    type="button"
                    role="tab"
                    aria-controls="nav-description"
                    aria-selected="true"
                  >
                    description
                  </button>
                  <button
                    className="product-view__details__tab"
                    id="nav-reviews-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-reviews"
                    type="button"
                    role="tab"
                    aria-controls="nav-reviews"
                    aria-selected="false"
                  >
                    reviews (3)
                  </button>
                </div>
              </nav>
              <div className="mt-5 pt-5 tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-description"
                  role="tabpanel"
                  aria-labelledby="nav-description-tab"
                >
                  <div className="product-view__details__description">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="text-center">
                          <Icon icon="description" size={"5rem"} />
                          <div className="py-5 w-75 mx-auto">
                            <h4 className="py-4">
                              Details and product description
                            </h4>
                            <div className="mt-4">
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
                              </p>
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Deleniti, repellat.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="text-center">
                          <Icon icon="outline" size={"5rem"} />
                          <div className="py-5 w-75 mx-auto">
                            <h4 className="py-4">Material(s) and care</h4>
                            <div className="mt-4">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing.
                              </p>
                              <p>
                                <img src={MaterialsImg} alt="" />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-reviews"
                  role="tabpanel"
                  aria-labelledby="nav-reviews-tab"
                >
                  <div className="product-view__details__reviews">
                    <div className="row">
                      <div className="col-lg-6 pt-4">
                        <div className="row">
                          <div className="col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="text-center">
                              <h2 className="product-view__details__reviews__rate">
                                4.5
                              </h2>
                              <div>
                                <Icon
                                  icon="star-full"
                                  size={"1.4rem"}
                                  className="mx-1 product-view__details__reviews__star"
                                />
                                <Icon
                                  icon="star-full"
                                  size={"1.4rem"}
                                  className="mx-1 product-view__details__reviews__star"
                                />
                                <Icon
                                  icon="star-full"
                                  size={"1.4rem"}
                                  className="mx-1 product-view__details__reviews__star"
                                />
                                <Icon
                                  icon="star-full"
                                  size={"1.4rem"}
                                  className="mx-1 product-view__details__reviews__star"
                                />
                                <Icon
                                  icon="star-half"
                                  size={"1.4rem"}
                                  className="mx-1 product-view__details__reviews__star"
                                />
                              </div>
                              <div className="d-flex align-items-center justify-content-center mt-3">
                                <Icon icon="profile" size={"1rem"} />
                                <p className="mb-0 ps-2 product-view__details__reviews__opinions">
                                  81 all opinions
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="d-flex align-items-center mt-3">
                              <Icon
                                icon="star-full"
                                size={"1.3rem"}
                                className="product-view__details__reviews__star"
                              />
                              <div className="product-view__details__reviews__progress">
                                <div
                                  className="text-center"
                                  style={{ width: "3rem" }}
                                >
                                  <p className="mb-0">1</p>
                                </div>
                                <div
                                  className="progress product-view__details__reviews__progress__line"
                                  style={{ height: "2px" }}
                                >
                                  <div
                                    className="progress-bar product-view__details__reviews__progress__bar"
                                    role="progressbar"
                                    style={{ width: "0%" }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mt-3">
                              <Icon
                                icon="star-full"
                                size={"1.3rem"}
                                className="product-view__details__reviews__star"
                              />
                              <div className="product-view__details__reviews__progress">
                                <div
                                  className="text-center"
                                  style={{ width: "3rem" }}
                                >
                                  <p className="mb-0">2</p>
                                </div>
                                <div
                                  className="progress product-view__details__reviews__progress__line"
                                  style={{ height: "2px" }}
                                >
                                  <div
                                    className="progress-bar product-view__details__reviews__progress__bar"
                                    role="progressbar"
                                    style={{ width: "0%" }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mt-3">
                              <Icon
                                icon="star-full"
                                size={"1.3rem"}
                                className="product-view__details__reviews__star"
                              />
                              <div className="product-view__details__reviews__progress">
                                <div
                                  className="text-center"
                                  style={{ width: "3rem" }}
                                >
                                  <p className="mb-0">3</p>
                                </div>
                                <div
                                  className="progress product-view__details__reviews__progress__line"
                                  style={{ height: "2px" }}
                                >
                                  <div
                                    className="progress-bar product-view__details__reviews__progress__bar"
                                    role="progressbar"
                                    style={{ width: "15%" }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mt-3">
                              <Icon
                                icon="star-full"
                                size={"1.3rem"}
                                className="product-view__details__reviews__star"
                              />
                              <div className="product-view__details__reviews__progress">
                                <div
                                  className="text-center"
                                  style={{ width: "3rem" }}
                                >
                                  <p className="mb-0">4</p>
                                </div>
                                <div
                                  className="progress product-view__details__reviews__progress__line"
                                  style={{ height: "2px" }}
                                >
                                  <div
                                    className="progress-bar product-view__details__reviews__progress__bar"
                                    role="progressbar"
                                    style={{ width: "30%" }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center mt-3">
                              <Icon
                                icon="star-full"
                                size={"1.3rem"}
                                className="product-view__details__reviews__star"
                              />
                              <div className="product-view__details__reviews__progress">
                                <div
                                  className="text-center"
                                  style={{ width: "3rem" }}
                                >
                                  <p className="mb-0">5</p>
                                </div>
                                <div
                                  className="progress product-view__details__reviews__progress__line"
                                  style={{ height: "2px" }}
                                >
                                  <div
                                    className="progress-bar product-view__details__reviews__progress__bar"
                                    role="progressbar"
                                    style={{ width: "80%" }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-5 pt-5">
                          <Button children={"ADD OPINION"} type={"button"} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="product-view__details__reviews__cards">
                          <ReviewCard
                            imgSrc={ReviewImg1}
                            title="John Deo1"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                          />
                          <ReviewCard
                            imgSrc={ReviewImg2}
                            title="John Deo2"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                          />
                          <ReviewCard
                            imgSrc={ReviewImg3}
                            title="John Deo3"
                            desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <Newsletter />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
