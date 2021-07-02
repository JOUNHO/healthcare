import style from "./Login.module.css";
import { faKey, faUser, faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Login({history}){
  return(
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <img className={style.loginImg} src="../../resources\img\login_dz_logo2.jpg" />
        <span className={style.title}>WELCOME</span>
        <div className={style.idWrapper}>
          <div className={style.iconBox}><FontAwesomeIcon icon={faHospital} className={style.idIcon}/></div>
          <input className={`form-control ${style.hospitalCode}`} type="text" placeholder="hospital code"></input>
        </div>
        <div className={style.idWrapper}>
          <div className={style.iconBox}><FontAwesomeIcon icon={faUser} className={style.idIcon}/></div>
          <input className={`form-control ${style.staffId}`} type="text" placeholder="user id"></input>
        </div>
        <div className={style.pwdWrapper}>
          <div className={style.iconBox}><FontAwesomeIcon icon={faKey} className={style.pwdIcon}/></div>
          <input className={`form-control ${style.staffPwd}`} type="password" placeholder="user password"></input>
        </div>
        <div className={style.loginButtonArea}>
          <Link to="/dashboard"><button className={style.appoint_btn}>
            Login
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;