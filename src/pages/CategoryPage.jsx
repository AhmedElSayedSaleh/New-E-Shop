import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// components
import { SingleProduct } from "../components/products";
import { LoadingBox, MessageBox, Newsletter } from "../components";

import { fetchProducts } from "../store/slices/ProductsSlice";
import { mapProduct } from "../utils/mapProduct";
import Pagination from "../components/Pagination";

const CategoryPage = () => {
  const { id } = useParams(); // Category ID from URL
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalView, setModalView] = useState({});

  const productsList = useSelector((state) => state.allProducts);
  const { loading, error, data, totalPages: storeTotalPages } = productsList;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = { per_page: 12, page: currentPage };
    if (id) params.category = id;
    dispatch(fetchProducts(params));
  }, [dispatch, id, currentPage]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const mapped =
        data.length > 0 && (data[0].productId || data[0].primaryImage)
          ? data
          : data.map(mapProduct);
      setFilteredProducts(mapped);
    }
  }, [data]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Modal
  const modalHandle = (product) => {
    setModalView(product);
  };

  return (
    <div className={"container pt-5"}>
      <div className={"row"}>
        <div className="col-lg-12">
          <div className="row">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox>{error}</MessageBox>
            ) : (
              filteredProducts &&
              filteredProducts.map((product) => {
                return (
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
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <Newsletter />
      </div>
      {storeTotalPages > 1 && (
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalPages={storeTotalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
