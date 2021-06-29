import { useEffect, useRef } from "react";
import styles from "./NewsItem.module.css";
import moment from "moment";

function NewsItem(props) {
  const {article} = props;
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    let pubDate = new Date(article.pubDate);
    pubDate = moment(pubDate).format("YYYY.MM.DD. hh:mm A");

    titleRef.current.innerHTML = article.title + "  |   " + pubDate;
    descriptionRef.current.innerHTML = article.description;
    
  },[]);

  return (
    <>
      <div className={`${styles.link_border} border`}>
        <a href={article.link} className={styles.link_item}>
          <div className={styles.item_wrapper}>
            <div ref={titleRef} className={styles.link_title}>
            </div>
            <div ref={descriptionRef} className={styles.link_description}>
            </div>
          </div>
        </a>
        </div>
    </>
  );
}

export default NewsItem;