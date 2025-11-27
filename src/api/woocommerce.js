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
    const response = await api.get("/products", { params });
    return response.data;
};

export const getCategories = async (params = {}) => {
    const response = await api.get("/products/categories", { params });
    return response.data;
};

export default api;
