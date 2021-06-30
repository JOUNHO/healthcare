
import { getStaffList } from "../data";
import styles from "./index.module.css"
function Staff(props) {
  const staffList = getStaffList();

  return(
    <div className={styles.staff_contain}>
      <div className={styles.classify}>
        <div>전체</div>|<div>의사</div>|<div>간호사</div>|<div>검사자</div>
      </div>

    <div className={styles.staff_table}>
      <div className={styles.staff_header}>
          <div>이름</div>
          <div>직책</div>
          <div>전화번호</div>
        </div>
      </div>

      {staffList.map((data,index) => {
        return(
          <div key={index} className={styles.staff_body}>
            <div className={styles.staff_name}>
              <div 
              className={styles.staff_img}
              >
                <img src={data.img} className={styles.staff_img_img}></img>
              </div>
                <span>{data.staff_name}</span>
            </div>
            <div>
              <div className={
                              data.staff_authority === "의사" ? 
                                `${styles.authority} ${styles.doctor_bg}` 
                                : 
                                (data.staff_authority === "간호사" ? `${styles.authority} ${styles.nurse_bg}` : `${styles.authority} ${styles.clinic_bg}`)
                              }
              >{data.staff_authority}</div>
            </div>
            <div className={styles.tel}>{data.staff_tel}</div>
          </div>
        );
      })}
    </div>
      
  );
}
export default Staff;