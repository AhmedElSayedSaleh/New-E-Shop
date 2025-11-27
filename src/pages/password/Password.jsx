import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button, GoBackLink, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../../store/slices/ErrorAlertSlice";

function Password() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
        navigate("/login");
      })

      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      });
  };

  return (
    <div className="container my-3 py-5">
      <div className="row">
        <GoBackLink location="/products" children={"Back to store"} />
      </div>
      <div className="row align-items-center flex-column text-center pt-5 px-5 mx-5 mt-5">
        <div className="col">
          <h2 className="m-auto" style={{ fontSize: "2.2rem" }}>
            Forgot your password?
          </h2>
        </div>
        <div className="col-md-8 col-lg-6">
          <p
            className="py-5 px-lg-5"
            style={{
              fontSize: "1.3rem",
              lineHeight: "2.5rem",
              color: "#7d7d7d",
            }}
          >
            {/* Enter your email or phone number and recover your account */}
            Enter your email and recover your account
          </p>
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-9 col-lg-6">
          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <Input
                type={"email"}
                placeholder={"Email"}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* <div className="mb-3 d-flex justify-content-between">
              <hr style={{ width: "33%" }}></hr>
              <span style={{ fontSize: "1.3rem", color: "#bebebe" }}>OR</span>
              <hr style={{ width: "33%" }}></hr>
            </div>
            <div className="mb-3">
              <Input type={"tel"} placeholder={"Phone number"} />
            </div> */}
            <div className="row">
              <div className="col-12 mx-auto">
                <Button
                  children={"Reset password"}
                  type={"submit"}
                  style={{
                    width: "100%",
                    textTransform: "none",
                    margin: "3rem 0 0 0",
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;
