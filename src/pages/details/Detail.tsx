import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Movie } from "../../api/types";
import "./detail.scss";
import { Iframe } from "./Iframe";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { EditModal } from "../../components/modals-options/modal-edit/ModalEdit";
import swal from "sweetalert";

export function Detail() {
  const [item, setItem] = useState<Movie | undefined>();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(item);

  useEffect(() => {
    const getDetails = async () => {
      const response = await api.getMovieId(id);
      setItem(response);
    };
    getDetails();
  }, []);

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleClickEdit: MouseEventHandler<SVGElement> = () => {
    setOpenEditModal(!openEditModal);
  };

  const handleClickDelete: MouseEventHandler<SVGElement> = () => {
    swal({
      title: "Deletar Filme",
      text: `Tem certeza que deseja apagar ${item?.name}`,
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: {
          text: "Cancelar",
          value: null,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Confirmar",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
    }).then(async (res) => {
      if (res) {
        res = await api.deleteMovie(id);
        navigate("/home");
      }
    });
  };

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
              <div className="poster-container">
                <img src={item.imgUrl} alt="" />
                <div className="options-poster">
                  <div className="options-poster__edit">
                    <BiEdit onClick={handleClickEdit} />
                  </div>
                  <div className="options-poster__delete">
                    <RiDeleteBin2Line onClick={handleClickDelete} />
                  </div>
                </div>
              </div>

              <div className="movie-content__info">
                <div className="title">
                  {item.name} ({item.year})
                </div>
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
      {openEditModal && (
        <EditModal
          handleClose={handleClickEdit}
          name={item?.name}
          description={item?.description}
          imgUrl={item?.imgUrl}
          imgFullScreen={item?.imgFullScreen}
          trailer={item?.trailer}
          year={item?.year}
        />
      )}
    </>
  );
}
