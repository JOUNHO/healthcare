import { useState, useRef } from "react";
import { Toast, ToastHeader } from "react-bootstrap";
import styles from "./index.module.css";
import Staff from "./Staff";
import Room from "./Room";
import "./index.css";
import ChatRoom from "./ChatRoom";
import { useEffect } from "react";
import Paho from "paho-mqtt";
import { useSelector } from "react-redux";

/*
  Title : Chat
  Description : 채팅 컴포넌트(tab-직원/채팅)

  Date : 2021-07-18 ~ 2021-07-20
  Author : 조운호
*/
function Chat(props) {
  const {chatShow,chatToggle,setMessage} =props;
  const [tab, setTab] =useState("staff");
  const [roomClick,setRoomClick] = useState(false);
  const [clickRoomId, setClickRoomId] = useState(null);
  const [mqttMessage, setMqttMessage] = useState("");
  const [opacity,setOpacity] = useState(false);
  const staff_id = useSelector(state => state.authReducer.staff_id);
  const handleTabStaff = () => {
    setTab("staff")
  }
  const handleTabChat = () => {
    setTab("chat")
  }
  const handleOpacity = () => {
    setOpacity(!opacity);
  }
  let client = useRef(null);
  const MqttBroker = () => {
    
    client = new Paho.Client("kosa3.iptime.org",50014, "chatclient-"+new Date().getTime());
    // client = new Paho.Client("localhost",61614 , "chatclient-" + new Date().getTime());
    client.connect({onSuccess: () => {
      client.unsubscribe("/"+sessionStorage.getItem("hospital_code")+"/"+sessionStorage.getItem("staff_id"));
      client.subscribe("/"+sessionStorage.getItem("hospital_code")+"/"+sessionStorage.getItem("staff_id"));
    }
    });
    client.onMessageArrived = (msg) => {
      let message = JSON.parse(msg.payloadString);
      message = message.content.split('/');
      setMqttMessage(message);
    };
    client.onConnectionLost = () => {
      console.log("접속 끊김");
    };
  }
  
  useEffect(() => {
     MqttBroker();
     return () => {
      client.disconnect();
     }
  },[chatShow,staff_id])

  useEffect(() => {
    if(!roomClick)
    setMessage(mqttMessage);
  },[mqttMessage])
  return(
    <Toast show={chatShow} onClose={chatToggle}  className={opacity?  `${styles.chat} ${styles.opacity}` : `${styles.chat}` } > 
    {
      !roomClick ?
      <>
      <Toast.Header className={styles.chat_header}>
        <div className="d-flex">
          <button onClick={handleTabStaff} className={styles.staffIcon}><i className="fas fa-user-alt"></i></button>
          <button onClick={handleTabChat} className={styles.chatIcon}><i className="far fa-comment"></i></button>
          <button onClick={handleOpacity} className={styles.opacityIcon}><i class="fas fa-hand-sparkles"></i></button>
        </div>
      </Toast.Header>
      <Toast.Body className={styles.chat_body}>
        <div className={styles.chat_body}>
          {
            tab ==="staff" ?
            <Staff setRoomClick={setRoomClick} setClickRoomId={setClickRoomId}></Staff>
            :
            <Room setRoomClick={setRoomClick} setClickRoomId={setClickRoomId} mqttMessage={mqttMessage} roomClick={roomClick}></Room>
          }
        </div>
      </Toast.Body>
      </>
    :
      <ChatRoom setRoomClick={setRoomClick} clickRoomId={clickRoomId} mqttMessage={mqttMessage} setMessage={setMessage}></ChatRoom>
    }
    
  </Toast>
  );
}
export default Chat;