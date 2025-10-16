import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <h2 className="footer-logo">Created by Haseeb</h2>
          <p className="footer-tagline">
            Turning ideas into fast, modern, and scalable websites.
          </p>
        </div>

        <div className="footer-links">
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:haseebmushtaq874@gmail.com">
              haseebmushtaq874@gmail.com
            </a>
          </p>
          <p>
            <strong>Phone & WhatsApp:</strong>{" "}
            <a href="tel:+923092965427">+92 309 2965427</a>
          </p>
          <p>
            <strong>City:</strong>{" "}
            <span className="city">Rahim Yar Khan</span>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Haseeb Mushtaq | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
