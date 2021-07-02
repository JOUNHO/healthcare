import { useState } from "react";
import { getFreeBoard } from "../data";
import FreeBoardModal from "../Modal/FreeBoardModal";
import WriteModal from "../Modal/FreeBoardModal/WriteModal";
import styles from "./index.module.css";
function FreeBoard(props) {
  const freeBaord = getFreeBoard();
  const [showFreeBoardModal,setShowFreeBoardModal] = useState(false);
  const [showWriteModal,setShowWriteModal] = useState(false);

  const [freeBoardItem,setFreeBoardItem] = useState(null);
  const openFreeBoardModal = (data) => {
    setFreeBoardItem(data);
    setShowFreeBoardModal(true);
  }
  const closeFreeBoardModal = () => {
    setShowFreeBoardModal(false);
  }

  const openWriteBoardModal = () => {
    setShowWriteModal(true);
  }
  const closeWriteBoardModal = () => {
    setShowWriteModal(false);
  }

  return(
    <>
    <div className={styles.FreeBoard_contain}>
      <div className={`${styles.FreeBoard_header} d-flex justify-content-between`}>
        <div>
          <i class="fas fa-bullhorn"> </i>
          <span>자유게시판</span>
        </div>
        <button onClick={openWriteBoardModal}><i class="fas fa-pencil-alt"></i>글 쓰기</button>
      </div>
      <div className={styles.FreeBoard_body}>
        {
          freeBaord.map((data,index) => {
            return(
              <div key={index} className={`${styles.FreeBoard_item} d-flex justify-content-between`} onClick={() => openFreeBoardModal(data)}>
                <div className={styles.FreeBoard_title}>{data.freeboard_title}</div>
                <div className={styles.FreeBoard_etc}>
                  <span>{data.freeboard_date}</span>
                  <span>{data.patient_name}</span>
                  <i class="far fa-comment"></i>
                  <span>{data.freeboard_comment}</span>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
    <FreeBoardModal showFreeBoardModal={showFreeBoardModal} closeFreeBoardModal={closeFreeBoardModal} freeBoardItem={freeBoardItem}></FreeBoardModal>
    <WriteModal showWriteModal={showWriteModal} closeWriteBoardModal={closeWriteBoardModal}></WriteModal>

    </>
  );
}
export default FreeBoard;