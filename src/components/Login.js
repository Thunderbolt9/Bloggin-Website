import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Form, Button } from "react-bootstrap";

export default function Login() {
  const { currentUser, login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  let ifErrorOccurred = false;

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      ifErrorOccurred = true;
      alert("Failed to Login");
    }

    if (!ifErrorOccurred) {
      navigate("/");
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="w-25 m-auto p-4 shadow mt-5">
        <h3 className="text-center">Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>
        <p className="text-center">
          Don't have an account,{" "}
          <a href="/register" style={{ textDecoration: "none" }}>
            Create one
          </a>
        </p>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>

      <p className="text-center mt-4">Or</p>

      <div className="text-center">
        <Button
          className="bg-white border-white shadow text-black"
          onClick={signInWithGoogle}
        >
          <img
            style={{ height: "1.5rem", marginRight: "0.5rem" }}
            src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20161128230037%21Google_%22G%22_Logo.svg"
            alt="google logo"
          />
          Sign in with Google
        </Button>
      </div>
    </>
  );
}
