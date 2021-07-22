import React, { useEffect, useState } from 'react';

import icon_logo from '../../image/logo.svg';
import icon_upBtn from '../../image/icon_upBtn.svg';
import icon_x from '../../image/icon_x.svg';
import intro from '../../image/intro.pdf';
import { Link } from 'react-router-dom';

const Header=({setModal,loginWindow,signupWindow,modal,setLoginWindow,setSignUpWindow})=>{
    const [hover,setHover] = useState(0);
    const [header,setHeader] = useState(0);
    const [hambug,setHambug] =useState(false);
  
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
              <div className="header_bar">  
                      <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                      <div>
                  {localStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                      <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                      <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                      </div>
                  }
                  {localStorage.getItem("hash")!==null&&<div className="header_icon_web">
                      <Link to="/registerproduct"><div className="btn_textBtn" style={{marginRight:"16px"}}>서비스 등록하기</div></Link>
                      <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${"https://www.proveit.co.kr/"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                      ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                      </div>
                  }  
                  {localStorage.getItem("hash")!==null&&<div className="header_icon_phone"onClick={()=>{setHambug(true)}}></div>
                  } 
              </div>
  
              </div>
          </div>
          {(!loginWindow&&!signupWindow)&&<div id="header" style={{width:"100%",height:"48px",backgroundColor:"#fff",position:"fixed",top:"-48px",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"48px",
                                transform:`translate(0,${header}px)`,transition:"0.3s",zIndex:"9999"}}>
            <div className="header_bar">
                    <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                    <div>
                {localStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                    <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                    </div>
                }
                {localStorage.getItem("hash")!==null&&<div className="header_icon_web">
                    <Link to="/registerproduct"><div className="btn_textBtn" style={{marginRight:"16px"}}>서비스 등록하기</div></Link>
                    <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${"https://www.proveit.co.kr/"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                    ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                    </div>
                }  
                {localStorage.getItem("hash")!==null&&<div className="header_icon_phone"onClick={()=>{setHambug(true)}}></div>
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
                alink.click();
                }}>로그아웃</div>
            </div>}
            </div>
        </div>}
            {hambug&&<div style={{position:"fixed",left:0,top:0,width:"100vw",height:"100vh",fontSize:'14px',color:"#505050",backgroundColor:"#fff",padding:"16px 20px 16px 20px",zIndex:9999}}>
                <div style={{display:"flex",justifyContent:"space-between",height:"48px",}}>
                    <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                    <div style={{width:'24px',height:'24px',backgroundImage:`url(${icon_x})`}}
                    onClick={()=>{setHambug(false)}}></div>
                </div>
                <div>
                    <div className="btn_one" style={{width:"32px",height:"32px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${"https://www.proveit.co.kr/"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                    ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat',marginBottom:'16px'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                    <Link to="/registerproduct"><div className="btn_textBtn" style={{height:"40px",lineHeight:"40px"}}>서비스 등록하기</div></Link>
                    <Link to="/profile"><div style={{width:"100%",height:"40px",lineHeight:"40px",fontSize:'14px',color:"#505050",backgroundColor:hover===1?"rgba(156, 49, 198, 0.1)":"#fff"}}
                    onMouseOver={()=>{setHover(1)}}
                    onMouseLeave={()=>{setHover(0)}}>내 프로필</div></Link>
                    <div style={{width:"100%",height:"40px",marginBottom:"40px",cursor:"pointer",lineHeight:"40px",fontSize:'14px',color:"#505050",backgroundColor:hover===2?"rgba(156, 49, 198, 0.1)":"#fff"}}
                        onMouseOver={()=>{setHover(2)}}
                        onMouseLeave={()=>{setHover(0)}}
                        onClick={()=>{
                            const alink = document.createElement("a");
                            alink.href="/";
                            localStorage.clear();
                            alink.click();
                    }}>로그아웃</div>
                    <div style={{height:"40px",lineHeight:"40px"}}><a href={intro} target="_blank">소개</a></div>
                    <div style={{height:"40px",lineHeight:"40px"}}><Link to="/guideline">커뮤니티 가이드라인</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}}><Link to="/tos">이용약관</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}}><Link to="/privacy_policy">개인정보 처리방침</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}}>이메일 문의 : hello@110corp.com</div>
                    <div style={{height:"40px",lineHeight:"40px"}}>© 2021 oneonezero Inc.</div>
                </div>
            </div>}
            {!hambug&&<div className="btn_up" style={{backgroundImage:`url(${icon_upBtn})`,display:header!==47&&"none"}}
                onClick={upEvt}></div>}
        </>
    )
  }

export default Header;