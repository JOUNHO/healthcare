import { Modal } from "react-bootstrap";
import styles from "./index.module.css";
function ImgNoticeModal(props) {
  const {showImgNoticeModal,closeImgNoticeModal,imgNoticeItem} = props;
  return(
    <>
    {
      showImgNoticeModal ? (
        <Modal
      show={showImgNoticeModal} 
      onHide={closeImgNoticeModal}
      size="lg"
      centered="true"
      >
      <Modal.Header closeButton>
            <Modal.Title>공지사항</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.img_notice_title}>{imgNoticeItem.img_notice_title}</div>
            <div className={styles.img_notice_content}>
              <div className={styles.img_notice_date}>작성일 : {imgNoticeItem.img_notice_date}</div>
              {/* <div><img src={imgNoticeItem.img_notice_img} height="200"/></div>      */}
              <div>
              {(imgNoticeItem.img_notice_content).split("\n").map((text) =>{
                return (
                  <>
                    {text}
                    <br/>
                  </>
                )
              })}
              </div>
            </div>
            
          </Modal.Body>
          <Modal.Footer>
            <div>
              <button onClick={closeImgNoticeModal} className={styles.close}>확인</button>
            </div>
          </Modal.Footer>
    </Modal>
      ) :
      null
    }
    </>
  );
}
export default ImgNoticeModal;