import style from "./Account.module.css";
import StaffAdd from "./StaffAdd";
import StaffCard from "./StaffCard";
import StaffTable from "./StaffTable";
import { useEffect, useState } from "react";

import staffs from "./data/staffs"

/**
 * 
 * 오른쪽 테이블에서 직원을 선택하여 왼쪽 직원카드에 정보를 표시한다.
 * 직원 테이블 컴포넌트에는 직원ID 상태를 변경하는 함수를 프롭으로 전달한다.
 * 직원ID를 통해 직원상태변수를 업데이트하여 직원카드 컴포넌트에게 프롭으로 전달한다.
 * 직원수정의 경우에도 직원 상태변수를 StaffAdd 컴포넌트에게 프롭으로 전달한다.  
 * 
 */

function Account(props){

  const [staffId, setStaffId] = useState();
  const [staff, setStaff] = useState();

  const handleChangeStaffId = (id) => {
    setStaffId(id);
  }

  /**
   * 직원ID를 통해 직원상태변수를 초기화한다.
   * 
   * TODO : 직원ID로 직원정보를 요청하는 axois 요청 api 작성
   * 반환형태는  {staff_id: "", staff_authority: "", staff_name: "", staff_tel: "", staff_join:"",staff_attachoname:""},
   * 
   * 첨부가 없다면, 되도록 "" 형태로 받자
   * staff_authority : "의사" || "간호" || "임상"
   */

  const getStaff = () => {
    const staff = staffs.filter((item)=> item.staff_id === staffId);
    return staff;
  }

  useEffect(()=>{
    setStaff(getStaff);
  },[staffId]);

  return(
    <div className={style.account}>
      <div className={style.top}>
        <StaffAdd staff={staff}/>
      </div>
      <div className={style.body}>
        <StaffCard staff={staff}/>
        <StaffTable handleChangeStaffId={handleChangeStaffId}/>
      </div>
    </div>
  );
}

export default Account;