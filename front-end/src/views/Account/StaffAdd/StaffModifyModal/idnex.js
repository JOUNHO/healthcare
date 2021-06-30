import style from "./StaffModifyModal.module.css";

import { Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { removeAccount, updateAccount } from "../../../../apis/account";

import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StaffModifyModal(props){

  const {isOpen, close, staff} = props;

  const[newAccount, setNewAccount] = useState();

  const inputFile = useRef();

  useEffect(()=>{
    if(staff){
      setNewAccount(staff[0]);
    }
  },[staff])

  const handleChange = (event) => {
    setNewAccount({ ...newAccount,
    [event.target.name]: event.target.value});
  }

  /**
   * 직원의 비밀번호, 연락처 프로필 사진을 수정할 수 있다.
   * 
   * 처음 모달이 보여질 때 비밀번호 입력필드는 비워져 보여진다.
   * 입력값이 없으면 수정이 없음으로 판단하고, 값이 입력될경우 수정되는 비밀번호로 판단한다. 
   * 
   * 프로필 사진첨부의 경우에도 첨부된 수정여부 판단여부는 비밀번호의 경우와 같다.
   * (파일이 있을경우 수정, 비었을 경우 유지)
   * 
   * TODO : axios 요청 api 작성
   *        spring rest 작성시 입력값의 유무에 따라 수정여부 판단하기
   */

  const handleModify = async(event) => {
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append("staff_id", newAccount.staff_id);
      formData.append("staff_password", newAccount.staff_password);
      formData.append("staff_tel", newAccount.staff_tel);
      formData.append("staff_attachoname", inputFile.current.files[0]);
      await updateAccount(formData)
    } catch (error) {
      
    }
    close();
  }

  const handleRemove = async() => {
    try{
      await removeAccount( newAccount.staff_id);
    }catch(error){
      
    }
    init();
    close();
  }

  const init = () => {
    setNewAccount({
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

          {/* 
            첨부파일과, 버튼을 form 태그 안에 묶어 줌.
            그 외 항목은 form 태그 밖 상태로 작성.
          */}
          
          { newAccount ? 
          <>
            <div className={style.item}>
              <span className={style.title}>직원이름</span>
              <input readOnly type="text" name="staff_name" className={`form-control ${style.addInput}`} value={newAccount.staff_name} onChange={handleChange} />
            </div>
            <div className={style.item}>
              <span className={style.title}>아이디</span>
              <input readOnly type="text" name="staff_id" className={`form-control ${style.addInput}`} value={newAccount.staff_id} onChange={handleChange}/>
            </div>
            <div className={style.item}>
            <span className={style.title}>비밀번호</span>
              <input type="password" name="staff_password" className={`form-control ${style.addInput}`} onChange={handleChange}/> 
            </div>
            <div className={style.item}>
              <span className={style.title}>연락처</span>
              <input type="text" name="staff_tel" className={`form-control ${style.addInput}`} value={newAccount.staff_tel} onChange={handleChange}/>
            </div>
            <form onSubmit={handleModify}> 
              <div className={`${style.item} ${style.pic}`}>
                <span className={style.title}>프로필사진</span>
                <span><input id="attach" name="staff_attachoname" type="file" className="form-control-file" ref={inputFile}/></span>
              </div>
              <div className={style.actionButton}>
                <span className={style.cancel} onClick={handleClose}>취소</span>
                <input type="submit" className={style.join} value="수정"/>
              </div>
              <div className={style.removeButton}>
                <span className={style.remove} onClick={handleRemove}>퇴사</span>
              </div>
            </form>
          </>
          : <div className={style.noSelect}>
              <span><FontAwesomeIcon icon={faQuestionCircle} className={style.noSelectIcon}/></span>
              <span className={style.comment}>직원을 선택해주세요.</span>
          </div> }

        </Modal.Body>
      </Modal>
    ):null}
    </>
  );
}

export default StaffModifyModal;