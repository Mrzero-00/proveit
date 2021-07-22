import React, { useCallback, useEffect, useRef, useState } from 'react';
import icon_commentModify from '../../image/icon_commentModify.png';
import icon_like_off from '../../image/icon_like_off.svg';
import icon_like_on from '../../image/icon_like_on.svg';
import icon_upBtn_black from '../../image/icon_upBtn_black.svg';
import icon_facebook from '../../image/icon_facebook.svg';
import icon_kakao from '../../image/icon_kakao.svg';
import icon_link from '../../image/icon_link.svg';
import icon_twitter from '../../image/icon_twitter.svg';
import icon_bigImg_off from '../../image/icon_bigImg_off.svg';
import ReactQuill from 'react-quill';
import { BrowserRouter, Link } from 'react-router-dom';
import axios from 'axios';
/*global Kakao*/
import ReactPlayer from 'react-player';
import Header from '../Common/Header';
import LoginWindow from '../Common/LoginWindow';
import SignupWindow from '../Common/SignupWindow';

const Body = ({setModal,modal,setLoginWindow})=>{

    const [renderState,setRenderState] = useState(false);
    const [replyList,setReplyList] = useState([]);
    const [currentComment,setCurrentComment] = useState("");
    const [rerender,setRerender] =useState(false);
    const [copyState,setCopyState] =useState(false);
    const [touchState,setTouchState] = useState(false);
    const [deviceWidth,setDeviceWidth] = useState(0);
    const [product,setProduct] =useState({
        id:0,
        producerInfo:{
            userId:"",
            nickName:"",   
            profileUrl:"",
            belong:"",
            position:""
        },
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
        thumbnail:"",
    })
    const [btnOnOff,setBtnOnOff] = useState(false);
    const [bigImgWindow,setBigImgWindow] = useState(false);
    const [imgNum,setImgNum] =useState(0);
    const [replyState,setReplyState] = useState(true);
    const [phoneState,setPhoneState] =useState(false);

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
            {(product.youtube!=="undefined"&&product.youtube!=="")&&<div>
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
            {(product.youtube==="undefined"||product.youtube==="")&&
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
        const url = item.imageUrl;
        let subNum =0;
        const height = (deviceWidth/1280)*720;
        return(
            <div>
            {(product.youtube!=="undefined"&&product.youtube!=="")&&
            item.type==="video"?
            <div className="product_item_img" style={{height:phoneState&&`${height}px`}}>
                <ReactPlayer width="100%" height={`${height}px`} playing muted url={product.youtube}></ReactPlayer>
            </div>
            :<div className="product_item_img" style={{backgroundImage:`url(${item.imageUrl})`,height:phoneState&&`${height}px`}}>      
            </div>}
            </div>
        )
    }

    const CommentRender =({item,product})=>{

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
                        localStorage.setItem("replyId",e.data.reply_id);
                        setRerender(true);
                    }else{
          
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
            data.append('nick',JSON.parse(localStorage.getItem("userInfo")).nick);
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
                        setRerender(true);
                    }else{
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
                        setRerender(true);
                    }else{
          
                    }
                })
            }catch{
          
            }
        }

        // useEffect(()=>{
        //     setModifyText(item.reply);
        // },[])
        return(
            <div id={item.id} 
             className={item.depth==="0"?"product_item_reply":"product_item_reply_depth"}>
                <Link to={item.user_email===localStorage.getItem("email")?`/profile`:`/anotheruserinfo?${item.user_email}`}><div style={{
                    width:"40px",
                    height:"40px",
                    minHeight:"40px",
                    minWidth:"40px",
                    borderRadius:"50%",
                    marginRight:'16px',
                    backgroundColor:"#c4c4c4",
                    backgroundImage:`url(${"https://www.proveit.co.kr/"+item.thumbnail})`,
                    backgroundSize:"cover",
                    backgroundPosition:"center",
                    backgroundRepeat:"no-repeat"
                    }}
                    >
                </div>
                </Link>
                <div>
                    <div style={{display:"flex"}}>
                    <Link to={item.user_email===localStorage.getItem("email")?`/profile`:`/anotheruserinfo?${item.user_email}`}><div style={{fontWeight:"bold",marginBottom:'8px',height:"14px",lineHeight:"14px",marginRight:"4px",fontSize:'14px',color:"#505050"}}>{item.nick}</div></Link>
                        {item.user_email ===product.produce_info.email&&<div style={{color:'#9c31c6',lineHeight:"16px",height:"16px",fontSize:'10px',textAlign:"center",width:"48px",borderRadius:"8px",backgroundColor:"#f1f1f1"}}>제작자</div>}
                    </div>
                    <div style={{color:"#a5a5a5",marginBottom:'7px',height:"13px",lineHeight:"13px",fontSize:'13px'}}>{item.position}{item.department!==""&&`,${item.department}`}</div>
                    {!modifyState&&<div style={{width:"100%",position:"relative",marginBottom:"8px"}}>
                       {/* <textarea value={item.reply} readOnly></textarea> */}
                       <ReactQuill theme="" readOnly
                        value={item.reply} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%"}}
                        ></ReactQuill>
                    </div>}
                    {modifyState&&<div style={{width:"100%",display:"flex",marginBottom:"16px"}}>
                       <ReactQuill className="quillInput" theme=""
                        value={modifyText} style={{
                            textAlign:"left",
                            color:"#505050",
                            fontSize:'14px',
                            width:"474px",
                            minHeight:"84px",
                            borderRadius:"2px",
                            marginRight:"8px",
                            padding:"16px"}}
                        onChange={(e)=>{setModifyText(e)}}></ReactQuill>
                        <div>
                            <div className="btn_one" style={{width:"78px",height:"40px",marginBottom:"8px"}}
                            onClick={()=>{depthReplyModifyApi()}}>확인</div>
                            <div className="btn_four" style={{width:"78px",height:"40px"}}
                            onClick={()=>{setModifyState(false)}}>취소</div>
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
                    {replyWindow&&<div style={{display:"flex",paddingBottom:"16px"}}>
                        <ReactQuill className="quillInput product_item_comment_submitbtn" theme="" placeholder="의견이나 궁금한 점을 남겨보세요"
                            value={replyText} style={{
                                textAlign:"left",
                                color:"#505050",
                                fontSize:'14px',
                                width:item.depth==="0"?"474px":"418px",
                                marginTop:"19px",
                                borderRadius:"2px",
                                padding:"6px 6px 6px 6px",
                                boxSizing:"border-box",
                                display:"flex",
                                flexDirection:"column",
                                justifyContent:"center",
                                minHeight:"48px"}}
                            onChange={(e)=>{setReplyText(e)}}></ReactQuill>
                        <div className="btn_one" style={{width:"78px",height:"48px",marginLeft:"8px",marginTop:"19px"}}
                        onClick={()=>{
                            if(localStorage.getItem("hash")){
                                depthReplyApi();
                                setReplyText(`${item.nick}`);
                            }
                        }}>남기기</div>
                    </div>}
                </div>

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
                const data = e.data.product;
                setProduct({
                    id:data.id,
                    produce_info:JSON.parse(data.produce_info),
                    title:data.title,
                    sub_title:data.sub_title,
                    like_count:data.like_count,
                    main_text:data.main_text,
                    payment_type:data.payment_type,
                    category:data.category,
                    image:(data.youtube!==""&&data.youtube!=="undefined")?[{id:0,type:"video",imageUrl:data.youtube},...JSON.parse(data.image)]:JSON.parse(data.image),
                    link:data.link,
                    thumbnail:data.thumbnail,
                    like_m:data.like_m,
                    youtube:data.youtube
                });
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
                console.log(e);
                if(e.data.ret_code === "0000"){
                    localStorage.setItem("replyId",e.data.reply_id);
                    setRerender(true);
                    setReplyState(true);
                }else{
                    setReplyState(false);
                }
            })
        }catch{
      
        }
    }

    const replayListApi = async()=>{
        var data = new FormData();
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
                    setRerender(true);
                }else{
      
                }
            })
        }catch{
      
        }
    }  

    useEffect(()=>{
        productListApi();
        replayListApi();
        setRerender(false);
    },[rerender,localStorage.getItem("hash")])


    const replyNavi = ()=>{
        if(localStorage.getItem("replyId")){
            
            const navi = document.getElementById("replyNavi");
            if(navi){
                navi.click();
                localStorage.removeItem("replyId");
            }
        }
    }

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
            title: product.title, // 보여질 제목
            description: product.sub_title, // 보여질 설명
            imageUrl: product.image[0].imageUrl, // 콘텐츠 URL
            link: {
               mobileWebUrl:sendUrl,
               webUrl:sendUrl
            }
          },
          social: {
            likeCount: product.like_count*1,
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
        window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl,product.title,opstion);
    }

    const shareTwitter=()=> {
        let sendText = product.title; // 전달할 텍스트
        let opstion = "width=800, height=700, toolbar=no, menubar=no, scrollbars=no";
        let sendUrl = `proveit.co.kr${window.document.location.pathname}${window.document.location.search}`; // 전달할 URL
        window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl,product.title,opstion );
    }

    useEffect(()=>{
        productListApi();
        replayListApi();
        setDeviceWidth(window.innerWidth);
        if(window.innerWidth<767){
            setPhoneState(true);
        }
    },[])

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
        window.addEventListener("scroll",scrollEvent)
        start.current = e.touches[0].clientX;
    }
    const touchMoveEvent =(e)=>{
        const imgArray = document.querySelector(".mainImgArray");
        currentX.current=e.touches[0].clientX;  
        imgArray.style.left=`${((currentX.current-start.current)/(deviceWidth/2))*100-(imgNum*100)}%`;
    }


    const touchEndEvent = (e)=>{
        setTouchState(false);
        const imgArray = document.querySelector(".mainImgArray");
        if(((currentX.current-start.current)/(deviceWidth/2))*100>55){
           if(product.youtube!=="undefined"&&product.youtube!==""){
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
          
                if(imgNum+1!==product.image.length){
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
        {renderState&&<div style={{width:'100%',backgroundColor:"#f9f9f9",display:"flex",alignItems:"center",flexDirection:"column"}}
        onClick={()=>{setBigImgWindow(false)}}>
                <a id="replyNavi" style={{display:"none"}} href={`#${localStorage.getItem("replyId")}`}></a>
                <div style={{textAlign:"left",marginTop:"48px",marginBottom:"32px"}}>
                <div className="product_item">
                    <div className="product_thumbnail" style={{backgroundImage:`url(${product.thumbnail})`}}></div>
                    
                    <div style={{width:"100%",textAlign:"left"}}>
                        <div className="product_item_title">{product.title}</div>
                        <div className="product_item_subtitle" >{product.sub_title}</div>
                        <div style={{display:"flex",height:"24px",alignItems:"center"}}>
                        <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{product.payment_type}</div>
                        <div style={{height:"14px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",width:"1px",backgroundColor:"#e5e5e5"}}></div>
                        <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{product.category}</div>
                        </div>
                    </div>
                    
                </div>
                </div>
                <div className="product_btn_phone">
                        <div className="btn_two" style={{width:"100%",maxWidth:"144px",height:"100%",marginRight:"8px"}} onClick={()=>{
                            const alink = document.createElement("a");
                            alink.target="blink";
                            alink.href = product.link;
                            alink.click();
                        }}>써보러 가기</div>
                        {product.like_m==="0"&&<div className="btn_one_big" style={{width:"100%",height:"56px"}}
                        onClick={()=>{
                            if(localStorage.getItem("hash")){
                                likeApi();
                            }else{
                                setLoginWindow(true);
                            }
                            }}
                            >
                            <div style={{width:'16px',height:"16px",backgroundImage:`url(${icon_like_off})`,marginRight:"8px"}}></div>
                            <div  style={{marginRight:"4px"}}>추천해요</div>
                            {product.like_count}
                            </div>}
                        {product.like_m==="1"&&<div className="btn_one_big2" style={{width:"100%",height:"56px"}}
                        onClick={()=>{
                            if(localStorage.getItem("hash")){
                                likeApi();
                            }else{
                                setLoginWindow(true);
                            }
                            }}
                        >
                            <div style={{width:'16px',height:"16px",backgroundImage:`url(${icon_like_on})`,marginRight:"8px"}}></div>
                            <div  style={{marginRight:"4px"}}>추천했음</div>
                            {product.like_count}
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

                            onClick={(e)=>{e.stopPropagation();setBigImgWindow(true);}}>
                                {(product.youtube!==""&&product.youtube!=="undefined"&&imgNum===0)&&<div style={{width:"100%",height:"100%",position:"absolute"}}>
                                    <ReactPlayer playing muted url={product.youtube}></ReactPlayer>
                                </div>}
                                {(btnOnOff||phoneState)&&<div>
                                    {imgNum!==0&&<div style={{width:phoneState?"80px":"40px",height:"100%",position:"absolute",display:"flex",alignItems:"center",cursor:"pointer",justifyContent:"center",zIndex:"999"}}
                                    onClick={(e)=>{setImgNum(imgNum-1);e.stopPropagation();}}
                                    onMouseOver={(e)=>{e.stopPropagation();e.target.style.backgroundColor="rgba(255,255,255,0.3)"}}
                                    onMouseLeave={(e)=>{e.stopPropagation();e.target.style.backgroundColor="transparent"}}>
                                        <div style={{backgroundImage:`url(${icon_upBtn_black})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",width:"20px",height:'13px',transform:"rotate(270deg)"}}>
                                        </div>
                                    </div>}
                                    {imgNum+1!==product.image.length&&
                                    <div style={{width:phoneState?"80px":"40px",height:"100%",position:"absolute",right:"0px",display:"flex",alignItems:"center",cursor:"pointer",justifyContent:"center",zIndex:"999"}}
                                    onClick={(e)=>{setImgNum(imgNum+1);e.stopPropagation();}}
                                    onMouseOver={(e)=>{e.stopPropagation();e.target.style.backgroundColor="rgba(255,255,255,0.3)"}}
                                    onMouseLeave={(e)=>{e.stopPropagation();e.target.style.backgroundColor="transparent"}}>
                                        <div style={{backgroundImage:`url(${icon_upBtn_black})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",width:"20px",height:'13px',transform:"rotate(90deg)"}}>
                                        </div>    
                                    </div>}
                                </div>}
                                <div className="mainImgArray" style={{position:"absolute",display:"flex",left:`${(imgNum*-100)}%`,transition:"0.3s"}}>
                                    {product.image.map((item)=>(<ImageMainArray deviceWidth={deviceWidth} phoneState={phoneState} key={item.id} imgNum={imgNum} item={item} product={product}></ImageMainArray>))}
                                </div>
                            </div>
                           
                            <div className="product_img_previewArray">
                                {product.image.map((item)=>(<ImageArray item={item} product={product} imgNum={imgNum} key={item.id} setImgNum={setImgNum}></ImageArray>))}
                            </div>
                            <div className="product_main_text" style={{width:"100%",position:"relative",marginBottom:"24px"}}>
                                <ReactQuill theme="" readOnly
                                value={product.main_text} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%"}}></ReactQuill>
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
                        <div style={{color:"#a5a5a5",marginBottom:"16px"}}>소개한 사람</div>
                        <div style={{display:"flex"}}>
                            <div style={{width:"32px",height:'32px',borderRadius:"50%",backgroundImage:`url(${"https://www.proveit.co.kr/"+product.produce_info.thumbnail})`,backgroundColor:"#c4c4c4",marginRight:"24px",
                        backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}></div>
                            <div style={{textAlign:"left"}}>
                                <div style={{fontWeight:'bold',color:'#505050',marginBottom:"8px",height:"14px",lineHeight:"14px"}}>{product.produce_info.nick}</div>
                                <div style={{color:"#a5a5a5",height:"14px",lineHeight:"14px"}}>{product.produce_info.position},{product.produce_info.department}</div>
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
                                    marginRight:"16px",
                                    borderRadius:"50%",
                                    backgroundColor:"#c4c4c4",
                                    backgroundImage:localStorage.getItem("userInfo")&&`url(${"https://www.proveit.co.kr/"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`,
                                    backgroundSize:"cover",
                                    backgroundRepeat:"no-repeat",
                                    backgroundPosition:"center"
                                }}
                                    >
                                </div>
                                    <div>
                                        {/* <textarea onChange={(e)=>{setCurrentComment(e.target.value);}}></textarea> */}
                                        <ReactQuill className="quillInput product_item_comment_input" theme="" placeholder="의견이나 궁금한 점을 남겨보세요"
                                        value={currentComment}
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
                            </div>
                            <div className="product_item_reply_list">
                                {replyList.map((item)=>(<CommentRender key={item.id} product={product} modal={modal} setModal={setModal} item={item}></CommentRender>))}
                            </div>
                            {replyList.length>=10&&<div className="product_item_comment_submit_under">
                            <div style={{
                                width:"40px",
                                height:"40px",
                                marginTop:"32px",
                                marginLeft:"24px",
                                marginRight:"16px",
                                borderRadius:"50%",
                                backgroundColor:"#c4c4c4",
                                backgroundImage:localStorage.getItem("userInfo")&&`url(${"https://www.proveit.co.kr/"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`,
                                backgroundSize:"cover",
                                backgroundRepeat:"no-repeat",
                                backgroundPosition:"center"
                                }}>
                            </div>
                            <div><ReactQuill className="quillInput" theme="" placeholder="의견이나 궁금한 점을 남겨보세요"
                                value={currentComment} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"474px",marginTop:"32px",borderRadius:"2px",
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
                            }}}>남기기</div>
                        </div>}
                        </div>
                    </div>
                    </div>
                    <div className="product_item_web">
                        <div style={{display:"flex",marginBottom:"24px"}}>
                            <div className="btn_two" style={{width:"112px",height:"56px",marginRight:"8px"}} onClick={()=>{
                                const alink = document.createElement("a");
                                alink.target="blink";
                                alink.href = product.link;
                                alink.click();
                            }}>써보러 가기</div>
                            {product.like_m==="0"&&<div className="btn_one_big" style={{width:"216px",height:"56px"}}
                            onClick={()=>{
                                if(localStorage.getItem("hash")){
                                    likeApi();
                                }else{
                                    setLoginWindow(true);
                                }
                                }}
                                >
                                <div style={{width:'16px',height:"16px",backgroundImage:`url(${icon_like_off})`,marginRight:"8px"}}></div>
                                <div  style={{marginRight:"4px"}}>추천해요</div>
                                {product.like_count}
                                </div>}
                            {product.like_m==="1"&&<div className="btn_one_big2" style={{width:"216px",height:"56px"}}
                            onClick={()=>{
                                if(localStorage.getItem("hash")){
                                    likeApi();
                                }else{
                                    setLoginWindow(true);
                                }
                                }}
                            >
                                <div style={{width:'16px',height:"16px",backgroundImage:`url(${icon_like_on})`,marginRight:"8px"}}></div>
                                <div  style={{marginRight:"4px"}}>추천했음</div>
                                {product.like_count}
                                </div>}
                        </div>
                        <div style={{width:"336px",height:"108px",backgroundColor:"#fff",borderRadius:"2px",fontSize:"14px",padding:"16px 24px 24px 24px",textAlign:"left"}}>
                            <div style={{color:"#a5a5a5",marginBottom:"16px"}}>소개한 사람</div>
                            <div style={{display:"flex"}}>
                                <div style={{width:"32px",height:'32px',borderRadius:"50%",backgroundImage:`url(${"https://www.proveit.co.kr/"+product.produce_info.thumbnail})`,backgroundColor:"#c4c4c4",marginRight:"24px",
                            backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}></div>
                                <div style={{textAlign:"left"}}>
                                    <div style={{fontWeight:'bold',color:'#505050',marginBottom:"8px",height:"14px",lineHeight:"14px"}}>{product.produce_info.nick}</div>
                                    <div style={{color:"#a5a5a5",height:"14px",lineHeight:"14px"}}>{product.produce_info.position},{product.produce_info.department}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {bigImgWindow&&
                <div className="bigImgWindow">
                    <div style={{width:"1040px",backgroundColor:"#fff",height:"586px",backgroundImage:`url(${product.image[imgNum].imageUrl})`,zIndex:999,
                    backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",transition:"0.3s",top:"50%",transform:"translate(0,-50%)",position:"fixed",display:"flex"}}
                    onMouseOver={()=>{setBtnOnOff(true);}}
                    onMouseLeave={()=>{setBtnOnOff(false)}}
                    onClick={(e)=>{e.stopPropagation();}}>
                        {(product.youtube!=="undefined"&&imgNum===0)&&<div style={{width:"100%",height:"100%",position:"absolute"}}>
                            <ReactPlayer width="100%" height="100%" playing muted url={product.youtube}></ReactPlayer>
                        </div>}
                        {btnOnOff&&<div>
                            {imgNum!==0&&<div style={{width:"40px",height:"100%",position:"absolute",display:"flex",alignItems:"center",cursor:"pointer",justifyContent:"center"}}
                            onClick={(e)=>{setImgNum(imgNum-1);e.stopPropagation();}}
                            onMouseOver={(e)=>{e.stopPropagation();e.target.style.backgroundColor="rgba(255,255,255,0.3)"}}
                            onMouseLeave={(e)=>{e.stopPropagation();e.target.style.backgroundColor="transparent"}}>
                                <div style={{backgroundImage:`url(${icon_upBtn_black})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",width:"20px",height:'13px',transform:"rotate(270deg)"}}>
                                </div>
                            </div>}
                            {imgNum+1!==product.image.length&&<div style={{width:"40px",height:"100%",position:"absolute",right:"0px",display:"flex",alignItems:"center",cursor:"pointer",justifyContent:"center"}}
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

export default Product;