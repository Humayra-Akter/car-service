import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import axios from "axios";
import "./Login.css";
import banner1 from "../../../images/banner/banner1.jpg";
import useToken from "../../../hooks/useToken";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  let errorElement;
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [token] = useToken(user);
  if (loading || sending) {
    return <Loading></Loading>;
  }

  if (token) {
    navigate(from, { replace: true });
  }

  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await signInWithEmailAndPassword(email, password);
  };

  const navigateRegister = (event) => {
    navigate("/register");
  };

  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    } else {
      toast("please enter your email address");
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${banner1})` }}
    >
      <div className=" login-box shadow-lg p-4 rounded">
        <PageTitle title="Login" />
        <h2 className="text-center text-primary mb-4">Welcome Back!</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              ref={emailRef}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passwordRef}
              type="password"
              placeholder="Enter password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Login
          </Button>
        </Form>

        {errorElement}

        <p className="text-center">
          New here?{" "}
          <Link
            to="/register"
            className="text-primary"
            onClick={navigateRegister}
          >
            Register Now
          </Link>
        </p>
        <p className="text-center">
          Forgot Password?{" "}
          <button
            className="btn btn-link text-primary p-0"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </p>

        <div className="social-login mt-3">
          <SocialLogin />
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
