import style from "./TestList.module.css";
import { useCallback, useEffect, useState } from "react";

import testListData from "../data/testList";

function TestList(props){

  const getTestList = useCallback((event) => {
    // 스프링에서는 DB,(예약테이블) 오늘날짜, 예약종류(kind)가 검사인 튜플들을 가져오자. 
    // 예약시간으로 정렬해서 가져오자. 

    // 의사가 묶음코드 2개를 처방하여 한 날 검사 받을 수 있다. 
    // DB에서 불러와질 땐 검사번호, 묶음코드 복합키로 두개의 튜플이 불러와 진다.
    // 왼쪽 환자별 리스트에서는 하나만 보여주면 된다.
    // *****스프링에서 불러올 땐*********중요**********req가 1인 튜플들을 불러와야 한다. 
    // 즉 예약 테이블에 있어도 내원 하지 않았으면 뜨면 안 됌
    // 검사 예약자가 내원 후, 혹은 진료 후 간호사가 '당일검사요청' 버튼을 눌러야
    // 대기 리스트에 올아온다.

    // testLists - 중복제거 전 리스트 디비에서 불러와서 여기서 담김
    // newTestLists - 중복제거 후
 
    const newTestListDate = testListData.reduce( (acc, current) => {
      if (acc.findIndex(({ test_list_id }) => test_list_id === current.test_list_id) === -1) {
        acc.push(current);
      }
      return acc;
    }, []);

    return newTestListDate;
  },[])

  const [testLists, setTestLists] = useState([]);
  const [testList, setTestList] = useState();
  const [listState, setListState] = useState();

  useEffect(()=> {
    setListState("all");
  },[]);

  useEffect(()=>{
    setTestLists(getTestList);
  },[]);
  
  const selectListState = useCallback((state) => {
    setListState(state);
  },[]);

  useEffect(()=>{
    props.changeTestList(testList);
  },[testList])
  
  return(
    <div className={style.testList}>
      <div className={style.filter}>
        <div className={style.item} onClick={() => selectListState("all")}>전체</div>|
        <div className={style.item} onClick={() => selectListState("before")}>대기</div>|
        <div className={style.item} onClick={() => selectListState("ing")}>진행중</div>|
        <div className={style.item} onClick={() => selectListState("complete")}>완료</div>
      </div>
       <table className={`table table-hover ${style.testListTable}`}>
              <thead className={style.thead}>
                <tr>
                  <th scope="col" className="col-1">순서</th>
                  <th scope="col" className="col-1">환자번호</th>
                  <th scope="col" className="col-1">성명</th>
                  <th scope="col" className="col-1">예약시간</th>
                  <th scope="col" className="col-1">상태</th>
                </tr>
              </thead>
              <tbody>
              { listState === "all" ?
                testLists.map((item, index) => {
                  return (<tr key={index}
                              onClick={ () => setTestList(item.test_list_id)}>
                    <th>{index+1}</th>
                    <th>{item.patient_Id}</th>
                    <th>{item.patient_name}</th>
                    <th>{item.test_list_time}</th>
                    <th>{item.test_list_state}</th>
                  </tr>
                  );
                })
              : listState === "before" ?
                  testLists.filter( item => { return item.test_list_state === "대기"}).map((item, index)=> {
                    return (<tr key={index}
                                onClick={ () => setTestList(item.test_list_id)}>
                      <th>{index+1}</th>
                      <th>{item.patient_Id}</th>
                      <th>{item.patient_name}</th>
                      <th>{item.test_list_time}</th>
                      <th>{item.test_list_state}</th>
                    </tr>
                    );
                  })
                : listState === "ing" ?
                  testLists.filter( item => { return item.test_list_state === "진행중"}).map((item, index)=> {
                    return (<tr key={index}
                                onClick={ () => setTestList(item.test_list_id)}>
                      <th>{index+1}</th>
                      <th>{item.patient_Id}</th>
                      <th>{item.patient_name}</th>
                      <th>{item.test_list_time}</th>
                      <th>{item.test_list_state}</th>
                    </tr>
                    );
                  })
                  : listState === "complete" ?
                  testLists.filter( item => { return item.test_list_state === "완료"}).map((item, index)=> {
                    return (<tr key={index}
                                onClick={ () => setTestList(item.test_list_id)}>
                      <th>{index+1}</th>
                      <th>{item.patient_Id}</th>
                      <th>{item.patient_name}</th>
                      <th>{item.test_list_time}</th>
                      <th>{item.test_list_state}</th>
                    </tr>
                    );
                  })
                  : null
              }
              </tbody>
            </table>
    </div>
  );
}

export default TestList;