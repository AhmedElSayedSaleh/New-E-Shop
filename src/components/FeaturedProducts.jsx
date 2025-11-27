import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/slices/ProductsSlice";
import { SingleProduct } from "./products";
import { LoadingBox, MessageBox } from "./index";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const [modalView, setModalView] = useState({});

  const productsList = useSelector((state) => state.allProducts);
  const { loading, error, data } = productsList;

  useEffect(() => {
    // Fetch only 8 products for the home page
    dispatch(fetchProducts({ per_page: 8, page: 1 }));
  }, [dispatch]);

  const modalHandle = (product) => {
    setModalView(product);
  };

  return (
    <div className="featured-products py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h2 className="section-title mb-3">منتجاتنا المميزة</h2>
            <p className="text-muted">اكتشف أحدث المنتجات المتوفرة لدينا</p>
          </div>
        </div>

        <div className="row">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : data && data.length > 0 ? (
            data.slice(0, 8).map((product) => (
              <div
                key={product.productId}
                className="col-lg-3 col-md-4 col-sm-6 my-4"
              >
                <SingleProduct
                  product={product}
                  modalHandle={modalHandle}
                  modalView={modalView}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">لا توجد منتجات متاحة حالياً</p>
            </div>
          )}
        </div>

        {data && data.length > 0 && (
          <div className="row mt-4">
            <div className="col-12 text-center">
              <Link to="/products" className="btn btn-primary btn-lg px-5">
                عرض جميع المنتجات
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
