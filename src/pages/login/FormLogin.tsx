import {
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "./login.scss";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const FormLogin = (props: ModalProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  interface HeaderStyle {
    display: string;
  }

  
  
  const statusMenu = ()=>{
    const headerMenu:HTMLElement= document.querySelector("header__nav")!;
    headerMenu.style.display = "none"
  }
  

  const navigate = useNavigate();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const modalClose = () => {
    props.setIsOpen(false);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const loginPayload = {
      email: email,
      password: password,
    };
    const userData = await api.login(loginPayload);
    console.log(userData);
    setLoading(false);

    if (!userData) {
      setError(true);
      return;
    }
    statusMenu()
    navigate("/home");
  }

  return (
    <div className="form-content">
      <div className="form-content__title">
        <h1>Entrar</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};
