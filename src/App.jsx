import { onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "./firebase/firebase";
import { Header, Hero, Footer } from "./layout";
import { setUserAuth } from "./store/slices/AuthSlice";
import { setUserCart } from "./store/slices/CartSlice";
import { setError } from "./store/slices/ErrorAlertSlice";

const App = () => {
  const errorMsg = useSelector((state) => state.errorAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    // authentication listener
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        const currentUser = {
          isAuth: true,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        dispatch(setUserAuth(currentUser));

        // Get user cart data from firebase to redux store
        get(child(ref(getDatabase()), `users/${currentUser.uid}/cart`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              // console.log(snapshot.val());
              dispatch(setUserCart(snapshot.val()));
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            dispatch(setError(error));
          });
      } else {
        // User is signed out
        dispatch(
          setUserAuth({
            isAuth: false,
          })
        );
        dispatch(
          setUserCart({ cartItems: [], totalCost: 0, totalQuantity: 0 })
        );
      }
    });
  }, [dispatch]);

  useEffect(() => {
    errorMsg &&
      toast.error(errorMsg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    return () => dispatch(setError(null));
  }, [errorMsg, dispatch]);

  return (
    <div className="min-vh-100 wrapper">
      <Header />
      <ToastContainer />
      <Hero />
      <Footer />
    </div>
  );
};

export default App;
