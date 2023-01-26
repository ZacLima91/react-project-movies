import { Link } from "react-router-dom";
import "./footer.scss";

const bg = require("../../assets/footer-bg.jpg");
const logo = require("../../assets/logo/logo.png");

export function Footer() {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="" />
            <Link to="/">WorldMovies</Link>
          </div>
        </div>
        <div className="footer__content__menus">
            <div className="footer__content__menu">
                <Link to="/">Home</Link>
                <Link to="/">Contato</Link>
                <Link to="/">Sobre</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
