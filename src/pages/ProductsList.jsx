import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import { SingleProduct } from "../components/products";
import { LoadingBox, MessageBox, Newsletter } from "../components";

// import { fetchBags } from "../store/slices/BagsSlice";
// import { fetchShoes } from "../store/slices/ShoesSlice";
// import { fetchJewelry } from "../store/slices/JewelrySlice";
import { fetchProducts } from "../store/slices/ProductsSlice";

const ProductsList = () => {
  const dispatch = useDispatch();
  const allProductsList = useSelector((state) => state.allProducts);

  // const bagsList = useSelector((state) => state.bagsProducts);
  // const shoesList = useSelector((state) => state.ShoesProducts);
  // const jewelryList = useSelector((state) => state.jewelryProducts);

  const [modalView, setModalView] = useState({});

  const { loading, error, data } = allProductsList;

  useEffect(() => {
    dispatch(fetchProducts());
    // dispatch(fetchBags());
    // dispatch(fetchShoes());
    // dispatch(fetchJewelry());
  }, [dispatch]);

  const modalHandle = (product) => {
    setModalView(product);
  };

  return (
    <div className={"container pt-5"}>
      <div className={"row"}>
        <div className="col-lg-12">
          {loading ? (
            <LoadingBox />
          ) : error ? ( //typeof data !== "object"
            <MessageBox>{error}</MessageBox>
          ) : (
            data && (
              <>
                <div className="row">
                  <div className="col-12 text-center">
                    <p className="h2 border-bottom border-top border-warning border-3 py-3 mx-md-auto w-25">
                      Bags
                    </p>
                  </div>
                  {data.bags.slice(0, 7).map((item) => {
                    let product = {
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
                    };

                    return (
                      <div
                        key={product.productId}
                        className="col-xl-3 col-lg-4 col-sm-6 my-4"
                      >
                        <SingleProduct
                          product={product}
                          modalHandle={modalHandle}
                          modalView={modalView}
                        />
                      </div>
                    );
                  })}

                  <div className="col-xl-3 col-lg-4 col-sm-6 my-4 d-flex align-items-center justify-content-center">
                    <Link to="/bags">
                      <p className="h2 border-bottom text-secondary">
                        See More
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 text-center">
                    <p className="h2 border-bottom border-top border-warning border-3 py-3 mx-md-auto w-25">
                      Shoes
                    </p>
                  </div>
                  {data.shoes.slice(0, 7).map((item) => {
                    let product = {
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
                    };

                    return (
                      <div
                        key={product.productId}
                        className="col-xl-3 col-lg-4 col-sm-6 my-4"
                      >
                        <SingleProduct
                          product={product}
                          modalHandle={modalHandle}
                          modalView={modalView}
                        />
                      </div>
                    );
                  })}

                  <div className="col-xl-3 col-lg-4 col-sm-6 my-4 d-flex align-items-center justify-content-center">
                    <Link to="/shoes">
                      <p className="h2 border-bottom text-secondary">
                        See More
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 text-center">
                    <p className="h2 border-bottom border-top border-warning border-3 py-3 mx-md-auto w-25">
                      Jewelries
                    </p>
                  </div>
                  {data.jewelry.slice(0, 7).map((item) => {
                    let product = {
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
                    };

                    return (
                      <div
                        key={product.productId}
                        className="col-xl-3 col-lg-4 col-sm-6 my-4"
                      >
                        <SingleProduct
                          product={product}
                          modalHandle={modalHandle}
                          modalView={modalView}
                        />
                      </div>
                    );
                  })}

                  <div className="col-xl-3 col-lg-4 col-sm-6 my-4 d-flex align-items-center justify-content-center">
                    <Link to="/jewelry">
                      <p className="h2 border-bottom text-secondary">
                        See More
                      </p>
                    </Link>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
      <div className="row">
        <Newsletter />
      </div>
    </div>
  );
};
export default ProductsList;
