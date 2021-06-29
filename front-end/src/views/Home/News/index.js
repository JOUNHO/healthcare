import {useState, useEffect} from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import styles from "./index.module.css";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function News(props) {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("의료");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log("gdgd");
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "/v1/search/news.json",{
            params: {
              query: query,
              display: 10,
              sort: "sim"
            },
            headers: {
              'X-Naver-Client-Id': process.env.REACT_APP_X_Naver_Client_Id,
              'X-Naver-Client-Secret': process.env.REACT_APP_X_Naver_Client_Secret
            }
          }
        );
        setArticles(response.data.items);
      } catch(e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  },[query]);

  console.log(articles);

  //대기중
  if(loading) {
    return <>
    <div className={styles.spinner_wrapper}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </>
  }

  //아직 articles 값이 설정되지 않았을 때
  if(articles===null) {
    return null;
  }

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const search = () => {
    setQuery(keyword);
  }

  //articles 값이 유효 할 때
  return (
    <div className={styles.news_wrapper}>
      <div className="d-flex">
        <div className={styles.icon_wrapper}><FontAwesomeIcon icon={faNewspaper} className={styles.icon}/></div>
        <div><span className={styles.title}>Headlines</span></div>
        <div className={styles.search_wrapper}>
          <div className={"input-group d-flex"}>
            <input type="text" className="form-control" placeholder="keyword" onChange={handleChange} />
          <div>
            <button type="button" className="btn btn-secondary" onClick={search}>search</button>
          </div>
          </div>
      </div>
      </div>
      
      <div className={styles.news_list_wrapper}>
        {articles.map((article, index) => (
          <NewsItem key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export default News;