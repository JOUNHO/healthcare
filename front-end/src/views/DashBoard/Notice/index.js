import { useState } from "react";
import { getNotice } from "../data";
import NoticeModal from "../Modal/NoticeModal";
import { Modal } from "react-bootstrap";

import styles from "./index.module.css";
function Notice(props) {
  const notice = getNotice();
  const [showNoticeModal,setShowNoticeModal] = useState(false);
  const [noticeItem,setNoticeItem] = useState(null);
  const openNoticeModal = (data) => {
    console.log(noticeItem);
    setNoticeItem(data);
    setShowNoticeModal(true);
  }
  const closeNoticeModal = () => {
    setShowNoticeModal(false);
  }
  return(
    <div className={styles.Notice_contain}>
      <div className={styles.Notice_header}>
        <i class="fas fa-bullhorn"></i>
        <span>공지사항</span>
        
      </div>
      <div className={styles.Notice_body}>
          {
            notice.map((data,index) => {
              return(
                <div key={index} className={`${styles.Notice_item} d-flex justify-content-between`} onClick={() => openNoticeModal(data)}>
                <div className={styles.Notice_title}>{data.notice_title}</div>
                <div>{data.notice_date}</div>
                </div>
              );
            })
          }
      </div>
 
      <NoticeModal showNoticeModal={showNoticeModal} closeNoticeModal={closeNoticeModal} noticeItem={noticeItem}></NoticeModal>
    </div>
  );
}
export default Notice;