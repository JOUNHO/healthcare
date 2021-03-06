import Slider from "react-slick";
import styles from "./index.module.css";
import "./index.css";
import { getImgNotice } from "../data";
import ImgNoticeModal from "../Modal/ImgNoticeModal";
import { useState } from "react";
import { useEffect } from "react";
import { getImgNoticeList, updateHitCount } from "../../../apis/dashboard";
import { Link } from 'react-router-dom';
import { faBatteryThreeQuarters, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
function ImgNotice(props) {
  const [showImgNoticeModal,setShowImgNoticeModal] = useState(false);
  const [imgNoticeItem,setImgNoticeItem] = useState(false);
  const [imgNotice,setImgNotice] = useState([]);
  const authority = useSelector((state) => state.authReducer.authority);
  let infi= true;
  if(imgNotice.length<4){
    infi=false;
  }
  var settings = {
    speed: 500,
    infinite: infi,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  useEffect(() => {
    (async function() {
      const response = await getImgNoticeList();
      setImgNotice(response.data);
    })();
  },[showImgNoticeModal])

  //모달창 열기
  const openImgNoticeModal = (data) => {
    (async function(){
      try{
        updateHitCount(data.img_notice_id);
      } catch(error){
        throw error;
      }
    })();
    setImgNoticeItem(data);
    setShowImgNoticeModal(true);
  }


  //모달창 닫기
  const closeImgNoticeModal = () => {
    setShowImgNoticeModal(false);
  }

  return(
    <>
      <div className={styles.ImgNotice_contain}>
      <Slider {...settings}>
          {imgNotice.map((data,index) => {
            return(
              <div key={index} className={styles.imgItem}>
                <div className={styles.Item} onClick={() =>openImgNoticeModal(data)}>
                  <div className={styles.img_contain}>
                    <img src={`${process.env.REACT_APP_URL}/dashboard/imgnotice/downloadAttach/${data.img_notice_id}`} width="300px" height="160px"></img>
                  </div>
                  <div className={styles.ImgNoticeItem}>
                    <div className={styles.ImgNotice_title}>
                      {data.img_notice_title}
                    </div>
                    <div className={styles.ImgNotice_content}>
                      <div dangerouslySetInnerHTML={{ __html: data.img_notice_content }}></div>
                    </div>
                    
                    <div className={`d-flex justify-content-between ${styles.hit_date_contain}`}>
                      <i class="fas fa-search">
                        <span className={styles.hitCount}>{data.img_notice_hitcount}</span>
                      </i> 
                      <span className={styles.ImgNotice_date}>{data.img_notice_date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
            );
          })}
      </Slider>
      {
        authority ==="ROLE_ADMIN" ?
          <Link to="/noticeeditor/writeimgnotice" className={styles.add_btn} >
            <FontAwesomeIcon icon={faPlus} className={styles.plus}/>
          </Link>
          :
          null
      }
      

      </div>
      <ImgNoticeModal showImgNoticeModal={showImgNoticeModal} closeImgNoticeModal={closeImgNoticeModal} imgNoticeItem={imgNoticeItem}></ImgNoticeModal>
    </>     
  );
}
export default ImgNotice;