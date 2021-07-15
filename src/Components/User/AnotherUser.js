import React, { useEffect, useState } from 'react';

import icon_logo from '../../image/logo.svg';
import icon_like from '../../image/likeIcon.svg';
import icon_upBtn from '../../image/icon_upBtn.svg';
import icon_comment from '../../image/commentIcon.svg';
import googleLogin from '../../image/googleLogin.svg';
import googleSign from '../../image/googleSign.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import GoogleLogin from 'react-google-login';

const Header=({setModal,loginWindow,signupWindow,modal,setLoginWindow,setSignUpWindow})=>{
    const [hover,setHover] = useState(0);
    const [header,setHeader] = useState(0);
  
    const upBtnMount = ()=>{
        window.addEventListener("scroll",()=>{    
            const scrollPosition = window.scrollY;
            if(scrollPosition>=48&&scrollPosition<=96){
                setHeader(scrollPosition-48);
            }else if(scrollPosition>96){
                setHeader(47);
            }else{
                setHeader(0);
            }
        })
    }
  
    useEffect(()=>{
        upBtnMount();
    },[])
  
    const upEvt = ()=>{
        window.scroll({
          behavior:"smooth",
          left:0,
          top:0
        });
    }
    return(
        <>
          <div id="header" style={{width:"100%",height:"48px",backgroundColor:"#fff",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"48px"}}>
              <div style={{width:"1040px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>  
                      <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                      <div>
                  {localStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                      <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                      <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                      </div>
                  }
                  {localStorage.getItem("hash")!==null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                      <Link to="/registerproduct"><div className="btn_textBtn" style={{marginRight:"16px"}}>내 서비스 등록하기</div></Link>
                      <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${"https://www.proveit.co.kr/"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                      ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                      </div>
                  }  
              </div>
  
              </div>
          </div>
          {(!loginWindow&&!signupWindow)&&<div id="header" style={{width:"100%",height:"48px",backgroundColor:"#fff",position:"fixed",top:"-48px",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"48px",
                                transform:`translate(0,${header}px)`,transition:"0.3s",zIndex:"9999"}}>
            <div style={{width:"1040px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>  
                    <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                    <div>
                {localStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                    <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                    </div>
                }
                {localStorage.getItem("hash")!==null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <Link to="/registerproduct"><div className="btn_textBtn" style={{marginRight:"16px"}}>내 서비스 등록하기</div></Link>
                    <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${"https://www.proveit.co.kr/"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                    ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                    </div>
                }  
            </div>
            {modal&&<div style={{width:"192px",height:"80px",position:'absolute',backgroundColor:"#fff",right:"0px",top:`${96-header}px`,zIndex:"999"}}>
            <Link to="/profile"><div style={{width:"100%",height:"40px",lineHeight:"40px",paddingLeft:"16px",fontSize:'14px',color:"#505050",backgroundColor:hover===1?"rgba(156, 49, 198, 0.1)":"#fff"}}
            onMouseOver={()=>{setHover(1)}}
            onMouseLeave={()=>{setHover(0)}}>내 프로필</div></Link>
            <div style={{width:"100%",height:"40px",cursor:"pointer",lineHeight:"40px",paddingLeft:"16px",fontSize:'14px',color:"#505050",backgroundColor:hover===2?"rgba(156, 49, 198, 0.1)":"#fff"}}
            onMouseOver={()=>{setHover(2)}}
            onMouseLeave={()=>{setHover(0)}}
            onClick={()=>{
                const alink = document.createElement("a");
                alink.href="/";
                localStorage.clear();
                // alink.click();
                }}>로그아웃</div>
            </div>}
            </div>
        </div>}
            <div className="btn_up" style={{width:"40px",height:"40px",backgroundImage:`url(${icon_upBtn})`,position:"fixed",bottom:"84px",right:"80px",backgroundRepeat:"no-repeat",backgroundPosition:"center",
                display:header!==47&&"none",
                cursor:"pointer"}}
                onClick={upEvt}></div>   
        </>
    )
  }

const Body =()=>{
    const [render,setRender] =useState(false);
    const [myProducts,setMyProducts] =useState(["",]);
    const [likelyProducts,setLikelyProducts] =useState([]);
    const [myReply,setMyReply] =useState([]);
    const [fullListState,setFullListState]= useState("none");

    const [currentUserInfo,setCurrentUserInfo] = useState(
        {
            userId:"dkdk@gmail.com",
            name:"아무개",
            nickName:"아무개",
            belong:"한국",
            position:"직장인",
            profileUrl:"",
            comment:"",
            likeProject:"",
            registerProject:"",
            newLetterState:false
        }
    )

    const userInfoGetApi = async()=>{
        var data = new FormData();
        data.append('email', window.location.search.substring(1));
        data.append('type', 'product');
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/userTrace.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "400"){
                    setCurrentUserInfo(e.data.user);
                    setMyProducts(e.data.product);
                    setLikelyProducts(e.data.like);
                    setMyReply(e.data.reply);
                    setRender(true);
                }else{
      
                }
            })
        }catch{
      
        }
    }

    useEffect(()=>{
        userInfoGetApi();
    },[])
    
    const ProductRender =({item,type,index})=>{
        return(
            <div style={{position:"relative"}}>
            {index<4&&<Link to={`/product?productnum=${item.id}`}><div id={item.id} 
              style={{width:"688px",height:"120px",display:"flex",alignItems:"center",backgroundColor:"#fff",position:"relative",cursor:"pointer",borderBottom:"1px solid #e5e5e5"}}
              onClick={(e)=>{e.stopPropagation();}}
            >
              <div style={{width:"88px",marginLeft:"16px",height:"88px",marginRight:"16px",backgroundImage:`url(${item.thumbnail})`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
              <div style={{width:type==="myProduct"?"368px":"480px",textAlign:"left",marginRight:"32px"}}>
                <div style={{color:"#505050",height:"16px",fontWeight:"bold",fontSize:'16px',marginBottom:"12px",lineHeight:"16px"}}>{item.title}</div>
                <div style={{color:"#828282",height:"14px",fontSize:'13px',marginBottom:'16px',lineHeight:"14px"}}>{item.sub_title}</div>
                <div style={{display:"flex",height:"24px",alignItems:"center"}}>
                  <div style={{padding:"3.5px 5px 3.5px 5px",maxHeight:"24px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",backgroundColor:"#F1F1F1"}}>
                    <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_comment})`,marginRight:"8px"}}></div>
                    <div>{item.review_count}</div>
                  </div>
                  <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.payment_type}</div>
                  <div style={{height:"14px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",width:"1px",backgroundColor:"#e5e5e5"}}></div>
                  <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.category}</div>
                </div>
              </div>
              <div style={{position:"absolute",width:"48px",height:"52px",right:"28px"}}>
                <div style={{height:"50%",width:"100%",backgroundImage:`url(${icon_like})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
                <div style={{height:"50%",width:"100%",fontSize:"18px",fontWeight:"bold",color:"#505050",textAlign:"center"}}>{item.like_count}</div>
              </div>
            </div>
            </Link>}
            {index===undefined&&<Link to={`/product?productnum=${item.id}`}><div id={item.id} 
              style={{width:"688px",height:"120px",display:"flex",alignItems:"center",backgroundColor:"#fff",position:"relative",cursor:"pointer",borderBottom:"1px solid #e5e5e5"}}
              onClick={(e)=>{e.stopPropagation();}}
            >
              <div style={{width:"88px",marginLeft:"16px",height:"88px",marginRight:"16px",backgroundImage:`url(${item.thumbnail})`,backgroundColor:"#000",backgroundPosition:"center",backgroundSize:"cover"}}></div>
              <div style={{width:"480px",textAlign:"left",marginRight:"24px"}}>
                <div style={{color:"#505050",height:"16px",fontWeight:"bold",fontSize:'16px',marginBottom:"12px",lineHeight:"16px"}}>{item.title}</div>
                <div style={{color:"#828282",height:"14px",fontSize:'13px',marginBottom:'16px',lineHeight:"14px"}}>{item.sub_title}</div>
                <div style={{display:"flex",height:"24px",alignItems:"center"}}>
                  <div style={{padding:"3.5px 5px 3.5px 5px",maxHeight:"24px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",backgroundColor:"#F1F1F1"}}>
                    <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_comment})`,marginRight:"8px"}}></div>
                    <div>{item.review_count}</div>
                  </div>
                  <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.payment_type}</div>
                  <div style={{height:"14px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",width:"1px",backgroundColor:"#e5e5e5"}}></div>
                  <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.category}</div>
                </div>
              </div>
              <div style={{position:"absolute",width:"48px",height:"52px",right:"28px"}}>
                <div style={{height:"50%",width:"100%",backgroundImage:`url(${icon_like})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
                <div style={{height:"50%",width:"100%",fontSize:"18px",fontWeight:"bold",color:"#505050",textAlign:"center"}}>{item.like_count}</div>
              </div>
            </div>
            </Link>}
            </div>
        )
    }

    const ReplyRender =({item,index})=>{
        return(
            <div style={{cursor:"pointer"}} onClick={
                ()=>{
                    localStorage.setItem("replyId",item.reply_id);
                    const alink = document.createElement("a");
                    alink.href =`/product?productnum=${item.product_id}`;
                    alink.click();
                }
                }>
            {index<3&&<div style={{width:"336px",backgroundColor:"#fff",padding:"24px 24px 32px 24px",borderBottom:"1px solid #e5e5e5"}}>
                <div style={{fontSize:"16px",fontWeight:"bold"}}>{item.title}에 단 댓글</div>
                <div style={{width:"288px",position:"relative",marginBottom:"24px"}}>
                    <ReactQuill theme=""
                    value={item.reply} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%"}}></ReactQuill>
                    <div style={{width:"100%",height:"100%",position:'absolute',top:0,left:0}}></div>
                </div>
            </div>}
            {index===undefined&&<div style={{width:"687px",backgroundColor:"#fff",padding:"24px 24px 24px 24px",borderBottom:"1px solid #e5e5e5"}}>
                <div style={{fontSize:"16px",fontWeight:"bold"}}>{item.title}에 단 댓글</div>
                <div style={{width:"288px",position:"relative",marginBottom:"24px"}}>
                    <ReactQuill theme=""
                    value={item.reply} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%"}}></ReactQuill>
                    <div style={{width:"100%",height:"100%",position:'absolute',top:0,left:0}}></div>
                </div>
            </div>}
            </div>
        )
    }

    return(
        <>
        {render&&<div style={{width:"100%",height:"100%",backgroundColor:"#F9F9F9",display:"flex",alignItems:"center",flexDirection:"column"}}>
            <div style={{
                width:"100%",
                borderBottom:"1px solid #e5e5e5"
                ,height:"272px",
                display:"flex",
                justifyContent:"center",
                }}>
                <div style={{width:"1040px",height:"100%",display:"flex",alignItems:"center"}}>
                    <div style={{
                        width:'160px',
                        height:"160px",
                        borderRadius:"50%",
                        backgroundColor:"#e5e5e5",
                        marginRight:"40px",
                        backgroundImage:`url(${"https://www.proveit.co.kr"+currentUserInfo.thumbnail})`,
                        backgroundSize:"cover",
                        backgroundRepeat:"no-repeat",
                        backgroundPosition:"center"}}></div>
                    <div>
                        <div style={{fontSize:"20px",color:'#505050',height:"20px",lineHeight:"20px",marginBottom:"16px",fontWeight:"bold"}}>{currentUserInfo.nick}</div>
                        <div style={{fontSize:"14px",color:'#828282',height:"14px",lineHeight:"14px",marginBottom:"16px"}}>{currentUserInfo.department},{currentUserInfo.position}</div>
                    </div>
                </div>
            </div>
            {fullListState==="none"&&<div style={{width:"1040px",display:"flex",marginTop:"32px"}}>
                <div style={{width:"688px",marginRight:"16px"}}>
                    <div style={{marginBottom:"40px"}}>
                        <div style={{fontWeight:"bold",marginBottom:"16px"}}>등록한 서비스</div>
                        {myProducts.map((item,index)=>(<ProductRender key={index} index={index} item={item} type="myProduct"/>))}
                        {myProducts.length>4&&<div style={{
                        width:"100%",
                        height:"40px",
                        borderBottom:"1px solid #e5e5e5",
                        backgroundColor:"#fff",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        color:"#828282",
                        cursor:"pointer"}}
                        onClick={()=>{setFullListState("myProducts")}}>모두 보기</div>}
                    </div>
                    <div style={{marginBottom:"40px"}}>
                        <div style={{fontWeight:"bold",marginBottom:"16px"}}>추천했어요</div>
                        {likelyProducts.map((item,index)=>(<ProductRender key={index} index={index} item={item} type="likely"/>))}
                        {likelyProducts.length>4&&<div style={{
                        width:"100%",
                        height:"40px",
                        borderBottom:"1px solid #e5e5e5",
                        backgroundColor:"#fff",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        color:"#828282",
                        cursor:"pointer"}}
                        onClick={()=>{setFullListState("likelyProduct")}}>모두 보기</div>}
                    </div>
                </div>
                <div style={{width:"336px"}}>
                    <div style={{fontWeight:"bold",marginBottom:"16px"}}>코멘트</div>
                    {myReply.map((item,index)=>(<ReplyRender key={index} myReply={myReply} index={index} item={item}></ReplyRender>))}
                    {myReply.length>4&&<div style={{
                        width:"100%",
                        height:"40px",
                        borderBottom:"1px solid #e5e5e5",
                        backgroundColor:"#fff",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        color:"#828282",
                        cursor:"pointer"}}
                        onClick={()=>{setFullListState("myReply")}}>모두 보기</div>}
                </div>
            </div>}
            {fullListState!=="none"&&<div style={{width:"1040px",display:"flex",marginTop:"32px",flexDirection:"column"}}>
                {fullListState==="myProducts"&&<div>
                {myProducts.map((item,index)=>(<ProductRender key={index} item={item} type="myProduct"/>))}
                </div>}
                {fullListState==="likelyProduct"&&<div>
                {myProducts.map((item,index)=>(<ProductRender key={index} item={item} type="myProduct"/>))}
                </div>}
                {fullListState==="myReply"&&<div>
                {myReply.map((item,index)=>(<ReplyRender key={index} myReply={myReply} item={item}></ReplyRender>))}
                </div>}
                <div style={{width:"687px",height:"19px",fontSize:'13px',color:"#828282",textAlign:"center",marginTop:"24px",marginBottom:"39px"}}>여기가 끝이에요</div>
            </div>}
        
        </div>}
        </>
    )
}

const AnotherUser = ()=>{
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
                    localStorage.setItem("userInfo",JSON.stringify(e.data.user));
                }else{
    
                }
            })
        }catch{
    
        }
      }

  return(
    <div style={{width:"100%",display:"flex",flexDirection:"column"}}
    onClick={()=>{setModal(false)}}>
    <Header 
    setLoginWindow={setLoginWindow} 
    loginWindow={loginWindow}
    modal={modal}
    setModal={setModal}
    ></Header>
    <Body
    ></Body>

{loginWindow&&<div 
      style={{
        position:"absolute",
        width:'100%',
        height:'100%',
        backgroundColor:"rgba(80,80,80,0.9)",
        display:"flex",
        justifyContent:"center"
        }}
    onClick={()=>{setLoginWindow(false)}}>
      <div style={{
        width:"688px",
        height:"384px",
        backgroundColor:"#fff",
        borderRadius:'4px',
        marginTop:"179px",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        position:"fixed",
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-100%)",
        color:"#505050"}}
        onClick={(e)=>{setLoginWindow(true);e.stopPropagation();}}>
          <div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`,marginTop:"56px",marginBottom:"32px"}}></div>
          <div style={{height:'23px',lineHeight:"23px",fontSize:"20px",fontWeight:'bold',marginBottom:"40px"}}>로그인</div>
          <div style={{fontSize:"16px",lineHeight:"28.8px",textAlign:"left",marginBottom:"49px"}}>
            <li>서비스를 프루브잇에 소개하고 커뮤니티 피드백을 받아보세요.</li>
            <li>랜딩페이지만 있으면 아이디어만으로도 충분히 검증해 볼 수 있어요.</li>
            <li>지금 어떤 서비스들이 만들어지고 있는지 확인하세요</li>
          </div>
          <div style={{position:"relative",width:"256px",height:"56px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <GoogleLogin
                        clientId='148840721751-8otnv8h8pcuabmilq8mdv9ungtmohatc.apps.googleusercontent.com'
                        buttonText=""
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <div style={{position:"absolute",width:"100%",height:"100%",left:0,top:0,backgroundImage:`url(${googleLogin})`,cursor:"pointer"}}
                    onClick={(e)=>{e.target.parentNode.childNodes[0].click();}}></div>
          </div>
      </div>
    </div>}

    {signupWindow&&<div 
      style={{
        position:"absolute",
        width:'100%',
        height:'100%',
        backgroundColor:"rgba(80,80,80,0.9)",
        display:"flex",
        justifyContent:"center"
        }}
    onClick={()=>{setSignUpWindow(false)}}>
      <div style={{
        width:"688px",
        height:"384px",
        backgroundColor:"#fff",
        borderRadius:'4px',
        marginTop:"179px",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        position:"fixed",
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-100%)",
        color:"#505050"}}
        onClick={(e)=>{setSignUpWindow(true);e.stopPropagation();}}>
          <div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`,marginTop:"56px",marginBottom:"32px"}}></div>
          <div style={{height:'23px',lineHeight:"23px",fontSize:"20px",fontWeight:'bold',marginBottom:"40px"}}>회원가입</div>
          <div style={{fontSize:"16px",lineHeight:"28.8px",textAlign:"left",marginBottom:"49px"}}>
            <li>서비스를 프루브잇에 소개하고 커뮤니티 피드백을 받아보세요.</li>
            <li>랜딩페이지만 있으면 아이디어만으로도 충분히 검증해 볼 수 있어요.</li>
            <li>지금 어떤 서비스들이 만들어지고 있는지 확인하세요</li>
          </div>
          <div style={{position:"relative",width:"256px",height:"56px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <GoogleLogin
                        clientId='148840721751-8otnv8h8pcuabmilq8mdv9ungtmohatc.apps.googleusercontent.com'
                        buttonText=""
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <div style={{position:"absolute",width:"100%",height:"100%",left:0,top:0,backgroundImage:`url(${googleSign})`,cursor:"pointer"}}
                    onClick={(e)=>{e.target.parentNode.childNodes[0].click();}}></div>
          </div>
      </div>
    </div>}
 
  </div>  
  )
}

export default AnotherUser;