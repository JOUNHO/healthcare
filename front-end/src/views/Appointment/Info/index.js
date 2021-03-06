import { useEffect, useState } from "react";
import { getAppointListByPatientId } from "../../../apis/appointment";
import { getAppointList } from "../TimeTable/data/data";
import AppointInfo from "./AppointInfo";
import styles from "./index.module.css";
function Info(props) {
  const {selectPatientId} = props;

  const [appointItems,setAppointItems] = useState([]);
  useEffect(() => {
    if(selectPatientId){
      (async function() {
        const response = await getAppointListByPatientId(selectPatientId);
        setAppointItems(response.data);
      })();
    }
    
  },[props])
  return(
    <div className={styles.AppointInfo_contain}>
      {
        !props.selectPatientId ? 
        <div className={styles.default}>
        <img className={styles.patient_icon} src="/resources/svg/emoji-smile.svg" height="100px"/>
        <div>환자를 선택해주세요!</div>
        </div>
        :
        <div>
          <AppointInfo appointItems={appointItems}></AppointInfo>
        </div>
      }
    </div>
  );
}
export default Info;