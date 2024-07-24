import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";

function Button({
  children,
  className,
  appearence = "small",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles["accent"],
        styles["button"],
        className,
        // Передавая JS object в classnames функцию мы получаем ту же самую логику, что и:
        // styles === "big" ? styles["big"] : styles["small"] только в более компактном варианте
        {
          [styles["small"]]: appearence === "small",
          [styles["big"]]: appearence === "big",
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
