import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { api } from "../../api/api";
import { User } from "../../api/types";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import swal from "sweetalert";
import "./user.scss";
import { useNavigate } from "react-router-dom";

export function UserName() {
  const [user, setUser] = useState<User | undefined>();
  const [hover, setHover] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await api.getUserId();
      setUser(response);
    };
    getUser();
  }, []);

  const openInputs = () => {
    if (hover) {
      setHover(false);
    } else {
      setHover(true);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedUser: User = {
      userName: e.currentTarget.userName.value,
      img: e.currentTarget.img.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    if (user?.id) {
      const responseUser = await api.getEditUser(user.id, updatedUser);
      window.location.reload();
      return responseUser;
    }
  }

  const handleClickDelete: MouseEventHandler<SVGElement> = () => {
    swal({
      title: "Deletar Usuário",
      text: `Tem certeza que deseja apagar ${user?.userName}`,
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
        res = await api.deleteUser(user?.id);
        navigate("/home");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-user">
          <span>
            <CiEdit onClick={openInputs} />
          </span>

          <div className="container-user__profile">
            <div className="profile-img">
              <img src={user?.img} alt="imagem do usuario" />
              <input
                name="img"
                className={hover ? "openInput" : "closeInput"}
                type="text"
                placeholder="New Image"
                defaultValue={user?.img}
                required
              />
            </div>
            <div className="profile-name">
              <h1>{user?.userName}</h1>
              <input
                name="userName"
                className={hover ? "openInput" : "closeInput"}
                type="text"
                placeholder="New Name"
                defaultValue={user?.userName}
                required
              />
            </div>
          </div>
          <div className="container-user__content">
            <p>Email: {user?.email}</p>
            <input
              name="email"
              className={hover ? "openInput" : "closeInput"}
              type="text"
              placeholder="New Email"
              required
            />

            <p>Password: ********</p>
            <input
              name="password"
              className={hover ? "openInput" : "closeInput"}
              type="password"
              placeholder="New Password"
              required
            />
          </div>
        </div>
        <div className="container-btn">
          <button className="btn" type="submit">
            Atualizar
          </button>
          <AiFillDelete onClick={handleClickDelete} />
        </div>
      </form>
    </>
  );
}
