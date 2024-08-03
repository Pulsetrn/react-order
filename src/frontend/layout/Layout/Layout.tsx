import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../storage/store";
import { getUserProfile, userActions } from "../../storage/user.slice";
import { useEffect } from "react";

export function Layout() {
  // useLocation - хук, позволяющий отслеживать текущее местоположение с точки зрения URL.
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.user.profile);
  const items = useSelector((state: RootState) => state.cart.items);

  // В начале жизненного цикла компонента получаем с бекенда данные о профиле с использованием
  // лежащего в local storage JWT токена
  // useEffect(() => {
  //   dispatch(getUserProfile());
  // }, [dispatch]);

  function logout() {
    dispatch(userActions.logout());
    navigate("/auth/login");
  }

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          {/* <img src="/avatar.png" alt="" className={styles["avatar"]} /> */}
          <div className={styles["name"]}>{profile?.name}</div>
          <div className={styles["email"]}>{profile?.email}</div>
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
            Cart{" "}
            <span className={styles["count"]}>
              {items.reduce((acc, i) => {
                acc += i.count;
                return acc;
              }, 0)}
            </span>
          </NavLink>
        </div>
        <Button className={styles["exit"]} onClick={logout}>
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
