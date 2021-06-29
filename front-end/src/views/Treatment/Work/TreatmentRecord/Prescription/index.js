import style from "./Prescription.module.css";
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from "@material-ui/lab";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* 약데이터 */
import data from "../../../data/medicine";
/* 과거 처방 샘플 데이터 */
import data2 from "../../../data/prescriptions";
import data3 from "../../../data/treatment";

// 처방 목록 필요 데이터 형태
// {tId: 1, "code": "NIZA15", "name": "AXID Cap 150mg", "kind" : "내복약", "type":	"T",comment: 3},
// 리덕스 스토어에 저장된 진료번호로 DB 테이블에서 진료 id로 불러오자.

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetCurPrescriptionsActoin } from "../../../../../redux/treatment-reducer";

function Prescription(props){

  const treatment = useSelector(state => state.treatmentReducer.treatment);
  const patient = useSelector(state => state.treatmentReducer.patient);
  const work = useSelector(state => state.treatmentReducer.work);

  const getPrescriptions = useCallback((event) => {
    // spring 연결하면  axios 로 요청해서 가져오자
    const prevPrescriptions = data2.filter(item => item.treatment_id === treatment);
    return prevPrescriptions;
  },[treatment]);

  const dispatch = useDispatch();
  
  const [prescription, setPrescription] = useState({medicine_code:""})
  const [prescriptions, setPrescriptions] = useState(getPrescriptions);
  const [editBlock, SetEditBlock] = useState(true);

  useEffect(()=>{
    setPrescriptions(getPrescriptions);
  },[work]);

  useEffect(()=> {
    setPrescriptions(getPrescriptions);
  },[treatment])

  useEffect(()=>{
    setPrescriptions([]);
  },[patient]);

  useEffect(()=>{
    dispatch(createSetCurPrescriptionsActoin(prescriptions)) 
  },[prescriptions]);

  //  진료, 환자 바뀌면 리덕스 스토어 상태 초기화.
  useEffect(()=> {
    dispatch(createSetCurPrescriptionsActoin({})) 
  },[patient, treatment]);
    
  useEffect( () => {
    const curTreatment = data3.find(item => item.treatment_id === treatment);
    const today = getCurrentDate();
    SetEditBlock(true);
    if (curTreatment && today === curTreatment.treatment_date){
        SetEditBlock(false);
        setPrescriptions([]);
      }
    },[treatment]);


  const addPrescription = useCallback((event) => {
    
    if( (!editBlock) && prescriptions && prescription.medicine_code !== ""){
      let able = true;
      for(let i=0; i<prescriptions.length; i++){
        if(prescriptions[i].medicine_code === prescription.medicine_code){
          able = false;
        }
      }
      if(able){
        const newPrescriptions = prescriptions.concat({treatment_id:treatment, 
                                      medicine_code: prescription.medicine_code, 
                                      medicine_name: prescription.medicine_name, 
                                      medicine_kind: prescription.medicine_kind,
                                      medicine_type: prescription.medicine_type,             
                                      prescription_comment:prescription.prescription_comment});
        setPrescriptions(newPrescriptions);
      }
      setPrescription({medicine_code:""});
    }
  },[prescription, prescriptions]);

  const deletePrescription = useCallback((event, code) => {
    if (!editBlock){
      const newPrescriptions = prescriptions.filter(prescriptions => prescriptions.medicine_code !== code);
      setPrescriptions(newPrescriptions);
    }
  },[prescription,prescriptions]);

  return(
    <div className={style.prescription}>
      <div className={style.title}>
        처방
      </div>
      <div className={style.prescriptionList}>
      <table className={`table table-sm table-hover ${style.prescriptionTable}`}>
            <thead className={style.thead}>
              <tr>
                <th scope="col" className="col-1">약코드</th>
                <th scope="col" className="col-4">약명</th>
                <th scope="col" className="col-2">구분</th>
                <th scope="col" className="col-2">타입</th>
                <th scope="col" className="col-2">처방일수</th>
                <th scope="col" className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              {
                prescriptions.map((item, index) => {
                  return (<tr key={index}>
                            <td>{item.medicine_code}</td>
                            <td>{item.medicine_name}</td>
                            <td>{item.medicine_kind}</td>
                            <td>{item.medicine_type}</td>
                            <td>{item.prescription_comment}</td>
                            <td onClick={(event) => deletePrescription(event, item.medicine_code)}><FontAwesomeIcon icon={faMinus} className={style.minus}/></td>
                        </tr>);
                })
              }
            </tbody>
          </table>

          <div className={style.add}>
          <span className={style.addTitle}> 약명 : </span> 
          <Autocomplete className={style.input}
                          options={data}
                          getOptionLabel={(option) => option.medicine_name}
                          onChange={(event, newValue) => {
                            setPrescription({
                             ...newValue,
                             prescription_code:0
                            });
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          />
          <span className={style.addTitle}>처방일수 : </span>
          <div className={style.comment}>
            <input type="number"
                   className={style.day}
                   name="prescription_comment" 
                   value={prescription.prescription_comment||0}
                   onChange={(event, newValue) => {
                      setPrescription(
                        {
                          ...prescription,
                         [event.target.name]: event.target.value
                        })
                   }}>
            </input>
          </div>
          <div className={style.addButton} onClick={addPrescription}> 
              <FontAwesomeIcon icon={faPlus} className={style.plus}/>
          </div>

          </div>
      </div>
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


export default Prescription;