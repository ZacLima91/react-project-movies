import React, { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import { OutlineButton } from "../components/button/Button";
import { HeroSlide } from "../components/hero-slide/HeroSlide";
import { MovieList } from "../components/movie-list/MovieList";

export function Home() {
  const [openModalTrailer, setOpenModalTrailer] = useState(false);

  const handleClick: MouseEventHandler<HTMLSpanElement> = () => {
    setOpenModalTrailer(!openModalTrailer);
  };
  return (
    <>
      <HeroSlide />
      <div className="contain">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton onClick={handleClick} className="" >View more</OutlineButton>
            </Link>
          </div>
          <MovieList/>
        </div>
        
      </div>
    </>
  );
}
