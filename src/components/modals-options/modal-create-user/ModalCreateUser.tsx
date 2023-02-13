import { FormEvent } from "react";
import { api } from "../../../api/api";
import { User } from "../../../api/types";
import "./modal-create-user.scss";

export const ModalCreateUser = () => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("passou aki")
    const createdUser: User = {
      userName: e.currentTarget.userName.value,
      img: e.currentTarget.img.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    console.log(createdUser)

    const responseUser = await api.createUser(createdUser);
    console.log(responseUser)
    return responseUser;
  }

  return (
    <div className="container-create">
      <div className="container-create__content">
        <div className="container-create__content__title">
          <h2>Criar Usuário</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Nome:</label>
            <input type="text" name='userName'/>
          </div>

          <div className="inputs">
            <label>Imagem:</label>
            <input type="text" name="img"/>
          </div>

          <div className="inputs">
            <label>Email:</label>
            <input type="text" name="email" />
          </div>

          <div className="inputs">
            <label>Password:</label>
            <input type="text" name="password" />
          </div>
          <div className="container-btn">
            <button type="submit" className="btn">
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
