import React, { useEffect, useRef, useState } from 'react';
import icon_commentModify from '../../image/icon_commentModify.svg';
import icon_like_off from '../../image/icon_like_off.svg';
import icon_like_on from '../../image/icon_like_on.svg';
import icon_like_btn from '../../image/icon_likeBtn.svg';
import icon_upBtn_black from '../../image/icon_upBtn_black.svg';
import icon_comment_first from '../../image/icon_comment_first.svg';

import icon_product_adroid from '../../image/icon_product_adroid.svg';
import icon_product_ios from '../../image/icon_product_ios.svg';
import icon_product_link from '../../image/icon_product_link.svg';
import icon_product_link_arrow from '../../image/icon_product_link_arrow.svg';
import icon_maker from '../../image/icon_maker.svg';
import icon_pointcoin from '../../image/icon_pointcoin.svg';

import icon_links from '../../image/icon_links.svg';
import icon_bigImg_off from '../../image/icon_bigImg_off.svg';
import ReactQuill from 'react-quill';
import {Link} from 'react-router-dom';
import axios from 'axios';
/*global Kakao*/
import ReactPlayer from 'react-player';
import Header from '../Common/Header';
import LoginWindow from '../Common/LoginWindow';
import SignupWindow from '../Common/SignupWindow';


const CommentRender =({item,product,rerenderLogic,setLoginWindow})=>{

    const [hover,setHover] =useState(0);    
    const [modal,setModal] = useState(false);
    const [replyText,setReplyText] =useState(`<p>@${item.nick}&nbsp;&nbsp;</p>`);
    const [modifyText,setModifyText] = useState(item.reply);
    const [replyWindow,setReplyWindow] = useState(false);
    const [modifyState,setModifyState] = useState(false);
    const [listHover,setListHover] = useState(0);
    const commentRef = useRef(0);
    const depthReplyApi = async()=>{
        var data = new FormData();
        data.append('parent_id', item.depth==="1"?item.parent_id:item.id);
        data.append('reply', replyText);
        data.append('user_email',localStorage.getItem("email"));
        data.append('hash', localStorage.getItem("hash"));
        data.append("product_id",window.location.search.substring(12));
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/replySubmit.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    localStorage.setItem("replyId",e.data.reply_id);
                    setReplyWindow(false);
                    rerenderLogic();
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
        data.append("product_id",window.location.search.substring(12));
        data.append("type","update");
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/replySubmit.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    setModifyState(false);
                    rerenderLogic();
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
        data.append('nick',JSON.parse(localStorage.getItem("userInfo")).nick);
        data.append('hash', localStorage.getItem("hash"));
        data.append("product_id",window.location.search.substring(12));
        data.append("type","delete");
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/replySubmit.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    rerenderLogic();
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

    const replylikeApi = async(id)=>{
        var data = new FormData();
        data.append("user_email",localStorage.getItem("email"));
        data.append("hash",localStorage.getItem("hash"));
        data.append("reply_id",id);
        data.append("target","reply");
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/productLike.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    rerenderLogic();
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
    return(
        <div id={item.id} style={{position:"relative"}}
         className={item.depth==="0"?"product_item_reply":"product_item_reply_depth"}>
            {item.first==="Y"&&<div style={{position:"absolute",width:"14px",height:"18px",right:"20px",top:"-px",backgroundImage:`url(${icon_comment_first})`}}></div>}
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
                <div className="reply_profile">
                    <div style={{display:"flex",alignItems:"center"}}>
                        <Link to={item.user_email===localStorage.getItem("email")?`/profile`:`/anotheruserinfo?${item.user_id}`}><div style={{fontWeight:"bold",height:"16px",lineHeight:"16px",fontSize:'16px',color:"#262626",marginRight:"8px"}}>{item.nick}</div></Link>
                        {(item.user_email ===product.product.email&&product.product.make_by==="true")&&<div className="reply_phone" style={{height:"16px",width:"16px",backgroundImage:`url(${icon_maker})`,backgroundSize:"cover"}}></div>}
                        <div className="reply_phone" style={{height:"16px",width:"16px",backgroundImage:`url(${icon_pointcoin})`,backgroundSize:"cover",margin:"0px 4px"}}></div>
                        <div className="reply_phone" style={{height:"16px",lineHeight:"16px",fontSize:"12px",color:"#262626"}}>{item.point}</div>
                        
                    </div>
                    <div className="reply_phone_profile" style={{color:"#7b7b7b",height:"13px",lineHeight:"13px",fontSize:'13px',marginRight:"8px"}}>{item.position}{item.department!==""&&`,${item.department}`}</div>
                    <div style={{display:"flex",alignItems:"center"}}>
                        {(item.user_email ===product.product.email&&product.product.make_by==="true")&&<div className="reply_web" style={{height:"16px",width:"16px",backgroundImage:`url(${icon_maker})`,backgroundSize:"cover",marginRight:"4px"}}></div>}
                        <div className="reply_web" style={{height:"16px",width:"16px",backgroundImage:`url(${icon_pointcoin})`,backgroundSize:"cover",marginRight:"4px"}}></div>
                        <div className="reply_web" style={{height:"16px",lineHeight:"16px",fontSize:"12px",color:"#262626"}}>{item.point}</div>
                    </div>
                </div>
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
                    onChange={(e)=>{setModifyText(e);}}></ReactQuill>
                    <div className="comment_modify_btn">
                        <div className="btn_one" style={{width:"78px",height:"40px",marginBottom:"8px"}}
                        onClick={()=>{depthReplyModifyApi()}}>확인</div>
                        <div className="btn_four" style={{width:"78px",height:"40px",marginRight:"8px"}}
                        onClick={()=>{setModifyState(false)}}>취소</div>
                    </div>
                </div>}
                {!modifyState&&<div style={{display:"flex",height:"32px"}}>
                    <div style={{
                        width:"42px",
                        cursor:"pointer",
                        height:"100%",
                        borderRadius:"8px",
                        marginRight:"4px",
                        backgroundColor:listHover===1&&"#ffffff",
                        border:"1px solid #efe5fd",
                        color:"#7b7b7b",
                    textAlign:"center",lineHeight:"32px",fontSize:'12px'}}
                    onMouseLeave={()=>{setListHover(0)}}
                    onMouseOver={()=>{setListHover(1)}}
                    onClick={()=>{setReplyWindow(!replyWindow);}}>답글</div>
                    <div style={{
                        width:"80px",
                        cursor:"pointer",
                        height:"100%",
                        marginRight:"4px",
                        backgroundColor:listHover===2&&"#efe5fd",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        color:item.like_m==="1"?"#6200EE":"#7b7b7b",
                        fontSize:"12px",
                        borderRadius:"8px",
                        border:item.like_m==="1"?"1px solid #6200EE":"1px solid #efe5fd",
                        }}
                    onMouseLeave={()=>{setListHover(0)}}
                    onMouseOver={()=>{setListHover(2)}}
                    onClick={()=>{replylikeApi(item.id)}}
                    >
                        <div style={{width:"12px",height:"12px",backgroundImage:`url(${icon_like_btn})`,marginRight:"4px",backgroundPosition:"center",backgroundSize:"100% 100%"}}></div>
                        <div>추천 ({item.like_count})</div>
                    </div>
                    {item.user_email===localStorage.getItem("email")&& 
                        <div style={{
                            width:"32px",
                            cursor:"pointer",
                            height:"100%",
                            marginRight:"8px",
                            backgroundPosition:"center",
                            backgroundRepeat:"no-repeat",
                            backgroundColor:listHover===3&&"#efe5fd",
                            textAlign:"center",
                            position:"relative",
                            lineHeight:"32px",
                            backgroundImage:`url(${icon_commentModify})`,
                            borderRadius:"8px"
                            }}
                        onMouseLeave={()=>{setListHover(0)}}
                        onMouseOver={()=>{setListHover(3)}}
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
                        ref={commentRef}
                        onChange={(e)=>{
                            if(e===`<p>@${item.nick}</p>`){
                                setReplyText(`<p>@${item.nick}&nbsp;&nbsp;</p>`);
                            }else if(e==="<p><br></p>"){
                                setReplyText(`<p>@${item.nick}&nbsp;&nbsp;</p>`);
                            }else{
                                setReplyText(e);
                            }
                        }}></ReactQuill>
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

const Body = ({setModal,modal,setLoginWindow,linkWindow,setLinkWindow})=>{

    const [renderState,setRenderState] = useState(false);
    const [replyList,setReplyList] = useState([]);
    const [currentComment,setCurrentComment] = useState("");
    const [rerender,setRerender] =useState(false);
    const [copyState,setCopyState] =useState(false);
    const [deviceWidth,setDeviceWidth] = useState(0);
    const [product,setProduct] =useState({
        product:{
                    ago_time:0,
                    id:0,
                    email:'',
                    user_id:"",
                    title:"",
                    sub_title:"",
                    like_count:0,
                    main_text:".",
                    payment_type:"",
                    category:"",
                    image:[
                        {id:0,imageUrl:"0"},
                        {id:1,imageUrl:"1"},
                        {id:2,imageUrl:"2"},
                        {id:3,imageUrl:"3"},
                        {id:4,imageUrl:"4"},
                    ],
                    link:"",
                    ios_link:"",
                    android_link:"",
                    make_by:"",
                    thumbnail:"",
                },
        user_info:{
                    nick:"",
                    position:"",
                    department:"",
                    thumbnail:"/",
                    point:0
                }
    })
    const [btnOnOff,setBtnOnOff] = useState(false);
    const [bigImgWindow,setBigImgWindow] = useState(false);
    const [imgNum,setImgNum] =useState(0);
    const [replyState,setReplyState] = useState(true);
    const [phoneState,setPhoneState] =useState(false);
    const linkState= useRef(0);
    
    const ImageArray =({item,imgNum,setImgNum,product})=>{
        const url = item.imageUrl;
        let subNum =0;
        
        if(item.type==="video"){
            for(let i=0 ;i<url.length;i++){
                if(url[i]==="w"){
                    if(url[i+1]==="a"){
                        if(url[i+2]==="t"){
                            if(url[i+3]==="c"){
                                if(url[i+4]==="h"){
                                    subNum = i+8;
                                }
                            }
                        }
                    }
                }
            }
        }

        const videoThumbnail = url.substring(subNum);
        return(
            <>
            {(product.product.youtube!=="undefined"&&product.product.youtube!=="")&&<div>
                {item.type==="video"&&<div style={{width:"40px",height:"40px",marginRight:"8px",backgroundImage:`url(https://img.youtube.com/vi/${videoThumbnail}/default.jpg)`,cursor:"pointer",
                    backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",
                    border:imgNum===item.id ? "1px solid #e5e5e5": "1px solid transparent"}}
                    onMouseOver={()=>{setImgNum(item.id)}}
                    >      
                </div>}
                {item.type!=="video"&&<div style={{width:"40px",height:"40px",marginRight:"8px",backgroundImage:`url(${item.imageUrl})`,cursor:"pointer",
                    backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",
                    border:imgNum===item.id ? "1px solid #e5e5e5": "1px solid transparent"}}
                    onMouseOver={()=>{setImgNum(item.id)}}
                    >      
                </div>}
            </div>}
            {(product.product.youtube==="undefined"||product.product.youtube==="")&&
                <div style={{width:"40px",height:"40px",marginRight:"8px",backgroundImage:`url(${item.imageUrl})`,cursor:"pointer",
                    backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",
                    border:imgNum===item.id-1 ? "1px solid #e5e5e5": "1px solid transparent"}}
                    onMouseOver={()=>{setImgNum(item.id-1)}}
                    >      
                </div>
            }
            </>
        )
    }

    const ImageMainArray =({item,product,imgNum,phoneState,deviceWidth})=>{
        const height = (deviceWidth/1280)*720;
        return(
            <div>
            {(product.product.youtube!=="undefined"&&product.product.youtube!=="")&&
            item.type==="video"?
            <div className="product_item_img" style={{height:phoneState&&`${height}px`}}>
                <ReactPlayer width="100%" height={`${height}px`} playing muted url={product.product.youtube}></ReactPlayer>
            </div>
            :<div className="product_item_img" style={{backgroundImage:`url(${item.imageUrl})`,height:phoneState&&`${height}px`}}>      
            </div>}
            </div>
        )
    }


    const productListApi = async()=>{
    var data = new FormData();
    data.append("product_id",window.location.search.substring(12));
    data.append("user_email",localStorage.getItem("email"));
    data.append("hash",localStorage.getItem("hash"));
    try{
        await axios({
            method:"post",
            url : "https://www.proveit.co.kr/api/productList.php",
            data:data

        }).then((e)=>{
            if(e.data.ret_code === "0000"){
                console.log(e);
                const data = e.data.product;
                setProduct({
                    product:{
                        ago_time:data.ago_time,
                        id:data.id,
                        title:data.title,
                        email:data.user_email,
                        sub_title:data.sub_title,
                        like_count:data.like_count,
                        main_text:data.main_text,
                        payment_type:data.payment_type,
                        category:data.category,
                        image:(data.youtube!==""&&data.youtube!=="undefined")?[{id:0,type:"video",imageUrl:data.youtube},...JSON.parse(data.image)]:JSON.parse(data.image),
                        link:data.link,
                        ios_link:data.ios_link,
                        android_link:data.android_link,
                        make_by:data.make_by,
                        thumbnail:data.thumbnail,
                        like_m:data.like_m,
                        youtube:data.youtube,
                        user_id:data.user_id
                    },
                    user_info:e.data.user_info
                });
                // setProducer(data.user_info);
                if(linkState.current===0){
                    if(data.link!==""){
                        if(data.ios_link!==""){
                            if(data.android_link!==""){
                                linkState.current=3;
                            }else{
                                linkState.current=2;
                            }
                        }else{
                            if(data.android_link!==""){
                                linkState.current=2;
                            }else{
                                linkState.current=1;
                            }
                        }
                    }else{
                        if(data.ios_link!==""){
                            if(data.android_link!==""){
                                linkState.current=2;
                            }else{
                                linkState.current=2;
                            }
                        }else{
                            if(data.android_link!==""){
                                linkState.current=1;
                            }else{
                                
                            }
                        }
                    }
                }
                setRenderState(true);
            }
        })
    }catch{

    }
    }

    const replyAddApi = async()=>{
        var data = new FormData();
        data.append('parent_id',"");
        data.append('reply', currentComment);
        data.append('user_email',localStorage.getItem("email"));
        data.append('nick',JSON.parse(localStorage.getItem("userInfo")).nick);
        data.append('hash', localStorage.getItem("hash"));
        data.append("product_id",window.location.search.substring(12));
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/replySubmit.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    rerenderLogic();
                    localStorage.setItem("replyId",e.data.reply_id);
                    setReplyState(true);
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
        data.append("user_email",window.localStorage.getItem("email"));
        data.append("hash",window.localStorage.getItem("hash"));
        data.append("product_id",window.location.search.substring(12));
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/replyList.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                  setReplyList(e.data.ret_data);
                }else{
      
                }
            })
        }catch{
      
        }
    }

    const likeApi = async()=>{
        var data = new FormData();
        data.append("user_email",localStorage.getItem("email"));
        data.append("hash",localStorage.getItem("hash"));
        data.append("product_id",window.location.search.substring(12));
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/productLike.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    rerenderLogic();
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

    useEffect(()=>{
        productListApi();
        replayListApi();
        setRerender(false);
    },[]);

    const clip=()=>{
        var url = '';
        var textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        url = window.document.location.href;
        textarea.value = url;
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopyState(true);
        setTimeout(() => {
            setCopyState(false);
        }, 1000);
    }

    const kakaoApi = ()=>{ 
        var sendUrl = `https://www.proveit.co.kr${window.document.location.pathname}${window.document.location.search}`;
        Kakao.init('23171cd8148017846b0514bae6409fc6');
        // 카카오링크 버튼 생성
        Kakao.Link.createDefaultButton({
          container: '#btnKakao', // 카카오공유버튼ID
          objectType: 'feed',
          content: {
            title: product.product.title, // 보여질 제목
            description: product.product.sub_title, // 보여질 설명
            imageUrl: product.product.image[0].imageUrl, // 콘텐츠 URL
            link: {
               mobileWebUrl:sendUrl,
               webUrl:sendUrl
            }
          },
          social: {
            likeCount: product.product.like_count*1,
            commentCount: replyList.length*1,
          },
          buttons: [
            {
              title: '자세히 보기',
              link: {
                mobileWebUrl: sendUrl,
                webUrl: sendUrl,
              },
            },
        ]}
        );
    }

    const sharefacebook = ()=>{
        let sendUrl = `proveit.co.kr${window.document.location.pathname}${window.document.location.search}`; // 전달할 URL
        let opstion = "width=526, height=700, toolbar=no, menubar=no, scrollbars=no";
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl,product.product.title,opstion);
    }

    const shareTwitter=()=> {
        let sendText = product.product.title; // 전달할 텍스트
        let opstion = "width=800, height=700, toolbar=no, menubar=no, scrollbars=no";
        let sendUrl = `proveit.co.kr${window.document.location.pathname}${window.document.location.search}`; // 전달할 URL
        window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl,product.product.title,opstion );
    }

    useEffect(()=>{
        productListApi();
        replayListApi();
        setDeviceWidth(window.innerWidth);
        if(window.innerWidth<767){
            setPhoneState(true);
        }
    },[])

    const rerenderLogic=()=>{
        productListApi();
        replayListApi();
    }

    const replyNavi = ()=>{
        if(localStorage.getItem("replyId")){
            
            const navi = document.getElementById("replyNavi");
            if(navi){
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
    
    const start=useRef(0);
    const currentX=useRef(0);
    
    const scrollEvent =(e)=>{
        e.target.body.style.overflow ="hidden";
        e.preventDefault();
        e.stopPropagation();
    }

    const touchStartEvent=(e)=>{
        e.stopPropagation();
        window.addEventListener("scroll",scrollEvent);
        start.current = e.touches[0].clientX;
        currentX.current=e.touches[0].clientX;
    }
    const touchMoveEvent =(e)=>{
        e.stopPropagation();
        const imgArray = document.querySelector(".mainImgArray");
        currentX.current=e.touches[0].clientX;  
        imgArray.style.left=`${((currentX.current-start.current)/(deviceWidth/2))*100-(imgNum*100)}%`;
    }


    const touchEndEvent = (e)=>{
        e.stopPropagation();
        const imgArray = document.querySelector(".mainImgArray");
        if(((currentX.current-start.current)/(deviceWidth/2))*100>55){
           if(product.product.youtube!=="undefined"&&product.product.youtube!==""){
                if(imgNum!==1){
                    setImgNum(imgNum-1);
                }else{
                    setImgNum(imgNum);
                    imgArray.style.left=`-${imgNum*100}%`;
                }
           }else{
                if(imgNum!==0){
                    setImgNum(imgNum-1);
                }else{
                    setImgNum(imgNum);
                    imgArray.style.left=`-${imgNum*100}%`;
                }
        }
        }else if(((currentX.current-start.current)/(deviceWidth/2))*100<-55){
          
                if(imgNum+1!==product.product.image.length){
                    setImgNum(imgNum+1);
                    imgArray.style.left=`-${imgNum*100}%`;
                }else{
                    setImgNum(imgNum);
                    imgArray.style.left=`-${imgNum*100}%`;
                } 

        }else{
            setImgNum(imgNum);
            imgArray.style.left=`-${imgNum*100}%`;
        }
        window.removeEventListener("scroll",scrollEvent);
        const body = document.querySelector("body");
        setTimeout(() => {
            body.style.overflow ="auto";
        }, 100);
        start.current=0;
        currentX.current=0;
    }
    return(
    <>
        {renderState&&<div id="pageBody" style={{width:'100%',backgroundColor:"#f9f9f9",display:"flex",alignItems:"center",flexDirection:"column"}}
        onClick={(e)=>{setBigImgWindow(false);setModal(false);setLinkWindow(false);e.stopPropagation();}}>
                <a id="replyNavi" style={{display:"none"}} href={`#${localStorage.getItem("replyId")}`}></a>
                <div style={{textAlign:"left",marginTop:"48px",marginBottom:"23px"}}>
                <div className="product_item">
                    <div className="product_thumbnail" style={{backgroundImage:`url(${product.product.thumbnail})`}}></div>
                    
                    <div style={{width:"100%",textAlign:"left"}}>
                        <h1 className="product_item_title">{product.product.title}</h1>
                        <h2 className="product_item_subtitle" >{product.product.sub_title}</h2>
                        <div style={{display:"flex",height:"24px",alignItems:"center"}}>
                            <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282"}}>{product.product.payment_type}</div>
                            <div style={{width:"4px",margin:"0px 4px",color:"#7b7b7b"}}>·</div>
                            <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282"}}>{product.product.category}</div>
                            <div style={{width:"4px",margin:"0px 4px",color:"#7b7b7b"}}>·</div>
                            <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282"}}>{product.product.ago_time}</div>
                        </div>
                    </div>
                    
                </div>
                </div>
                <div className="product_btn_phone">
                        {linkState.current===1?
                        <div className="btn_two" style={{width:"100%",maxWidth:"144px",height:"100%",marginRight:"8px"}} onClick={()=>{
                            const alink = document.createElement("a");
                            alink.target="blink";
                            alink.href = product.product.link;
                            alink.click();
                        }}>써보러 가기</div>
                        :
                        <div className="btn_two" style={{width:"100%",maxWidth:"144px",height:"100%",marginRight:"8px"}} onClick={()=>{
                            const alink = document.createElement("a");
                            alink.target="blink";
                            alink.href = product.product.link;
                            alink.click();
                        }}>써보러 가기</div>
                        }
                        {product.product.like_m==="0"&&<div className="btn_one_big" style={{width:"100%",height:"56px",marginBottom:"8px"}}
                        onClick={()=>{
                            if(localStorage.getItem("hash")){
                                likeApi();
                            }else{
                                setLoginWindow(true);
                            }
                            }}
                            >
                            <div style={{width:'24px',height:"24px",backgroundImage:`url(${icon_like_off})`,marginRight:"4px"}}></div>
                            <div>추천하기</div>
                                <div style={{width:"48px",height:"16px",lineHeight:"16px",textAlign:"center"}}>{product.product.like_count}</div>
                            </div>}
                        {product.product.like_m==="1"&&<div className="btn_one_big2" style={{width:"100%",height:"56px",marginBottom:"8px"}}
                        onClick={()=>{
                            if(localStorage.getItem("hash")){
                                likeApi();
                            }else{
                                setLoginWindow(true);
                            }
                            }}
                        >
                            <div style={{width:'24px',height:"24px",backgroundImage:`url(${icon_like_on})`,marginRight:"4px"}}></div>
                            <div>추천 취소</div>
                                <div style={{width:"48px",height:"16px",lineHeight:"16px",textAlign:"center"}}>{product.product.like_count}</div>
                            </div>}
                    </div>
                <div className="product_item_sort">
                    <div>
                        <div className="product_item_group">      
                            <div className="product_item_img" 
                            style={{
                                display:"flex",
                                overflow:"hidden",
                                height:phoneState&&`${(deviceWidth/1280)*720}px`
                            }}
                            onTouchStart={touchStartEvent}
                            
                            onTouchMove={touchMoveEvent}
                            onTouchEnd={touchEndEvent}
                            onMouseOver={()=>{setBtnOnOff(true);}}
                            onMouseLeave={()=>{setBtnOnOff(false)}}

                            onClick={(e)=>{e.stopPropagation();if(!phoneState){setBigImgWindow(true)}}}>
                                {(product.product.youtube!==""&&product.product.youtube!=="undefined"&&imgNum===0)&&<div style={{width:"100%",height:"100%",position:"absolute"}}>
                                    <ReactPlayer playing muted url={product.product.youtube}></ReactPlayer>
                                </div>}
                                {(btnOnOff||phoneState)&&<div>
                                    {imgNum!==0&&<div style={{width:phoneState?"80px":"40px",height:"100%",position:"absolute",display:"flex",alignItems:"center",cursor:"pointer",justifyContent:"center",zIndex:"999"}}
                                    onClick={(e)=>{setImgNum(imgNum-1);e.stopPropagation();}}
                                    onMouseOver={(e)=>{e.stopPropagation();e.target.style.backgroundColor="rgba(255,255,255,0.3)"}}
                                    onMouseLeave={(e)=>{e.stopPropagation();e.target.style.backgroundColor="transparent"}}>
                                        <div style={{backgroundImage:`url(${icon_upBtn_black})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",width:"20px",height:'13px',transform:"rotate(270deg)"}}>
                                        </div>
                                    </div>}
                                    {imgNum+1!==product.product.image.length&&
                                    <div style={{width:phoneState?"80px":"40px",height:"100%",position:"absolute",right:"0px",display:"flex",alignItems:"center",cursor:"pointer",justifyContent:"center",zIndex:"999"}}
                                    onClick={(e)=>{e.stopPropagation();setImgNum(imgNum+1);}}
                                    onMouseOver={(e)=>{e.stopPropagation();e.target.style.backgroundColor="rgba(255,255,255,0.3)"}}
                                    onMouseLeave={(e)=>{e.stopPropagation();e.target.style.backgroundColor="transparent"}}>
                                        <div style={{backgroundImage:`url(${icon_upBtn_black})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",width:"20px",height:'13px',transform:"rotate(90deg)"}}>
                                        </div>    
                                    </div>}
                                </div>}
                                <div className="mainImgArray" style={{position:"absolute",display:"flex",left:`${(imgNum*-100)}%`,transition:"0.3s"}}>
                                    {product.product.image.map((item)=>(<ImageMainArray deviceWidth={deviceWidth} phoneState={phoneState} key={item.id} imgNum={imgNum} item={item} product={product}></ImageMainArray>))}
                                </div>
                            </div>
                           
                            <div className="product_img_previewArray">
                                {product.product.image.map((item)=>(<ImageArray item={item} product={product} imgNum={imgNum} key={item.id} setImgNum={setImgNum}></ImageArray>))}
                            </div>
                            <div className="product_main_text" style={{width:"100%",position:"relative",marginBottom:"24px"}}>
                                <ReactQuill theme="" readOnly
                                value={product.product.main_text} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%"}}></ReactQuill>
                            </div>
                            <div className="product_sharebar" style={{display:"flex"}}>
                                    <div className="kakao_share" id="btnKakao"
                                    onClick={kakaoApi}></div>
                                    <div className="facebook_share"
                                    onClick={sharefacebook}></div>
                                    <div className="twitter_share"
                                    onClick={shareTwitter}></div>
                                    <div className="link_share"
                                    onClick={clip}></div>
                                </div>
                        </div>
                        <div className="product_item_producer">
                        <div style={{color:"#7b7b7b",marginBottom:"16px"}}>{product.product.make_by==="true"?"제작자":"소개한 사람"}</div>
                        <div style={{display:"flex"}}>
                            <Link to={product.product.email===localStorage.getItem("email")?`/profile`:`/anotheruserinfo?${product.product.user_id}`}>
                                <div style={{width:"32px",height:'32px',borderRadius:"50%",backgroundImage:`url(${"product.user_info.thumbnail"})`,backgroundColor:"#c4c4c4",marginRight:"24px",
                                backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",cursor:"pointer"}}></div>
                            </Link>
                            <div style={{textAlign:"left"}}>
                                <div style={{display:"flex",alignItems:"center",marginBottom:"8px"}}>
                                    <div style={{fontWeight:'bold',color:'#262626',height:"14px",lineHeight:"14px"}}>{product.user_info.nick}</div>
                                    <div style={{width:"14px",height:'14px',backgroundImage:`url(${icon_pointcoin})`,margin:"0px 8px"}}></div>
                                    <div style={{color:"#262626",fontSize:"12px",height:'12px',lineHeight:"12px"}}>{product.user_info.point}</div>
                                </div>
                                <div style={{color:"#7b7b7b",height:"14px",lineHeight:"14px"}}>{product.user_info.position}{product.user_info.department!==""?`,${product.user_info.department}`:""}</div>
                            </div>
                        </div>
                    </div>
                        <div className="product_item_reply_length">댓글({replyList.length})</div>
                        <div className="product_item_comment">
                        <div className="product_item_comment_sort">
                            <div className="product_item_comment_submit">
                                <div style={{
                                    width:"40px",
                                    height:"40px",
                                    minWidth:"40px",
                                    minHeight:"40px",
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
                                        {/* <textarea onChange={(e)=>{setCurrentComment(e.target.value);}}></textarea> */}
                                        <ReactQuill className="quillInput product_item_comment_input" theme="" placeholder="의견이나 궁금한 점을 남겨보세요"
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
                            <div className="product_item_reply_list">
                                {replyList.map((item)=>(<CommentRender key={item.id}  setLoginWindow={setLoginWindow} rerenderLogic={rerenderLogic} product={product} modal={modal} setModal={setModal} item={item}></CommentRender>))}
                            </div>
                            {replyList.length>=10&&<div className="product_item_comment_submit_under">
                            <div style={{
                                width:"40px",
                                height:"40px",
                                minWidth:"40px",
                                minHeight:"40px",
                                marginRight:"16px",
                                borderRadius:"50%",
                                backgroundColor:"#c4c4c4",
                                backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`,
                                backgroundSize:"cover",
                                backgroundRepeat:"no-repeat",
                                backgroundPosition:"center"
                                }}>
                            </div>
                            <div style={{width:"100%"}}>
                                <ReactQuill className="quillInput" theme="" placeholder="의견이나 궁금한 점을 남겨보세요"
                                value={currentComment} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%",borderRadius:"2px",
                            padding:"6px 6px 6px 6px",boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"48px"}}
                                onChange={(e)=>{setCurrentComment(e)}}></ReactQuill>
                                {replyState&&<div style={{marginBottom:"24px"}}></div>}
                                {!replyState&&<div style={{color:"#ea4335",fontSize:'14px',marginTop:"8px",marginBottom:'16px',height:'14px',lineHeight:"14px"}}>내용을 입력해 주세요.</div>}
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
                        </div>}
                        </div>
                        </div>
                    </div>
                    <div className="product_item_web" style={{width:"100%",marginLeft:"16px"}}>
                        <div style={{marginBottom:"24px",width:"100%"}}>

                            
                        {product.product.like_m==="0"&&<div className="btn_one_big" style={{width:"100%",height:"56px",marginBottom:"8px"}}
                            onClick={()=>{
                                if(localStorage.getItem("hash")){
                                    likeApi();
                                }else{
                                    setLoginWindow(true);
                                }
                                }}
                                >
                                <div style={{width:'24px',height:"24px",backgroundImage:`url(${icon_like_off})`,marginRight:"4px"}}></div>
                                <div>추천하기</div>
                                    <div style={{width:"40px",height:"16px",lineHeight:"16px",textAlign:"center"}}>{product.product.like_count}</div>
                                </div>}
                            {product.product.like_m==="1"&&<div className="btn_one_big2" style={{width:"100%",height:"56px",marginBottom:"8px"}}
                            onClick={()=>{
                                if(localStorage.getItem("hash")){
                                    likeApi();
                                }else{
                                    setLoginWindow(true);
                                }
                                }}
                            >
                                <div style={{width:'24px',height:"24px",backgroundImage:`url(${icon_like_on})`,marginRight:"4px"}}></div>
                                <div>추천 취소</div>
                                    <div style={{width:"40px",height:"16px",lineHeight:"16px",textAlign:"center"}}>{product.product.like_count}</div>
                                </div>}
                        

                            {linkState.current===1?
                            <div className="btn_two" style={{width:"100%",height:"56px",marginRight:"8px"}} onClick={()=>{
                                const alink = document.createElement("a");
                                alink.target="blink";
                                if(product.product.link!==""){
                                    alink.href = product.product.link;
                                }else if(product.product.ios_link!==""){
                                    alink.href = product.product.ios_link;
                                }else if(product.product.android_link!==""){
                                    alink.href = product.product.android_link;
                                }
                                alink.click();
                            }}>써보러 가기</div>
                            :
                            <div className="btn_two" style={{width:"100%",height:"56px",marginRight:"8px",position:"relative"}}
                             onClick={(e)=>{
                                setLinkWindow(!linkWindow);
                                if( /Android/i.test(navigator.userAgent)) {
                                    if(product.product.android_link!==""){
                                        const alink = document.createElement("a");
                                        alink.target="blink";
                                        alink.href = product.product.android_link;
                                        alink.click();
                                    }else if(product.product.link!==""){
                                        const alink = document.createElement("a");
                                        alink.target="blink";
                                        alink.href = product.product.link;
                                        alink.click();
                                    }else{
                                        
                                    }
                                }else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                                    if(product.product.ios_link!==""){
                                        const alink = document.createElement("a");
                                        alink.target="blink";
                                        alink.href = product.product.ios_link;
                                        alink.click();
                                    }else if(product.product.link!==""){
                                        const alink = document.createElement("a");
                                        alink.target="blink";
                                        alink.href = product.product.link;
                                        alink.click();
                                    }else{

                                    }
                                }else {
                                    // console.log(product.ios_link.search.substring(1));
                                    setLinkWindow(!linkWindow);
                                }
                                e.stopPropagation();
                            }}
                            >
                            <div>써보러 가기</div>
                            <div style={{width:"20px",minWidth:"20px",minHeight:"20px",height:"20px",backgroundImage:`url(${icon_links})`}}></div>
                            {linkWindow&&<div style={{
                                position:"absolute",
                                width:"216px",
                                borderRadius:"2px",
                                boxShadow:"0px 1px 4px rgba(0,0,0,0.1)",
                                backgroundColor:"#fff",
                                paddingTop:"4px",
                                paddingBottom:"4px",
                                top:"54px",
                                left:"50%",
                                transform:"translate(-50%,0)"}}>
                                {product.product.link&&<div className="product_linkitem"
                                onClick={()=>{
                                    const alink = document.createElement("a");
                                    alink.target="blink";
                                    alink.href = product.product.link;
                                    alink.click();
                                }}>
                                    <div style={{width:"16px",height:"16px",minWidth:"16px",backgroundImage:`url(${icon_product_link})`,marginRight:"8px"}}></div>
                                    <div style={{width:"132px"}}>웹사이트</div>
                                    <div style={{width:"20px",height:"20px",backgroundImage:`url(${icon_product_link_arrow})`}}></div>
                                </div>}
                                {product.product.ios_link&&<div className="product_linkitem"
                                onClick={()=>{
                                    const alink = document.createElement("a");
                                    alink.target="blink";
                                    alink.href = product.product.ios_link;
                                    alink.click();
                                }}>
                                    <div style={{width:"16px",height:"16px",minWidth:"16px",backgroundImage:`url(${icon_product_ios})`,marginRight:"8px"}}></div>
                                    <div style={{width:"132px"}}>App Store</div>
                                    <div style={{width:"20px",height:"20px",backgroundImage:`url(${icon_product_link_arrow})`}}></div>
                                </div>}
                                {product.product.android_link&&<div className="product_linkitem"
                                onClick={()=>{
                                    const alink = document.createElement("a");
                                    alink.target="blink";
                                    alink.href = product.product.android_link;
                                    alink.click();
                                }}>
                                    <div style={{width:"16px",height:"16px",minWidth:"16px",backgroundImage:`url(${icon_product_adroid})`,marginRight:"8px"}}></div>
                                    <div style={{width:"132px"}}>Google Play</div>
                                    <div style={{width:"20px",height:"20px",backgroundImage:`url(${icon_product_link_arrow})`}}></div>
                                </div>}
                            </div>}
                            </div>
                            }
                            
                        </div>
                        <div style={{width:"100%",height:"108px",backgroundColor:"#fff",borderRadius:"2px",fontSize:"14px",padding:"16px 24px 24px 24px",textAlign:"left"}}>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"16px"}}>
                                <div style={{width:"16px",height:"16px",marginRight:"4px",backgroundImage:`url(${icon_maker})`}}></div>
                                <div style={{color:"#7b7b7b"}}>{product.product.make_by==="true"?"제작자":"소개한 사람"}</div>
                            </div>
                            <div style={{display:"flex"}}>
                            <Link to={product.product.email===localStorage.getItem("email")?`/profile`:`/anotheruserinfo?${product.product.user_id}`}>
                                <div style={{width:"32px",height:'32px',borderRadius:"50%",backgroundImage:`url(${product.user_info.thumbnail})`,backgroundColor:"#c4c4c4",marginRight:"8px",
                                backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",cursor:"pointer"}}></div>
                            </Link>
                                <div style={{textAlign:"left"}}>
                                    <Link to={product.product.email===localStorage.getItem("email")?`/profile`:`/anotheruserinfo?${product.product.user_id}`}>
                                    <div style={{display:"flex",alignItems:"center",marginBottom:"8px"}}>
                                        <div style={{fontWeight:'bold',color:'#505050',height:"14px",lineHeight:"14px"}}>{product.user_info.nick}</div>
                                        <div style={{width:"14px",height:'14px',backgroundImage:`url(${icon_pointcoin})`,margin:"0px 8px"}}></div>
                                        <div style={{color:"#262626",fontSize:"12px",height:'12px',lineHeight:"12px"}}>{product.user_info.point}</div>
                                    </div>
                                    </Link>
                                    <div style={{color:"#7b7b7b",height:"12px",lineHeight:"12px",fontSize:"12px"}}>{product.user_info.position}{product.user_info.department!==""?`,${product.user_info.department}`:""}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {bigImgWindow&&
                <div className="bigImgWindow">
                    <div style={{width:"1040px",backgroundColor:"#fff",height:"586px",backgroundImage:`url(${product.product.image[imgNum].imageUrl})`,zIndex:999,
                    backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",transition:"0.3s",top:"50%",transform:"translate(0,-50%)",position:"fixed",display:"flex"}}
                    onMouseOver={()=>{setBtnOnOff(true);}}
                    onMouseLeave={()=>{setBtnOnOff(false)}}
                    onClick={(e)=>{e.stopPropagation();}}>
                        {(product.product.youtube!=="undefined"&&imgNum===0)&&<div style={{width:"100%",height:"100%",position:"absolute"}}>
                            <ReactPlayer width="100%" height="100%" playing muted url={product.product.youtube}></ReactPlayer>
                        </div>}
                        {btnOnOff&&<div>
                            {imgNum!==0&&<div style={{width:"40px",height:"100%",position:"absolute",display:"flex",alignItems:"center",cursor:"pointer",justifyContent:"center"}}
                            onClick={(e)=>{setImgNum(imgNum-1);e.stopPropagation();}}
                            onMouseOver={(e)=>{e.stopPropagation();e.target.style.backgroundColor="rgba(255,255,255,0.3)"}}
                            onMouseLeave={(e)=>{e.stopPropagation();e.target.style.backgroundColor="transparent"}}>
                                <div style={{backgroundImage:`url(${icon_upBtn_black})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",width:"20px",height:'13px',transform:"rotate(270deg)"}}>
                                </div>
                            </div>}
                            {imgNum+1!==product.product.image.length&&<div style={{width:"40px",height:"100%",position:"absolute",right:"0px",display:"flex",alignItems:"center",cursor:"pointer",justifyContent:"center"}}
                            onClick={(e)=>{setImgNum(imgNum+1);e.stopPropagation();}}
                            onMouseOver={(e)=>{e.stopPropagation();e.target.style.backgroundColor="rgba(255,255,255,0.3)"}}
                            onMouseLeave={(e)=>{e.stopPropagation();e.target.style.backgroundColor="transparent"}}>
                                <div style={{backgroundImage:`url(${icon_upBtn_black})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",width:"20px",height:'13px',transform:"rotate(90deg)"}}>
                                </div>    
                            </div>}
                        </div>}
                        <div style={{position:"absolute",bottom:"-40px",right:"0px",width:"40px",height:"40px",backgroundImage:`url(${icon_bigImg_off})`,cursor:"pointer",backgroundSize:"cover"}}
                        onClick={()=>{setBigImgWindow(false)}}></div>
                    </div>   
                </div>
                }
                <div className="linkCopy" style={{
                        position:"fixed",
                        width:"100vw",
                        height:"40px",
                        backgroundColor:"rgba(150,150,150,0.5)",
                        top:"50%",
                        transform:"translate(0,-50%)",
                        display:copyState?"flex":"none",
                        zIndex:99,
                        opacity: copyState?1:0,
                        justifyContent:'center',
                        color:"#fff",
                        transition: "0.3s",
                        alignItems:"center"}}>링크가 복사 되었습니다.</div>
        </div>
        }
    </>
)}
  

const Product = ()=>{

    const [loginWindow,setLoginWindow] = useState(false);
    const [signupWindow,setSignUpWindow] = useState(false);
    const [modal,setModal] = useState(false);
    const [linkWindow,setLinkWindow] = useState(false);
    const [scrollY,setScrollY]=useState(0);
    const [alarmModal,setAlarmModal] = useState(false);

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

    useEffect(()=>{
        if(window.location.search.substring(12)===""){
            const alink = document.createElement("a");
            alink.href="/";
            alink.click();
        }
    },[])
    
      return(
        <div className="contentsBody" style={{
            width:"100%",
            minHeight:window.innerHeight,
          }}
      onClick={()=>{setModal(false);setLinkWindow(false);setAlarmModal(false);}}
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
    modal={modal}
    setModal={setModal}
    linkWindow={linkWindow}
    setLinkWindow={setLinkWindow}
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

export default Product;