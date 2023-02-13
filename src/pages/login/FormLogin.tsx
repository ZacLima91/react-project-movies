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
import { ModalCreateUser } from "../../components/modals-options/modal-create-user/ModalCreateUser";

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
  const [open, setOpen] = useState(false);

  interface HeaderStyle {
    display: string;
  }

  const openMenu = (status: boolean) => {
    const headerMenu: HTMLElement = document.querySelector(".header__nav")!;
    if (status) {
      headerMenu.style.display = "flex";
    } else {
      headerMenu.style.display = "none";
    }
  };

  useEffect(() => {
    openMenu(false);
  }, []);

  const navigate = useNavigate();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const loginPayload = {
      email: email,
      password: password,
    };
    console.log(loginPayload);
    const userData = await api.login(loginPayload);
    console.log(userData);
    setLoading(false);

    if (!userData) {
      setError(true);
      return;
    }
    openMenu(true);
    navigate("/home");
  }
  const openInputs = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
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
          <div className="btns">
            <button type="submit">login</button>
            <button type="button" onClick={openInputs}>
              create
            </button>
          </div>
        </form>
      </div>
      {open && <ModalCreateUser />}
    </>
  );
};
