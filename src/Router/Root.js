import React from 'react';
import { Route } from 'react-router-dom';
import HelpUs from '../Components/Common/HelpUs';
import MainPage from '../Components/MainPage';
import ModifyProduct from '../Components/Product/ModifyProduct';
import Product from '../Components/Product/Product';
import RegisterProduct from '../Components/Product/RegisterProduct';
import Profile from '../Components/User/Profile';
import SignUp from '../Components/User/SignUp';


const Root = ()=>{
  return(
  <div style={{
    width:"100vw"}}>
      <Route exact path="/" component={MainPage}></Route>
      {sessionStorage.getItem("googleProfile")!==null?<Route exact path="/signup" component={SignUp}></Route>:<Route exact path="/signup" component={MainPage}></Route>}
      {sessionStorage.getItem("userInfo")!==null?<Route exact path="/profile" component={Profile}></Route>:<Route exact path="/profile" component={MainPage}></Route>}
      {sessionStorage.getItem("userInfo")!==null?<Route exact path="/registerproduct" component={RegisterProduct}></Route>:<Route exact path="/registerproduct" component={MainPage}></Route>}
      {sessionStorage.getItem("userInfo")!==null?<Route exact path="/modifyProduct" component={ModifyProduct}></Route>:<Route exact path="/modifyProduct" component={MainPage}></Route>}
      <Route exact path="/product" component={Product}></Route>
      <Route exact path="/guideline" component={HelpUs}></Route>
      <Route exact path="/tos" component={HelpUs}></Route>
      <Route exact path="/privacy_policy" component={HelpUs}></Route>
  </div>  
  )
}

export default Root;