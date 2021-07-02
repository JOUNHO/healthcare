import styles from "./TestList.module.css";
import {getTestPatientList, getTestCodeList} from "../data";
import { useState, useEffect } from "react";
import AppointmentWithTestModal from "./AppointmentWithTestModal";
import TestPatientListItem from "./TestPatientListItem";
import TestListItem from "./TestListItem";
import RequestTest from "./RequestTest";

function TestList(props) {

  const {testAppointmentId} = props;
  // 검사 환자 리스트와 그 환자에 해당하는 검사리스트를 가지고옴
  const staticTestPatientList = getTestPatientList();
  const staticTestCodeList = getTestCodeList();
  
  const [testPatientList, setTestPatientList] = useState([]);    //모든 검사 환자 리스트를 초기 상태로 선언
  const [testCodeList, setTestCodeList] = useState([]);   //검사 리스트 빈 배열로 초기 상태 선언
  const [selectedTestCodes, setSelectedTestCodes] = useState([]);   //예약이 필요한 검사 리스트를 담을 상태
  const [patientId, setPatientId] = useState();   //선택한 환자 id
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false); 
  const [reqTestModalOpen, setReqTestModalOpen] = useState(false);
  const [isReq, setIsReq] = useState(false);  //검사 요청이 되었는지 아닌지
  const ReqTest = () => {
    setIsReq(true);
  };
  
  useEffect(() => {
    setIsReq(false);
  },[selectedTestCodes])

  useEffect(() => {
    console.log("검사 접수 실행");
    const newTest = testPatientList.concat(staticTestPatientList.filter(test => test.appointment_id === testAppointmentId));
    setTestPatientList(newTest);
    return (() => {
      console.log("검사 접수 언마운트시 실행");
    });
  },[testAppointmentId]);

  const listAll = () => {   //전체 클릭시 검사 환자 리스트 상태를 다시 당일 검사 환자 리스트로 세팅
    //setTestPatientList(staticTestPatientList);
  };

  const getAllLength = () => {  //검사 환자 리스트의 전체 건수를 반환해줌
    return testPatientList.length;
  };

  const listWithState = (testState) => {   //검사상태 클릭시 필터를 적용하여 클릭한 상태에 맞는 검사 환자 리스트 상태를 다시 세팅
    //const filteredTestPatientList = staticTestPatientList.filter(testPatient => testPatient.state === testState);
    //setTestPatientList(filteredTestPatientList);
  };

  const openAppointmentModal = () => {
    setAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setAppointmentModalOpen(false);
  };

  const openReqTestModal = () => {
    setReqTestModalOpen(true);
  };

  const closeReqTestModal = () => {
    setReqTestModalOpen(false);
  };

  const showTestList = (testListId, patientId) => {
    const testList = staticTestCodeList.filter(testCode => testCode.test_list_id === testListId);
    setTestCodeList(testList);
    setSelectedTestCodes([]);   //이전에 선택된 검사 리스트를 빈 배열로 세팅
    setPatientId(patientId);
  }
  const changeCheckedList = (event) => {
    if(event.target.checked) {
      setSelectedTestCodes(testCode => (selectedTestCodes.concat(event.target.value)));
    }
    else {
      setSelectedTestCodes(prev => (selectedTestCodes.filter(item => item !== event.target.value)));
    }
  }

  return (
    <div className={styles.test_list}>
      <div className={styles.test_patient_list}>
          <div className="mb-2 ml-2 d-flex">
            <img className="mr-3" src="/resources/svg/clipboard-data.svg"></img><span className="mr-3">검사</span>
            <div className="mr-2" onClick={listAll} style={{color : "#ffd43b"}}>전체 {getAllLength()} 건 </div>
            {/* <div className="mr-2" onClick={()=> listWithState("완료")}>완료  | </div>
            <div className="mr-2" onClick={()=> listWithState("진행중")}>진행중  | </div>
            <div className="mr-2" onClick={()=> listWithState("대기")}>대기 </div> */}
          </div>
          <div className="d-flex bg-light">
          <span className={`border ${styles.test_border}`}>
            순서
          </span>
          <span className={`border ${styles.test_border}`}>
            접수시간
          </span>
          <span className={`border ${styles.test_border}`}>
            이름
          </span>
          <span className={`border ${styles.test_border}`}>
            담당의
          </span>
          <span className={`border ${styles.test_border}`}>
            상태
          </span>
        </div>
        <div className={styles.patient_list_content}>
          {
            testPatientList.map((testPatient, index) => (
              <TestPatientListItem key={index} index={index} testPatient={testPatient} showTestList={showTestList}/>
            ))
          }
        </div>
      </div>
      <div className={styles.test_code_list}>
        <div className="mb-1 ml-2 d-flex">
          <img className="mr-3" src="/resources/svg/card-list.svg"></img>
          <span className="mr-2">검사 목록</span>
          <div className={styles.test_button}>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-2" onClick={openAppointmentModal}>검사예약</button>
            <AppointmentWithTestModal patientId={patientId} testCodes={selectedTestCodes} isOpen={appointmentModalOpen} close={closeAppointmentModal}/>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={openReqTestModal}>검사요청</button>
            <RequestTest patientId={patientId} testCodes={selectedTestCodes} isOpen={reqTestModalOpen} close={closeReqTestModal} ReqTest={ReqTest}/>
          </div>
        </div>
        <div className="d-flex bg-light">
          <span className={`border ${styles.test_code_border}`}>
            묶음코드
          </span>
          <span className={`border ${styles.test_code_border}`}>
            검사명
          </span>
          <span className={`border ${styles.test_code_border}`}>
            검사담당자
          </span>
          <span className={`border ${styles.test_code_border}`}>
            상태
          </span>
      </div>
      <div className={styles.patient_list_content}>
          {
            testCodeList.map((testCodes, index) => (
                <TestListItem testCodeList={testCodes} changeCheckedList={changeCheckedList} isReq={isReq} selectedTestCodes={selectedTestCodes} />
            ))
          }
      </div>
      </div>
    </div>
  );
}

export default TestList;