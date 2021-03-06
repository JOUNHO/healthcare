import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getTestAppointmentList } from "../../../../../apis/appointment";
import Appoint from "../Modal/Appoint";
import Cancel from "../Modal/Cancel";
import styles from "./index.module.css";
/*
  Title : Appointment_TimeTable_Test_Testitem
  Description : 날짜와 시간에 맞는 예약정보 list

  Date : 2021-07-10
  Author : 조운호
*/
function TestItem(props) {
  const {startDate,time,lunch_start,appointmentHour} = props;
  let appointment_date = moment(startDate).format("YYYY-MM-DD"); //데이터 변환
  const [testAppoint,setTestAppoint] = useState([]);
  const [clickedAppointment,setClickedAppointment] = useState({});  //선택한 예약정보
  const [showCancelModal, setCancelModal]=useState(false);
  const [showAppointModal, setAppointModal]=useState(false);

  //모달창 관리
  const CancelModalClose = () => setCancelModal(false);
  const appointModalClose = () => setAppointModal(false);

  /*
    # 해당 날짜와 시간에 해당하는 예약정보 가져오기
  */
  const axiosTestList = async() => {
    try{
      const response = await getTestAppointmentList(appointment_date,time);
      setTestAppoint(response.data);
    } catch(error){
      throw error;
    }
  }

  //취소 모달창 오픈
  const openModal = (appointItem) => {
    if(appointItem.appointment_state === "예약"){
      setClickedAppointment(appointItem);
      setCancelModal(true);
    }
  }
  //예약 모달창 오픈
  const openAppointModal = () => {
    const now=moment().format("YYYY-MM-DD HH:mm");
    const click=moment(moment(startDate).format("YYYY-MM-DD")+ " "+time).format("YYYY-MM-DD HH:mm");
    if(now>click){
      alert("현재 날짜와 시간 이후만 예약할 수 있습니다.");
      return;
    }
    setAppointModal(true);
  }
  useEffect(() => {
    axiosTestList();
  },[startDate,showCancelModal,appointmentHour])
  return(
    <>
    <td className={styles.td}>
      {
        time===lunch_start ?
        <div> 점심시간</div>
        :
        <div className={`d-flex`}>
        <button className={`${styles.addbtn}`} onClick={openAppointModal}>예약</button>
        {testAppoint.map((appointItem,index) => {
          return(
              <>
              <div key={index} 
                  onClick = {() => openModal(appointItem)}
                  className={appointItem.appointment_state ==="예약" ? 
                            `${styles.appoint} ${styles.default}`
                            : 
                            appointItem.appointment_state ==="취소" ? 
                            `${styles.cancel} ${styles.default}`
                            :
                            appointItem.appointment_state ==="완료" ?
                            `${styles.complete} ${styles.default}`
                            :
                            `${styles.visit} ${styles.default}`}>
                <span>{appointItem.patient_name}</span>
                <span>({appointItem.patient_gender})</span>
                <div><span>{appointItem.appointment_state}</span></div>   
              </div>
              </>      
          );
        })}
        </div>
      }
      
    </td>
    
      <Modal
            show={showCancelModal} 
            onHide={CancelModalClose}
            size= "lg"
            centered="true"
            >
            <Cancel clickedAppointment={clickedAppointment} CancelModalClose={CancelModalClose}></Cancel>
      </Modal>

      <Modal
            show={showAppointModal} 
            onHide={appointModalClose}
            size= "lg"
            centered="true"
            >
            <Appoint startDate={startDate} time={time} appointModalClose={appointModalClose}></Appoint>
      </Modal>
    </>
  );
}
export default TestItem;