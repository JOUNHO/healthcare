import { getPatientList} from "../data";
import styles from "./Appointment.module.css";
import { useCallback, useEffect, useState } from "react";
import ListItem from "./ListItem";
import { getAppointmentList, getAppointmentListByState } from "../../../apis/administration";
import React from "react";
function Appointment(props) {

  const {sameDayAppointment, selectedPatient, receptionPatient, appointmentTest, isFinished} = props;
  const [appointmentList, setAppointmentList] = useState([]);
  const [state, setState] = useState("");
  console.log("dkdkdkdkdkdk");
  useEffect(() => {
    //비동기 통신
    const work = async () => {
      try {
        const response = await getAppointmentList();
        setAppointmentList(response.data);
        setState("전체");
      } catch (error) {
        console.log(error.message);
        //history.push("./error"); 에러 컴포넌트로 이동
      }
    };
    work();
  },[sameDayAppointment]);

  const getLength = () => {  //예약 리스트의 건 수를 반환
    return appointmentList.length;
  };

  const getAllList = async() => {
    try {
        const response = await getAppointmentList();
        setAppointmentList(response.data);
        setState("전체");
      } catch (error) {
        console.log(error.message);
      }
  };

  const listWithState = async(appointmentState) => {
    try{
      const response = await getAppointmentListByState(appointmentState);
      setAppointmentList(response.data);
      setState(appointmentState);
    }catch(error) {
      console.log(error.message);
    }
  }

  const selectPatient = (patientId) => { //예약 리스트의 환자 클릭 시 해당 환자의 patientId로 환자 리스트에서 환자를 찾고 부모 컴포넌트의 상태를 바꿔줌 
    selectedPatient(patientId);
  }

  return (
    <>
      <div className={styles.appointment}>
        <div className="mb-1 ml-2 d-flex">
          <img className="mr-3" src="/resources/svg/person-check.svg"></img><span className="mr-3">예약</span>
          <div className={styles.appointment_state} onClick={getAllList} >전체 &nbsp;| </div>
          <div className={styles.appointment_state} onClick={()=> listWithState("예약")}>예약 &nbsp;| </div>
          <div className={styles.appointment_state} onClick={()=> listWithState("내원")}>내원 &nbsp;| </div>
          <div className={styles.appointment_state} onClick={()=> listWithState("완료")}>완료 &nbsp;| </div>
          <div className={styles.appointment_state} onClick={()=> listWithState("취소")}>취소 </div>
          <div className={styles.length} >{state} : 총 {getLength()} 건</div>
        </div>
        <div className="d-flex bg-light">
          <span className={`border ${styles.appointment_border}`}>
            순서
          </span>
          <span className={`border ${styles.appointment_border}`}>
            예약시간
          </span>
          <span className={`border ${styles.appointment_border}`}>
            이름
          </span>
          <span className={`border ${styles.appointment_border}`}>
            예약내용
          </span>
          <span className={`border ${styles.appointment_border}`}>
            담당의
          </span>
          <span className={`border ${styles.appointment_border}`}>
            상태
          </span>
        </div>
        <div className={styles.appointment_content}>
          {appointmentList.map((appointment, index)=>(
            <>
            <ListItem key={index} index={index} appointment={appointment} selectPatient={selectPatient} receptionPatient={receptionPatient} appointmentTest={appointmentTest} isFinished={isFinished}/>
            </>
          ))}
        </div>
      </div>
 </>
  );
}

export default React.memo(Appointment);


  // // 환자 내원했을 때
  // / /예약셀렉트 박스에서 내원으로 바꿨을 때 이벤트 걸어주면 될 듯
  // // 진료페이지 환자 리스트 추가 되는 부분
  // // 아래 정상동작 합니다.
  // // 뒤에 /ROLE_ADMIN/{staff_id} 로 보내야 합니다. 
  // // /ROLE_DOCTOR/{staff_id} 한테도 보내야 할 것 같아요.
  // // 
  // const sendMessage = async()=>{
  //   try{
  //   await sendMqttMessage({
  //     topic : "/"+ hospital_code +"/ROLE_ADMIN/dhoj11",
  //     content : "rerender/Treatment_Patients"
  //   })
  //   }catch(error){
  //     console.log(error);
  //   } 
  // }
  // //