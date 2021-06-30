import  { useState }  from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from "./index.module.css";
import "./index.css";
import NoticeModal from '../DashBoard/Modal/NoticeModal';
function WriteNotice(props) {

  const [text, setText] = useState("");
  const [title,setTitle] = useState("");
  const [showNoticeModal,setShowNoticeModal] = useState(false);
  const [noticeItem,setNoticeItem] = useState(null);

  const openNoticeModal = () => {
    setShowNoticeModal(true);
  }
  const closeNoticeModal = () => {
    setShowNoticeModal(false);
  }
  const handleChange = (value) => {
    setText(value);
  }
  const changeTitle = (e) =>{
    setTitle(e.target.value);
  }
  const addNotice = () =>{
    console.log(text,title);
  }
  const preview = () => {
    let jsonData=new Object();
    jsonData.notice_title=title;
    jsonData.notice_content=text;
    jsonData.notice_date="2021-06-30";
    setNoticeItem(jsonData);
    openNoticeModal();
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'align': [] }, { 'color': [] }, { 'background': [] }],      
      ['clean']
    ],
  }
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "color",
    "background",
    "image",
  ];
  return(
    <>
    <div className={styles.contain}>
      <div className={styles.contain_div}>
        <div className={styles.title}>
        <span><input className={styles.title_input} type="text" placeholder="제목을 입력하세요" onChange={changeTitle}></input></span>
        <span><input className={styles.file} type="file"></input></span>
        </div>
        <ReactQuill value={text}
                    formats={formats}
                    modules={modules}
                    onChange={handleChange} 
                    className={styles.editor}/>
 
      </div>
      <div className={styles.footer}>
        <button onClick={preview}>미리보기</button>
        <button onClick={addNotice}>저장</button>
      </div>
    </div>
    <NoticeModal showNoticeModal={showNoticeModal} closeNoticeModal={closeNoticeModal} noticeItem={noticeItem}></NoticeModal>

    </>
  );
  
  
}
export default WriteNotice;