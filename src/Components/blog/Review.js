import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import LoginWindow from '../Common/LoginWindow';
import RightBar from '../Common/RightBar';
import SignupWindow from '../Common/SignupWindow';
import icon_writer from '../../image/icon_writer.svg';
import icon_commentModify from '../../image/icon_commentModify.png';
import icon_like from '../../image/likeIcon.svg';


const Body =({setModal,modal,setLoginWindow,linkWindow,setLinkWindow,scrollY})=>{
    const [date,setDate] =useState({
        year:0,
        month:0,
        day:0
    });
    const [reviewState,setReviewState] = useState({

    });
    const [replyState,setReplyState]= useState(true);
    const [currentComment,setCurrentComment] = useState("");
    const [commnetList,setCommnetList] = useState([
    ]);
    const [product,setProduct] = useState("");
    const [reRender,setReRender] = useState(false);


    const CommentRender =({item,reRender,setReRender,replayListApi})=>{
        const [hover,setHover] =useState(0);    
        const [modal,setModal] = useState(false);
        const [replyText,setReplyText] =useState(`<p><div style="display:inline-block;">@${item.nick}</div></br></p>`);
        const [modifyText,setModifyText] = useState(item.reply);
        const [replyWindow,setReplyWindow] = useState(false);
        const [modifyState,setModifyState] = useState(false);
        const [listHover,setListHover] = useState(0);

        const depthReplyApi = async()=>{
            var data = new FormData();
            data.append('parent_id', item.depth==="1"?item.parent_id:item.id);
            data.append('reply', replyText);
            data.append('user_email',localStorage.getItem("email"));
            data.append('hash', localStorage.getItem("hash"));
            data.append("blog_id",window.location.search.substring(4));
            data.append("target","blog");
            try{
                await axios({
                    method:"post",
                    url : "https://www.proveit.co.kr/api/replySubmit.php",
                    data:data
          
                }).then((e)=>{
                    if(e.data.ret_code === "0000"){
                        localStorage.setItem("replyId",e.data.reply_id);
                        replayListApi();
                        setReRender(!reRender);
                    }else{
                        alert("로그인 해쉬가 만료되었습니다. 다시 로그인해주세요");
                        const alink = document.createElement("a");
                        alink.href="/";
                        setTimeout(() => {
                            localStorage.clear();
                            alink.click();
                        }, 1000);
                    }
                })
            }catch{
          
            }
        }

        const depthReplyModifyApi = async()=>{
            var data = new FormData();
            data.append('parent_id', item.depth==="1"?item.parent_id:item.id);
            data.append('reply', modifyText);
            data.append('user_email',localStorage.getItem("email"));
            data.append("reply_id",item.id);
            data.append('hash', localStorage.getItem("hash"));
            data.append("blog_id",window.location.search.substring(4));
            data.append("target","blog");
            data.append("type","update");
            try{
                await axios({
                    method:"post",
                    url : "https://www.proveit.co.kr/api/replySubmit.php",
                    data:data
          
                }).then((e)=>{
                    if(e.data.ret_code === "0000"){
                        replayListApi();
                        setReRender(!reRender);
                    }else{
                        alert("로그인 해쉬가 만료되었습니다. 다시 로그인해주세요");
                        const alink = document.createElement("a");
                        alink.href="/";
                        setTimeout(() => {
                            localStorage.clear();
                            alink.click();
                        }, 1000);
                    }
                })
            }catch{
          
            }
        }
        
        const depthReplyDeleteApi = async()=>{
            var data = new FormData();
            data.append('parent_id', item.depth==="1"?item.parent_id:item.id);
            data.append('reply', replyText);
            data.append('user_email',localStorage.getItem("email"));
            data.append("reply_id",item.id);
            data.append('hash', localStorage.getItem("hash"));
            data.append("blog_id",window.location.search.substring(4));
            data.append("target","blog");
            data.append("type","delete");
            try{
                await axios({
                    method:"post",
                    url : "https://www.proveit.co.kr/api/replySubmit.php",
                    data:data
          
                }).then((e)=>{
                    if(e.data.ret_code === "0000"){
                        replayListApi();
                        setReRender(!reRender);
                    }else{
                        alert("로그인 해쉬가 만료되었습니다. 다시 로그인해주세요");
                        const alink = document.createElement("a");
                        alink.href="/";
                        setTimeout(() => {
                            localStorage.clear();
                            alink.click();
                        }, 1000);
          
                    }
                })
            }catch{
          
            }
        }

        const replyNavi = ()=>{
            if(localStorage.getItem("replyId")){
                
                const navi = document.getElementById("replyNavi");
                if(navi||document.getElementById(localStorage.getItem("replyId"))){
                    navi.click();
                    localStorage.removeItem("replyId");
                }
            }
        }
    
        useEffect(()=>{
            setTimeout(() => {
                replyNavi();
            }, 100);
        },[localStorage.getItem("replyId")])
        
        return(

            <div id={item.id} style={{position:"relative"}}
             className={item.depth==="0"?"blog_item_reply":"blog_item_reply_depth"}>
                <Link to={item.user_email===localStorage.getItem("email")?`/profile`:`/anotheruserinfo?${item.user_id}`}><div style={{
                    width:"40px",
                    height:"40px",
                    minHeight:"40px",
                    minWidth:"40px",
                    borderRadius:"50%",
                    marginRight:'16px',
                    backgroundColor:"#c4c4c4",
                    backgroundImage:`url(${item.thumbnail})`,
                    backgroundSize:"cover",
                    backgroundPosition:"center",
                    backgroundRepeat:"no-repeat"
                    }}
                    >
                </div>
                </Link>
                <div style={{width:"100%"}}>
                    <div style={{display:"flex"}}>
                    <Link to={item.user_email===localStorage.getItem("email")?`/profile`:`/anotheruserinfo?${item.user_id}`}><div style={{fontWeight:"bold",marginBottom:'8px',height:"14px",lineHeight:"14px",marginRight:"4px",fontSize:'14px',color:"#505050"}}>{item.nick}</div></Link>                    </div>
                    <div style={{color:"#a5a5a5",marginBottom:'7px',height:"13px",lineHeight:"13px",fontSize:'13px'}}>{item.position}{item.department!==""&&`,${item.department}`}</div>
                    {!modifyState&&<div style={{width:"100%",position:"relative",marginBottom:"8px"}}>
                       {/* <textarea value={item.reply} readOnly></textarea> */}
                       <ReactQuill theme="" readOnly
                        value={item.reply} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%"}}
                        ></ReactQuill>
                    </div>}
                    {modifyState&&<div className="comment_modify">
                       <ReactQuill className="quillInput" theme=""
                        value={modifyText} style={{
                            textAlign:"left",
                            color:"#505050",
                            fontSize:'14px',
                            width:"100%",
                            minHeight:"84px",
                            borderRadius:"2px",
                            marginRight:"8px",
                            padding:"16px"}}
                        onChange={(e)=>{setModifyText(e)}}></ReactQuill>
                        <div>
                        <div className="comment_modify_btn">
                            <div className="btn_one" style={{width:"78px",height:"40px",marginBottom:"8px"}}
                            onClick={()=>{depthReplyModifyApi()}}>확인</div>
                            <div className="btn_four" style={{width:"78px",height:"40px",marginRight:"8px"}}
                            onClick={()=>{setModifyState(false)}}>취소</div>
                        </div>
                        </div>
                    </div>}
                    {!modifyState&&<div style={{display:"flex",height:"32px"}}>
                        <div style={{width:"42px",cursor:"pointer",height:"100%",marginRight:"8px",
                        backgroundColor:listHover===1&&"#f1f1f1",color:"#a5a5a5",
                        textAlign:"center",lineHeight:"32px",fontSize:'14px'}}
                        onMouseLeave={()=>{setListHover(0)}}
                        onMouseOver={()=>{setListHover(1)}}
                        onClick={()=>{setReplyWindow(!replyWindow);}}>답글</div>
                        {/* <div style={{width:"88px",cursor:"pointer",height:"100%",marginRight:"8px",backgroundColor:"#f1f1f1",display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_likeBtn})`,marginRight:"4px",backgroundPosition:"center",backgroundSize:"100% 100%"}}></div>
                            <div>추천({item.like_count})</div>
                        </div> */}
                        {item.user_email===localStorage.getItem("email")&& <div style={{width:"32px",cursor:"pointer",height:"100%",marginRight:"8px",
                        backgroundPosition:"center",backgroundRepeat:"no-repeat",
                        backgroundColor:listHover===2&&"#f1f1f1",textAlign:"center",position:"relative",lineHeight:"32px",backgroundImage:`url(${icon_commentModify})`}}
                        onMouseLeave={()=>{setListHover(0)}}
                        onMouseOver={()=>{setListHover(2)}}
                        onClick={(e)=>{setModal(!modal);e.stopPropagation()}}
                        >
                            {modal&&<div style={{position:"absolute",zIndex:"999",width:"64px",height:"72px",padding:"4px0px4px0px",backgroundColor:"#fff",bottom:-76,left:0,boxShadow:"0px 4px 8px 2px rgba(0,0,0,0.1)",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                <div style={{width:"100%",height:"32px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:hover===1&&"rgba(156, 49, 198, 0.1)"}}
                                onMouseLeave={()=>{setHover(0)}}
                                onMouseOver={()=>{setHover(1)}}
                                onClick={()=>{setModifyState(true)}}>수정</div>
                                <div style={{width:"100%",height:"32px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:hover===2&&"rgba(156, 49, 198, 0.1)"}}
                                onMouseLeave={()=>{setHover(0)}}
                                onMouseOver={()=>{setHover(2)}}
                                onClick={depthReplyDeleteApi}>삭제</div>
                            </div>}    
                        </div>}
                    </div>}
                    {replyWindow&&<div className="replay_window">
                        <ReactQuill className="quillInput blog_item_comment_submitbtn" theme="" placeholder="의견이나 궁금한 점을 남겨보세요"
                            value={replyText}
                            onChange={(e)=>{setReplyText(e)}}></ReactQuill>
                        <div className="btn_one community_btn_phone" style={{width:"78px",height:"48px"}}
                        onClick={()=>{
                            if(localStorage.getItem("hash")){
                                depthReplyApi();
                                setReplyText(`${item.nick}`);
                            }else{
                                setLoginWindow(true);
                            }
                        }}>남기기</div>
                    </div>}
                </div>

            </div>
        
        )
    }

    const productGet = async(id)=>{
        var data = new FormData();
        data.append("product_id",id);
        data.append("user_email",localStorage.getItem("email"));
        data.append("hash",localStorage.getItem("hash"));
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/productList.php",
                data:data
    
            }).then((e)=>{
                if(e.data.ret_code==="0000"){
                    setProduct(e.data.product);
                }
            })
        }catch{
    
        }
        }

    const reviewGetApi = async()=>{
        try{
            await axios({
                method:"get",
                url : `https://proveit.co.kr/api/blogList.php?id=${window.location.search.substring(4)}&page=1`,
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    setReviewState(e.data.blog);
                    if(e.data.blog.product_id!==null){
                        productGet(e.data.blog.product_id);
                    }else{
                        setProduct("");
                    }
                    setDate({
                        year:e.data.blog.created_at.slice(0,4),
                        month:e.data.blog.created_at.slice(5,7),
                        day:e.data.blog.created_at.slice(8,10),
                    });
                    replayListApi();
                }
            })
        }catch{
      
        }
    };
    
    const replyAddApi = async()=>{
        var data = new FormData();
        data.append('parent_id',"");
        data.append('reply', currentComment);
        data.append('user_email',localStorage.getItem("email"));
        data.append('hash', localStorage.getItem("hash"));
        data.append("blog_id",window.location.search.substring(4));
        data.append("target","blog");
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/replySubmit.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    localStorage.setItem("replyId",e.data.reply_id);
                    replayListApi();
                    setReRender(!reRender);
                }else if(e.data.ret_code ==="400"){
                    setReplyState(false);
                }else if(e.data.ret_code ==="500"){
                    alert("로그인 해쉬가 만료되었습니다. 다시 로그인해주세요");
                    const alink = document.createElement("a");
                    alink.href="/";
                    setTimeout(() => {
                        localStorage.clear();
                        alink.click();
                    }, 1000);
                }
            })
        }catch{
      
        }
    }

    const replayListApi = async()=>{
        var data = new FormData();
        data.append("blog_id",window.location.search.substring(4));
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/replyList.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    setCommnetList(e.data.ret_data);
                }else{
      
                }
            })
        }catch{
      
        }
    }

    useEffect(()=>{
        reviewGetApi();
        window.scrollTo(0,0);        
    },[window.location.search]);
    return(
        <div id="pageBody" className="review_page" style={{minHeight:window.innerHeight-48}}>
            
            <a id="replyNavi" style={{display:"none"}} href={`#${localStorage.getItem("replyId")}`}></a>
            <div className="review_header">
                <div className="review_header_text">
                    <h1 className="review_header_text_title">{reviewState.title}</h1>        
                    <h2 className="review_header_text_subtitle">{reviewState.summary}</h2>    
                </div>
            </div>
            <div className="review_body">
                <div className="review_mainText">
                    <div className="review_mainText_date">
                        <div style={{width:"14px",minWidth:"14px",minHeight:'14px',height:"14px",backgroundImage:`url(${icon_writer})`,marginRight:"4px"}}></div>
                        <div>작성자 {reviewState.admin_name} | {date.month}월 {date.day}일,{date.year}</div>
                    </div>
                    <ReactQuill value={reviewState.contents} style={{lineHeight:"2"}} theme="" readOnly></ReactQuill>
                    {product!==""&&<div style={{marginTop:"64px"}}>
                        <div style={{fontWeight:"bold",width:"100%",textAlign:"center",fontSize:'14px',marginBottom:"24px",display:"flex",justifyContent:"center"}}>
                            <div>지금 확인하러 가기</div>
                            <div></div>
                        </div>
                        <Link to={`/product?productnum=${product.id}`}>
                            <div style={{display:"flex",alignItems:"center",width:"336px",height:"56px",borderRadius:"8px",border:"1px solid #e0e0e0"}}>
                                <div style={{
                                    width:"40px",
                                    height:"40px",
                                    minWidth:"40px",
                                    minHeight:"40px",
                                    backgroundImage:`url(${product.thumbnail})`,backgroundSize:"cover",marginLeft:"8px",marginRight:"16px"}}></div>
                                <div style={{width:"100%"}}>{product.title}</div>
                                <div style={{width:"56px",marginRight:"20px",height:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                    <div style={{width:"16px",height:"16px",backgroundImage:`url(${icon_like})`,backgroundSize:"cover"}}></div>
                                    <div style={{width:"100%",height:"16px",fontWeight:"bold",textAlign:"center",lineHeight:'16px',fontSize:"14px"}}>{product.like_count}</div>
                                </div>
                            </div>
                        </Link>    
                    </div>}
                    <Link to="/proreviewer"><div className="btn_three" style={{width:"112px",height:"48px",marginTop:"32px",marginBottom:"80px"}}>목록으로</div></Link>
                    <div className="blog_item_reply_list">
                        {commnetList.map((item)=>(<CommentRender key={item.id} reRender={reRender} setReRender={setReRender} replayListApi={replayListApi} item={item}/>))}
                    </div>
                    <div className="blog_item_comment_submit">
                        <div style={{
                            width:"40px",
                            height:"40px",
                            minHeight:"40px",
                            minWidth:"40px",
                            marginRight:"16px",
                            borderRadius:"50%",
                            backgroundColor:"#c4c4c4",
                            backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`,
                            backgroundSize:"cover",
                            backgroundRepeat:"no-repeat",
                            backgroundPosition:"center"
                        }}
                            >
                        </div>
                            <div style={{width:"100%"}}>
                                <ReactQuill className="quillInput blog_item_comment_input" theme="" placeholder="의견이나 궁금한 점을 남겨보세요"
                                value={currentComment}
                                onChange={(e)=>{setCurrentComment(e)}}></ReactQuill>
                                {replyState&&<div className="review_profile_state" style={{marginBottom:"24px"}}></div>}
                                {!replyState&&<div className="review_profile_state" style={{color:"#ea4335",fontSize:'14px',marginTop:"8px",marginBottom:'16px',height:'14px',lineHeight:"14px"}}>내용을 입력해 주세요.</div>}
                            </div>
                        <div className="btn_one product_item_comment_submitbtn"
                        onClick={()=>{
                            if(localStorage.getItem("hash")){
                                replyAddApi();
                                setCurrentComment("");
                            }else{
                                setLoginWindow(true);
                            }
                        }}>남기기</div>
                    </div>
                </div>
                <RightBar scrollY={scrollY}></RightBar>
            </div>
        </div>
    )
}

const Review = ()=>{
    const [loginWindow,setLoginWindow] = useState(false);
    const [signupWindow,setSignUpWindow] = useState(false);
    const [modal,setModal] = useState(false);
    const [alarmModal,setAlarmModal] = useState(false);
    const [scrollY,setScrollY]=useState(0);

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
        <div className="contentsBody" style={{
            width:"100%",
            height:window.innerHeight,
          }}
      onClick={()=>{setModal(false);setAlarmModal(false);}}
      >
    <Header 
    setScrollY={setScrollY}
    setLoginWindow={setLoginWindow} 
    loginWindow={loginWindow}
    signupWindow={signupWindow}
    setSignUpWindow={setSignUpWindow}
    modal={modal}
    setModal={setModal}
    alarmModal={alarmModal}
    setAlarmModal={setAlarmModal}
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

export default Review;