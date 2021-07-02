import Calendar from "./Calendar";
import TimeTable from "./TimeTable";
import { useEffect, useState } from "react";
import { getTAppoint, getTestAppointment } from "./TimeTable/data/data";
import SearchPatient from "./SearchPatient";
import Info from "./Info";
import styles from "./index.module.css";
function Appointment(props) {

  const [startDate, setStartDate] = useState(new Date());
  const [tAppointment,setTAppointment] = useState(getTAppoint());

  const [selectPatientId,setSelectPatientId] = useState(null);
  

  const changeDate = (date) => {
    setStartDate(date);
  }
  console.log(startDate);
  const changeShow = (value) => {
    if(value === "TreatmentAppoint") {
      setTAppointment(getTAppoint());
    } else {
      setTAppointment(getTestAppointment());
    }
  };

  const selectedPatientId = (id) => {
    setSelectPatientId(id);
  }
  

  return(
    <div className={styles.contain}>
      <div>
        <Calendar startDate={startDate} changeDate={changeDate}></Calendar>
        <SearchPatient selectedPatientId={selectedPatientId}></SearchPatient>
        <Info selectPatientId={selectPatientId}></Info>
      </div>
      <TimeTable startDate={startDate} changeDate={changeDate} tAppointment={tAppointment} changeShow={changeShow}></TimeTable>
    </div>
  );
}
export default Appointment;