import React from "react";
import { Link } from "react-router-dom";
import footer from "../../assets/images/footer.png";

const Footer = () => {
  return (
    <footer
      style={{
        background: `url(${footer})`,
        backgroundSize: "cover",
      }}
    >
      <div className="footer p-10">
        <div>
          <span className="footer-title">Services</span>
          <Link to="/">Branding</Link>
          <Link to="/">Design</Link>
          <Link to="/">Marketing</Link>
          <Link to="/">Advertisement</Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to="/">About us</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Jobs</Link>
          <Link to="/">Press kit</Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link to="/">Terms of use</Link>
          <Link to="/">Privacy policy</Link>
          <Link to="/">Cookie policy</Link>
        </div>
      </div>
      <div>
        <p>Copyright © 2022 - All right reserved by Doctos portal LTD</p>
      </div>
    </footer>
  );
};

export default Footer;
