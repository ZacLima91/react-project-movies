import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import { Movie, User } from "../../../api/types";
import "./modal-gear.scss";
const bg = require("../../../assets/footer-bg.jpg");

type PropsEdit = {
  handleClick: (arg0?: any) => any;
  logout: (arg0?: any) => any;
};

export const ModalGear = (props: PropsEdit) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const getUser = async () => {
      const response = await api.getUserId();
      setUser(response);
    };
    getUser();
  }, []);

  return (
    <div className="open-bar">
      <div className="container-user">
        <Link onClick={props.handleClick} className="userImg" to="/user">
          <img src={user?.img} alt="" />
        </Link>
        <Link onClick={props.handleClick} className="userName" to="/user">
          <h3>{user?.userName}</h3>
        </Link>
      </div>
      <div className="logout">
        <Link onClick={props.logout} to="/">
          Sair
        </Link>
      </div>
    </div>
  );
};
