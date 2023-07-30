import Spinner from "../assets/loading_Spinner.gif";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.container}>
      <img src={Spinner} alt="Loading.." className={styles.loading_img} />
      <p className={styles.title}>Importing Data...</p>
    </div>
  );
}

export default Loading;
