import ImgNotice from "./ImgNotice";
import Calendar from "../Appointment/Calendar";
import Notice from "./Notice";
import styles from "./index.module.css";
import { useState } from "react";
import Staff from "./Staff";
import FreeBoard from "./FreeBoard";
import Weather from "./Weather";
function DashBoard(props) {
  const [startDate, setStartDate] = useState(new Date());
  const changeDate = (date) => {
    setStartDate(date);
  }
  return(
    <div className={styles.dashboard_contain}>
      <div className={styles.top_contain}>
        <ImgNotice></ImgNotice>
        <Calendar startDate={startDate} changeDate={changeDate}></Calendar>
        
      </div>

      <div className={styles.bottom_contain}>
        
        <Notice></Notice>
        <FreeBoard></FreeBoard>
        <Weather></Weather>
        <Staff></Staff>
      </div>
    </div>
  );
}
export default DashBoard;