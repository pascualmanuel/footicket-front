import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/ft-logo.png";
import "./Footer.css";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          <img
            src={Logo}
            alt="logo"
            className="logo"
            style={{ width: "35px" }}
          />
          Foo<span>Ticket</span>
        </h3>

        <p className="footer-links">
          <Link as={Link} to="/login">
            Iniciar Sesión
          </Link>

          <Link as={Link} to="/signup">
            Registrate
          </Link>

          <Link as={Link} to="/league/england">
            Premier League
          </Link>

          <Link as={Link} to="/league/spain">
            LaLiga
          </Link>

          <Link as={Link} to="/league/italy">
            Serie A
          </Link>
        </p>

        <p className="footer-company-name">Footicket © 2022</p>
      </div>

      <div className="footer-center">
        <div>
          <p>
            <span>Pl. de Legazpi, 8 </span> 28045, Madrid
          </p>
        </div>

        <div>
          <p>+34.667.460.0552</p>
        </div>

        <div>
          <p>
            <a href="mailto:support@company.com">support@footicket.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>Sobre nosotros</span>
          Footicket es una aplicación que simula la compra y venta de entradas
          en las principales ligas del mundo. El club elije el precio y la
          cantidad de entradas que decide poner a la venta
        </p>

        <div className="footer-icons">
          <Link as={Link} to="#">
            <FaFacebookF />
          </Link>
          <Link as={Link} to="#">
            <FaTwitter />
          </Link>
          <Link as={Link} to="#">
            <FaInstagram />
          </Link>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
