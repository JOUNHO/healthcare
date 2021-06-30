import { useState } from "react";
import style from "./Search.module.css"
import testListData from "../data/testList";

function Search(props){

  const[testListId, setTestListId] = useState("");

  const handleChange = (event) => {
    setTestListId(event.target.value);
  }

  /**
  * 검사결과를 입력하기 위한 검사번호 검색창
  * 검사번호가 유효한지 확인하고, 유효하면,
  * 부모 컴포넌트의 검사번호를 프롭으로 전달받은 함수를 통해 변경한다. 
  * 
  * TODO : 검사번호로 test_lists 테이블에서 유효한(존재하는)검사번호 인지만 확인
  */

  const searchTestListId = () => {
    const testLists = testListData;
    const isValid = testLists.filter((item)=>item.test_list_id == testListId);
    if(isValid.length !== 0)
      props.searchTestList(testListId);
    else{
      alert("검사번호가 유효하지 않습니다.");
    }
  }
  
  return(
    <div className={style.search}>
      <input className={`form-control ${style.field}`} onChange={handleChange} type="text" placeholder="바코드(검사번호)를 입력하세요."></input>
      <button type="button" className={`btn btn-light ${style.searchButton}`} onClick={searchTestListId}>검색</button>
    </div>
  );
}

export default Search;