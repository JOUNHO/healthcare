import { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import styles from "./index.module.css";
function NoticeModal(props) {
  const {showNoticeModal,closeNoticeModal,noticeItem} = props;
  
  const divRef = useRef();
  useEffect(() => {
    if(showNoticeModal){
      divRef.current.innerHTML=noticeItem.notice_content;
    }
  }, [showNoticeModal])

  return(
    <>
    {
      showNoticeModal ? (
        <Modal
      show={showNoticeModal} 
      onHide={closeNoticeModal}
      size="lg"
      centered="true"
      >
      <Modal.Header closeButton>
            <Modal.Title>공지사항</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.notice_title}>{noticeItem.notice_title}</div>
            <div className={styles.notice_content}>
            <div className={styles.notice_date}>작성일 : {noticeItem.notice_date}</div>
            <div ref={divRef}></div>
           
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <button onClick={closeNoticeModal} className={styles.close}>확인</button>
            </div>
          </Modal.Footer>
    </Modal>
      ) :
      null
    }
    </>
  );
}
export default NoticeModal;