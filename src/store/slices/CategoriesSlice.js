import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../api/woocommerce";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (arg, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const data = await getCategories();
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
};

const CategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default CategoriesSlice.reducer;
