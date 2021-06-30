import { Link } from "react-router-dom";

function AppMenu(props){
  return(
    <ul className="nav flex-column" >
      <li className="nav-item mt-5">
        <Link to="/dashBoard" className="nav-link mt-2"><i className="fas fa-home"></i></Link>
        <Link to="/appointment" className="nav-link"><i className="far fa-calendar"></i></Link>
        <Link to="/administration" className="nav-link"><i className="far fa-file-alt"></i></Link>
        <Link to="/treatment" className="nav-link"><i className="fas fa-stethoscope"></i></Link>
        <Link to="/test" className="nav-link"><i className="fas fa-vial"></i></Link>
        <Link to="/account" className="nav-link"><i className="fas fa-user-cog"></i></Link>
        <Link to="/writenotice" className="nav-link"><i class="fas fa-edit"></i></Link>
      </li>
    </ul>
  );
}

export default AppMenu;