import style from "./StaffCard.module.css";
import { faUserMd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { downloadAttach } from "../../../apis/account";

/**
 * 오른쪽 테이블에서 선택한 직원이 왼쪽 직원카드에 상세 정보가 표시된다.
 * 전달받은 prop을 화면에 표시한다.
 */

function StaffCard(props){

  let staff = null;

  if(props.staff){
    staff = props.staff[0];
  }

  const [imgSrc, setImgSrc] = useState(null);

  useEffect( () => {
    if(staff && staff.sataff_attachoname!==""){ 
      const work = async () => {
        try{
          const response = await downloadAttach(staff.staff_id);
          setImgSrc(URL.createObjectURL(response.data)); 
        } catch(error){
          //
        }
      };
      work();   
    }
  },[staff]); 

  return(
    <div className={style.staffcard}>
      <div className={style.top}>
        <div className={style.pic}>

        {staff && 
        (staff.staff_attachoname !== "") ? 
        <img src={imgSrc}/>
        :  <FontAwesomeIcon icon={faUserMd} className={style.profile}/>
        }
        </div>
      </div>
      {
      staff ? 
      <div className={style.intro}>
        <div className={style.mainInfo}>
        <span className={ staff.staff_authority === "의사" ? `${style.role} ${style.doctor}` : 
                          staff.staff_authority === "간호" ? `${style.role} ${style.nurse}` :
                          staff.staff_authority === "임상" ? `${style.role} ${style.tester}`:null               
                          }>{staff.staff_authority}</span>
          <span className={style.name}>{staff.staff_name}</span>
          <hr/>
        </div>
        <div className={style.subInfo}>
          <span className={style.title}>연락처</span>
          <span className={style.content}>{staff.staff_tel}</span>
          <span className={style.title}>직원 ID</span>
          <span className={style.content}>{staff.staff_id}</span>
          <span className={style.title}>입사일</span>
          <span className={style.content}>{staff.staff_join}</span>
        </div>
      </div>
      
      : null 
      }


      <div className={style.bottom}>
        
      </div>
    </div>
  );
}

export default StaffCard;