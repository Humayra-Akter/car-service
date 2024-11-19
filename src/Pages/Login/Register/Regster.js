import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./Register.css";
import banner1 from "../../../images/banner/banner1.jpg";

const Register = () => {
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
      alert("Profile updated successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <div
      className="register-container"
      style={{ backgroundImage: `url(${banner1})` }}
    >
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="form-input"
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              onChange={() => setAgree(!agree)}
              className="form-checkbox"
            />
            <label
              htmlFor="terms"
              className={`checkbox-label ${
                agree ? "text-primary" : "text-danger"
              }`}
            >
              I accept the <span>Terms & Conditions</span>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!agree || loading || updating}
          >
            {loading || updating ? "Processing..." : "Register"}
          </button>
          {error && <p className="error-message">{error.message}</p>}
          {updateError && (
            <p className="error-message">{updateError.message}</p>
          )}
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login" className="text-link">
            Login here
          </Link>
        </p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
