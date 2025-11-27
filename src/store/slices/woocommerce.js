import axios from "axios";

const BASE_URL = "/api/wc";
const CONSUMER_KEY = "ck_3ac04076be898dba8fbdaa91879034809e54d698";
const CONSUMER_SECRET = "cs_98bd5dab841dae3c22487c523a15aa8e38fdab37";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
  },
});

export const getProducts = async (params = {}) => {
  // By default fetch a single page (faster). To fetch all pages set params.fetchAll = true
  const { fetchAll, per_page = 100, page = 1, ...rest } = params;

  if (!fetchAll) {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        per_page,
        page,
        ...rest,
      },
    });
    const totalPages = parseInt(response.headers["x-wp-totalpages"] || "1");
    const total = parseInt(response.headers["x-wp-total"] || "0");
    return {
      items: response.data,
      totalPages,
      total,
    };
  }

  // If fetchAll=true, iterate through pages
  let allProducts = [];
  let currentPage = page;
  let hasMore = true;
  while (hasMore) {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        per_page,
        page: currentPage,
        ...rest,
      },
    });

    allProducts = [...allProducts, ...response.data];

    const totalPages = parseInt(response.headers["x-wp-totalpages"] || "1");
    hasMore = currentPage < totalPages;
    currentPage++;
  }

  return {
    items: allProducts,
    totalPages:
      allProducts.length > 0 ? Math.ceil(allProducts.length / per_page) : 1,
    total: allProducts.length,
  };
};

export const getCategories = async (params = {}) => {
  const response = await api.get("/products/categories", { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`, {
    params: {
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
    },
  });
  return response.data;
};

export default api;
