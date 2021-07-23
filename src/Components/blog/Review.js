import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import LoginWindow from '../Common/LoginWindow';
import RightBar from '../Common/RightBar';
import SignupWindow from '../Common/SignupWindow';
import icon_reviewer from '../../image/icon_reviewer.svg';
import icon_writer from '../../image/icon_writer.svg';

const Body =()=>{
    const [date,setDate] =useState({
        year:0,
        month:0,
        day:0
    });
    const [reviewList,setReviewList] = useState([
        {id:0,thumb:"",title:""}
      ]);
    const [reviewState,setReviewState] = useState({

    });

    const reviewGetApi = async()=>{
        try{
            await axios({
                method:"get",
                url : `https://proveit.co.kr/api/blogList.php?id=${window.location.search.substring(4)}&page=1`,
      
            }).then((e)=>{
                console.log(e);
                if(e.data.ret_code === "0000"){
                    setReviewState(e.data.blog);
                    setDate({
                        year:e.data.blog.created_at.slice(0,4),
                        month:e.data.blog.created_at.slice(5,7),
                        day:e.data.blog.created_at.slice(8,10),
                    })
                }
            })
        }catch{
      
        }
    };
      
    const reviewListApi = async()=>{
    try{
        await axios({
            method:"get",
            url : "https://proveit.co.kr/api/blogList.php?id&page=1",

        }).then((e)=>{
            console.log(e);
            if(e.data.ret_code === "0000"){
                setReviewList(e.data.blog);
            }else{

            }
        })
    }catch{

    }
    };
    
    const ReviewRender=({item,index})=>{
    return(
        <Link to={`/review?id=${item.id}`}>
        <div style={{width:'100%',height:"72px",backgroundColor:'#fff',display:"flex",justifyContent:"center",alignItems:"center",padding:"16px 0px 16px 0px"}}>
            <div style={{width:'240px',maxHeight:"40px",height:"100%",marginRight:"20px"}}>{item.title}</div>
            <div style={{width:"40px",height:"40px",backgroundImage:`url(${item.thumb})`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
        </div>
        </Link>
    )
    }

      useEffect(()=>{
        reviewListApi();
        reviewGetApi();
      },[])
    return(
        <div className="review_page" style={{minHeight:window.innerHeight-48}}>
            <div className="review_header">
                <div className="review_header_text">
                    <div className="review_header_text_title">{reviewState.title}</div>        
                    <div className="review_header_text_subtitle">{reviewState.summary}</div>    
                </div>
            </div>
            <div className="review_body">
                <div className="review_mainText">
                    <div className="review_mainText_date">
                        <div style={{width:"14px",minWidth:"14px",minHeight:'14px',height:"14px",backgroundImage:`url(${icon_writer})`,marginRight:"4px"}}></div>
                        <div>작성자 {reviewState.admin_name} | {date.month}월 {date.day}일,{date.year}</div>
                    </div>
                    <ReactQuill value={reviewState.contents} theme="" readOnly></ReactQuill>
                    <Link to="/proreviewer"><div className="btn_three" style={{width:"112px",height:"48px"}}>목록으로</div></Link>
                </div>
                <RightBar></RightBar>
            </div>
        </div>
    )
}

const Review = ()=>{
    const [loginWindow,setLoginWindow] = useState(false);
    const [signupWindow,setSignUpWindow] = useState(false);
    const [modal,setModal] = useState(false);

    const submitGoogleData= async(name,id,token)=>{
        var data = new FormData();
        data.append('name',name);
        data.append('email',id);
        data.append('token',token);
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/login.php",
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

export default Review;