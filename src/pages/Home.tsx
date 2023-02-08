import React, { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { Movie } from "../api/types";
import { OutlineButton } from "../components/button/Button";
import { HeroSlide } from "../components/hero-slide/HeroSlide";
import { NewMovieModal } from "../components/modals-options/modal-create/NewMovieModal";
import { MovieList } from "../components/movie-list/MovieList";

export function Home() {
  const [item, setItem] = useState<Movie[] | undefined>();

  useEffect(() => {
    const getDetails = async () => {
      const response = await api.getMovies();
      setItem(response);
    };
    getDetails();
  }, []);
  const [openModal, setOpenModal] = useState(false);

  const handleClick: MouseEventHandler<HTMLSpanElement> = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <HeroSlide />
      <div className="contain">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <OutlineButton onClick={handleClick} className="">
              Adicionar Filme
            </OutlineButton>
          </div>
          <MovieList />
        </div>
      </div>
      {openModal && <NewMovieModal handleClose={handleClick} />}
    </>
  );
}
