import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Movie } from "../../../api/types";
import "./newMovie-create.scss";
const bg = require("../../../assets/footer-bg.jpg");

type PropsCreate = {
  handleClose: (arg0?: any) => any;
};

export const NewMovieModal = (props: PropsCreate) => {
  const { id } = useParams();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newMovie: Movie = {
      name: e.currentTarget.nameMovie.value,
      description: e.currentTarget.description.value,
      imgUrl: e.currentTarget.imgUrl.value,
      imgFullScreen: e.currentTarget.imgFullScreen.value,
      trailer: e.currentTarget.trailer.value,
      year: parseInt(e.currentTarget.year.value),
    };
    
    const pokemonResponse = await api.createMovie(newMovie);
    props.handleClose();
    window.location.reload();
  }

  return (
    <div className="modal-edit">
      <div
        className="modal-edit__content"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="modal-edit__title">
          <h1>Criar Filme</h1>
          <span onClick={props.handleClose}>X</span>
        </div>
        <div className="modal-edit__form">
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <label>Filme:</label>
              <input type="text" name="nameMovie" required />
            </div>

            <div className="inputs">
              <label>Descrição:</label>
              <input type="text" name="description" required />
            </div>

            <div className="inputs">
              <label>Url da image:</label>
              <input type="text" name="imgUrl" required />
            </div>

            <div className="inputs">
              <label>Url da image fullscreen :</label>
              <input type="text" name="imgFullScreen" required />
            </div>

            <div className="inputs">
              <label>Url do trailer:</label>
              <input type="text" name="trailer" required />
            </div>

            <div className="inputs">
              <label>Ano:</label>
              <input type="number" name="year" required />
            </div>

            <div className="inputs">
              <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
