import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
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

  const logout = async()=>{
    await api.logout()
  }

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/home">WorldMovies</Link>
        </div>
        <ul className="header__nav">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/movies">Filmes</Link>
          </li>
          <li>
            <Link onClick={logout} to="/">Sair</Link>
          </li>
        </ul> 
      </div>
    </div>
  );
}
