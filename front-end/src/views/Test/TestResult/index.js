import { useCallback, useEffect, useState } from "react";
import style from "./TestResult.module.css";

// 후에는 검사번호로 불러오기
import testResultsData from "../data/testResults"

function TestResult(props){

  const[testList, setTestList] = useState();         // 선택/검색한 검사번호
  const[testResults, setTestResults] = useState([]); // 왼쪽 테이블에서 하나의 검사를 선택했을 때 오른쪽에 표시되는 검사 목록
  const[isSaved, setIsSaved] = useState();
  let prevItem;  
  /**
   * 
   * 검사번호로 상세검사내역/결과 리스트를 불러옴
   * 검색, 혹은 리스트에서 선택한 검사의 상세(결과)가 오른쪽리스트에 표시된다.
   * 
   * TODO : api 요청으로 검사번호로 test_results 테이블에서 검사결과(상세) 객체를 요청한다.
   *        api가 반환하는 객체의 형태는    {test_list_id: 1, tId:1, test_code: "L2001", test_name: "CBC (CBC,PLT,DIFF)", test_details_code: "L2010", test_details_name:"RBC", test_details_unit:"x10^6/mm3",	test_details_min:"4.1", test_details_max:"10.2", test_result_value: "10"},
   *        반환된 newTestResults를 TestResult컴포넌트의 testResults 상태에 업데이트 한다.     
   */

  const getTestResults = useCallback(() => {
    const newTestResults = testResultsData.filter( item => { return item.test_list_id == testList});
    return newTestResults;
  },[testList]);

  useEffect(()=>{
    setTestList(props.testList);
  },[props.testList])

  useEffect(()=>{
    setTestResults(getTestResults);
    setIsSaved(props.isSaved);
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
   * 
   * TODO : testList 를 DB에 업데이트하는 api 작성
   * testResults 상태변수에는 각 상세검서와 입력한 결과값이 저장되어 있음
   */

  const saveResult = () => {
    //console.log(testResults);
    setIsSaved(true);
  }
  
  return(
    <div className={style.testResult}>
      <div>
       <table className={`table table-hover ${style.testResultTable}`}>
              <thead className={style.thead}>
                <tr>
                  <th scope="col" className="col-1">검사코드</th>
                  <th scope="col" className="col-3">검사명</th>
                  <th scope="col" className="col-1">처방코드</th>
                  <th scope="col" className="col-3">상세검사명</th>
                  <th scope="col" className="col-1">결과값</th>
                </tr>
              </thead>
              <tbody>
                { 
                  testResults && testResults.map((item, index) => {
                    if(prevItem !== item.test_code){
                        prevItem=item.test_code;
                      
                      return(<tr key={index}>
                                <td>{item.test_code}</td>
                                <td>{item.test_name}</td>
                                <td>{item.test_details_code}</td>
                                <td>{item.test_details_name}</td>
                                <td><input className={`form-control ${style.input}`}
                                           readOnly={isSaved && true}
                                           type="text"
                                           name={item.test_details_id}
                                           value={item.test_result_value}
                                           onChange={(event) => handleChange(event, index)}>
                                          </input></td>
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
                              <td>
                                <input className={`form-control ${style.input}`}
                                       readOnly={isSaved && true}
                                       type="text"
                                       name={item.test_details_id}
                                       value={item.test_result_value}
                                       onChange={(event) => handleChange(event,index)}
                                       >
                                       </input>
                                      </td>
                            </tr>
                            );
                    }
                  })
                }
              </tbody>
            </table>
            </div>
          { testList && !isSaved && <div className={style.saveButton} onClick={saveResult}>저장</div> }
    </div>
  );
}

export default TestResult;