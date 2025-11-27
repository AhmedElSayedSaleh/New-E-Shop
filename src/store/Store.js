// import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import thunk from "redux-thunk";

// import {
//   productsReducer,
//   bagsReducer,
//   jewelryReducer,
//   shoesReducer,
//   // productsFilteredReducer,
// } from "./reducers/productReducers";

// const reducers = combineReducers({
//   getProducts: productsReducer,
//   getBags: bagsReducer,
//   getJewelry: jewelryReducer,
//   getShoes: shoesReducer,
//   // productsFiltered: productsFilteredReducer,
// });

// const middleware = [thunk];

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   reducers,
//   {},
//   composeEnhancer(applyMiddleware(...middleware))
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./slices/ProductsSlice";
import BagsSlice from "./slices/BagsSlice";
import ShoesSlice from "./slices/ShoesSlice";
import JewelrySlice from "./slices/JewelrySlice";
import CategoriesSlice from "./slices/CategoriesSlice";
import CartSlice from "./slices/CartSlice";
import AuthSlice from "./slices/AuthSlice";
import ErrorAlertSlice from "./slices/ErrorAlertSlice";

const store = configureStore({
  reducer: {
    allProducts: ProductsSlice,
    bagsProducts: BagsSlice,
    shoesProducts: ShoesSlice,
    jewelryProducts: JewelrySlice,
    categories: CategoriesSlice,
    cart: CartSlice,
    userAuth: AuthSlice,
    errorAlert: ErrorAlertSlice,
  },
});

export default store;
