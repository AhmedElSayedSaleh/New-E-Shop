import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Bags,
  Shoes,
  Jewelry,
  ProductDetails,
  ProductsList,
  NotFound,
  Cart,
  Checkout,
  Password,
  Register,
  Login,
  Payment,
  ProtectedRoute,
  CategoryPage,
} from "../pages";
import { ScrollToTop } from "../components";

const Hero = () => {
  return (
    <>
      <main>
        <ScrollToTop>
          <Routes>
            <Route path={"*"} element={<NotFound />} />

            <Route path={"/"} element={<Home />} exact />
            <Route path={"/bags"} element={<Bags />} />
            <Route path={"/shoes"} element={<Shoes />} />
            <Route path={"/jewelry"} element={<Jewelry />} />
            <Route path={"/category/:id"} element={<CategoryPage />} />
            <Route path={"/products"} element={<ProductsList />} />
            <Route path={"/product/:id"} element={<ProductDetails />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route
              path={"/checkout"}
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/payment"}
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />

            <Route
              path={"/register"}
              element={
                <ProtectedRoute isSignPage>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/login"}
              element={
                <ProtectedRoute isSignPage>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/password"}
              element={
                <ProtectedRoute isSignPage>
                  <Password />
                </ProtectedRoute>
              }
            />
            <Route path={"/logout"} element={<Navigate to="/" replace />} />
          </Routes>
        </ScrollToTop>
      </main>
    </>
  );
};

export default Hero;
