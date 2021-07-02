import moment from "moment";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { getFreeBoardAnswer } from "../../data";
import styles from "./index.module.css";
function FreeBoardModal(props) {
  const {showFreeBoardModal, closeFreeBoardModal, freeBoardItem} = props;
  const [freeBoardAnswer,setFreeBoardAnswer] =useState(getFreeBoardAnswer);

  const [answer,setAnswer] = useState("");

  const changeText = (e) => {
    setAnswer(e.target.value)
  }
  const addAnswer = () => {
    const newAnswerList=freeBoardAnswer.concat([
      {
        "freeboard_answer_content":answer,
        "freeboard_answer_date":moment().format('YYYY-MM-DD'),
        "freeboard_answer_time": moment().format('HH:mm'),
        "staff_name":"로그인Id"
      }
    ]
    )
    setFreeBoardAnswer(newAnswerList);
    setAnswer("");
  }
  return(
    <>
    {
      showFreeBoardModal ? (
        <Modal
      show={showFreeBoardModal} 
      onHide={closeFreeBoardModal}
      size="lg"
      centered="true"
      >
      <Modal.Header closeButton>
            <Modal.Title>자유게시판</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.body_answer}>
              <div className={styles.body}>
                <div className={styles.writer}>
                  <div>
                    <i className={`fas fa-user ${styles.img}`} ></i>
                  </div>
                  <div className={styles.wirter_content}>
                    <div className={styles.writer_name}>{freeBoardItem.staff_name}</div>
                    <div className={styles.write_date}>{(freeBoardItem.freeboard_date).substr(5,5)} {freeBoardItem.freeboard_time}</div>
                  </div>     
                </div>
                <div className={styles.title}>
                  {freeBoardItem.freeboard_title}
                </div>
                <div className={styles.content}>
                {(freeBoardItem.freeboard_content).split("\n").map((text,index) =>{
                    return ( 
                      <div key={index}>
                        {text}
                      </div>
                    )
                  })}
                </div>
              </div>
              {
                freeBoardAnswer ? 
                (
                  <div className={styles.answer}>
                    {freeBoardAnswer.map((data,index) =>{
                      return (
                        <div key={index}>
                          <hr></hr>
                          <div>
                            <div className={styles.answer_writer}>
                              <div>
                                <i className={`fas fa-user ${styles.Small_img}`} ></i>
                              </div>
                              <div>
                                {data.staff_name}
                              </div>
                            </div>
                            <div>
                              {data.freeboard_answer_content}
                            </div>
                            <div className={styles.answer_date}>
                              {(data.freeboard_answer_date).substr(5,5)} {data.freeboard_answer_time}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : null
              }
              
            </div>
            
            
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <div>
                <input type="text" placeholder="댓글을 입력하세요" onChange={changeText} className={styles.answer_text} value={answer}></input>
              </div>
              <div className={styles.register}>
                <button onClick={addAnswer} >
                  <i className={`far fa-check-circle ${styles.register_img}`}></i>
                </button>
              </div>
            </div>
          </Modal.Footer>
    </Modal>
      ) :
      null
    }
    </>
  );
}
export default FreeBoardModal;