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
import icon_like_m from '../../image/likeIcon_m.svg';
import icon_community_title_icon from '../../image/icon_community_title_icon.png';
import icon_community_category_2 from '../../image/icon_community_category_2.png';
import icon_community_category_3 from '../../image/icon_community_category_3.png';
import icon_community_category_4 from '../../image/icon_community_category_4.png';
import ReactQuill from 'react-quill';

const Body =({setLoginWindow})=>{
  const [sortState,setSortState] = useState(true);
  const [categoryState,setCategoryState] = useState(0);
  const [community,setCommunity] = useState([
    {
      id:0,
      nick:"dkdkdk",
      title:"1,000명 까지 사용자를 모으는 데 가장 중요한 것은 무엇이라고 생각하시나요?",
      text:"커뮤니티 내에서는 상대방을 배려하는 태도를 갖추어 주세요. 서로 비난하고 스타트업과 서비스에 관해 질문을 하거나 받거나, 노하우와 정보를 공유하거나 치열하게 토론하거나. 이런 것들을 합니다.",
      like_count:0,
      review_count:0,
      category:"궁금합니다",}
  ]);

  const blogListGetApi = async()=>{
      try{
          await axios({
              method:"get",
              url : `https://proveit.co.kr/api/blogList.php?id&page=1`,
    
          }).then((e)=>{
              if(e.data.ret_code === "0000"){
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
      }else if(item.category ==="피드백을 부탁드립니다"){
        iconImg= icon_community_category_3;
      }else if(item.category ==="도와주세요"){
        iconImg= icon_community_category_4;
      }
      return iconImg;
    }
    const [categoryRender,setCategoryRender] = useState("");

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
              borderRadius:"50%",
              backgroundColor:"#000",
              }}></div>
            <div>{item.nick}</div>
          </div>
          <div className="community_item_title">{item.title}</div>
          <ReactQuill className="community_item_text"
              placeholder="내용을 입력해주세요."
              value={item.text}
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
            <div style={{color:"#9C31C6"}}>{`${item.review_count}개의 댓글`}</div>
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
              borderRadius:"50%",
              backgroundColor:"#000",
              }}></div>
            <div>{item.nick}</div>
          </div>
          <div className="community_item_title">{item.title}</div>
          <ReactQuill className="community_item_text"
              placeholder="내용을 입력해주세요."
              value={item.text}
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
            <div style={{color:"#9C31C6"}}>{`${item.review_count}개의 댓글`}</div>
          </div>
        </div>
      </Link>
        }
        {(categoryState===2&&item.category ==="피드백을 부탁드립니다")&&<Link to={`/communityitem?id=${item.id}`}>
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
              value={item.text}
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
            <div style={{color:"#9C31C6"}}>{`${item.review_count}개의 댓글`}</div>
          </div>
        </div>
      </Link>
        }
        {(categoryState===3&&item.category ==="도와주세요")&&<Link to={`/communityitem?id=${item.id}`}>
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
              value={item.text}
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
            <div style={{color:"#9C31C6"}}>{`${item.review_count}개의 댓글`}</div>
          </div>
        </div>
      </Link>
        }
      </div>
    )
  }

    useEffect(()=>{
        blogListGetApi();
    },[])
  return(
      <div id="pageBody" className="blogMain_body">
          <div className="community_header">
              <div className="community_title">커뮤니티<div className="blogMain_title_icon" style={{backgroundImage:`url(${icon_community_title_icon})`}}></div></div>
          </div>
          <div className="community_contents">
            <div style={{position:"absolute",top:"-30px",left:"0px",display:"flex",fontSize:"14px",height:"14px",alignItems:"center"}}>
              <div style={{cursor:"pointer",fontWeight:sortState&&"bold"}}
              onClick={()=>{setSortState(true)}}>추천순</div>
              <div style={{marginLeft:"4px",marginRight:"4px"}}>|</div>
              <div style={{cursor:"pointer",fontWeight:!sortState&&"bold"}}
              onClick={()=>{setSortState(false)}}>최신순</div>
            </div>
              {community.map((item)=>(<CommunityRender item={item} categoryState={categoryState}></CommunityRender>))}
              <RightBar setLoginWindow={setLoginWindow} setCategoryState={setCategoryState} categoryState={categoryState}></RightBar>
          </div>
      </div>
  )
}

const CommunityMain = ()=>{
    const [loginWindow,setLoginWindow] = useState(false);
    const [signupWindow,setSignUpWindow] = useState(false);
    const [modal,setModal] = useState(false);


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

  return(
    <div id="renderPage" style={{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        position:"relative"
    }}
    onClick={()=>{setModal(false)}}>
      <Helmet>
        <title>리뷰 중독자 | 프루브잇 - 되는 서비스들의 런칭 플랫폼</title>
        <meta
          name="description"
          content="좋은 서비스는 직접 써보고 리뷰합니다."
          data-react-helmet="true"
        />
      </Helmet>
    <Header 
    setLoginWindow={setLoginWindow} 
    loginWindow={loginWindow}
    signupWindow={signupWindow}
    setSignUpWindow={setSignUpWindow}
    modal={modal}
    setModal={setModal}
    ></Header>
    <Body
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