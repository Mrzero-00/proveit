import React from 'react';
import { useEffect } from 'react';
import { Route,Prompt } from 'react-router-dom';
import BlogMain from '../Components/blog/BlogMain';
import Review from '../Components/blog/Review';
import Event from '../Components/Common/Event';
import Guideline from '../Components/Common/Guideline';
import HelpUs from '../Components/Common/HelpUs';
import Introduce from '../Components/Common/Introduce';
import StartQA from '../Components/Common/StartQA';
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
  <div style={{backgroundColor:"#FAFAFC"}}>

      <Route exact path="/" component={MainPage}></Route>
      <Route exact path="/event" component={Event}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/registerproduct" component={RegisterProduct}></Route>
      <Route exact path="/modifyProduct" component={ModifyProduct}></Route>
      <Route exact path="/anotheruserinfo" component={AnotherUser}></Route>
      <Route exact path="/product" component={Product}></Route>
      <Route exact path="/guideline" component={Guideline}></Route>
      <Route exact path="/tos" component={HelpUs}></Route>
      <Route exact path="/privacy_policy" component={HelpUs}></Route>
      <Route exact path="/proreviewer" component={BlogMain}></Route>
      <Route exact path="/review" component={Review}></Route>
      <Route exact path="/community" component={CommunityMain}></Route>
      <Route exact path="/communityitem" component={CommunityItem}></Route>
      <Route exact path="/community_add" component={CommunityAdd}></Route>
      <Route exact path="/community_modify" component={CommunityModify}></Route>
      <Route exact path="/introduce" component={Introduce}></Route>
      <Route exact path="/startQuestion" component={StartQA}></Route>
  </div>  
  )
}

export default Root;