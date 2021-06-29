import style from "./DiagnoseAddModal.module.css";
import { Modal } from "react-bootstrap";
import data from "../../../../data/disease";
import { useState } from "react";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * 질병을 검색하고 진단을 추가한다.
 * 
 * TODO : 검색된 질병이름을 통해 질병테이블에서 질병데이터를 요청하는 API 작성
 * 요청데이터의형태
 * {disease_code:  "", disease_name: ""},
 */

function DiagnoseAddModal(props){

  const {isOpen, close} = props;

  const [searchItem, setSearchItem] = useState();
  const [diseases, setDiseases] = useState([]);

  const handleChange = (event) => {
    setSearchItem(event.target.value);
  }

  const handleSearch = () => {
    const diseaseData = data;
    const newDiseases = diseaseData.filter( item => item.disease_name.includes(searchItem))
    setDiseases(newDiseases);
  }

  /**
   * 진단을 추가한다.
   * 
   * 선택된 질병은 부모컴포넌트의 함수를 통해, 부모컴포넌트의 진단(배열)상태를 업데이트 한다. 
   */
  const addDiagnoses = (item) => {
    let diagnose = item;
    props.addDiagnoses(diagnose);
  }

  return(
    <>
    {isOpen? (
      <Modal
        show={isOpen}
        onHide={close}
        centered="true"
        keyboard={false}
        size="lg"
      >
        <Modal.Body className={style.body}>
          <div className={style.searchBody}>
            <div className={style.top}>
              <div className={style.search}>
                <span className={style.title}>
                  <span className={style.titleContent}>질병진단</span>
                </span>
                <input type="text" className={`form-control-lg form-rounded ${style.input}`}
                       value={searchItem || ''} 
                       onChange={handleChange} />
                <span className={style.searchButton} onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} className={style.searchIcon}/>검색</span>
              </div>
              <div className={style.searchResult}>
                <table className={`table table table-hover ${style.searchResultTable}`}>
                  <thead className={style.thead}>
                    <tr>
                      <th scope="col" className="col-1">코드</th>
                      <th scope="col" className="col-3">질병명</th>
                      <th scope="col" className="col-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      diseases.map((item, index)=>{
                        return(
                          <tr key={index}>
                            <td>{item.disease_code}</td>
                            <td>{item.disease_name}</td>
                            <td>
                              <FontAwesomeIcon icon={faPlus} className={style.plus} onClick={()=>{addDiagnoses(item)}}/>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              </div>
              <div className={style.bottom}>
              </div>
            </div>
        </Modal.Body>
      </Modal>
    ):null}
    </>
  );
}

export default DiagnoseAddModal;