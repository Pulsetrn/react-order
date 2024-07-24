import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../Helpers/API";

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  }

  async function sendLogin(email: string, password: string) {
    try {
      const { data } = await axios.post(
        `https://purpleschool.ru/pizza-api-demo/auth/login`,
        {
          email,
          password,
        }
      );
      console.log(data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message[0]);
      }
      console.log(err);
      return;
    }
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
