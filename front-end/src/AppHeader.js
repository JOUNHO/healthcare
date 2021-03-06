import { faHospital, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { createSetAuthTokenAction, createSetStaffAuthorityAction, createSetStaffIdAction, createSetStaffNameAction, createSetHospitalCodeAction, createSetHospitalNameAction, createSetAuthority, createSetAuthorityAction } from "./redux/auth-reducer";
import { removeAuthHeader } from "./apis/axiosConfig";
import { useHistory } from "react-router";

function AppHeader(props){

  const [time, setTime] = useState(moment());
  const staff_name = useSelector((state) => state.authReducer.staff_name);
  const staff_id = useSelector((state) => state.authReducer.staff_id);
  const staff_authority = useSelector((state) => state.authReducer.staff_authority);
  const hospital_name = useSelector((state) => state.authReducer.hospital_name);
  const client = useSelector((state) =>state.mqttReducer.client);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect( () => {
    setInterval(() => {
      setTime(moment());
    }, 1000);
  }, []);

  const logout = (event) => {
     //Redux
     dispatch(createSetStaffIdAction(""));
     dispatch(createSetAuthTokenAction(""));
     dispatch(createSetStaffNameAction(""));
     dispatch(createSetStaffAuthorityAction(""));
     dispatch(createSetHospitalCodeAction(""));
     dispatch(createSetHospitalNameAction(""));
     dispatch(createSetStaffAuthorityAction(""));
     dispatch(createSetAuthorityAction(""));
     removeAuthHeader();
     //SessionStorage에 인증 내용 제거
     sessionStorage.removeItem("staff_id");
     sessionStorage.removeItem("authToken");
     sessionStorage.removeItem("staff_name");
     sessionStorage.removeItem("staff_authority");
     sessionStorage.removeItem("hospital_code");
     sessionStorage.removeItem("hospital_name");
     sessionStorage.removeItem("staff_authority");
     sessionStorage.removeItem("authority");
     client.disconnect();
     window.location.replace("/")
  }
  return(
    <div className="appHeader">
      <div className="hospitalTitle">
      {
          staff_name !=="" ? 
          <>
          <FontAwesomeIcon icon={faHospital} className="hospitalIcon"/>
        <span className="name">{hospital_name}</span>
          </>
          :
          null
        }

        
      </div>
      <div className="currentTime">
        <div className="date">{time.format('YYYY-MM-DD   ')}</div>
        <div className="time">{time.format('HH:mm:ss')}</div>
      </div>
      <div className="loginUser">
        {
          staff_name !=="" ? 
          <>
          <span className="name">{staff_authority} {staff_name}</span>
          <span className="logOut" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} className="logOutIcon" />log-out</span>
          </>
          :
          null
        }
        
      </div>
    </div>
  );
}

export default AppHeader;

