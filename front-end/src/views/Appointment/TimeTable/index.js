import { Modal } from "react-bootstrap";
import { useState } from "react";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Appoint from "./Modal/Appoint/Appoint";
import Cancel from "./Modal/Cancel/Cancel";
import { getAppointList, getAppointTime, getPatientList, getTAppoint } from "./data/data";
import { useEffect } from "react";
function TimeTable(props) {
  
  const [tAppointment,setTAppointment]= useState(props.tAppointment);
  const [appointList,setAppointList] = useState(getAppointList);
  const [showAppointModal, setShowAppointModal] = useState(false);
  const [showCancelModal, setCancelModal]=useState(false);

  
  const [appointmentId,setappointmentId]= useState(38);
  const [appointInfo,setAppointInfo] = useState(null);
  const appointmentTime = getAppointTime();

  useEffect(() => {
    setTAppointment(props.tAppointment);
    setIdx({
      start:0,
      end:3
    })
  },[props]);

  const [idx,setIdx] = useState({
    start:0,
    end:3
  });

  const btnNum=Math.ceil((Object.keys(tAppointment[0]).length)/4);
 


  const AppointModalClose = () => setShowAppointModal(false);
  const CancelModalClose = () => setCancelModal(false);
  const prevDate = () => {
    let date = new Date(props.startDate);
    date.setDate(date.getDate()-1);
    props.changeDate(date);
  }
  const nextDate = () => {
    let date = new Date(props.startDate);
    date.setDate(date.getDate()+1);
    props.changeDate(date);
  }
  
  const openModal = (time,doctor,value) => {
    console.log(doctor);
    const appointItem=appointList.filter(data => {
      return data.appointment_id === value
    })
    // console.log("",appointItem[0].appointment_state);
    if(value==null || appointItem[0].appointment_state==="취소"){
      setShowAppointModal(true);
      setAppointInfo({
        time,
        doctor
      })
    } else if(appointItem[0].appointment_state==="예약" ){
      console.log(value);
      setAppointInfo({
        time,
        doctor,
        patient_name:appointItem[0].patient_name,
        appointment_content:appointItem[0].appointment_content,
        appointment_id:value
      });
      setCancelModal(true);
    }
    
    console.log(time,doctor,value);
  }

  const appoint = (Info) => {
    console.log(Info);
    const patient = getPatientList().filter((data) => data.patient_id === Info.selectPatientId)[0];
    console.log(patient);
    if(Info.selectPatientId!==""){
      
      setAppointList(
        appointList.concat({
          appointment_id:appointmentId,
          patient_id:patient.patient_id,
          patient_name:patient.patient_name,
          patient_gender:patient.patient_gender,
          appointment_state:"예약",
          appointment_content:Info.treatmentContent
        })
      )

      const newTimeTables = tAppointment.map((data,index) => {
        if(appointmentTime.indexOf(appointInfo.time) ===index){
          let newData= {...data, [appointInfo.doctor]:appointmentId};
          return newData;
        } else {
          return data;
        }
      });
      setTAppointment(newTimeTables);
      setappointmentId(appointmentId+1);
      setShowAppointModal(false);
    }

    
  }

  
  const appointCancel = () => {
    const newAppointList=appointList.map(data => {
      if(data.appointment_id === appointInfo.appointment_id){
        let newData = {...data, appointment_state:"취소"}
        return newData;
      } else {
        return data;
      }
    })
    setAppointList(newAppointList);
    setCancelModal(false);
  }
  const changeIdx = (i) => {
    console.log(i);
    let start;
    if(i===btnNum-1 && ((Object.keys(tAppointment[0]).length)%4)!==0){
      let remainNum=(Object.keys(tAppointment[0]).length)%4;
      start=i*4-(4-remainNum);
      console.log(start);
    }else {
      start=i*4;
    }
      let end = start+3;
      setIdx({
        start,
        end
      });
  }

  const treatmentAppoint = () => {
    changeIdx(0);
    props.changeShow("TreatmentAppoint");
  }
  const testAppoint = () => {
    changeIdx(0);
    props.changeShow("TestAppoint");
  }
  return(
    <div className="TimeTable_contain">
        <div className="date_contain d-flex justify-content-between">
          <div className ="showAppoint">
            <button onClick={treatmentAppoint}>진료</button>
            <button onClick={testAppoint}>검사</button>
          </div>
          <div className="d-flex">
            <button className="btn" onClick={prevDate}>{`<`}</button>
            <div className="date">{props.startDate.getFullYear()}-{props.startDate.getMonth()+1}-{(props.startDate.getDate())}</div> 
            <button className="btn" onClick={nextDate}>{`>`} </button>
          </div>
          <div className="number">
          {[...Array(btnNum)].map((n, index) => {
            if(Object.keys(tAppointment[0]).length >= 5){
              return (
                <button key={index} onClick={() => changeIdx(index)}>
                    {index+1}
                </button>
              )
            }
            
          })}
            </div>
        </div>
        
        <table className="TimeTable table">
          <thead>
            <tr>
              <th>시간</th>
              {Object.keys(tAppointment[0]).map((data,index) => {
                if(idx.start<=index && index<=idx.end){
                  return (
                    <th key={data}>{[data]} </th>
                  )
                }
              })}
            </tr>
          </thead>
          <tbody>
            {tAppointment.map((data,index) => {
              return (
              <tr key={index}>
                <td>{appointmentTime[index]}</td>

                {Object.values(data).map((value,i) => {
                  
                  if(idx.start<=i && i<=idx.end){
                    const appointItem= appointList.filter(appoint => value === appoint.appointment_id);

                 if(appointItem.length!==0){
                  const appointment = appointItem[0];
                  let state;
                  if(appointment.appointment_state==="진료완료" || appointment.appointment_state==="검사완료") {
                    state="complete";
                  }else if(appointment.appointment_state==="예약"){
                    state="appoint";
                  } else {
                    state="cancel";
                  }
                  
                  return (
                    <td 
                    key={i} 
                    onClick={() => openModal(appointmentTime[index],Object.keys(data)[i],value)} 
                    className={
                                state === "complete" ? "completeTd" :((state === "appoint") ? "appointTd" : "cancelTd")
                              }
                    >
                        <div>
                          <span>{appointment.patient_name}</span><span>({appointment.patient_gender})</span> <span className="stateStyle">{appointment.appointment_state}</span> 
                          <div>{appointment.appointment_content}</div>
                        </div>
                        
                      </td>
                  )
                  
                 } else {
                   if(appointmentTime[index] ==="13:00"){
                    return (<td key={i} className="lunch">{value}</td>);
                   }
                   else{
                      return (<td key={i} className="empty" onClick={() => openModal(appointmentTime[index],Object.keys(data)[i],value)}></td>);                    
                   }
                   
                 } 
                  }
                                  
                })}
              </tr>
              )
            })}
          </tbody>
        </table>
        <Modal
          show={showAppointModal} 
          onHide={AppointModalClose}
          size="lg"
          centered="true"
          >
            <Appoint AppointModalClose={AppointModalClose} appoint={appoint}></Appoint>
        </Modal>

        <Modal
          show={showCancelModal} 
          onHide={CancelModalClose}
          size="sm"
          centered="true"
          >
            <Cancel CancelModalClose={CancelModalClose} appointInfo={appointInfo} appointCancel={appointCancel}></Cancel>
        </Modal>
    </div>
    
    
  );
}
export default TimeTable;

