import {Modal, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import styles from "./modifyPatientModal.module.css"
import moment from "moment";
import {checkPatientTel, modifyPatientInfo} from "../../../../apis/administration"

function ModifyPatientModal(props) {

  const {modifyPatientRenderer, isOpen, close, patient} = props;
  const [isChecked, setIsChecked] = useState("");
  const [gender, setGender] = useState("");
  const [medicine, setMedicine] = useState("");
  const [disease, setDisease] = useState("");
  const [comment, setComment] = useState("");
  const [tel, setTel] = useState("");
  const [modify, setModify] = useState({
    patient_id:"",
    patient_name: "",
    patient_birth: "",
    patient_tel: "",
    patient_gender:""
  })

  useEffect(() => {
    setModify({
      patient_id: patient.patient_id,
      patient_name: patient.patient_name,
      patient_gender: patient.patient_gender,
      patient_birth: patient.patient_birth,
      patient_tel: patient.patient_tel
    })
    setGender(patient.patient_gender);
    setMedicine(patient.patient_medicine);
    setDisease(patient.patient_disease);
    setComment(patient.patient_comment);
    setTel(patient.patient_tel);
  }, [isOpen]);

  const handleChange = (event) => {
    setModify({
      ...modify,
      [event.target.name] : event.target.value
    });
  };

  const checkTel = async() => {
    if(modify.patient_tel === "") {
      alert("환자의 연락처를 입력해주세요.")
      return;
    }
    try {
      const response = await checkPatientTel(modify.patient_tel);
      if(response.data === true) {
        alert("사용 가능한 연락처입니다.");
        setIsChecked(response.data);
      }else {
        alert("이미 존재하는 연락처입니다.");
        setIsChecked(response.data);
        setModify({
          ...modify,
          patient_tel: ""
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }
  const handleDiseaseChange = (event) => {
    setDisease(event.target.value);
  }
  const handleMedicineChange = (event) => {
    setMedicine(event.target.value);
    console.log(event.target.value);
  }
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  }

  const modifyPatient = async() => {
    if(modify.patient_name === "") {
      alert("환자의 이름을 입력해주세요.")
      return;
    }else if(modify.patient_gender === "") {
      alert("환자의 성별을 입력해주세요.")
      return;
    }else if(modify.patient_birth === "") {
      alert("환자의 생년월일을 입력해주세요.")
      return;
    }else if(modify.patient_tel === "") {
      alert("환자의 연락처를 입력해주세요.")
      return;
    }else if(medicine === "") {
      alert("환자의 복용약물을 입력해주세요.")
      return;
    }else if(disease === "") {
      alert("환자의 만성질환을 입력해주세요.")
      return;
    }else if(comment === "") {
      alert("환자의 특이사항을 입력해주세요.")
      return;
    }
    if(tel !== modify.patient_tel) {
      if(isChecked === "") {
        alert("연락처 중복 검사가 필요합니다.");
        return;
      }else if(isChecked === false) {
        alert("이미 존재하는 연락처입니다.")
        return;
      }
    }
    try{
      await modifyPatientInfo({...modify, patient_gender: gender, patient_disease: disease, patient_medicine: medicine, patient_comment: comment});
      modifyPatientRenderer();
    }catch(error) {
      console.log(error.message);
    }
    
    close();
  };

  return (
    <>
    {isOpen ? (
      <Modal show={isOpen} onHide={close} centered="true" className="modal">
      <Modal.Header closeButton>
        <Modal.Title>환자 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="register-form">
          <div className={styles.register_form_row}>
            <div className={`${styles.border_title} border`}>이름</div>
            <div>
              <input className="form-control" name="patient_name" value={modify.patient_name} onChange={handleChange}/>
            </div>
          </div>
          <div className={styles.register_form_row}>
            <div className={`${styles.border_title} border`}>생년월일</div>
            <div className={styles.register_form_birth}>
              <div className="d-flex">
                <input type="date" name="patient_birth" className="form-control" value={modify.patient_birth} onChange={handleChange}/>
              </div>
            </div>
          </div>
          <div className={styles.register_form_row}>
            <div className={`${styles.border_title} border`}>성별</div>
              <div className="d-flex">
                <div>
                  <input className="mr-1" type="radio" name="patient_gender" value="남" checked={gender === '남'} onChange={handleGenderChange} />
                  <label className="mr-3">남</label>
                </div>
                <div>
                  <input className="mr-1" type="radio" name="patient_gender" value="여" checked={gender === '여'} onChange={handleGenderChange} />
                  <span>여</span>
                </div>
              </div>
          </div>
          <div className={styles.register_form_row}>
            <div className={`${styles.border_title} border`}>연락처</div>
            <div>
              <input type="text" name="patient_tel" className="form-control" placeholder="'-' 포함 숫자 입력" value={modify.patient_tel} onChange={handleChange}/>
            </div>
            <div>
              <button className="btn btn-sm btn-secondary ml-2" onClick={checkTel}> 중복검사 </button>
            </div>
          </div>
          <div className={styles.register_form_row}>
            <div className={`${styles.border_title} border`}>복용약물</div>
            <div className="d-flex">
              <div className={`${styles.medicine}`}>
                <input className="mr-1" type="radio" name="patient_medicine" placeholder="" value="없음" checked={medicine === '없음'} onChange={handleMedicineChange}/><label className="mr-3">없음</label>
              </div>
              <div className={`${styles.medicine} d-flex`}>
                <div>
                  <input className="mr-1" type="radio" name="patient_medicine" value="" checked={medicine !== '없음'} onChange={handleMedicineChange}/><label className="mr-1">기타</label>
                </div>
                <div>
                  <input type="text" name="patient_medicine" className="form-control" placeholder="" value={medicine} onChange={handleMedicineChange}/>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.register_form_row}>
            <div className={`${styles.border_title} border`}>만성질환</div>
            <div className="d-flex">
              <div className={`${styles.medicine}`}>
                <input className="mr-1" type="radio" name="patient_disease" placeholder="" value="없음" checked={disease === '없음'} onChange={handleDiseaseChange}/><label className="mr-3">없음</label>
              </div>
              <div className={`${styles.medicine} d-flex`}>
                <div>
                  <input className="mr-1" type="radio" name="patient_disease" value="" checked={disease !== '없음'} onChange={handleDiseaseChange}/><label className="mr-1">기타</label>
                </div>
                <div>
                  <input type="text" name="patient_disease" className="form-control" placeholder="" value={disease} onChange={handleDiseaseChange}/>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.register_form_row}>
            <div className={`${styles.border_title} border`}>특이사항</div>
            <div className="d-flex">
              <div className={`${styles.medicine}`}>
                <input className="mr-1" type="radio" name="patient_comment" placeholder="" value="없음" checked={comment === '없음'} onChange={handleCommentChange}/><label className="mr-3">없음</label>
              </div>
              <div className={`${styles.medicine} d-flex`}>
                <div>
                  <input className="mr-1" type="radio" name="patient_comment" value="" checked={comment !== '없음'} onChange={handleCommentChange}/><label className="mr-1">기타</label>
                </div>
                <div>
                  <input type="text" name="patient_comment" className="form-control" placeholder="" value={comment} onChange={handleCommentChange}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className={styles.cancel_btn} onClick={close}>
            취소
        </button>
        <button className={styles.confirm_btn} onClick={modifyPatient}>
          등록
        </button>
      </Modal.Footer>
    </Modal>
    ) : null}
    </>
  );
}

export default ModifyPatientModal;