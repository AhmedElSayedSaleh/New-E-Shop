import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBags = createAsyncThunk(
  "bags/fetchBags",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(
        "https://mocki.io/v1/a5793545-b761-4c37-b66b-4c06ea96a430"
      );
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
  data: null,
};

const BagsSlice = createSlice({
  name: "bags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBags.pending, (state) => {
      state.loading = true;
      // state.error = null;
      // state.data = [];
    });
    builder.addCase(fetchBags.fulfilled, (state, action) => {
      state.loading = false;
      // state.error = null;
      state.data = action.payload;
    });
    builder.addCase(fetchBags.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      // state.data = [];
    });
  },
});

// export const {} = BagsSlice.actions;

export default BagsSlice.reducer;
