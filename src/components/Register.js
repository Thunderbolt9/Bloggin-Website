import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const { registerUser, updateUserName } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  let ifErrorOccurred = false;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await registerUser(emailRef.current.value, passwordRef.current.value);
      await updateUserName(userNameRef.current.value);
    } catch {
      ifErrorOccurred = true;
      alert("Failed to create account!");
    }
    if (!ifErrorOccurred) {
      navigate("/");
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="w-25 m-auto p-4 shadow mt-5">
      <h3 className="text-center">Register</h3>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Enter full name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your full name"
          ref={userNameRef}
        />
      </Form.Group>

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
        Have an account,{" "}
        <a href="/login" style={{ textDecoration: "none" }}>
          Login
        </a>
      </p>
      <div className="text-center">
        <Button variant="primary" type="submit">
          Register
        </Button>
      </div>
    </Form>
  );
}
