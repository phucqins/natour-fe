/* eslint-disable */
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authActions } from "../store/index";
import { showAlert } from "../utils/utils";

import Helmet from "../components/Helmet";

const Login = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const nameInputRef = useRef();
  const navigate = useNavigate();

  // const isAuth = useSelector((state) => state.authentication.isLoggedIn);

  const [isLoading, setIsLoading] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);

  const createAccountHandler = () => {
    setCreateAccount((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;

      const data = createAccount
        ? {
            name: nameInputRef.current.value,
            email,
            password,
            passwordConfirm: confirmPasswordInputRef.current.value,
          }
        : {
            email,
            password,
          };

      const url = `https://phucnq-natour.herokuapp.com/api/v1/users/${
        createAccount ? "signup" : "login"
      }`;

      setIsLoading(true);
      const res = await axios({
        method: "POST",
        url,
        data,
      });
      if (res.data.status === "success") {
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        dispatch(
          authActions.login({
            user: res.data.data.user,
            token: res.data.token,
          })
        );
        showAlert("success", "Logged in successfully!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
    } catch (err) {
      setIsLoading(false);
      showAlert("error", err.response.data.message);
    }
  };

  return (
    <Helmet title={createAccount ? "Create Account" : "Login"}>
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">
            {createAccount ? "Create new account" : "Log into your account"}
          </h2>
          <form className="form form--login" onSubmit={submitHandler}>
            {createAccount && (
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form__input"
                  id="name"
                  name="name"
                  required="required"
                  type="text"
                  ref={nameInputRef}
                />
              </div>
            )}
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                placeholder="you@example.com"
                required="required"
                ref={emailInputRef}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="password">
                Password
              </label>
              <input
                className="form__input"
                id="password"
                type="password"
                placeholder="••••••••"
                required="required"
                minLength="8"
                ref={passwordInputRef}
              />
            </div>
            {createAccount && (
              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  className="form__input"
                  id="password-confirm"
                  minLength="8"
                  placeholder="••••••••"
                  required="required"
                  type="password"
                  ref={confirmPasswordInputRef}
                />
              </div>
            )}
            <div className="form__group center">
              {!createAccount ? (
                <>
                  <button className="btn btn--green">
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                  <p className="form__switch" onClick={createAccountHandler}>
                    Or Create account
                  </p>
                </>
              ) : (
                <>
                  <button className="btn btn--green">
                    {isLoading ? "Loading..." : "Create Account"}
                  </button>
                  <p className="form__switch" onClick={createAccountHandler}>
                    Have account ? Login
                  </p>
                </>
              )}
            </div>
          </form>
        </div>
      </main>
    </Helmet>
  );
};

export default Login;
