import { useEffect, useState } from "react";
import NoticeModal from "../Modal/NoticeModal";
import { Modal } from "react-bootstrap";
import styles from "./index.module.css";
import { getNoticeList } from "../../../apis/dashboard";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

function Notice(props) {

  const [notice , setNotice] = useState([]);
  const [showNoticeModal,setShowNoticeModal] = useState(false);
  const [noticeItem,setNoticeItem] = useState(null);
  const authority = useSelector((state) => state.authReducer.authority);
  useEffect(() => {

    (async function() {
      try{
        const response = await getNoticeList();
        setNotice(response.data);
      } catch(error){
        throw error;
      }
    })();
  },[showNoticeModal])
  const openNoticeModal = (data) => {
    setNoticeItem(data);
    setShowNoticeModal(true);
  }
  const closeNoticeModal = () => {
    setShowNoticeModal(false);
  }
  return(
    <div className={styles.Notice_contain}>
      <div className={`${styles.Notice_header} d-flex justify-content-between`}>
        <div>
        <i className="fas fa-flag-checkered"></i>
          <span>공지사항</span>
        </div>
        <div>
          {
            authority === "ROLE_ADMIN" ?
              <Link to="/noticeeditor/writenotice" className={styles.link}>공지 작성</Link>
              :
              null
          }
          
        </div>
        
      </div>
      {
        notice &&
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
      }
      
 
      <NoticeModal showNoticeModal={showNoticeModal} closeNoticeModal={closeNoticeModal} noticeItem={noticeItem}></NoticeModal>
    </div>
  );
}
export default Notice;