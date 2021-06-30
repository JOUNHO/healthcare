import style from "./StaffAddModal.module.css";

import { Modal } from "react-bootstrap";
import { useRef, useState } from "react";
import { createAccouont } from "../../../../apis/account";

function StaffAddModal(props) {

  const {isOpen, close} = props;

  const[account, setAccount] = useState({
      staff_name: "",
      staff_id: "",
      staff_password:"",
      staff_tel:"",
      staff_authority:"",
  })

  const handleChange = (event) => {
    setAccount({...account,
                [event.target.name]: event.target.value
              });
  };

  const handleChangeRole = (staff_authority) => {
    setAccount({...account, staff_authority});
  }

  
  /**
   * 직원을 추가한다. 
   * 
   * TODO : axios 요청 api 작성"
   */

  const inputFile = useRef();

  const handleAdd = async(evnet) => {
    evnet.preventDefault();
    try{
      const formData = new FormData();
      formData.append("staff_name", account.staff_name);
      formData.append("staff_id", account.staff_id);
      formData.append("staff_password", account.staff_password);
      formData.append("staff_tel", account.staff_tel);
      formData.append("staff_authority", account.staff_role);
      formData.append("staff_attachoname", inputFile.current.files[0]);
      await createAccouont(formData);
    } catch (error){
      console.log(error);
    }
    init();
    close();
  }

  const init = () => {
    setAccount({
      staff_name: "",
      staff_id: "",
      staff_password:"",
      staff_tel:"",
      staff_authority:"",
    });
  }
  
  const handleClose = () => {
    init();
    close();
  }
  
  return (
    <>
    {isOpen? (
      <Modal
        show={isOpen}
        onHide={close}
        centered="true"
        keyboard={false}
      >
        <Modal.Body className={style.body}>
            <div className={style.item}>
              <span className={style.title}>직원이름</span>
              <input type="text" name="staff_name" className={`form-control ${style.addInput}`} value={account.staff_name} onChange={handleChange} />
            </div>
            <div className={style.item}>
              <span className={style.title}>아이디</span>
              <input type="text" name="staff_id" className={`form-control ${style.addInput}`} value={account.staff_id} onChange={handleChange}/>
            </div>
            <div className={style.item}>
            <span className={style.title}>비밀번호</span>
              <input type="password" name="staff_password" className={`form-control ${style.addInput}`} value={account.staff_password} onChange={handleChange}/> 
            </div>
            {/* <div className={style.item}>
            <span className={style.title}>비밀번호확인</span>
              <input type="password" name="password2" className={`form-control ${style.addInput}`}/>
            </div> */}
            <div className={style.item}>
              <span className={style.title}>연락처</span>
              <input type="text" name="staff_tel" className={`form-control ${style.addInput}`} value={account.staff_tel} onChange={handleChange}/>
            </div>
            <div className={`${style.item} ${style.role}`}>
              <span className={ account.staff_authority === "doctor" ? `${style.selectRole}` : `${style.roleButton}`} onClick={()=>handleChangeRole("doctor")}>의사</span>
              <span className={ account.staff_authority === "nurse" ? `${style.selectRole}` : `${style.roleButton}`} onClick={()=>handleChangeRole("nurse")}>간호사</span>
              <span className={ account.staff_authority === "tester" ? `${style.selectRole}` : `${style.roleButton}`} onClick={()=>handleChangeRole("tester")}>임상병리사</span>
            </div>
            <form onSubmit={handleAdd}> 
              <div className={`${style.item} ${style.pic}`}>
                <span className={style.title}>프로필사진</span>
                <span><input id="staff_attachoname" name="staff_attachoname" type="file" className="form-control-file" ref={inputFile}/></span>
              </div>
              <div className={style.actionButton}>
                <span className={style.cancel} onClick={handleClose}>취소</span>
                <input type="submit" className={style.join} value="등록"/>
              </div>
            </form>
       

        </Modal.Body>
      </Modal>
    ):null}
    </>
  );
}

export default StaffAddModal;