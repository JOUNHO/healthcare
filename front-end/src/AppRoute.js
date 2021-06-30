import { Redirect, Route , Switch } from "react-router-dom";
import Appointment from "./views/Appointment";
import Treatment from "./views/Treatment";
import Administration from "./views/Administration";
import DashBoard from "./views/DashBoard";
import Test from "./views/Test";
import Home from "./views/Home";
import Account from "./views/Account";
import WriteNotice from "./views/WriteNotice";
import Error from "./views/Error";

function AppRoute(){
  return(
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/dashBoard" exact component={DashBoard}/>
      <Route path="/treatment" exact component={Treatment}/>
      <Route path="/appointment" exact component={Appointment}/>
      <Route path="/administration" exact component={Administration}/>
      <Route path="/test" exact component={Test}/>
      <Route path="/account" exact component={Account}/>
      <Route path="/writenotice" exacct component={WriteNotice}/>
      <Route path="/error" exact component={Error}/>
      {/* //회원로그인 임시로 라우트 */} 
      <Redirect to="/"/>
    </Switch>
  );
}
export default AppRoute;