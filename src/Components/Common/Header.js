import React, { useEffect, useState } from 'react';

import icon_logo from '../../image/logo.svg';
import icon_upBtn from '../../image/icon_upBtn.svg';
import icon_x from '../../image/icon_x.svg';
import icon_registerIcon from '../../image/icon_registerIcon.svg';
import icon_notice from '../../image/icon_notice.svg';
import notAlarmIcon from '../../image/notAlarmIcon.png';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';

const AlarmRender = ({item})=>{
    const [hover,setHover] = useState(false);

    const alarmCheckApi = async(id)=>{
        var data = new FormData();
        data.append('user_email', localStorage.getItem("email"));
        data.append('hash', localStorage.getItem("hash"));
        data.append('type', 'check');
        data.append('id', id);
        try{
            await axios({
                method:"post",
                url : "https://proveit.co.kr/api/alarm.php",
                data:data
    
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    const alink = document.createElement("a");
                    alink.href = item.url;
                    if(item.type_1 ==="reply"){
                        alink.href = item.url;
                        localStorage.setItem("replyId",item.reply_id);
                        alink.click();
                    }else{
                        alink.click();
                    }
                    
                }else{
    
                }
            })
        }catch{
    
        }
    }

    return(
        <div style={{display:"flex",cursor:"pointer",backgroundColor:item.check==="Y"?"#fff":"#F5EAF9",paddingTop:"11px",paddingBottom:"16px"}}
        onMouseLeave={()=>{setHover(false)}}
        onMouseOver={()=>{setHover(true)}}
        onClick={(e)=>{
            alarmCheckApi(item.id);
            e.stopPropagation();
        }}
        ><div style={{display:"flex",width:"36px",height:"36px",borderRadius:"50%",marginRight:"8px",marginLeft:"16px",backgroundSize:"cover",backgroundImage:`url(${item.thumbnail})`}}></div>
            {(item.type_1==="reply"&&item.type_2==="reply_reply")&&<div 
            style={{cursor:"pointer",width:"252px",minHeight:"32px",fontSize:"13px",lineHeight:"1.5"}}
            >
                <span style={{color:"#9c31c6"}}>{item.nick}</span>
                ?????? <span style={{fontWeight:"500"}}>{item.title}</span> ????????? {JSON.parse(localStorage.getItem("userInfo")).nick}?????? ?????????????????? :
                <ReactQuill theme=""
                        className="profile_comment_quill"
                        value={item.comment.length>32?item.comment.slice(0,32)+"??????":item.comment} style={{textAlign:"left",color:"#505050",fontSize:'13px',width:"100%",height:'16px',lineHeight:"16px",overflow:"hidden"}}></ReactQuill>
                <div style={{marginTop:"12px",color:"#a1a1a1",fontSize:"12px",fontWeight:"400"}}>{item.ago_time}</div>
            </div>}

            {(item.type_1==="reply"&&item.type_2!=="reply_reply")&&<div 
            style={{cursor:"pointer",width:"252px",minHeight:"32px",fontSize:"13px",lineHeight:"1.5"}}
            >
                <span style={{color:"#9c31c6"}}>{item.nick}</span>
                ?????? <span style={{fontWeight:"500"}}>{item.title}</span>??? ????????? ??????????????? :
                <ReactQuill theme=""
                        className="profile_comment_quill"
                        value={item.comment.length>32?item.comment.slice(0,32)+"??????":item.comment} style={{textAlign:"left",color:"#505050",fontSize:'13px',width:"100%",height:'16px',lineHeight:"16px",overflow:"hidden"}}></ReactQuill>
                <div style={{marginTop:"12px",color:"#a1a1a1",fontSize:"12px",fontWeight:"400"}}>{item.ago_time}</div>
            </div>}

            {(item.type_1==="like"&&item.cnt==="1")&&<div 
                style={{cursor:"pointer",width:"252px",minHeight:"32px",fontSize:"13px",lineHeight:"1.5"}}
                >
                    <span style={{color:"#9c31c6"}}>{item.nick}</span>
                    ?????? <span style={{fontWeight:"500"}}>{item.title}</span>???(???) ??????????????????.
                    <div style={{marginTop:"12px",color:"#a1a1a1",fontSize:"12px",fontWeight:"400"}}>{item.ago_time}</div>
                </div>
            }

            {(item.type_1==="like"&&item.cnt!=="1")&&<div 
                style={{cursor:"pointer",width:"252px",minHeight:"32px",fontSize:"13px",lineHeight:"1.5"}}
                >
                    <span style={{color:"#9c31c6"}}>{item.nick}?????? {item.cnt-1}?????? ???????????? </span>
                    <span style={{fontWeight:"500"}}>{item.title}</span>???(???) ??????????????????.
                    <div style={{marginTop:"12px",color:"#a1a1a1",fontSize:"12px",fontWeight:"400"}}>{item.ago_time}</div>
                </div>
            }

            {(item.type_1==="reply_like"&&item.cnt!=="1")&&<div 
                style={{cursor:"pointer",width:"252px",minHeight:"32px",fontSize:"13px",lineHeight:"1.5"}}
                >
                    <span style={{color:"#9c31c6"}}>{item.nick}?????? {item.cnt-1}?????? ???????????? </span>
                    <ReactQuill theme=""
                        className="profile_comment_quill"
                        value={item.comment.length>32?item.comment.slice(0,32)+"??????":item.comment} 
                        style={{textAlign:"left",color:"#505050",fontSize:'13px',width:"100%",height:'16px',lineHeight:"16px",overflow:"hidden"}}></ReactQuill>
                    <span style={{fontWeight:"500"}}>????????? ??????????????????.</span>
                    <div style={{marginTop:"12px",color:"#a1a1a1",fontSize:"12px",fontWeight:"400"}}>{item.ago_time}</div>
                </div>
            }

            
            {(item.type_1==="reply_like"&&item.cnt==="1")&&<div 
                style={{cursor:"pointer",width:"252px",minHeight:"32px",fontSize:"13px",lineHeight:"1.5"}}
                >
                    <span style={{color:"#9c31c6"}}>{item.nick}</span>
                    <span style={{color:"#262626"}}>?????? </span>
                    <ReactQuill theme=""
                        className="profile_comment_quill"
                        value={item.comment.length>24?`"${item.comment.slice(0,24)}??????"`:item.comment} 
                        style={{textAlign:"left",color:"#505050",fontSize:'13px',width:"100%",height:'16px',lineHeight:"16px",overflow:"hidden"}}></ReactQuill>
                    <span style={{fontWeight:"500"}}>????????? ??????????????????.</span>
                    <div style={{marginTop:"12px",color:"#a1a1a1",fontSize:"12px",fontWeight:"400"}}>{item.ago_time}</div>
                </div>
            }
        </div>
    )
}

const Header=({setModal,loginWindow,signupWindow,modal,setLoginWindow,setSignUpWindow,setScrollY,alarmModal,setAlarmModal})=>{
    const [hover,setHover] = useState(0);
    const [header,setHeader] = useState(0);
    const [hambug,setHambug] =useState(false);
    const [height,setHeight] = useState(120);
    const [rendering,setRendering] = useState(false); 
    const currentScroll=useRef(0);
    const [scrollState,setScrollState] =useState(false);  
    const [alarmList,setAlarmList] = useState([]);
    const [newAlarm,setNewAlarm] = useState(false);

    const upBtnMount = (scrollY)=>{
        if(scrollY>767){
            const scrollPosition = scrollY;
            const body = document.getElementById("pageBody");
            if(currentScroll.current<scrollPosition){
                currentScroll.current=scrollPosition;
                if(body.scrollHeight+144-window.innerHeight-10<scrollPosition){
                    setScrollState(true)
                }else{
                    setScrollState(false);
                }
            }else{
                currentScroll.current=scrollPosition;
                setScrollState(true);
            }
            
            if(scrollPosition>=120&&scrollPosition<=192){
                setHeader(scrollPosition-120);
            }else if(scrollPosition>192){
                setHeader(144);
            }else{
                setHeader(0);
            }      
        }else{
            const scrollPosition = scrollY;
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
                setHeader(96);
            }else{
                setHeader(0);
            }
            
        }
    }

    const upBtnMount_phone = ()=>{
        if(window.innerWidth>767){
            window.addEventListener("scroll",()=>{
                // setScrollY(window.scrollY);
                const scrollPosition = window.scrollY;
                const body = document.getElementById("pageBody");
                if(currentScroll.current<scrollPosition){
                    currentScroll.current=scrollPosition;
                    if(body.scrollHeight+120-window.innerHeight-10<scrollPosition){
                        setScrollState(true)
                    }else{
                        setScrollState(false);
                    }
                }else{
                    currentScroll.current=scrollPosition;
                    setScrollState(true);
                }
                
                if(scrollPosition>=120&&scrollPosition<=240){
                    setHeader(scrollPosition-120);
                }else if(scrollPosition>120){
                    setHeader(120);
                }else{
                    setHeader(0);
                }      
            })
        }else{
            window.addEventListener("scroll",()=>{
                // setScrollY(window.scrollY);
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
                
                if(scrollPosition>=112&&scrollPosition<=224){
                    setHeader(scrollPosition-112);
                }else if(scrollPosition>112){
                    setHeader(112);
                }else{
                    setHeader(0);
                }
        })
            
        }
    }
  
    useEffect(()=>{
        alarmListGetApi();
        upBtnMount_phone();
        setTimeout(() => {
            if(window.innerWidth>767){
                setHeight(120);
            }else{
                setHeight(112);
            }
            setRendering(true);
        }, 100);
    },[])

    const alarmListGetApi = async()=>{
        var data = new FormData();
        data.append('user_email', localStorage.getItem("email"));
        data.append('hash', localStorage.getItem("hash"));
        data.append('type', 'getList');
        data.append('id', '');
        try{
            await axios({
                method:"post",
                url : "https://proveit.co.kr/api/alarm.php",
                data:data
    
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    newAlarmCheck(e.data.list);
                    setAlarmList(e.data.list);
                }else{
    
                }
            })
        }catch{
    
        }
    }

    const newAlarmCheck = (list)=>{
        for(let i=0;i<list.length;i++){
            if(list[i].check==="N"){
                setNewAlarm(true);
                return;
            }
        }
    }
  
    const upEvt = ()=>{
        window.scroll({
          behavior:"smooth",
          left:0,
          top:0
        });
    }
    return(
        <>
            <div id="header">
                <div className="header_coffe">
                    <div>
                    ????????????&????????? ?????? ?????? ????????????
                    </div>
                    <a href="/event">????????????</a>
                </div>
                <div className="header_bar">  
                    <Link to="/">
                        <h1 className="header_logo" style={{backgroundImage:`url(${icon_logo})`}}>
                            <div style={{width:"1px",height:"1px",margin:"-1px",overflow:"hidden"}}>????????????</div>
                        </h1>
                    </Link>
                    
                    <div className="header_bar_menu">
                            <div style={{marginRight:"48px"}}><Link to="/">??????</Link></div>
                            <div style={{marginRight:"48px"}}><Link to="/proreviewer">?????????</Link></div>
                             <div style={{marginRight:"48px"}}><Link to="/community">??????-???</Link></div>
                            <div><Link to="/introduce">??????</Link></div>
                    </div>
                    
                    <div className="header_usermenu">
                        {localStorage.getItem("hash")===null&&
                        <div className="login_btn_list" style={{zIndex:"999"}}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>????????????</div>
                                <div className="btn_one" style={{width:"72px",height:"32px",backgroundColor:"#000"}} onClick={()=>{setLoginWindow(true);}}>?????????</div>
                            </div>
                        </div>
                        }
                        {localStorage.getItem("hash")!==null&&
                            <div className="header_icon_web">
                                <Link to="/registerproduct"><div className="btn_textBtn_register">
                                    {/* <div style={{width:"20px",height:'20px',minWidth:"20px",minHeight:"20px",backgroundImage:`url(${icon_registerIcon})`,marginRight:"4px"}}>
                                    </div>*/}
                                    ???????????? ????????????
                                    </div>
                                </Link>
                                <div className="btn_one" style={{
                                    width:"40px",
                                    height:"40px",
                                    minWidth:"40px",
                                    minHeight:"40px",
                                    borderRadius:"50%",
                                    backgroundImage:`url(${icon_notice})`,
                                    backgroundColor:"#fff",
                                    backgroundPosition:"center",
                                    backgroundRepeat:'no-repeat',
                                    marginRight:"8px",
                                    position:"relative"
                                }} 
                                    onClick={(e)=>{setModal(false);setAlarmModal(!alarmModal);e.stopPropagation()}}>  
                                    {newAlarm&&<div style={{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:"#f00",border:"2px solid #fff",position:"absolute",top:"0px",left:"0px"}}></div>}
                                </div>
                                <div className="btn_one" style={{
                                    width:"40px",
                                    height:"40px",
                                    minWidth:"40px",
                                    minHeight:"40px",
                                    borderRadius:"50%",
                                    backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`,
                                    backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} 
                                    onClick={(e)=>{setAlarmModal(false);setModal(!modal);e.stopPropagation()}}> 
                                </div>
                            </div>
                        }  
                        <div className="header_icon_phone"onClick={()=>{setHambug(true)}}></div>
                        
                    </div>

                </div>

            </div>
            
            
            
            {(!loginWindow&&!signupWindow)&&
            <div id="header_fixed" style={{transform:`translate(0,${header}px)`}}>
                <div className="header_coffe">
                    <div>
                    ????????????&????????? ?????? ?????? ????????????
                    </div>
                    <a href="/event">????????????</a>
                </div>
                <div className="header_bar">  
                    <Link to="/">
                        <h1 className="header_logo" style={{backgroundImage:`url(${icon_logo})`}}>
                            <div style={{width:"1px",height:"1px",margin:"-1px",overflow:"hidden"}}>????????????</div>
                        </h1>
                    </Link>
                    
                    <div className="header_bar_menu">
                            <div style={{marginRight:"48px"}}><Link to="/">??????</Link></div>
                            <div style={{marginRight:"48px"}}><Link to="/proreviewer">?????????</Link></div>
                            <div style={{marginRight:"48px"}}><Link to="/community">??????-???</Link></div>
                            <div><Link to="/introduce">??????</Link></div>
                    </div>
                    
                    <div className="header_usermenu">
                        {localStorage.getItem("hash")===null&&
                        <div className="login_btn_list" style={{zIndex:"999"}}>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>????????????</div>
                                <div className="btn_one" style={{width:"72px",height:"32px",backgroundColor:"#000"}} onClick={()=>{setLoginWindow(true);}}>?????????</div>
                            </div>
                        </div>
                        }
                        {localStorage.getItem("hash")!==null&&
                            <div className="header_icon_web">
                                <Link to="/registerproduct"><div className="btn_textBtn_register">
                                    {/* <div style={{width:"20px",height:'20px',minWidth:"20px",minHeight:"20px",backgroundImage:`url(${icon_registerIcon})`,marginRight:"4px"}}>
                                    </div>*/}
                                    ???????????? ????????????
                                    </div>
                                </Link>
                                <div className="btn_one" style={{
                                    width:"40px",
                                    height:"40px",
                                    minWidth:"40px",
                                    minHeight:"40px",
                                    borderRadius:"50%",
                                    backgroundImage:`url(${icon_notice})`,
                                    backgroundColor:"#fff",
                                    backgroundPosition:"center",
                                    backgroundRepeat:'no-repeat',
                                    marginRight:"8px",
                                    position:"relative"
                                }} 
                                    onClick={(e)=>{setModal(false);setAlarmModal(!alarmModal);e.stopPropagation()}}>  
                                    {newAlarm&&<div style={{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:"#f00",border:"2px solid #fff",position:"absolute",top:"0px",left:"0px"}}></div>}
                                </div>
                                <div className="btn_one" style={{
                                    width:"40px",
                                    height:"40px",
                                    minWidth:"40px",
                                    minHeight:"40px",
                                    borderRadius:"50%",
                                    backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`,
                                    backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} 
                                    onClick={(e)=>{setAlarmModal(false);setModal(!modal);e.stopPropagation()}}> 
                                </div>
                            </div>
                        }  
                        <div className="header_icon_phone"onClick={()=>{setHambug(true)}}></div>
                        
                    </div>

                </div>    
                {modal&&<div style={{width:"192px",height:"80px",position:'absolute',backgroundColor:"#fff",right:"0px",top:`${height*2-header}px`,zIndex:"9",boxShadow:"0px 1px 4px rgba(0,0,0,0.1)"}}>
                    <Link to="/profile"><div style={{width:"100%",height:"40px",lineHeight:"40px",paddingLeft:"16px",fontSize:'14px',color:"#505050",backgroundColor:hover===1?"rgba(156, 49, 198, 0.1)":"#fff"}}
                    onMouseOver={()=>{setHover(1)}}
                    onMouseLeave={()=>{setHover(0)}}>??? ?????????</div></Link>
                    <div style={{width:"100%",height:"40px",cursor:"pointer",lineHeight:"40px",paddingLeft:"16px",fontSize:'14px',color:"#505050",backgroundColor:hover===2?"rgba(156, 49, 198, 0.1)":"#fff"}}
                    onMouseOver={()=>{setHover(2)}}
                    onMouseLeave={()=>{setHover(0)}}
                    onClick={()=>{
                        const alink = document.createElement("a");
                        alink.href="/";
                        localStorage.clear();
                        alink.click();
                        }}>????????????</div>
                </div>}

                {alarmModal&&<div style={{
                    width:"336px",
                    height:"388px",
                    position:'absolute',
                    backgroundColor:"#fff",
                    right:"32px",
                    top:`${height*2-header}px`,
                    zIndex:"9",
                    boxShadow:"0px 4px 4px rgba(0,0,0,0.25)",
                    overflow: 'auto',
                    display: "flex",
                    flexDirection:"column",
                    borderRadius:"8px"}}>
                        <div style={{
                            fontWeight:"700",
                            paddingLeft:"16px",
                            paddingTop:"16px",
                            paddingBottom:"13px",
                            fontSize:"16px",
                            color:"#505050",
                            borderBottom:"1px solid #e5e5e5"
                            }}>??????</div>
                    {alarmList.map((item,index)=>(<AlarmRender item={item} key={index}/>))}
                    {alarmList.length===0&&<div 
                    style={{
                        fontSize:"14px",
                        color:"#9c31c6",
                        width:"100%",
                        display:"flex",
                        height:"100%",
                        justifyContent:"center",
                        alignItems:"center"
                    }}>
                        <div style={{width:"20px",height:"20px",backgroundSize:"cover",backgroundImage:`url(${notAlarmIcon})`,marginRight:"8px"}}></div>
                        <div>????????? ????????? ????????????.</div>
                    </div>}
                </div>}
            
            </div>}
            
            
            {hambug&&<div style={{position:"fixed",left:0,top:0,width:"100vw",height:"100vh",fontSize:'14px',color:"#505050",backgroundColor:"#fff",padding:"16px 20px 16px 20px",zIndex:9999}}>
                <div style={{display:"flex",justifyContent:"space-between",height:height,alignItems:"center",marginBottom:"16px"}}>
                    <Link to="/"><div className="header_logo_modal"></div></Link>
                    <div style={{width:'24px',height:'24px',backgroundImage:`url(${icon_x})`}}
                    onClick={()=>{setHambug(false)}}></div>
                </div>
                <div>
                    {localStorage.getItem("hash")!==null&&<div>
                    <div className="btn_one" style={{width:"32px",height:"32px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                    ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat',marginBottom:'16px'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                    <Link to="/registerproduct"><div className="btn_textBtn" style={{height:"40px",lineHeight:"40px"}}
                    onClick={()=>{setHambug(false);}}>????????? ????????????</div></Link>
                    <Link to="/profile"><div style={{width:"100%",height:"40px",lineHeight:"40px",fontSize:'14px',color:"#505050",backgroundColor:hover===1?"rgba(156, 49, 198, 0.1)":"#fff"}}
                    onMouseOver={()=>{setHover(1)}}
                    onMouseLeave={()=>{setHover(0)}}
                    onClick={()=>{setHambug(false);}}>??? ?????????</div></Link>
                    <div style={{width:"100%",height:"40px",cursor:"pointer",lineHeight:"40px",fontSize:'14px',color:"#505050",backgroundColor:hover===2?"rgba(156, 49, 198, 0.1)":"#fff"}}
                        onMouseOver={()=>{setHover(2)}}
                        onMouseLeave={()=>{setHover(0)}}
                        onClick={()=>{
                            const alink = document.createElement("a");
                            alink.href="/";
                            localStorage.clear();
                            alink.click();
                    }}>????????????</div>
                    </div>}

                    {localStorage.getItem("hash")===null&&                   
                        <div>
                            <div style={{width:"100%",height:"40px",lineHeight:"40px",fontSize:'14px',color:"#505050"}} onClick={()=>{setSignUpWindow(true);setHambug(false)}}>????????????</div>
                            <div style={{width:"100%",height:"40px",lineHeight:"40px",fontSize:'14px',color:"#505050"}} onClick={()=>{setLoginWindow(true);setHambug(false)}}>?????????</div>
                        </div>
                    }

                    <div style={{width:"100%",height:"1px",backgroundColor:"#f1f1f1",marginBottom:"16px",marginTop:"16px"}}></div>
                    <Link to="/community"><div className="text_menu_icon" onClick={()=>{setHambug(false);}}>??????-???</div></Link>
                    <Link to="/proreviewer"><div className="text_menu_icon" onClick={()=>{setHambug(false);}}>?????????</div></Link>
                    <div style={{width:"100%",height:"1px",backgroundColor:"#f1f1f1",marginBottom:"16px",marginTop:"16px"}}></div>
                    <div style={{height:"40px",lineHeight:"40px"}} onClick={()=>{setHambug(false);}}><Link to="/introduce">??????</Link></div>
                    <div style={{height:"40px",lineHeight:"40px",display:"none"}} onClick={()=>{setHambug(false);}}><Link to="/guideline">???????????? ???????????????</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}} onClick={()=>{setHambug(false);}}><Link to="/tos">????????????</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}} onClick={()=>{setHambug(false);}}><Link to="/privacy_policy">???????????? ????????????</Link></div>
                    <div style={{height:"40px",lineHeight:"40px"}}>????????? ?????? : hello@110corp.com</div>
                    <div style={{height:"40px",lineHeight:"40px"}}>?? 2021 oneonezero Inc.</div>
                </div>
            </div>}
            {window.innerWidth>767&&<div className="btn_up" style={{backgroundImage:`url(${icon_upBtn})`,display:header!==120&&"none",transform:scrollState&&`translate(0,${-104}px)`}}
                onClick={upEvt}></div>}
                
        </>
        
    )
  }

export default Header;