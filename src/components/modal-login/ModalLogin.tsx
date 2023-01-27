import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./modal.scss";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const ModalLogin = (props: ModalProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    const userData = await api.login(loginPayload);
    setLoading(false);

    if (!userData) {
      setError(true);
      return;
    }
    navigate("/classroom");
  }

  return (
    <div>
      {props.isOpen && (
        <div className={`modal-login ${props.isOpen ? 'is-open': ""}`}>
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
      )}
    </div>
  );
};
