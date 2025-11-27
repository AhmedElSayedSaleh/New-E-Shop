import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleProduct } from "../components/products";
import { LoadingBox, MessageBox, Newsletter } from "../components";
import Pagination from "../components/Pagination";
import { fetchProducts } from "../store/slices/ProductsSlice";
import { fetchCategories } from "../store/slices/CategoriesSlice";
import { mapProduct } from "../utils/mapProduct";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalView, setModalView] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const productsPerPage = 12;

  const productsList = useSelector((state) => state.allProducts);
  const categoriesList = useSelector((state) => state.categories);
  const {
    loading,
    error,
    data,
    totalPages: storeTotalPages,
    total,
  } = productsList;
  const { data: categories } = categoriesList;

  useEffect(() => {
    // fetch categories once
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Fetch all products with category filter (fetchAll for price range calculation)
    const params = { fetchAll: true, per_page: 100 };
    if (selectedCategory !== "all") params.category = selectedCategory;
    dispatch(fetchProducts(params));
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    // Calculate min and max prices from all products
    if (data && Array.isArray(data) && data.length > 0) {
      const prices = data.map((product) =>
        parseFloat(product.currentPrice || product.price || 0) || 0
      ).filter(price => price > 0);

      if (prices.length > 0) {
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        setMinPrice(min);
        setMaxPrice(max);
        // Set initial price range only on first load
        if (priceRange[0] === 0 && priceRange[1] === 10000) {
          setPriceRange([min, max]);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    // Apply price filter on all products
    if (data && Array.isArray(data)) {
      let filtered = data.filter((product) => {
        const price =
          parseFloat(product.currentPrice || product.price || 0) || 0;
        return price >= priceRange[0] && price <= priceRange[1];
      });

      setFilteredProducts(filtered);
      // Reset to first page when filter changes
      setCurrentPage(1);
    } else {
      setFilteredProducts([]);
    }
  }, [data, priceRange]);

  const modalHandle = (product) => {
    setModalView(product);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page on category change
  };

  const handlePriceChange = (values) => {
    setPriceRange(values);
  };

  // Client-side pagination based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-lg-3 mt-4">
          <div className="filter-sidebar">
            <h3 className="filter-title mb-0">
              <i className="bi bi-funnel me-2"></i>
              الفلاتر
            </h3>

            <div className="accordion" id="filterAccordion">
              {/* Category Filter */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingCategory">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseCategory"
                    aria-expanded="true"
                    aria-controls="collapseCategory"
                  >
                    <i className="bi bi-grid-3x3-gap me-2"></i>
                    الأقسام
                  </button>
                </h2>
                <div
                  id="collapseCategory"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingCategory"
                  data-bs-parent="#filterAccordion"
                >
                  <div className="accordion-body">
                    <div className="category-filters">
                      <div
                        className={`category-filter-item ${
                          selectedCategory === "all" ? "active" : ""
                        }`}
                        onClick={() => handleCategoryChange("all")}
                      >
                        <span>جميع المنتجات</span>
                        {typeof total === "number" && (
                          <span className="count">{total}</span>
                        )}
                      </div>
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category) => (
                          <div
                            key={category.id}
                            className={`category-filter-item ${
                              selectedCategory === category.id.toString()
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handleCategoryChange(category.id.toString())
                            }
                          >
                            <span>{category.name}</span>
                            {category.count > 0 && (
                              <span className="count">{category.count}</span>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingPrice">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePrice"
                    aria-expanded="true"
                    aria-controls="collapsePrice"
                  >
                    <i className="bi bi-cash-stack me-2"></i>
                    السعر
                  </button>
                </h2>
                <div
                  id="collapsePrice"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingPrice"
                  data-bs-parent="#filterAccordion"
                >
                  <div className="accordion-body">
                    <div className="price-filter-content">
                      <div className="price-labels mb-3">
                        <span className="price-badge">{priceRange[0]} ج.م</span>
                        <span className="price-badge">{priceRange[1]} ج.م</span>
                      </div>
                      <Slider
                        range
                        min={minPrice}
                        max={maxPrice}
                        step={Math.max(1, Math.floor((maxPrice - minPrice) / 100))}
                        value={priceRange}
                        onChange={handlePriceChange}
                        railStyle={{
                          height: "4px",
                          backgroundColor: "#e0e0e0",
                        }}
                        trackStyle={[
                          { backgroundColor: "#fbb03b", height: "4px" },
                        ]}
                        handleStyle={[
                          {
                            borderColor: "#fbb03b",
                            backgroundColor: "#fbb03b",
                            opacity: 1,
                            width: 16,
                            height: 16,
                          },
                          {
                            borderColor: "#fbb03b",
                            backgroundColor: "#fbb03b",
                            opacity: 1,
                            width: 16,
                            height: 16,
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="products-header mb-4">
            <h2>
              {selectedCategory === "all"
                ? "جميع المنتجات"
                : categories?.find((c) => c.id.toString() === selectedCategory)
                    ?.name || "المنتجات"}
            </h2>
            <p className="text-muted">
              {filteredProducts.length} منتج
              {filteredProducts.length !== data?.length && data?.length > 0 && (
                <span className="ms-2">
                  (من أصل {data.length})
                </span>
              )}
            </p>
          </div>

          <div className="row">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox>{error}</MessageBox>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div
                  key={product.productId}
                  className="col-lg-4 col-md-6 col-sm-6 my-4"
                >
                  <SingleProduct
                    product={product}
                    modalHandle={modalHandle}
                    modalView={modalView}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 text-center my-5">
                <p className="h4 text-muted">لا توجد منتجات في هذا القسم</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-5 mb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <Newsletter />
      </div>
    </div>
  );
};

export default AllProducts;
