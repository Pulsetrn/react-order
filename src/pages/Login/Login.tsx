import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import { PREFIX } from "../../helpers/API";
// import { LoginResponse } from "../../Interfaces/auth.interface";
import { AppDispatch } from "../../storage/store";
import { useDispatch, useSelector } from "react-redux";
import { login, userActions } from "../../storage/user.slice";
import { RootState } from "../../storage/store";
export interface LoginForm {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

export function Login() {
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((state: RootState) => state.user.jwt);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  }

  async function sendLogin(email: string, password: string) {
    dispatch(login({email: email, password: password}));
    // try {
    //   const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
    //     email,
    //     password,
    //   });
    //   dispatch(userActions.addJWT(data.access_token));
    //   navigate("/");
    // } catch (err) {
    //   if (err instanceof AxiosError) {
    //     setError(err.response?.data.message[0]);
    //   }
    //   console.log(err);
    //   return;
    // }
  }

  return (
    <div className={styles["login"]}>
      <Header>Login</Header>
      {error && <div className={styles["error"]}></div>}
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
        <Button appearence="big">Enter</Button>
        <div className={styles["links"]}>
          <div>Don't have an account?</div>
          <div>
            <Link to={"/auth/register"}>Register</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
