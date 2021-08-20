import React, { useEffect, useState } from 'react';

import icon_logo from '../../image/logo.svg';
import icon_upBtn from '../../image/icon_upBtn.svg';
import icon_x from '../../image/icon_x.svg';
import icon_registerIcon from '../../image/icon_registerIcon.svg';
import intro from '../../image/intro.pdf';

import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Header=({setModal,loginWindow,signupWindow,modal,setLoginWindow,setSignUpWindow})=>{
    const [hover,setHover] = useState(0);
    const [header,setHeader] = useState(0);
    const [hambug,setHambug] =useState(false);
    const [height,setHeight] = useState(96);
    const currentScroll=useRef(0);
    const [scrollState,setScrollState] =useState(false);

    const upBtnMount = ()=>{
        if(window.innerWidth>767){
            window.addEventListener("scroll",()=>{    
                const scrollPosition = window.scrollY;
                const body = document.getElementById("pageBody");
                console.dir(currentScroll.current<scrollPosition);
                if(currentScroll.current<scrollPosition){
                    currentScroll.current=scrollPosition;
                    if(body.scrollHeight+96-window.innerHeight-10<scrollPosition){
                        setScrollState(true)
                    }else{
                        setScrollState(false);
                    }
                }else{
                    currentScroll.current=scrollPosition;
                    setScrollState(true);
                }
                
                if(scrollPosition>=96&&scrollPosition<=192){
                    setHeader(scrollPosition-96);
                }else if(scrollPosition>192){
                    setHeader(95);
                }else{
                    setHeader(0);
                }
            })
        }else{
            window.addEventListener("scroll",()=>{    
                const scrollPosition = window.scrollY;
                const body = document.getElementById("pageBody");
                if(currentScroll.current<scrollPosition){
                    currentScroll.current=scrollPosition;
                    if(body.scrollHeight+64-window.innerHeight-10<scrollPosition){
                        setScrollState(true)
                    }else{
                        setScrollState(false);
                    }
                }else{
                    currentScroll.current=scrollPosition;
                    setScrollState(true);
                }
                
                if(scrollPosition>=64&&scrollPosition<=128){
                    setHeader(scrollPosition-64);
                }else if(scrollPosition>128){
                    setHeader(95);
                }else{
                    setHeader(0);
                }
            })
        }
    }
  
    useEffect(()=>{
        upBtnMount();
        if(window.innerWidth>767){
            setHeight(96);
        }else{
            setHeight(64);
        }
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
            <div id="header" style={{width:"100%",height:height,backgroundColor:"#fff",display:"flex",justifyContent:"center",alignItems:"center",minHeight:height,zIndex:"9999"}}>
                <div className="header_bar">  
                        <Link to="/"><h1 className="header_logo" style={{backgroundImage:`url(${icon_logo})`}}><div style={{width:"1px",height:"1px",margin:"-1px",overflow:"hidden"}}>프루브잇</div></h1></Link>
                        <div className="header_usermenu">
                            {localStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"9999"}}>
                            <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                            <div className="btn_one" style={{width:"72px",height:"32px",backgroundColor:"#000"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                            </div>
                            }
                            {localStorage.getItem("hash")!==null&&<div className="header_icon_web">
                                <Link to="/registerproduct"><div className="btn_textBtn" style={{marginRight:"16px",fontWeight:"700",fontSize:"20px"}}>
                                    <div style={{width:"20px",height:'20px',minWidth:"20px",minHeight:"20px",backgroundImage:`url(${icon_registerIcon})`,marginRight:"4px"}}>
                                    </div>
                                    서비스 등록하기
                                    </div>
                                </Link>
                                <div className="btn_one" style={{
                                    width:"40px",
                                    height:"40px",
                                    borderRadius:"50%",
                                    backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`,
                                    backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                                </div>
                            }  
                            {localStorage.getItem("hash")!==null&&<div className="header_icon_phone"onClick={()=>{setHambug(true)}}></div>
                            } 
                        </div>
                </div>
                <div className="review_btn" style={{width:"100vw",height:"100%",minHeight:height,position:"absolute",top:0,left:0}}>
                    <div style={{width:"100%",height:"100%",minHeight:height,position:"relative",top:0,left:0}}></div>
                    <div style={{position:"absolute",width:"100%",height:"100%",top:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <div className="header_bar_menu">
                            <div style={{marginRight:"48px"}}><Link to="/">피드</Link></div>
                            <div style={{marginRight:"48px"}}><Link to="/proreviewer">매거진</Link></div>
                            <div style={{marginRight:"48px"}}><Link to="/community">토론-토</Link></div>
                            <div><Link to="/introduce">소개</Link></div>
                        </div>
                        
                    </div>
                </div>     
            </div>
            
            
            
            {(!loginWindow&&!signupWindow)&&
            <div id="header" style={{width:"100vw",height:height,backgroundColor:"#fff",display:"flex",position:"fixed",transform:`translate(0,${header}px)`,top:"-96px",justifyContent:"center",alignItems:"center",minHeight:height,zIndex:"9999"}}>
                <div className="header_bar">  
                    <Link to="/"><div className="header_logo" style={{backgroundImage:`url(${icon_logo})`}}></div></Link>
                    <div className="header_usermenu">
                            {localStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                            <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                            <div className="btn_one" style={{width:"72px",height:"32px",backgroundColor:"#000"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                            </div>
                            }
                            {localStorage.getItem("hash")!==null&&<div className="header_icon_web">
                                <Link to="/registerproduct"><div className="btn_textBtn" style={{marginRight:"16px",fontWeight:"700",fontSize:"20px"}}>
                                    <div style={{width:"20px",height:'20px',minWidth:"20px",minHeight:"20px",backgroundImage:`url(${icon_registerIcon})`,marginRight:"4px"}}>
                                    </div>
                                    서비스 등록하기
                                    </div>
                                </Link>
                                <div className="btn_one" style={{width:"40px",height:"40px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                                ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                                </div>
                            }  
                            {localStorage.getItem("hash")!==null&&<div className="header_icon_phone"onClick={()=>{setHambug(true)}}></div>
                            } 
                        </div>
                </div>  
                <div className="review_btn" style={{width:"100vw",height:"100%",minHeight:height,position:"absolute",top:0,left:0}}>
                    <div style={{width:"100%",height:"100%",minHeight:height,position:"relative",top:0,left:0}}></div>
                    <div style={{position:"absolute",width:"100%",height:"100%",top:0,left:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <div className="header_bar_menu">
                            <div style={{marginRight:"48px"}}><Link to="/">피드</Link></div>
                            <div style={{marginRight:"48px"}}><Link to="/proreviewer">매거진</Link></div>
                            <div style={{marginRight:"48px"}}><Link to="/community">토론-토</Link></div>
                            <div><Link to="/introduce">소개</Link></div>
                        </div>
                    </div>
                </div>             
                {modal&&<div style={{width:"192px",height:"80px",position:'absolute',backgroundColor:"#fff",right:"0px",top:`${height*2-header}px`,zIndex:"9",boxShadow:"0px 1px 4px rgba(0,0,0,0.1)"}}>
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
            
            </div>}
            
            
            {hambug&&<div style={{position:"fixed",left:0,top:0,width:"100vw",height:"100vh",fontSize:'14px',color:"#505050",backgroundColor:"#fff",padding:"16px 20px 16px 20px",zIndex:9999}}>
                <div style={{display:"flex",justifyContent:"space-between",height:height,alignItems:"center"}}>
                    <Link to="/"><div style={{width:"102px",height:"18px",backgroundImage:`url(${icon_logo})`,backgroundSize:"cover"}}></div></Link>
                    <div style={{width:'24px',height:'24px',backgroundImage:`url(${icon_x})`}}
                    onClick={()=>{setHambug(false)}}></div>
                </div>
                <div>
                    <div className="btn_one" style={{width:"32px",height:"32px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                    ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat',marginBottom:'16px'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                    <Link to="/registerproduct"><div className="btn_textBtn" style={{height:"40px",lineHeight:"40px"}}
                    onClick={()=>{setHambug(false);}}>서비스 등록하기</div></Link>
                    <Link to="/profile"><div style={{width:"100%",height:"40px",lineHeight:"40px",fontSize:'14px',color:"#505050",backgroundColor:hover===1?"rgba(156, 49, 198, 0.1)":"#fff"}}
                    onMouseOver={()=>{setHover(1)}}
                    onMouseLeave={()=>{setHover(0)}}
                    onClick={()=>{setHambug(false);}}>내 프로필</div></Link>
                    <div style={{width:"100%",height:"40px",cursor:"pointer",lineHeight:"40px",fontSize:'14px',color:"#505050",backgroundColor:hover===2?"rgba(156, 49, 198, 0.1)":"#fff"}}
                        onMouseOver={()=>{setHover(2)}}
                        onMouseLeave={()=>{setHover(0)}}
                        onClick={()=>{
                            const alink = document.createElement("a");
                            alink.href="/";
                            localStorage.clear();
                            alink.click();
                    }}>로그아웃</div>
                    <div style={{width:"100%",height:"1px",backgroundColor:"#f1f1f1",marginBottom:"16px",marginTop:"16px"}}></div>
                    <Link to="/community"><div className="text_menu_icon" onClick={()=>{setHambug(false);}}>토론-토</div></Link>
                    <Link to="/proreviewer"><div className="text_menu_icon" onClick={()=>{setHambug(false);}}>매거진</div></Link>
                    <div style={{width:"100%",height:"1px",backgroundColor:"#f1f1f1",marginBottom:"16px",marginTop:"16px"}}></div>
                    <div style={{height:"40px",lineHeight:"40px"}} onClick={()=>{setHambug(false);}}><Link to="/introduce">소개</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}} onClick={()=>{setHambug(false);}}><Link to="/guideline">커뮤니티 가이드라인</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}} onClick={()=>{setHambug(false);}}><Link to="/tos">이용약관</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}} onClick={()=>{setHambug(false);}}><Link to="/privacy_policy">개인정보 처리방침</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}}>이메일 문의 : hello@110corp.com</div>
                    <div style={{height:"40px",lineHeight:"40px"}}>© 2021 oneonezero Inc.</div>
                </div>
            </div>}
            {window.innerWidth>767&&<div className="btn_up" style={{backgroundImage:`url(${icon_upBtn})`,display:header!==95&&"none",transform:scrollState&&`translate(0,${-104}px)`}}
                onClick={upEvt}></div>}
        </>
    )
  }

export default Header;