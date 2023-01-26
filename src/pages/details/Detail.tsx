import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Movie } from "../../api/types";
import "./detail.scss";
import { Iframe } from "./Iframe";

export function Detail() {
  const [item, setItem] = useState<Movie | undefined>();
  const { id } = useParams();
  console.log(item);

  useEffect(() => {
    const getDetails = async () => {
      const response = await api.getMovieId(id);
      setItem(response);
    };
    getDetails();
  }, []);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{ backgroundImage: `url(${item.imgFullScreen})` }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <img src={item.imgUrl} alt="" />
              <div className="movie-content__info">
                <div className="title">{item.name}</div>
                <p className="overview">{item.description}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <Iframe item={item} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
