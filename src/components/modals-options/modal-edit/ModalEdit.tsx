import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Movie } from "../../../api/types";
import "./modal-edit.scss";
const bg = require("../../../assets/footer-bg.jpg");

type PropsEdit = {
  handleClose: (arg0?: any) => any;
  name: string | undefined;
  description: string | undefined;
  imgUrl: string | undefined;
  imgFullScreen: string | undefined;
  trailer: string | undefined;
  year: number | undefined;
};



export const EditModal = (props: PropsEdit) => {
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

    if (id) {
      const pokemonResponse = await api.editMovie(id,newMovie);
      console.log(pokemonResponse)
      props.handleClose();
      window.location.reload();
    }
  }

  return (
    <div className="modal-edit">
      <div
        className="modal-edit__content"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="modal-edit__title">
          <h1>Editar</h1>
          <span onClick={props.handleClose}>X</span>
        </div>
        <div className="modal-edit__form">
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <label>Filme:</label> 
              <input type="text" name="nameMovie" defaultValue={props.name} required />
            </div>

            <div className="inputs">
              <label>Descrição:</label>
              <input type="text" name="description" defaultValue={props.description} required />
            </div>

            <div className="inputs">
              <label>Url da image:</label>
              <input type="text" name="imgUrl" defaultValue={props.imgUrl} required />
            </div>

            <div className="inputs">
              <label>Url da image fullscreen :</label>
              <input type="text" name="imgFullScreen" defaultValue={props.imgFullScreen} required />
            </div>

            <div className="inputs">
              <label>Url do trailer:</label>
              <input type="text" name="trailer" defaultValue={props.trailer} required />
            </div>

            <div className="inputs">
              <label>Ano:</label>
              <input type="number" name="year" defaultValue={props.year} required />
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
