import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, CartHeader, GoBackLink } from "../../components";
import { Quantity } from "../../components/products";
import { auth } from "../../firebase/firebase";
import { removeFromCart } from "../../store/slices/CartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalCost = useSelector((state) => state.cart.totalCost);
  const dispatch = useDispatch();

  const handleRemoveFromCart = useCallback(
    (item) =>
      dispatch(removeFromCart({ product: item, uid: auth.currentUser.uid })),
    [dispatch]
  );

  return (
    <div className="pb-5 cart">
      <div className="container">
        <CartHeader title={"Shopping Cart"} cartIcon />

        <div className="row justify-content-center align-items-center">
          {cartItems.length === 0 ? (
            <div className="col-12 text-center my-5 py-5 text-danger">
              <h3 className="cart__empty">Your cart is empty</h3>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-borderless cart__table">
                <thead className="cart__table__head">
                  <tr className="text-center">
                    <th className="text-start">Product</th>
                    <th>Color</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="cart__table__body">
                  {cartItems.map((item) => (
                    <tr
                      className="align-middle text-center cart__table__body__row"
                      key={item.productId}
                    >
                      <td className="grid-product">
                        <div className="d-flex align-items-center">
                          <img src={item.primaryImage} alt={item.name} />
                          <div className="text-start ps-5">
                            <h4>{item.name}</h4>
                            <p className="cart__table__body__row__id">
                              {item.model}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="my-auto grid-color">white</td>
                      <td className="my-auto grid-quantity">
                        <div className=" d-flex justify-content-center">
                          <Quantity
                            cartItemQuantity={item.quantity}
                            item={item}
                          />
                        </div>
                      </td>
                      <td className="my-auto grid-price">
                        ${item.totalPrice?.toFixed(2)}
                      </td>
                      <td className="my-auto grid-delete">
                        <div className="">
                          <Icon
                            icon="CANCEL"
                            size={"1.2rem"}
                            disableFill
                            role="button"
                            onClick={() => handleRemoveFromCart(item)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="row justify-content-center align-items-center mt-5 cart__check">
          <div
            className={
              cartItems.length !== 0 ? "col-12 col-md-6 col-lg-4" : "col-lg-12"
            }
          >
            <GoBackLink location={"/products"} children={"Continue Shopping"} />
            {/* <Link
              to={"/products"}
              // onClick={() => navigate(-1)}
              className="text-black cart__check__continue"
              role="button"
            >
              <div className="d-inline-block cart__check__continue__icon">
                <Icon icon="arrow-left" size={"1.3rem"} disableFill />
              </div>
              <p className="mb-0 ps-5 d-inline-block">Continue Shopping</p>
            </Link> */}
          </div>
          {cartItems.length !== 0 ? (
            <>
              <div className="col-12 col-md-6 col-lg-4 mt-3 mt-lg-0 d-flex justify-content-center">
                <input className="" type="text" placeholder="Promo Code" />
              </div>
              <div className="col-6 col-md-3 col-lg-2 mt-3 mt-lg-0 d-flex justify-content-between cart__check__total">
                <p className=" mb-0 cart__check__total__title">Total cost</p>
                <p className=" mb-0 cart__check__total__value">
                  ${totalCost.toFixed(2)}
                </p>
              </div>
              <div className="col-12 col-md-6 col-lg-2 mt-3 mt-lg-0 text-center">
                <Link to={"/checkout"}>
                  <p className="mb-0 ps-0 ps-lg-5 d-inline-block">
                    <Button children={"CHECKOUT"} type={"button"} />
                  </p>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
