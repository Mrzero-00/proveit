import React, { useEffect, useState } from 'react';

import icon_like from '../../image/likeIcon.svg';
import icon_comment from '../../image/commentIcon.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import Header from '../Common/Header';
import LoginWindow from '../Common/LoginWindow';
import SignupWindow from '../Common/SignupWindow';


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
        data.append('user_id', window.location.search.substring(1));
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
        {render&&<div id="pageBody"  style={{width:"100%",height:"100%",minHeight:window.innerHeight-48,backgroundColor:"#F9F9F9",display:"flex",alignItems:"center",flexDirection:"column"}}>
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
                        backgroundImage:`url(${currentUserInfo.thumbnail})`,
                        backgroundSize:"cover",
                        backgroundRepeat:"no-repeat",
                        backgroundPosition:"center"}}></div>
                    <div>
                        <div style={{fontSize:"20px",color:'#505050',height:"20px",lineHeight:"20px",marginBottom:"16px",fontWeight:"bold"}}>{currentUserInfo.nick}</div>
                        <div style={{fontSize:"14px",color:'#828282',height:"14px",lineHeight:"14px",marginBottom:"16px"}}>{currentUserInfo.position}{currentUserInfo.department!==""?`,${currentUserInfo.department}`:""}</div>
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
                        fontSize:"14px",
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
                        fontSize:"14px",
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
                        fontSize:"14px",
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

export default AnotherUser;