import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import styles from "./Register.module.css";
import { FormEvent, useEffect } from "react";
import { AppDispatch } from "../../storage/store";
import { useDispatch, useSelector } from "react-redux";
import { register, userActions } from "../../storage/user.slice";
import { RootState } from "../../storage/store";

export interface ReigsterForm {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
}

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage: error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & ReigsterForm;
    const { email, password, name } = target;
    await sendRegister(email.value, password.value, name.value);
  }

  async function sendRegister(email: string, password: string, name: string) {
    dispatch(register({ email: email, password: password, name: name }));
  }

  return (
    <div className={styles["register"]}>
      <Header>Register</Header>
      {error && <div className={styles["error"]}>{error}</div>}
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Email</label>
          <Input id="email" placeholder="Email" name="email"></Input>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
          ></Input>
        </div>
        <div className={styles["field"]}>
          <label htmlFor="name">Name</label>
          <Input id="name" type="name" placeholder="Name" name="name"></Input>
        </div>
        <Button appearence="big">Enter</Button>
        <div className={styles["links"]}>
          <div>If you have an account</div>
          <Link to="/auth/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}
