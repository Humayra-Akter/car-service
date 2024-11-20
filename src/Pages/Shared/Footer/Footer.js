import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-3">
      <div className="footer-container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
        <p className="mb-0">
          <a
            href="/privacy-policy"
            className="text-white text-decoration-underline me-3"
          >
            Privacy Policy
          </a>
          <a href="/terms" className="text-white text-decoration-underline">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
