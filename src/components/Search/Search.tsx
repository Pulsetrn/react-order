import styles from "./Search.module.css";
import cn from "classnames";
import { SearchProps } from "./Search.props";

function Search({ isValid = true, className, ...props }: SearchProps) {
  return (
    <div className={styles["input-wrapper"]}>
      <input
        className={cn(styles["search"], className, {
          [styles["invalid"]]: isValid,
        })}
        {...props}
      />
      <img src="/search-icon.svg" alt="" className={styles["icon"]}/>
    </div>
  );
}

export default Search;
