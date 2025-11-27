import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/firebase";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
} from "../../store/slices/CartSlice";

const Quantity = ({ cartItemQuantity, item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(
    cartItemQuantity ? cartItemQuantity : 1
  );

  const handleIncrease = (item) => {
    setQuantity(quantity + 1);
    dispatch(
      increaseCartQuantity({ product: item, uid: auth.currentUser.uid })
    );
  };
  const handleDecrease = () => {
    if (quantity <= 1) {
      return;
    } else {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
    dispatch(
      decreaseCartQuantity({ product: item, uid: auth.currentUser.uid })
    );
  };

  return (
    <div
      className={"d-flex justify-content-between align-items-center quantity"}
    >
      <button
        onClick={() => handleDecrease(item)}
        type={"button"}
        className={
          quantity === 1
            ? "quantity__btn quantity__btn--light"
            : "quantity__btn"
        }
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => handleIncrease(item)}
        type={"button"}
        className={"quantity__btn"}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
