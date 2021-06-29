import styles from "./Notice.module.css";
import {getNoticeList} from "../data";
import { useEffect, useState, Fragment } from "react";
import NoticeModal from "./NoticeModal";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Notice(props) {

  const staticNoticeList = getNoticeList();
  const [noticeList, setNoticeList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNo, setSelectedNo] = useState(-1);

  useEffect(()=>{
    staticNoticeList.sort((a, b) => b.dz_notice_no - a.dz_notice_no);
    setNoticeList(staticNoticeList);
  },[]);

  const openModal = (noticeNo) => {
    setIsOpen(true);
    setSelectedNo(noticeNo);
  }
  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className={styles.notice}>
      <div className="d-flex">
        <div className={styles.icon_wrapper}><FontAwesomeIcon icon={faFlagCheckered} className={styles.icon}/></div>
        <div><span className={styles.title}>Notice</span></div>
      </div>
      <div>
        <div className={styles.first_row}>
          <div className={styles.notice_no}><span >No.</span></div>
          <div className={styles.notice_title}><span >Title</span></div>
          <div className={styles.notice_badge}><span ></span></div>
          <div className={styles.notice_writer}><span >Writer</span></div>
          <div className={styles.notice_date}><span >Date</span></div>
        </div>
      </div>
      <div className={styles.notice_items}>
        {noticeList.map((notice, index) => (
          <Fragment key={notice.dz_notice_no}><div className={styles.rows} onClick={() => openModal(notice.dz_notice_no)}>
            <div className={styles.notice_no_item}><span >{index+1}</span></div>
            <div className={styles.notice_title_item}><span >{notice.dz_notice_title}</span></div>
          {notice.dz_notice_date === "2021-06-30" ? 
            (<div className={styles.notice_badge}><span className={`${styles.notice_badge_item} badge badge-primary`}>new</span></div>) 
            : 
            (<div className={styles.notice_badge}><span ></span></div>)}
            <div className={styles.notice_writer_item}><span >{notice.dz_notice_writer}</span></div>
            <div className={styles.notice_date_item}><span >{notice.dz_notice_date}</span></div>
          </div>
          </Fragment>
        ))}
        <NoticeModal isOpen={isOpen} close={closeModal} selectedNo={selectedNo}/>
      </div>
    </div>
  );
}

export default Notice;