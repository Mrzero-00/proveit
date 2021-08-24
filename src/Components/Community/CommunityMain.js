/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import LoginWindow from '../Common/LoginWindow';
import RightBar from '../Common/RightBar';
import SignupWindow from '../Common/SignupWindow';

import icon_like from '../../image/likeIcon.svg';
import icon_community_title_icon from '../../image/icon_community_title_icon.png';
import icon_community_category_1 from '../../image/icon_community_category_1.png';
import icon_community_category_2 from '../../image/icon_community_category_2.png';
import icon_community_category_3 from '../../image/icon_community_category_3.png';
import icon_community_category_4 from '../../image/icon_community_category_4.png';
import ReactQuill from 'react-quill';

const Body =({setLoginWindow,scrollY})=>{
  const [sortState,setSortState] = useState(false);
  const [categoryState,setCategoryState] = useState(0);
  const [categoryWindow,setCategoryWindow] =useState(false);
  const categoryList =[
    {id:0,text:"전체보기",icon:icon_community_category_1},
    {id:1,text:"궁금합니다",icon:icon_community_category_2},
    {id:2,text:"피드백 요청",icon:icon_community_category_3},
    {id:3,text:"기타",icon:icon_community_category_4},
  ]
  const [community,setCommunity] = useState([
    {
      id:0,
      nick:"dkdkdk",
      title:"1,000명 까지 사용자를 모으는 데 가장 중요한 것은 무엇이라고 생각하시나요?",
      contents:"커뮤니티 내에서는 상대방을 배려하는 태도를 갖추어 주세요. 서로 비난하고 스타트업과 서비스에 관해 질문을 하거나 받거나, 노하우와 정보를 공유하거나 치열하게 토론하거나. 이런 것들을 합니다.",
      like_count:0,
      reply_count:0,
      category:"궁금합니다",
      ago_time:""}
  ]);

  const popularLogic =(array)=>{
    const currentArray = array;
    const length = array.length;
    let tmp = null;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length-1; j++) {
        if (currentArray[j].like_count*1 < currentArray[j+1].like_count*1) {
          tmp = currentArray[j];
          currentArray[j] = currentArray[j + 1];
          currentArray[j + 1] = tmp;
          tmp = null;
        }else if(currentArray[j].like_count*1===currentArray[j+1].like_count*1){
          tmp = currentArray[j];
          currentArray[j] = currentArray[j + 1];
          currentArray[j + 1] = tmp;
          tmp = null;
        }
      }
      if(i+1 === length){
        setCommunity(currentArray);
      }
    }
  }

  const communityListGetApi = async()=>{
    let data = new FormData();
    data.append("type","list");
      try{
          await axios({
              method:"post",
              url : `https://proveit.co.kr/api/community.php`,
              data
          }).then((e)=>{
              if(e.data.ret_code === "0000"){
                fastestLogic(e.data.list);
              }
          })
      }catch{
    
      }
    }

  const CommunityRender=({item,categoryState})=>{
    const iconImg=(item)=>{
      let iconImg;
      if(item.category ==="궁금합니다"){
        iconImg= icon_community_category_2;
      }else if(item.category ==="피드백 요청"){
        iconImg= icon_community_category_3;
      }else if(item.category ==="기타"){
        iconImg= icon_community_category_4;
      }
      return iconImg;
    }

    let icon = iconImg(item);
    useEffect(()=>{
      if(categoryState===0){

      }
    },[categoryState])
    return(
      <div style={{width:"100%"}}>
        {categoryState===0&&<Link to={`/communityitem?id=${item.id}`}>
        <div className="community_item">
          <div className="community_item_header"
          >
            <div style={{
              width:"40px",
              height:"40px",
              marginRight:"17px",
              backgroundImage:`url(${item.thumbnail})`,
              backgroundRepeat:"no-repeat",
              backgroundPosition:"center",
              backgroundSize:"cover",
              borderRadius:"50%",
              backgroundColor:"#000",
              }}></div>
            <div style={{color:"#A5A5A5",fontSize:"14px"}}>{item.nick}</div>
          </div>
          <div className="community_item_title">{item.title}</div>
          <ReactQuill className="community_item_text"
              value={item.contents}
              readOnly
              style={{height:"32px",backgroundColor:"transparent"}} theme=""></ReactQuill>
          <div className="community_item_footer">
            <div style={{width:"16px",height:"16px",backgroundImage:`url(${icon_like})`,backgroundPosition:"center"}}></div>
            <div style={{width:"40px",height:"100%",lineHeight:"16px",fontSize:"14px",textAlign:"center",color:"#505050",fontWeight:"700"}}>{item.like_count}</div>
            <div style={{width:'12px',height:'12px',backgroundImage:`url(${icon})`,marginRight:'8px',backgroundSize:"cover"}}></div>
            <div style={{marginRight:"4px"}}>{item.category}</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{marginRight:"4px"}}>{item.ago_time} {item.updated}</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{color:"#9C31C6"}}>{`${item.reply_count}개의 댓글`}</div>
          </div>
        </div>
      </Link>
        }
        {(categoryState===1&&item.category ==="궁금합니다")&&<Link to={`/communityitem?id=${item.id}`}>
        <div className="community_item">
          <div className="community_item_header"
          >
            <div style={{
              width:"40px",
              height:"40px",
              marginRight:"17px",
              backgroundImage:`url(${item.thumbnail})`,
              backgroundRepeat:"no-repeat",
              backgroundPosition:"center",
              backgroundSize:"cover",
              borderRadius:"50%",
              backgroundColor:"#000",
              }}></div>
            <div>{item.nick}</div>
          </div>
          <div className="community_item_title">{item.title}</div>
          <ReactQuill className="community_item_text"
              placeholder="내용을 입력해주세요."
              value={item.contents}
              readOnly
              style={{height:"32px",backgroundColor:"transparent"}} theme=""></ReactQuill>
          <div className="community_item_footer">
            <div style={{width:"16px",height:"16px",backgroundImage:`url(${icon_like})`,backgroundPosition:"center"}}></div>
            <div style={{width:"40px",height:"100%",lineHeight:"16px",fontSize:"14px",textAlign:"center",color:"#505050",fontWeight:"700"}}>{item.like_count}</div>
            <div style={{width:'12px',height:'12px',backgroundImage:`url(${icon})`,marginRight:'8px',backgroundSize:"cover"}}></div>
            <div style={{marginRight:"4px"}}>{item.category}</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{marginRight:"4px"}}>1일 전</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{color:"#9C31C6"}}>{`${item.reply_count}개의 댓글`}</div>
          </div>
        </div>
      </Link>
        }
        {(categoryState===2&&item.category ==="피드백 요청")&&<Link to={`/communityitem?id=${item.id}`}>
        <div className="community_item">
          <div className="community_item_header"
          >
            <div style={{
              width:"40px",
              height:"40px",
              marginRight:"17px",
              backgroundImage:`url(${item.thumbnail})`,
              backgroundRepeat:"no-repeat",
              backgroundPosition:"center",
              borderRadius:"50%",
              backgroundColor:"#000",
              }}></div>
            <div>{item.nick}</div>
          </div>
          <div className="community_item_title">{item.title}</div>
          <ReactQuill className="community_item_text"
              placeholder="내용을 입력해주세요."
              value={item.contents}
              readOnly
              style={{height:"32px",backgroundColor:"transparent"}} theme=""></ReactQuill>
          <div className="community_item_footer">
            <div style={{width:"16px",height:"16px",backgroundImage:`url(${icon_like})`,backgroundPosition:"center"}}></div>
            <div style={{width:"40px",height:"100%",lineHeight:"16px",fontSize:"14px",textAlign:"center",color:"#505050",fontWeight:"700"}}>{item.like_count}</div>
            <div style={{width:'12px',height:'12px',backgroundImage:`url(${icon})`,marginRight:'8px',backgroundSize:"cover"}}></div>
            <div style={{marginRight:"4px"}}>{item.category}</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{marginRight:"4px"}}>1일 전</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{color:"#9C31C6"}}>{`${item.reply_count}개의 댓글`}</div>
          </div>
        </div>
      </Link>
        }
        {(categoryState===3&&item.category ==="기타")&&<Link to={`/communityitem?id=${item.id}`}>
        <div className="community_item">
          <div className="community_item_header"
          >
            <div style={{
              width:"40px",
              height:"40px",
              marginRight:"17px",
              backgroundImage:`url(${item.thumbnail})`,
              backgroundRepeat:"no-repeat",
              backgroundPosition:"center",
              borderRadius:"50%",
              backgroundColor:"#000",
              }}></div>
            <div>{item.nick}</div>
          </div>
          <div className="community_item_title">{item.title}</div>
          <ReactQuill className="community_item_text"
              placeholder="내용을 입력해주세요."
              value={item.contents}
              readOnly
              style={{height:"32px",backgroundColor:"transparent"}} theme=""></ReactQuill>
          <div className="community_item_footer">
            <div style={{width:"16px",height:"16px",backgroundImage:`url(${icon_like})`,backgroundPosition:"center"}}></div>
            <div style={{width:"40px",height:"100%",lineHeight:"16px",fontSize:"14px",textAlign:"center",color:"#505050",fontWeight:"700"}}>{item.like_count}</div>
            <div style={{width:'12px',height:'12px',backgroundImage:`url(${icon})`,marginRight:'8px',backgroundSize:"cover"}}></div>
            <div style={{marginRight:"4px"}}>{item.category}</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{marginRight:"4px"}}>1일 전</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{color:"#9C31C6"}}>{`${item.reply_count}개의 댓글`}</div>
          </div>
        </div>
      </Link>
        }
      </div>
    )
  }

  const fastestLogic =(array)=>{
    const currentArray = array;
    const length = array.length;
    let tmp = null;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length-1; j++) {
        if (currentArray[j].id*1 < currentArray[j+1].id*1) {
          tmp = currentArray[j];
          currentArray[j] = currentArray[j + 1];
          currentArray[j + 1] = tmp;
          tmp = null;
        }
      }
      if(i+1 === length){
        setCommunity(currentArray);
      }
    }
  }

  const CategoryWindowRender =({item,setCategoryState,categoryState,setCategoryWindow})=>{
    return(
      <div 
        style={{
          display:"flex",
          alignItems:"center",
          backgroundColor:categoryState===item.id?"#FAF3F9":"#fff",
          height:"40px",
          lineHeight:"40px",
          paddingLeft:"16px"
          }}
          onClick={()=>{setCategoryState(item.id);setCategoryWindow(false);}} 
          >
        <div style={{width:"16px",height:"16px",minWidth:'16px',minHeight:"16px",backgroundImage:`url(${item.icon})`,backgroundSize:"cover",marginRight:"8px"}}></div>
        <div style={{fontSize:"13px"}}>{item.text}</div>
      </div>
    )
  }


    useEffect(()=>{
      communityListGetApi();
    },[]);

  return(
      <div id="pageBody" className="blogMain_body" style={{paddingBottom:"56px"}}
      onTouchMove={()=>{setCategoryWindow(false)}}>
          <div className="community_header_main">
              <div className="community_title">토론-토<div className="blogMain_title_icon" style={{backgroundImage:`url(${icon_community_title_icon})`}}></div>
              </div>
              <div className="comuunity_header_phone">
              <div className="comuunity_header_text">
                자신이 만든 서비스에 관해 질문을 하거나 받거나, 
                스타트업/서비스 관련 노하우와 정보를 공유하거나 토론할 수 있습니다. 
                커뮤니티 내에서는 상대방을 배려하는 태도를 보여주세요. 👍
              </div>
              <div className="btn_one_big" style={{width:"152px",height:"40px",borderRadius:"8px",fontSize:"14px"}}
                onClick={()=>{
                  if(localStorage.getItem("hash")){
                    const alink = document.createElement("a");
                    alink.href = "/community_add";
                    alink.click();
                  }else{
                      setLoginWindow(true);
                  }
                }}>새로운 토론 생성</div>
                </div>
          </div>
          <div className="community_contents">
            <div>
              <div className="community_contents_sort">
                <div style={{display:"flex"}}>
                  <div style={{cursor:"pointer",fontWeight:sortState&&"bold"}}
                  onClick={()=>{setSortState(true);popularLogic(community);}}>추천순</div>
                  <div style={{marginLeft:"4px",marginRight:"4px"}}>|</div>
                  <div style={{cursor:"pointer",fontWeight:!sortState&&"bold"}}
                  onClick={()=>{setSortState(false);fastestLogic(community);}}>최신순</div>
                </div>
                <div className="community_contetns_category">
                  <div style={{width:"100%",position:"relative",display:"flex",flexDirection:"row-reverse",alignItems:"center"}}>
                    <div style={{width:"20px",height:"20px",backgroundImage:`url(${icon_like})`,transform:"rotate(180deg)",backgroundSize:"cover"}}
                     onClick={(e)=>{setCategoryWindow(!categoryWindow);}}></div>
                    {categoryWindow&&<div style={{
                      position:"absolute",
                      top:"40px",
                      right:"0px",
                      width:"100%",
                      boxShadow:"0px 4px 4px rgba(0,0,0,.25)",
                      borderRadius:"4px",
                      border:"1px solid #f1f1f1"}}>
                      {categoryList.map((item)=>(<CategoryWindowRender item={item} key={item.id} setCategoryState={setCategoryState}
                      categoryState={categoryState} setCategoryWindow={setCategoryWindow}></CategoryWindowRender>))}
                    </div>}
                    <div style={{marginRight:"8px"}}  onClick={(e)=>{setCategoryWindow(!categoryWindow);}}>{categoryList[categoryState].text}</div>
                  </div>
                  </div>
              </div>
              {community.map((item)=>(<CommunityRender item={item} categoryState={categoryState}></CommunityRender>))}
            </div>
              <RightBar setLoginWindow={setLoginWindow} setCategoryState={setCategoryState} categoryState={categoryState} scrollY={scrollY}></RightBar>
          </div>
      </div>
  )
}

const CommunityMain = ()=>{
    const [loginWindow,setLoginWindow] = useState(false);
    const [signupWindow,setSignUpWindow] = useState(false);
    const [modal,setModal] = useState(false);
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
                    window.localStorage.setItem("token",token);
                    window.localStorage.setItem("email",id);
                    window.localStorage.setItem("userName",name);
                    userInfoApi(id,token);
                    setSignUpWindow(false);
                    setLoginWindow(false);
    
                }else if(e.data.ret_code ==="1000"){
                  window.localStorage.setItem("token",token);
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
    localStorage.setItem("googleProfile",JSON.stringify(response.profileObj));
    localStorage.setItem("token",tokenObj.access_token);
    submitGoogleData(profileObj.givenName,profileObj.email,tokenObj.access_token);
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
                localStorage.setItem("userInfo",JSON.stringify(e.data.user))
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
        height:window.innerHeight,
      }}
    onClick={()=>{setModal(false);}}
    onScroll={scrollEvent}>

    <Header 
    scrollY={scrollY}
    setLoginWindow={setLoginWindow} 
    loginWindow={loginWindow}
    signupWindow={signupWindow}
    setSignUpWindow={setSignUpWindow}
    modal={modal}
    setModal={setModal}
    ></Header>
    <Body
    scrollY={scrollY}
    modal={modal}
    setModal={setModal}
    setLoginWindow={setLoginWindow}
    ></Body>

    {loginWindow&&<LoginWindow 
    responseGoogle={responseGoogle}
    setLoginWindow={setLoginWindow}
    ></LoginWindow >}

    {signupWindow&&<SignupWindow 
    responseGoogle={responseGoogle}
    setSignUpWindow={setSignUpWindow}
    ></SignupWindow>}
    </div>  
  )
}

export default CommunityMain;