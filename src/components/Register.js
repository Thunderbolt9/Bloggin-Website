import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../index.css";

export default function Register() {
  const { registerUser, updateUserName } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const [isloading, setIsLoading] = useState(false);
  let ifErrorOccurred = false;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await registerUser(emailRef.current.value, passwordRef.current.value);
      await updateUserName(userNameRef.current.value);
    } catch {
      ifErrorOccurred = true;
      alert("Failed to create account!");
    }
    setIsLoading(false);
    if (!ifErrorOccurred) {
      navigate("/");
    }
  }

  return (
    <div className="register">
      <Link to="/">
        <img
          className="register__logo"
          alt="amazon-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="register__container">
        <h1>Sign-up</h1>
        <form onSubmit={handleSubmit}>
          <h5>Username</h5>
          <input type="text" ref={userNameRef} required />

          <h5>E-mail</h5>
          <input type="email" ref={emailRef} required />

          <h5>Password</h5>
          <input type="password" ref={passwordRef} required />

          <button
            disabled={isloading}
            className="register__signUnButton"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <Link to="/login">
          <button className="register__signInButton">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
