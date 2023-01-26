import { Link } from "react-router-dom";
import { Movie } from "../../api/types";
import { Button } from "../button/Button";
import "./movie-card.scss";

type Props = {
  item: Movie;
  category: string | undefined;
};

export const MovieCard = (props: Props) => {
  const link = "/movies/" + props.item.id;
  const bg = props.item.imgUrl;

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button className="" onClick={function () {}}>
          <i className="bx bx-play">VIEW</i>
        </Button>
      </div>
      <h3>
        {props.item.name}({props.item.year})
      </h3>
    </Link>
  );
};
