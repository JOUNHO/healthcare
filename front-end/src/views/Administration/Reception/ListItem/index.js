import styles from "./ListItem.module.css";
import {useState} from "react";
import moment from "moment";

function ListItem(props) {
  
  const {index, reception, selectPatient, finished} = props;
  const [state, setState] = useState("대기");

  const handleStateChange = (event, patientId) => {
    setState(event.target.value);
    console.log(state);
    if(event.target.value === "완료" && patientId !== undefined) {
      console.log(patientId);
      finished(patientId);
    }
  };

  return (
    <div key={index} onClick={() => selectPatient(reception.patient_id)} className={`${styles.appointmentRow} border-bottom d-flex`} >
        <span className={styles.appointmentItem}>
        {index+1}
        </span>
        <span className={styles.appointmentItem}>
        {moment().format('HH:mm')}
        </span>
        <span className={styles.appointmentItem}>
        {reception.patient_name}
        </span>
        <span className={styles.appointmentItem}>
        {reception.reception_content}
        </span>
        <span className={styles.appointmentItem}>
        {reception.staff_name}
        </span>
        {
          { 
            대기 : (<select className={styles.select_box} style={{color: "#74b816"}} value={state} onChange={(event) =>handleStateChange(event, reception.patient_id)}>
                      <option style={{color: "#74b816"}} value="대기">대기</option>
                      <option style={{color: "#1c7ed6"}} value="완료">완료</option>
                      <option style={{color: "#f03e3e"}} value="진료">진료</option>
                    </select>),
            진료 : (<select className={styles.select_box} style={{color: "#f03e3e"}} value={state} onChange={(event) =>handleStateChange(event, reception.patient_id)}>
                      <option style={{color: "#74b816"}} value="대기">대기</option>
                      <option style={{color: "#1c7ed6"}} value="완료">완료</option>
                      <option style={{color: "#f03e3e"}} value="진료">진료</option>
                    </select>),
            완료 : (<select className={styles.select_box} style={{color: "#1c7ed6"}} value={state} onChange={(event) =>handleStateChange(event, reception.patient_id)}>
                      <option style={{color: "#74b816"}} value="대기">대기</option>
                      <option style={{color: "#1c7ed6"}} value="완료">완료</option>
                      <option style={{color: "#f03e3e"}} value="진료">진료</option>
                    </select>)
          }[state]
        }
        </div>
  );
}

export default ListItem;