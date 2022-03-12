import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../index.css";

export default function Login() {
  const { login } = useAuth();
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  let ifErrorOccurred = false;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      ifErrorOccurred = true;
      alert("Failed to Login");
    }

    setIsLoading(false);

    if (!ifErrorOccurred) {
      navigate("/");
    }
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          alt="amazon-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>
        <form onSubmit={handleSubmit}>
          <h5>E-mail</h5>
          <input type="text" ref={emailRef} />

          <h5>Password</h5>
          <input type="password" ref={passwordRef} />

          <button
            disabled={isloading}
            className="login__signInButton"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <Link to="/register">
          <button className="login__registerButton">
            Create your Amazon Account
          </button>
        </Link>
      </div>
    </div>
  );
}
