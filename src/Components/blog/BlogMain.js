import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Common/Header';
import LoginWindow from '../Common/LoginWindow';
import SignupWindow from '../Common/SignupWindow';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Body =()=>{
    const [blogList,setBlogList] = useState([]);
    const [blogPageNum,setBlogPageNum] = useState(1);
    const [maxPageNum,setMaxPageNum] = useState(1);

    const blogListGetApi = async()=>{
        try{
            await axios({
                method:"get",
                url : `https://proveit.co.kr/api/blogList.php?id&page=1`,
      
            }).then((e)=>{
                console.log(e);
                if(e.data.ret_code === "0000"){
                    setMaxPageNum(e.data.last_page);
                    setBlogList(e.data.blog);
                }
            })
        }catch{
      
        }
      }

      const ReviewRender=({item})=>{
        const year = item.created_at.slice(0,4);
        const month = item.created_at.slice(5,7);
        const day = item.created_at.slice(8,10);

        return(
          <Link to={`/review?id=${item.id}`}>
            <div className="blogMain_item">
              <div className="blogMain_item_text">
                <div className="blogMain_item_text_cate">{item.cate}</div>
                <div className="blogMain_item_text_title">{item.title}</div>
                <div className="blogMain_item_text_summary">{item.summary}</div>
                <div className="blogMain_item_text_writer">작성자 {item.admin_name} | {month}월 {day}일,{year}년</div>
              </div>
              <div className="blogMain_item_thumb" style={{backgroundImage:`url(${item.thumb})`}}></div>
            </div>
          </Link>
        )
      }

      const PageBtn = ({index,blogPageNum,setBlogPageNum}) =>{
        return(
          <div style={{
            width:"48px",
            minWidth:"48px",
            height:"48px",
            marginRight:"8px",
            color:blogPageNum===index+1?"#9C31C6":"#505050",
            cursor:"pointer",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:"4px",
            backgroundColor:blogPageNum===index+1?"rgba(156,49,198,0.3)":"#f1f1f1"
          }}
            onClick={()=>{setBlogPageNum(index+1);}}>{index+1}</div>
        )
      }

      useEffect(()=>{
          blogListGetApi();
      },[])
    return(
        <div className="blogMain_body">
            <div className="blogMain_header">
                <div className="blogMain_title">리뷰 중독자</div>
                <div className="blogMain_subtitle">새로 업로드 된 서비스 리뷰부터 인터뷰, 스타트업에 유용한 칼럼까지 다양한 정보를 공유합니다.</div>
            </div>
            <div className="blogMain_contents">
                {blogList.map((item)=>(<ReviewRender item={item}></ReviewRender>))}
                <div style={{display:"flex",marginBottom:"72px"}}> 
                  {[...Array(maxPageNum)].map((n,index) =>
                  <PageBtn index={index} key={index} blogPageNum={blogPageNum} setBlogPageNum={setBlogPageNum}/>)}
                </div>
            </div>
        </div>
    )
}

const BlogMain = ()=>{
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

export default BlogMain;