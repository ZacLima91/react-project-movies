import { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { api } from "../../api/api";
import { Movie } from "../../api/types";
import { MovieCard } from "../movie-card/MovieCard";
import './movie-list.scss'

export const MovieList = () => {
  const [items, setItems] = useState<Movie[] | undefined>([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await api.getMovies();
        setItems(response);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, []);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items?.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={undefined}></MovieCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
