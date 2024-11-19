import React from "react";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa"; // Import icons
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import "./SocialLogin.css";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  let errorElement;

  if (loading || loading1) {
    return <Loading />;
  }

  if (error || error1) {
    errorElement = (
      <p className="text-danger text-center">
        Error: {error?.message || error1?.message}
      </p>
    );
  }

  if (user || user1) {
    navigate(from, { replace: true });
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="separator-line"></div>
        <p className="mt-2 px-2">or</p>
        <div className="separator-line"></div>
      </div>
      {errorElement}
      <div className="social-buttons">
        <button
          onClick={() => signInWithGoogle()}
          className="btn social-btn google-btn"
        >
          <FaGoogle size={20} />
          <span>Sign in with Google</span>
        </button>
        <button className="btn social-btn facebook-btn">
          <FaFacebookF size={20} />
          <span>Sign in with Facebook</span>
        </button>
        <button
          onClick={() => signInWithGithub()}
          className="btn social-btn github-btn"
        >
          <FaGithub size={20} />
          <span>Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
