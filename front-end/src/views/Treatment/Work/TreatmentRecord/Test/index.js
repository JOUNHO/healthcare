import style from "./Test.module.css";
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from "@material-ui/lab";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";


// 진단 검사 데이터
import data from "../../../data/test";
// 과거 진단 검사의뢰 데이터
import data2 from "../../../data/testLists"
import data3 from "../../../data/treatment";
import { useDispatch, useSelector } from "react-redux";
import { createSetCurTestsActoin } from "../../../../../redux/treatment-reducer";
import TestAddModal from "./TestAddModal/TestAddModal";


function Test(props){

  const treatment = useSelector(state => state.treatmentReducer.treatment);
  const patient = useSelector(state => state.treatmentReducer.patient);
  const work = useSelector(state => state.treatmentReducer.work);

  const getTest = useCallback((event) => {
    const prevTests = data2.filter(item => item.treatment_id === treatment);
    return prevTests;
  },[treatment]);

  const [tests, setTests] = useState(getTest);
  const [editBlock, SetEditBlock] = useState(true);

  const [addModalOpen, setAddModalOpen] = useState(false);

  const dispatch = useDispatch();

  const openAddModal = () => {
    if(!editBlock){
      setAddModalOpen(true);
    }
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  useEffect(()=>{
    setTests(getTest);
  },[work]);

  useEffect(()=> {
    setTests(getTest);
  },[treatment])

  useEffect(()=> {
    setTests([]);
  },[patient]);

  useEffect(()=>{
    dispatch(createSetCurTestsActoin(tests))
  },[tests])

   //  진료, 환자 바뀌면 리덕스 스토어 상태 초기화.
  useEffect(()=> {
    dispatch(createSetCurTestsActoin({})) 
  },[patient, treatment]);


  useEffect( () => {
    const curTreatment = data3.find(item => item.treatment_id === treatment);
    const today = getCurrentDate();
    SetEditBlock(true);
    if (curTreatment && today === curTreatment.treatment_date){
        SetEditBlock(false);
        setTests([]);
      }
    },[treatment]);

  const addTests  = (test) => {
    if( (!editBlock) && tests){
      let able = true;
      for(let i=0; i<tests.length; i++){
        if(tests[i].test_code === test.test_code){
          able = false;
        }
      }
      if(able){
        const newTest = tests.concat(test);
        setTests(newTest);
      }
    }
  } 

  const deleteTest = useCallback((code) => {
    if(!editBlock){
      const newTests = tests.filter(test => test.test_code !== code);
      setTests(newTests);
    }
  },[tests]);

  return(
    <div className={style.test}>
      <div className={style.title} onClick={openAddModal}>
        검사
      </div>
      <div className={style.testList}>
        <table className={`table table-sm table-hover ${style.testTable}`}>
              <thead className={style.thead}>
                <tr>
                  <th scope="col" className="col-4">검사코드</th>
                  <th scope="col" className="col-6">검사명</th>
                  <th scope="col" className="col-1"></th>
                </tr>
              </thead>
              <tbody>
              {
              tests.map((item) => { 
                return (<tr key={item.test_code}> 
                          <td>{item.test_code}</td> 
                          <td>{item.test_name}</td>
                          <td onClick={() => deleteTest(item.test_code)}><FontAwesomeIcon icon={faMinus} className={style.minus}/></td>
                        </tr>); })
            }
              </tbody>
            </table>
      </div>
      <TestAddModal isOpen={addModalOpen} close={closeAddModal} addTests={addTests}/>
    </div>
  );
}

const getCurrentDate = () => {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();
  var day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();
  return year +  "-" + month + "-" + day ;
}

export default Test;