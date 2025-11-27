import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// components
import { SingleProduct } from "../components/products";
import { LoadingBox, MessageBox, Newsletter } from "../components";

import { fetchProducts } from "../store/slices/ProductsSlice";
import { mapProduct } from "../utils/mapProduct";

const CategoryPage = () => {
    const { id } = useParams(); // Category ID from URL
    const dispatch = useDispatch();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [modalView, setModalView] = useState({});

    const productsList = useSelector((state) => state.allProducts);
    const { loading, error, data } = productsList;

    useEffect(() => {
        if (id) {
            dispatch(fetchProducts({ category: id }));
        } else {
            // Fallback or fetch all
            dispatch(fetchProducts({}));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const mapped = data.map(mapProduct);
            setFilteredProducts(mapped);
        }
    }, [data]);

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
        </div>
    );
};

export default CategoryPage;
