import { FormLogin } from "./FormLogin";

export const Login = () => {
  return (
    <div className="container-login">
      <div className="card-login">     
        <FormLogin isOpen={false} setIsOpen={function (isOpen: boolean): void {
                  throw new Error("Function not implemented.");
              } }/>
      </div>
     
    </div>
  );
};
