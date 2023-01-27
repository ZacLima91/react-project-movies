import { useParams } from "react-router-dom";
import { PageHeader } from "../components/page-header/PageHeader";
import { category as cate } from "../api/api";
import { MovieGrid } from "../components/movie-grid/MovieGrid";

export function Catalog() {
  const { category } = useParams();

  return (
    <>
      <PageHeader>{category === cate.movie ? "Movies" : "Series"}</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
}