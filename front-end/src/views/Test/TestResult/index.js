import React from "react";

import { useEffect, useState } from "react";
import style from "./TestResult.module.css";

import { getTestResult, saveTestResult } from "../../../apis/test";

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function TestResult(props){

  const[testList, setTestList] = useState();         // 선택/검색한 검사번호
  const[testResults, setTestResults] = useState([]); // 왼쪽 테이블에서 하나의 검사를 선택했을 때 오른쪽에 표시되는 검사 목록
  const[isSaved, setIsSaved] = useState();
  //const[searched, setSearched] = useState(false);

  let searched = props.searched
  let patient = props.patient;
  let prevItem;  


  /**
   * 
   * 검사번호로 상세검사내역/결과 리스트를 불러옴
   * 검색, 혹은 리스트에서 선택한 검사의 상세(결과)가 오른쪽리스트에 표시된다.
   * 
   */
  const getResults = async () => {
    if(testList != null && testList != undefined && testList.test_list_id !=""){
      try{
        const promise = await getTestResult(testList.test_list_id, testList.reception_id);
        setTestResults(promise.data);
      }catch(error){
        console.log(error);
      }
    }
  };

  useEffect(()=>{
    setTestList(props.testList);
  },[props.testList])

  useEffect(()=>{
    getResults();
    setIsSaved(props.isSaved);
    //setSearched(props.searched);
  },[testList]);

  /**
   * 상세검사목록에서 입력되는 값의 변화가 일어날 때마다 (onChange) 
   * 새로운 객체배열을 만들어 testList 상태를 업데이트 한다.
   * 
   * param {결과값(input)} event 
   * param {상세결과 항목을 구분하기 위함} index 
   */

  const handleChange = (event, index) =>{
    if(testResults){
      let newTestResult = [...testResults];
      newTestResult[index].test_result_value = event.target.value;
      setTestResults(newTestResult);
    }
  }

  /**
   * 저장버튼 클릭시 현재 상태를 저장한다.
   */
  const saveResult = async () => {

    await saveTestResult(testResults)
    setIsSaved(true);
    alert("저장되었습니다.");
  }
  
  return(
    <div className={style.testResult}>
      <div>
          <div className={style.xlsbutton}>
            <div className={style.testid}>검사번호 : 
            {
                (testList != null && testList != undefined && testList.test_list_id !="")&&
                `  ${testList.test_list_id}`
            }
            </div>
            {
            (testList != null && testList != undefined && testList.test_list_id !="" && isSaved && patient)&&
            <ReactHTMLTableToExcel
                          className={style.exportxls}
                          table="result"
                          filename={`${patient.patient_name}-${testList.test_list_id}`}
                          sheet="tablexls"
                          buttonText="XLS 내보내기"/>
            }
          </div>
       <table className={`table table-hover ${style.testResultTable}`} id="result">
         { 
         (testList != null && testList != undefined && testList.test_list_id !="" && patient) && 
         <div className={style.testinfo}>
           <span className={style.no}>검사번호 : {testList.test_list_id}</span>
           <br/>
           <span className={style.patientinfo}>검사자 : {patient.patient_name}/{patient.patient_gender}/{patient.patient_birth}</span>
           <span>{"  "}</span>
           <span>{"  "}</span>
          </div>
        }
              <thead className={style.thead}>
                <tr>
                  <th scope="col" className="col-1">검사코드</th>
                  <th scope="col" className="col-3">검사명</th>
                  <th scope="col" className="col-1">처방코드</th>
                  <th scope="col" className="col-3">상세검사명</th>
                  <th scope="col" className="col-2">참고치</th>
                  <th scope="col" className="col-1">결과값</th>
                </tr>
              </thead>
              <tbody>
                { 
                  testResults.length>0 && testResults.map((item, index) => {
                    if(prevItem !== item.test_code){
                        prevItem=item.test_code;
                      
                      return(<tr key={index}>
                                <td>{item.test_code}</td>
                                <td>{item.test_name}</td>
                                
                                <td>{item.test_details_code}</td>
                                <td>{item.test_details_name}</td>
                                <td>{item.test_details_min} - {item.test_details_max}{item.test_details_unit}</td>
                                <td><input className={`form-control ${style.input}`}
                                           readOnly={isSaved && true}
                                           type="text"
                                           name={item.test_details_id}
                                           value={item.test_result_value || ""} 
                                           onChange={(event) => handleChange(event, index)}>
                                          </input>
                                          <span className={style.resultHidden}> {item.test_result_value || ""} </span>
                                </td>
                              </tr>
                            );
                    }
                    else{
                      prevItem=item.test_code;
                      return(<tr key={index}>
                              <td></td>
                              <td></td>
                              <td>{item.test_details_code}</td>
                              <td>{item.test_details_name}</td>
                              <td>{item.test_details_min} - {item.test_details_max}{item.test_details_unit}</td>
                                <td><input className={`form-control ${style.input}`}
                                           readOnly={isSaved && true}
                                           type="text"
                                           name={item.test_details_id}
                                           value={item.test_result_value || ""} 
                                           onChange={(event) => handleChange(event, index)}>
                                          </input>
                                          <span className={style.resultHidden}> {item.test_result_value || ""} </span>
                                </td>
                            </tr>
                            );
                    }
                  })
                }
              </tbody>
            </table>
            </div>
          { testList && testList.test_list_id !="" ? 
            !isSaved && searched == true && <div className={style.saveButton} onClick={saveResult}>저장</div> 
            : null
          }
    </div>
  );
}

export default React.memo(TestResult);