import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, GoBackLink, Input } from "../../components";
import { auth } from "../../firebase/firebase";
import { setError } from "../../store/slices/ErrorAlertSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const checkBoxRef = useRef(null);
  const dispatch = useDispatch();

  const signUp = (e) => {
    e.preventDefault();
    checkBoxRef.current.checked &&
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          // Signed in
          console.log("Signed up successfully");
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch(setError(errorMessage));
        });
  };

  return (
    <>
      <div className="container my-3 py-5">
        <div className="row">
          <GoBackLink location="/products" children={"Back to store"} />
        </div>
        <div className="row align-items-center flex-column text-center pt-5 px-5 mx-5 mt-5">
          <div className="col-10 col-md-7 col-lg-5 col-xl-4">
            <h2 className="m-auto" style={{ fontSize: "2.2rem" }}>
              Create an account and discover the benefits
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-sm-9 col-lg-6">
            <form onSubmit={signUp}>
              <div className="mb-3">
                <Input type={"text"} placeholder={"First Name"} />
              </div>
              <div className="mb-3">
                <Input type={"text"} placeholder={"Last Name"} />
              </div>
              <div className="mb-3">
                <Input
                  type={"email"}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <Input
                  type={"password"}
                  placeholder={"Password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="row my-4">
                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck"
                      ref={checkBoxRef}
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleCheck"
                      style={{ fontSize: "1.3rem" }}
                    >
                      I agree to the Google Terms of Service and Privacy Policy
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mx-auto">
                  <Button
                    children={"Sign up"}
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
            <div className="text-center my-4">
              <Link
                to={"/login"}
                className="text-black text-decoration-underline"
                role="button"
                style={{ fontSize: "1.3rem" }}
              >
                Are you already a member?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
