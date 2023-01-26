import { useState, useEffect } from "react";

import "./movie-grid.scss";

import { MovieCard } from "../movie-card/MovieCard";
import { Button } from "../button/Button";

import { api } from "../../api/api";
import { Movie } from "../../api/types";

export const MovieGrid = (props: any) => {
  const [movies, setMovies] = useState<Movie[] | undefined>([]);
  const [search, setSearch] = useState<string>("");
  const [paramToFilter, setParamToFilter] = useState<string>("name");

  const findMovies = async () => {
    const data = await api.getMovies();
    setMovies(data);
  };

  const filteredMovies = movies?.filter((movie) => {
    if (paramToFilter === "name")
      return movie.name.toUpperCase().includes(search.toLocaleUpperCase());
  });

  useEffect(() => {
    findMovies();
  }, []);

  return (
    <>
      <div className="section mb-3">
        <div className="movie-search">
          <input
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
          />
        </div>
      </div>
      <div className="movie-grid">
        {filteredMovies?.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
    </>
  );
};
