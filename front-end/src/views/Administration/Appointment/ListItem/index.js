import styles from "./ListItem.module.css";
import {useEffect, useState} from "react";

function ListItem(props) {

  const {index, appointment, selectPatient, receptionPatient, appointmentTest, isFinished, setAppointmentState} = props;
  const [state, setState] = useState("예약");
  const [list, setList] = useState([]);
  
  // useEffect(() => {
  //   const temp = {...appointment, appointmentState: state};
  //   async function ex() {
  //     await setAppointmentState(temp);
  //   }
  //   ex();
  // },[state]);

  useEffect(() => {
    const temp = {...appointment, appointment_state: state};
    setAppointmentState(temp);
  },[state])

  useEffect(() => {
    if(appointment.patient_id === isFinished) {
      setState("완료");
    }
  },[isFinished]);

  const handleStateChange = (event, appointment_id, appointment_kind) => {
    setState(event.target.value);
    if(event.target.value === "내원" && appointment_kind === "진료") {
      //접수 테이블 추가
      receptionPatient(appointment_id);    //appointment_id를 보내야함
    } else if(event.target.value === "내원" && appointment_kind === "검사") {
      //검사 테이블 추가
      appointmentTest(appointment_id);
    }
  };

  return (
    <div onClick={() => selectPatient(appointment.patient_id)} className={`${styles.appointmentRow} border-bottom d-flex`} >
        <span className={styles.appointmentItem}>
        {index+1}
        </span>
        <span className={styles.appointmentItem}>
        {appointment.appointment_time}
        </span>
        <span className={styles.appointmentItem}>
        {appointment.patient_name}
        </span>
        {
          {
            진료: (
              <span className={styles.appointmentItem} style={{color: "#7950f2"}}>
                {appointment.appointment_kind}
              </span>),
            검사: (
              <span className={styles.appointmentItem} style={{color: "#7950f2"}}>
                ㆍ{appointment.appointment_kind}
              </span>)
          }[appointment.appointment_kind]
        }
        <span className={styles.appointmentItem}>
        {appointment.staff_name}
        </span>
        {
          { 
            예약 : (<select className={styles.select_box} style={{color: "#495057"}} value={state} onChange={(event) =>handleStateChange(event, appointment.appointment_id, appointment.appointment_kind)}>
                      <option style={{color: "#495057"}} value="예약">예약</option>
                      <option style={{color: "#74b816"}} value="내원">내원</option>
                      <option style={{color: "#1c7ed6"}} value="완료">완료</option>
                      <option style={{color: "#f03e3e"}} value="취소">취소</option>
                    </select>),
            내원 : (<select className={styles.select_box} style={{color: "#74b816"}} value={state} onChange={(event) =>handleStateChange(event, appointment.appointment_id, appointment.appointment_kind)}>
                      <option style={{color: "#495057"}} value="예약">예약</option>
                      <option style={{color: "#74b816"}} value="내원">내원</option>
                      <option style={{color: "#1c7ed6"}} value="완료">완료</option>
                      <option style={{color: "#f03e3e"}} value="취소">취소</option>
                    </select>),
            취소 : (<select className={styles.select_box} style={{color: "#f03e3e"}} value={state} onChange={(event) =>handleStateChange(event, appointment.appointment_id, appointment.appointment_kind)}>
                      <option style={{color: "#495057"}} value="예약">예약</option>
                      <option style={{color: "#74b816"}} value="내원">내원</option>
                      <option style={{color: "#1c7ed6"}} value="완료">완료</option>
                      <option style={{color: "#f03e3e"}} value="취소">취소</option>
                    </select>),
            완료 : (<select className={styles.select_box} style={{color: "#1c7ed6"}} value={state} onChange={(event) =>handleStateChange(event, appointment.appointment_id, appointment.appointment_kind)}>
                      <option style={{color: "#495057"}} value="예약">예약</option>
                      <option style={{color: "#74b816"}} value="내원">내원</option>
                      <option style={{color: "#1c7ed6"}} value="완료">완료</option>
                      <option style={{color: "#f03e3e"}} value="취소">취소</option>
                    </select>)
          }[state]
        }
        </div>
  );
}

export default ListItem;