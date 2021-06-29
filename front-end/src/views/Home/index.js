import styles from "./index.module.css"
import Login from "./Login";
import Notice from "./Notice";
import Poster from "./Poster";
import News from "./News";

function Home(props) {
  return (
    <div className={styles.home_content}>
      <div className={styles.login_area}>
        <Login />
      </div>
      <div className={styles.second_column}>
        <div className={styles.notice_area}>
          <Notice />
        </div>
        <div className={styles.poster_area}>
          <News />
        </div>
      </div>
    </div>
  );
}

export default Home;