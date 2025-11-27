import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../api/woocommerce";
import { mapProduct } from "../../utils/mapProduct";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await getProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  data: [],
  totalPages: 1,
  total: 0,
};

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      // action.payload expected { items, totalPages, total } or legacy array/object
      if (!action.payload) {
        state.data = [];
        state.totalPages = 1;
        state.total = 0;
        return;
      }

      if (Array.isArray(action.payload)) {
        state.data = action.payload.map((p) => mapProduct(p));
        state.totalPages = 1;
        state.total = state.data.length;
        return;
      }

      // payload with items + metadata
      if (action.payload.items) {
        state.data = action.payload.items.map((p) => mapProduct(p));
        state.totalPages = action.payload.totalPages || 1;
        state.total = action.payload.total || state.data.length;
        return;
      }

      // fallback: payload keyed by categories
      const normalized = {};
      for (const key in action.payload) {
        if (Array.isArray(action.payload[key])) {
          normalized[key] = action.payload[key].map((p) => mapProduct(p));
        } else {
          normalized[key] = action.payload[key];
        }
      }
      state.data = normalized;
      state.totalPages = 1;
      state.total = Array.isArray(normalized) ? normalized.length : 0;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default ProductsSlice.reducer;
