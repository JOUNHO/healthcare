import {getAppointmentList, getPatientList} from "../data";
import styles from "./Appointment.module.css";
import { useCallback, useEffect, useState } from "react";
import ListItem from "./ListItem";

function Appointment(props) {

  const {selectedPatient, receptionPatient, appointmentTest, isFinished} = props;

  //예약 리스트, 환자 리스트 정보 가져오기
  const staticAppointmentList = getAppointmentList();   
  const staticPatientList = getPatientList();

  //당일 예약 리스트를 가져오기 위해 필터를 적용, 당일 예약 리스트를 초기상태로 선언
  const todayAppointmentList = staticAppointmentList.filter(today => today.appointment_date === "2021-06-16");  //후에 백엔드에서 처리할 예정
  const [appointmentList, setAppointmentList] = useState(todayAppointmentList);

  // const [stateList, setStateList] = useState([]);
  // let newList = stateList;
  // const setAppointmentState = (list) => {
  //   newList = newList.filter(temp => temp.patient_id !== list.patient_id);
  //   newList = newList.concat(list);
  //   setStateList(newList);
  // };

  // useEffect(() => {
  //   console.log("!!!!!!!!!!!!!!!",stateList);
  // },[stateList])

  const listAll = () => {   //전체 클릭시 예약 리스트 상태를 다시 당일 예약 리스트로 세팅
    setAppointmentList(todayAppointmentList);
  };

  const getAllLength = () => {  //당일 예약 리스트의 전체 건수를 반환해줌
    return todayAppointmentList.length;
  };

  const listWithState = (appointmentState) => {   //예약상태 클릭시 필터를 적용하여 클릭한 상태에 맞는 예약 리스트 상태를 다시 세팅
    const temp = todayAppointmentList;
    const filteredAppointmentList = temp.filter(appointment => appointment.appointment_state === appointmentState);
    setAppointmentList(filteredAppointmentList);
  };

  const selectPatient = (patientId) => { //예약 리스트의 환자 클릭 시 해당 환자의 patientId로 환자 리스트에서 환자를 찾고 부모 컴포넌트의 상태를 바꿔줌 
    const filteredPatient = staticPatientList.filter(patient => patient.patient_id === patientId);
    selectedPatient(filteredPatient[0]);
  }

  return (
    <div className={styles.appointment}>
        <div className="mb-1 ml-2 d-flex">
          <img className="mr-3" src="/resources/svg/person-check.svg"></img><span className="mr-3">예약</span>
          <div className="mr-2" onClick={listAll} style={{color : "#ffd43b"}}>전체 {getAllLength()} 건 </div>
          {/* <div className="mr-2" onClick={()=> listWithState("예약")}>예약  | </div>
          <div className="mr-2" onClick={()=> listWithState("내원")}>내원  | </div>
          <div className="mr-2" onClick={()=> listWithState("완료")}>완료  | </div>
          <div className="mr-2" onClick={()=> listWithState("취소")}>취소  </div> */}
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
        <ListItem key={index} index={index} appointment={appointment} selectPatient={selectPatient} receptionPatient={receptionPatient} appointmentTest={appointmentTest} isFinished={isFinished}/>
      ))}
    </div>
 </div>
  );
}

export default Appointment;