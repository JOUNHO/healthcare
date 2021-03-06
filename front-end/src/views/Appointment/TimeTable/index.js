
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./index.module.css";
import moment from "moment";
import Treatment from "./Treatment";
import Test from "./Test";
import { useCallback, useEffect, useState } from "react";
import { getTimeSetting } from "../../../apis/appointment";
import { useSelector } from "react-redux";

/*
  Title : Appointment_TimeTable 
  Description : 진료예약과 검사예약 테이블 두개의 컴포넌트로 구성됨

  Date : 2021-07-01
  Author : 조운호
*/
function TimeTable(props) {
  const {startDate,changeDate} = props;
  const [tab,setTab] = useState("treatment"); // 진료,검사 탭
  const [hospital,setHospital] = useState(null);  //병원 정보
  const hospital_code = useSelector((state) => state.authReducer.hospital_code); 

  /*
    # 병원 근무시간 저장
  */
  useEffect(() => {
    (async function() {
      const response=await getTimeSetting(hospital_code);
      response.data.lunch_start = response.data.lunch_start.substr(0,5);
      response.data.lunch_end = response.data.lunch_end.substr(0,5);
      response.data.officehour_start = response.data.officehour_start.substr(0,5);
      response.data.officehour_end = response.data.officehour_end.substr(0,5);
      setHospital(response.data);
    })();
  },[])

  /*
    # 이전 이후 날짜 클릭
  */
  const prevDate = () => {
    let date = new Date(startDate);
    date.setDate(date.getDate()-1);
    changeDate(date);
  }
  const nextDate = () => {
    let date = new Date(startDate);
    date.setDate(date.getDate()+1);
    changeDate(date);
  }

  /*
    # 진료 검사 탭
  */
  const treatment = useCallback(() => {
    setTab("treatment");
  },[tab])
  const test = useCallback(() => {
    setTab("test");
  },[tab])
  
  return(
    <div className={styles.TimeTable_contain}>
        <div className={`${styles.date_contain} justify-content-between`}>
          <div className ={styles.showAppoint}>
            <button onClick={treatment} className={tab === "treatment" ? styles.clicked : styles.default }>진료</button>
            <button onClick={test} className={tab ==="test" ? styles.clicked : styles.default}>검사</button>
          </div>
          <div className={styles.date_top}>
            <button className={styles.leftbtn} onClick={prevDate}>{`<`}</button>
            <div className={styles.date}>{moment(startDate).format("YYYY-MM-DD")}</div> 
            <button className={styles.rightbtn} onClick={nextDate}>{`>`} </button>
          </div>
          <div className={styles.color}>
            <span>예약</span>
            <div></div>
            <span>내원</span>
            <div></div>
            <span>취소</span>
            <div></div>
            <span>완료</span>
            <div></div>
          </div>
        </div>
        {
          tab === "treatment"?
          <Treatment startDate={startDate} hospital={hospital}></Treatment>
          :
          <Test startDate={startDate} hospital={hospital}></Test>
        }
        
       

    </div>
    
    
  );
}
export default TimeTable;

