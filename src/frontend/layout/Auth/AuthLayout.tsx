import {  Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export function AuthLayout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className={styles["content"]}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
