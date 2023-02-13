import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { RxGear } from "react-icons/rx";
import "./header.scss";
import { User } from "../../api/types";
import { ModalGear } from "../modals-options/modal-gear/ModalGear";
const logo = require("../../assets/logo/logo.png");

export function Header() {
 
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLInputElement>(null);


  const handleClick: MouseEventHandler<SVGElement | HTMLAnchorElement> = () => {
    setOpen(!open);
  };

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

  console.log('ta aki')

  const logout = async () => {
    setOpen(!open);
    await api.logout();
  };

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
            <RxGear onClick={handleClick} className={"gear"} />
          </li>
        </ul>
        {open && (
          <ModalGear logout={logout} handleClick={handleClick}/>
        )}
      </div>
    </div>
  );
}
