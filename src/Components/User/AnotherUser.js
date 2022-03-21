import React, { useEffect, useState } from 'react';


import icon_profile_item_comment from '../../image/icon_profile_item_comment.png';
import icon_profile_item_like from '../../image/icon_profile_item_like.png';
import icon_profile_notItem from '../../image/icon_profile_notItem.png';

import icon_profile_commentIcon from '../../image/icon_profile_commentIcon.png';

import icon_review_title from '../../image/icon_review_title.svg';
import icon_community_title_icon from '../../image/icon_community_title_icon.png';

import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import Header from '../Common/Header';
import SignupWindow from '../Common/SignupWindow';
import LoginWindow from '../Common/LoginWindow';


const Body =()=>{
    const [pageNum,setPageNum] =useState(0);
    const [likelyProducts,setLikelyProducts] =useState([]);
    const [myReply,setMyReply] =useState([]);
    const [productNum,setProductNum] =useState({
        like:0,
        introduce:0,
        make:0,
        community:0
    });
    const [renderList,setRenderList]= useState("like");
    const [rendering,setrendering] =useState(false);
    const [myProducts,setMyProducts] = useState([]);
    const [currentUserInfo,setCurrentUserInfo] = useState({

    })

    const userInfoGetApi = async(type)=>{
        var data = new FormData();
        data.append('user_id', window.location.search.substring(1));
        data.append('type', type);
        try{
            await axios({
                method:"post",
                url : "https://proveit.co.kr/api/mypage.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "400"){
                    if(type==="userInfo"){
                        setCurrentUserInfo(e.data.list);
                        setrendering(true);
                    }
                }else if(e.data.ret_code === "0000"){
                    if(type==="likeProdcut"){
                        setLikelyProducts(e.data.list);
                    }else if(type==="myReply"){
                        setMyReply(e.data.list);
                    }else if(type==="counting"){
                        setProductNum({
                            like:e.data.list.like*1,
                            introduce:e.data.list.introduce*1,
                            make:e.data.list.make*1,
                        });
                    }else{
                        setMyProducts(e.data.list);
                    }
                }
            })
        }catch{
      
        }
    }

    useEffect(()=>{
        userInfoGetApi("userInfo");
        userInfoGetApi("counting");
        userInfoGetApi("myReply");
        userInfoGetApi("likeProdcut");
        if(rendering){
            if(renderList==="like"){
                userInfoGetApi("likeProdcut");
            }else if(renderList ==="introduce" || renderList ==="make"){
                userInfoGetApi("myProduct");
            }
        }
    },[renderList])

    const ProductRender =({item,type,index})=>{
        return(
            <>
            {item.category&&<div style={{position:"relative"}}>
                {type==="like"&&<Link to={`/product?productnum=${item.id}`}>
                    <div id={item.id} 
                        onClick={(e)=>{e.stopPropagation();}}
                        className="profile_item_render"
                        >
                        <div className="profile_product_thumbnail" style={{backgroundImage:`url(${item.thumbnail})`}}></div>
                        <div className="profile_product_info">
                            <div className="profile_product_title">{item.title}</div>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_comment})`,backgroundSize:'cover',marginRight:"8px"}}></div>
                                <div className="profile_product_info_text">{item.review_count}</div>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_like})`,backgroundSize:'cover',marginRight:"8px",marginLeft:"8px"}}></div>
                                <div className="profile_product_info_text">{item.like_count}</div>
                            </div>
                        </div>

                    </div>
                </Link>}
                {(type==="myProduct"&&item.make_by==="true")&&<Link to={`/product?productnum=${item.id}`}>
                    <div id={item.id} 
                        onClick={(e)=>{e.stopPropagation();}}
                        className="profile_item_render"
                        >
                        <div className="profile_product_thumbnail" style={{backgroundImage:`url(${item.thumbnail})`}}></div>
                        <div className="profile_product_info">
                            <div className="profile_product_title">{item.title}</div>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_comment})`,backgroundSize:'cover',marginRight:"8px"}}></div>
                                <div className="profile_product_info_text">{item.review_count}</div>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_like})`,backgroundSize:'cover',marginRight:"8px",marginLeft:"8px"}}></div>
                                <div className="profile_product_info_text">{item.like_count}</div>
                            </div>
                        </div>
                    </div>
                </Link>}
                {(type==="introduceProduct"&&item.make_by==="false")&&<Link to={`/product?productnum=${item.id}`}>
                    <div id={item.id} 
                        onClick={(e)=>{e.stopPropagation();}}
                        className="profile_item_render"
                        >
                        <div className="profile_product_thumbnail" style={{backgroundImage:`url(${item.thumbnail})`}}></div>
                        <div className="profile_product_info">
                            <div className="profile_product_title">{item.title}</div>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_comment})`,backgroundSize:'cover',marginRight:"8px"}}></div>
                                <div className="profile_product_info_text">{item.review_count}</div>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_like})`,backgroundSize:'cover',marginRight:"8px",marginLeft:"8px"}}></div>
                                <div className="profile_product_info_text">{item.like_count}</div>
                            </div>
                        </div>
                    </div>
                </Link>}
            </div>}
            </>
        )
    }

    window.history.pushState(null,"",window.location.href);
    window.onpopstate = ()=>{
        if(pageNum!==0){
            window.history.go(1);
            setPageNum(0);
        }else{
            const alink = document.createElement("a");
            alink.href = "/";
            alink.click();
        }

    }


    const ReplyRender =({item,index})=>{
        return(
            <>
            {item!==null&&<div className="profile_comment" onClick={
                ()=>{
                    localStorage.setItem("replyId",item.id);
                    const alink = document.createElement("a");
                    alink.href =item.url;
                    alink.click();
                }
                }>
                <div className="profile_comment_icon" style={{backgroundImage:`url(${icon_profile_commentIcon})`}}></div>
                <div style={{width:'100%',overflow:"hidden"}}>
                    <div style={{display:"flex",alignItems:"center",marginBottom:"5px",height:"16px",lineHeight:'16px',flexWrap:"nowrap",width:"1000px"}}>
                        {item.target==="blog"&&<div style={{backgroundImage:`url(${icon_review_title})`,width:'16px',height:'16px',minWidth:"16px",minHeight:"16px",backgroundSize:'cover',marginRight:"4px"}}></div>}
                        {item.target==="community"&&<div style={{backgroundImage:`url(${icon_community_title_icon})`,width:'16px',lineHeight:'16px',height:'16px',minWidth:"16px",minHeight:"16px",backgroundSize:'cover',marginRight:"4px"}}></div>}
                        <div style={{fontSize:"14px",lineHeight:'16px',fontWeight:"500",color:"#9c31c6"}}>{item.target==="product"?`${item.title}`:`"${item.title}"`}</div>
                        <div style={{fontSize:"14px",lineHeight:'16px'}}>에 남긴 코멘트</div>
                    </div>
                    <div style={{width:"100%",position:"relative",height:'16px',lineHeight:"16px"}}>
                        <ReactQuill theme=""
                        className="profile_comment_quill"
                        value={item.reply.length>56?item.reply.slice(0,50)+"···":item.reply} style={{textAlign:"left",color:"#505050",fontSize:'13px',width:"100%",height:'16px',lineHeight:"16px",overflow:"hidden"}}></ReactQuill>
                        <div style={{width:"100%",height:"100%",position:'absolute',top:0,left:0}}></div>
                    </div>
                </div>
            </div>}
            </>
        )
    }   
    return(
        <div id="pageBody" style={{minHeight:window.innerHeight-48,backgroundColor:"#FFFEFC",width:"100%"}}>
        
        <div style={{width:"100%",backgroundColor:"#FFFEFC",display:"flex",alignItems:"center",flexDirection:"column"}}>
            <div className="profile_header_info">
                <div className="profile_main_myinfo">
                    <div className="profile_main_thumbnail" style={{
                        backgroundImage:`url(${currentUserInfo.thumbnail})`
                        }}></div>
                    <div>
                        <div className="profile_main_nick">{currentUserInfo.nick}</div>
                        <div className="profile_main_position">
                            {currentUserInfo.position}{currentUserInfo.department?`,${currentUserInfo.department}`:""}
                        </div>
                        {/* <div className="profile_main_join">
                            {currentUserInfo.created_at.slice(0,4)}년 {currentUserInfo.created_at.slice(5,7)}월 {currentUserInfo.created_at.slice(8,10)}일에 가입함
                        </div> */}
                    </div>
                </div>
                <div className="profile_main">
                   <div className="profile_category"
                   style={{color:renderList==="like"&&"#9C31C6",
                           borderBottom:renderList==="like"&&"2px solid#9C31C6",
                           fontWeight:renderList==="like"&&"500"}}
                    onClick={()=>{setRenderList("like")}}>추천({productNum.like})</div>
                   <div className="profile_category"
                   style={{color:renderList==="make"&&"#9C31C6",
                           borderBottom:renderList==="make"&&"2px solid#9C31C6",
                           fontWeight:renderList==="make"&&"500"}}
                    onClick={()=>{setRenderList("make")}}>제작({productNum.make})</div>
                   <div className="profile_category"
                   style={{color:renderList==="introduce"&&"#9C31C6",
                           borderBottom:renderList==="introduce"&&"2px solid#9C31C6",
                           fontWeight:renderList==="introduce"&&"500"}}
                    onClick={()=>{setRenderList("introduce")}}>소개({productNum.introduce})</div>
                   <div className="profile_category"
                   style={{color:renderList==="comment"&&"#9C31C6",
                           borderBottom:renderList==="comment"&&"2px solid#9C31C6",
                           fontWeight:renderList==="comment"&&"500"}}
                    onClick={()=>{setRenderList("comment")}}>코멘트</div>
                </div>
                <div style={{width:"100%",height:"1px",backgroundColor:"#c4c4c4",position:"absolute",bottom:0,left:0}}></div>
            </div>
            <div className="profile_main_full">
                {renderList==="like"&&<div>
                    {likelyProducts.map((item,index)=>(<ProductRender key={index} item={item} type="like"/>))}
                </div>}
                {renderList==="make"&&<div>
                    {myProducts.map((item,index)=>(<ProductRender key={index} item={item} type="myProduct"/>))}
                </div>}
                {renderList==="introduce"&&<div>
                    {myProducts.map((item,index)=>(<ProductRender key={index} item={item} type="introduceProduct"/>))}
                </div>}
                {renderList==="comment"&&<div>
                    {myReply.map((item,index)=>(<ReplyRender key={index} myReply={myReply} item={item}></ReplyRender>))}
                </div>}
                {(productNum.like===0&&renderList==="like")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>추천한 서비스가 없습니다.</div>
                </div>}
                {(productNum.make===0&&renderList==="make")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>업로드한 서비스가 없습니다.</div>    
                </div>}
                {(productNum.introduce===0&&renderList==="introduce")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>소개한 서비스가 없습니다.</div>
                </div>}
                {(myReply.length===0&&renderList==="comment")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>코멘트가 없습니다.</div>
                </div>}
            </div>
                        
        </div>
    </div>
    )
}

const AnotherUser = ()=>{
    const [loginWindow,setLoginWindow] = useState(false);
    const [signupWindow,setSignUpWindow] = useState(false);
    const [modal,setModal] = useState(false);
    const [alarmModal,setAlarmModal] = useState(false);
    const [productOrderState,setProductOrderState] = useState("fastest");
    const [scrollY,setScrollY]=useState(0);
    
    const submitGoogleData= async(name,id,token)=>{
      //유효성 검사
      //let crt = document.getElementById('crt');
      // e.preventDefault();
      var data = new FormData();
      data.append('name',name);
      data.append('email',id);
      data.append('token',token);
      try{
          await axios({
              method:"post",
              url : "https://www.proveit.co.kr/api/login.php",
              headers: {
                  //'Header-110': 'UxgOISh44O3eJxbKInDj3',
              },
              data:data
  
          }).then((e)=>{
              if(e.data.ret_code === "0000"){
                  window.localStorage.setItem("hash",e.data.hash);
                  window.localStorage.setItem("email",id);
                  window.localStorage.setItem("userName",name);
                  userInfoApi(id,token);
                  setSignUpWindow(false);
                  setLoginWindow(false);
  
              }else if(e.data.ret_code ==="1000"){
                window.localStorage.setItem("hash",e.data.hash);
                window.localStorage.setItem("email",id);
                window.localStorage.setItem("userName",name);
                const alink = document.createElement("a");
                alink.href="/signup";
                alink.click();
              }
          })
      }catch{
  
      }
    }
    
    const responseGoogle = (response) => {
      const profileObj = response.profileObj;
      const tokenObj = response.tokenObj;
      console.log(response);
      localStorage.setItem("profile",JSON.stringify({
        type:"google",
        name:profileObj.name,
        imageUrl:profileObj.imageUrl,
        email:profileObj.email
      }));
      localStorage.setItem("token",tokenObj.access_token);
      submitGoogleData(profileObj.givenName,profileObj.email,tokenObj.access_token);
    }
  
    const responseKakao = (response) => {
      const res = response;
      const profile = res.profile.kakao_account;
      console.log(profile);
      localStorage.setItem("profile",JSON.stringify({
        type:"kakao",
        name:res.profile.kakao_account.profile.nickname,
        imageUrl:"",
        email:profile.email
      }));
      localStorage.setItem("token",res.access_token);
      submitGoogleData(profile.profile.nickname,profile.email,res.access_token);
    }
   
    const userInfoApi = async(id,token)=>{
      var data = new FormData();
      data.append('email', id);
      data.append('token', token);
      data.append('type', 'select');
      try{
          await axios({
              method:"post",
              url : "https://www.proveit.co.kr/api/user.php",
              data:data
  
          }).then((e)=>{
              if(e.data.ret_code === "0000"){
                  localStorage.setItem("userInfo",JSON.stringify(e.data.user));
              }else{
  
              }
          })
      }catch{
  
      }
    }
  
    const scrollEvent=(e)=>{
      // setScrollY(e.target.scrollTop);
    }
  
   
  
    return(
    <div className="contentsBody" style={{
      width:"100%",
    }}
    onClick={()=>{
      setModal(false);
      setAlarmModal(false);
    }}
    onScroll={scrollEvent}>
 
      <Header 
      setScrollY={setScrollY}
      setLoginWindow={setLoginWindow} 
      loginWindow={loginWindow}
      setSignUpWindow={setSignUpWindow}
      signupWindow={signupWindow}
      modal={modal}
      setModal={setModal}
      alarmModal={alarmModal}
      setAlarmModal={setAlarmModal}
      ></Header>
      <Body  
        scrollY={scrollY}
        productOrderState={productOrderState}
        setLoginWindow={setLoginWindow}
        setProductOrderState={setProductOrderState}
        ></Body>
  
  
  
      {loginWindow&&<LoginWindow 
      responseGoogle={responseGoogle}
      setLoginWindow={setLoginWindow}
      responseKakao={responseKakao}
      ></LoginWindow >}
  
      {signupWindow&&<SignupWindow 
      responseGoogle={responseGoogle}
      setSignUpWindow={setSignUpWindow}
      responseKakao={responseKakao}
      ></SignupWindow>}
   
    </div>  
  )
}

export default AnotherUser;