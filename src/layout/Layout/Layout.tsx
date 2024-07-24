import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";

export function Layout() {
  // useLocation - хук, позволяющий отслеживать текущее местоположение с точки зрения URL.
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img src="/avatar.png" alt="" className={styles["avatar"]} />
          <div className={styles["name"]}>Egor Kovalev</div>
          <div className={styles["email"]}>pulseefast@gmail.com</div>
        </div>
        <div className={styles["menu"]}>
          {/* NavLink - компонент, который может держать статус текущега URL */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="/menu-icon.svg" alt="" />
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src="/cart-icon.svg" alt="" />
            Cart
          </NavLink>
        </div>
        <Button className={styles["exit"]}>
          <img src="/exit-icon.svg" alt="" />
          Exit
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
