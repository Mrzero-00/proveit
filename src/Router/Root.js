import React from 'react';
import { Route,Prompt } from 'react-router-dom';
import BlogMain from '../Components/blog/BlogMain';
import Review from '../Components/blog/Review';
import HelpUs from '../Components/Common/HelpUs';
import CommunityAdd from '../Components/Community/CommunityAdd';
import CommunityItem from '../Components/Community/CommunityItem';
import CommunityMain from '../Components/Community/CommunityMain';
import CommunityModify from '../Components/Community/CommunityModify';
import MainPage from '../Components/MainPage';
import ModifyProduct from '../Components/Product/ModifyProduct';
import Product from '../Components/Product/Product';
import RegisterProduct from '../Components/Product/RegisterProduct';
import AnotherUser from '../Components/User/AnotherUser';
import Profile from '../Components/User/Profile';
import SignUp from '../Components/User/SignUp';


const Root = ()=>{
  window.addEventListener("beforeunload",()=>{
    window.sessionStorage.setItem("reset","리셋");
  });

  return(
  <div style={{width:"100vw",height:"100vh",color:"#505050"}}>
      <Route exact path="/" component={MainPage}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/registerproduct" component={RegisterProduct}></Route>
      <Route exact path="/modifyProduct" component={ModifyProduct}></Route>
      {/* {localStorage.getItem("token")?<Route exact path="/signup" component={SignUp}></Route>:<Route exact path="/signup" component={MainPage}></Route>}
      {localStorage.getItem("token")!==null?<Route exact path="/profile" component={Profile}></Route>:<Route exact path="/profile" component={MainPage}></Route>}
      {localStorage.getItem("token")!==null?<Route exact path="/registerproduct" component={RegisterProduct}></Route>:<Route exact path="/registerproduct" component={MainPage}></Route>}
      {localStorage.getItem("token")!==null?<Route exact path="/modifyProduct" component={ModifyProduct}></Route>:<Route exact path="/modifyProduct" component={MainPage}></Route>} */}
      <Route exact path="/anotheruserinfo" component={AnotherUser}></Route>
      <Route exact path="/product" component={Product}></Route>
      <Route exact path="/guideline" component={HelpUs}></Route>
      <Route exact path="/tos" component={HelpUs}></Route>
      <Route exact path="/privacy_policy" component={HelpUs}></Route>
      <Route exact path="/proreviewer" component={BlogMain}></Route>
      <Route exact path="/review" component={Review}></Route>
      <Route exact path="/community" component={CommunityMain}></Route>
      <Route exact path="/communityitem" component={CommunityItem}></Route>
      <Route exact path="/community_add" component={CommunityAdd}></Route>
      <Route exact path="/community_modify" component={CommunityModify}></Route>
  </div>  
  )
}

export default Root;