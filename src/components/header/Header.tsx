import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
const logo = require("../../assets/logo/logo.png");

export function Header() {
  const headerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        if (headerRef.current != null) {
          headerRef.current.classList.add("shrink");
        }
      } else {
        if (headerRef.current != null) {
          headerRef.current.classList.remove("shrink");
        }
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">WorldMovies</Link>
        </div>
        <ul className="header__nav">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/movies">Filmes</Link>
          </li>
        </ul> 
      </div>
    </div>
  );
}
