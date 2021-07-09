import React, { useEffect, useState } from 'react';

import icon_logo from '../../image/logo.svg';
import icon_commentModify from '../../image/icon_commentModify.png';
import icon_likeBtn from '../../image/icon_likeBtn.svg';
import icon_upBtn from '../../image/icon_upBtn.svg';
import googleLogin from '../../image/googleLogin.svg';
import googleSign from '../../image/googleSign.svg';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const Header=({setModal,modal,setLoginWindow,setSignUpWindow})=>{
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
                  {sessionStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                      <div style={{marginRight:"16px",fontSize:"14px",color:"#828282",cursor:"pointer"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                      <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                      </div>
                  }
                  {sessionStorage.getItem("hash")!==null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                      <Link to="/registerproduct"><div style={{marginRight:"16px",fontSize:"14px",color:"#505050",cursor:"pointer"}}>프로젝트 등록하기</div></Link>
                      <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:sessionStorage.getItem("userInfo")&&`url(${"http://www.proveit.co.kr/"+JSON.parse(sessionStorage.getItem("userInfo")).thumbnail})`
                      ,backgroundColor:"#c5c5c5",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                      </div>
                  }  
              </div>
  
              </div>
          </div>
          <div id="header" style={{width:"100%",height:"48px",backgroundColor:"#fff",position:"fixed",top:"-48px",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"48px",
                                transform:`translate(0,${header}px)`,transition:"0.3s",zIndex:"9999"}}>
            <div style={{width:"1040px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>  
                    <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                    <div>
                {sessionStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <div style={{marginRight:"16px",fontSize:"14px",color:"#828282",cursor:"pointer"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                    <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                    </div>
                }
                {sessionStorage.getItem("hash")!==null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <Link to="/registerproduct"><div style={{marginRight:"16px",fontSize:"14px",color:"#505050",cursor:"pointer"}}>프로젝트 등록하기</div></Link>
                    <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:sessionStorage.getItem("userInfo")&&`url(${"http://www.proveit.co.kr/"+JSON.parse(sessionStorage.getItem("userInfo")).thumbnail})`
                    ,backgroundColor:"#c5c5c5",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
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
            onClick={()=>{sessionStorage.clear();}}>로그아웃</div>
            </div>}
            </div>
        </div>
          <div style={{width:"40px",height:"40px",backgroundImage:`url(${icon_upBtn})`,position:"fixed",bottom:"84px",right:"80px",
                      display:header!==47&&"none",cursor:"pointer"}}
                      onClick={upEvt}></div>      
        </>
    )
}

const Body = ({setModal,modal})=>{

    const [renderState,setRenderState] = useState(false);
    const [replyList,setReplyList] = useState([]);
    const [currentComment,setCurrentComment] = useState("");
    const [rerender,setRerender] =useState(false);
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

    const [imgNum,setImgNum] =useState(0);

    const ImageArray =({item,setImgNum})=>{
        return(
            <div style={{width:"40px",height:"40px",marginRight:"8px",backgroundImage:`url(${item.imageUrl})`,cursor:"pointer",
            backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}
            onClick={()=>{setImgNum(item.id)}}>      
            </div>
        )
    }

    const CommentRender =({item,product})=>{

        const [hover,setHover] =useState(0);
        const [modal,setModal] = useState(false);
        const [replyText,setReplyText] =useState(`<p><div style="display:inline-block;">@${item.nick}</div></br></p>`);
        const [modifyText,setModifyText] = useState("");
        const [replyWindow,setReplyWindow] = useState(false);
        const [modifyState,setModifyState] = useState(false);
        const [listHover,setListHover] = useState(0);
        
        const depthReplyApi = async()=>{
            var data = new FormData();
            data.append('parent_id', item.depth==="1"?item.parent_id:item.id);
            data.append('reply', replyText);
            data.append('user_email',sessionStorage.getItem("email"));
            data.append('nick',JSON.parse(sessionStorage.getItem("userInfo")).nick);
            data.append('hash', sessionStorage.getItem("hash"));
            data.append("product_id",window.location.search.substring(12));
            try{
                await axios({
                    method:"post",
                    url : "http://proveit.co.kr/api/replySubmit.php",
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

        const depthReplyModifyApi = async()=>{
            var data = new FormData();
            data.append('parent_id', item.depth==="1"?item.parent_id:item.id);
            data.append('reply', modifyText);
            data.append('user_email',sessionStorage.getItem("email"));
            data.append("reply_id",item.id);
            data.append('nick',JSON.parse(sessionStorage.getItem("userInfo")).nick);
            data.append('hash', sessionStorage.getItem("hash"));
            data.append("product_id",window.location.search.substring(12));
            data.append("type","update");
            try{
                await axios({
                    method:"post",
                    url : "http://proveit.co.kr/api/replySubmit.php",
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
            data.append('user_email',sessionStorage.getItem("email"));
            data.append("reply_id",item.id);
            data.append('nick',JSON.parse(sessionStorage.getItem("userInfo")).nick);
            data.append('hash', sessionStorage.getItem("hash"));
            data.append("product_id",window.location.search.substring(12));
            data.append("type","delete");
            try{
                await axios({
                    method:"post",
                    url : "http://proveit.co.kr/api/replySubmit.php",
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
            setModifyText(item.reply);
        },[])

        return(
            <div style={{
                width:item.depth==="0"?"616px":"520px",
                display:"flex",
                position:"relative"
                ,marginBottom:"28px",
                marginLeft:item.depth==="1"&&"56px"
                }} id={item.id}>
                <div style={{
                    width:"40px",
                    height:"40px",
                    minHeight:"40px",
                    minWidth:"40px",
                    borderRadius:"50%",
                    marginRight:'16px',
                    backgroundColor:"#c4c4c4",
                    backgroundImage:`url(${"http://www.proveit.co.kr"+item.thumbnail})`,
                    backgroundSize:"contain",
                    backgroundPosition:"center",
                    backgroundRepeat:"no-repeat"
                    }}>
                </div>
                <div>
                    <div style={{display:"flex"}}>
                        <div style={{fontWeight:"bold",marginBottom:'8px',height:"14px",lineHeight:"14px",marginRight:"4px"}}>{item.nick}</div>
                        {item.user_email ===product.produce_info.email&&<div style={{color:'#9c31c6',lineHeight:"16px",height:"16px",fontSize:'10px',textAlign:"center",width:"48px",borderRadius:"8px",backgroundColor:"#f1f1f1"}}>제작자</div>}
                    </div>
                    <div style={{color:"#a5a5a5",marginBottom:'16px',height:"14px",lineHeight:"14px"}}>{item.position}</div>
                    {!modifyState&&<div style={{width:"100%",position:"relative",marginBottom:"16px"}}>
                       <ReactQuill theme=""
                        value={item.reply} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%"}}
                        ></ReactQuill>
                        <div style={{width:"100%",height:"100%",position:'absolute',top:0,left:0}}></div>
                    </div>}
                    {modifyState&&<div style={{width:"100%",display:"flex",marginBottom:"16px"}}>
                       <ReactQuill theme=""
                        value={modifyText} style={{
                            textAlign:"left",
                            color:"#505050",
                            fontSize:'14px',
                            width:"474px",
                            minHeight:"84px",
                            border:"1px solid rgba(156,49,198,0.3)",
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
                        backgroundColor:listHover===1&&"#f1f1f1",
                        textAlign:"center",lineHeight:"32px"}}
                        onMouseLeave={()=>{setListHover(0)}}
                        onMouseOver={()=>{setListHover(1)}}
                        onClick={()=>{setReplyWindow(!replyWindow);}}>답글</div>
                        {/* <div style={{width:"88px",cursor:"pointer",height:"100%",marginRight:"8px",backgroundColor:"#f1f1f1",display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_likeBtn})`,marginRight:"4px",backgroundPosition:"center",backgroundSize:"100% 100%"}}></div>
                            <div>추천({item.like_count})</div>
                        </div> */}
                        {item.user_email===sessionStorage.getItem("email")&& <div style={{width:"32px",cursor:"pointer",height:"100%",marginRight:"8px",
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
                        <ReactQuill theme="" placeholder="서비스에 관한 의견이나 궁금한 점을 남겨보세요"
                            value={replyText} style={{
                                textAlign:"left",
                                color:"#505050",
                                fontSize:'14px',
                                width:item.depth==="0"?"474px":"418px",
                                marginTop:"19px",
                                border:"1px solid rgba(156,49,198,0.3)",
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
                            if(sessionStorage.getItem("hash")){
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
    data.append("user_email",sessionStorage.getItem("email"));
    data.append("hash",sessionStorage.getItem("hash"));
    try{
        await axios({
            method:"post",
            url : "http://proveit.co.kr/api/productList.php",
            data:data

        }).then((e)=>{
            if(e.data.ret_code === "0000"){
                console.log(e);
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
                    image:JSON.parse(data.image),
                    link:data.link,
                    thumbnail:data.thumbnail,
                    like_m:data.like_m,
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
        data.append('user_email',sessionStorage.getItem("email"));
        data.append('nick',JSON.parse(sessionStorage.getItem("userInfo")).nick);
        data.append('hash', sessionStorage.getItem("hash"));
        data.append("product_id",window.location.search.substring(12));
        try{
            await axios({
                method:"post",
                url : "http://proveit.co.kr/api/replySubmit.php",
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

    const replayListApi = async()=>{
        var data = new FormData();
        data.append("product_id",window.location.search.substring(12));
        try{
            await axios({
                method:"post",
                url : "http://proveit.co.kr/api/replyList.php",
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
        data.append("user_email",sessionStorage.getItem("email"));
        data.append("hash",sessionStorage.getItem("hash"));
        data.append("product_id",window.location.search.substring(12));
        try{
            await axios({
                method:"post",
                url : "http://proveit.co.kr/api/productLike.php",
                data:data
      
            }).then((e)=>{
                console.log(e);
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
        
    },[])

    useEffect(()=>{
        productListApi();
        replayListApi();
        setRerender(false);
    },[rerender,sessionStorage.getItem("hash")])

    const clip=()=>{
        var url = '';
        var textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        url = window.document.location.href;
        textarea.value = url;
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("URL이 복사되었습니다.")
    }
    return(
    <>
        {renderState&&<div style={{height:"100%",width:'100%',backgroundColor:"#f9f9f9",display:"flex",alignItems:"center",flexDirection:"column"}}>
                <div style={{textAlign:"left",marginTop:"48px",marginBottom:"32px"}}>
                <div style={{width:"1040px",height:"88px",display:"flex",alignItems:"center"}}>
                    <div style={{width:"88px",height:"88px",marginRight:"16px",backgroundImage:`url(${product.thumbnail})`,backgroundColor:"#000",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
                    <div style={{width:"480px",textAlign:"left",marginRight:"24px"}}>
                        <div style={{color:"#505050",height:"16px",fontWeight:"bold",fontSize:'16px',marginBottom:"12px",lineHeight:"16px"}}>{product.title}</div>
                        <div style={{color:"#828282",height:"14px",fontSize:'13px',marginBottom:'16px',lineHeight:"14px"}}>{product.sub_title}</div>
                        <div style={{display:"flex",height:"24px",alignItems:"center"}}>
                        <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{product.payment_type}</div>
                        <div style={{height:"14px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",width:"1px",backgroundColor:"#e5e5e5"}}></div>
                        <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{product.category}</div>
                        </div>
                    </div>
                </div>
                </div>
                <div style={{display:"flex"}}>
                    <div>
                    <div style={{width:"688px",backgroundColor:"#fff",padding:"24px",boxSizing:"border-box",marginRight:"16px",marginBottom:"40px"}}>
                        <div style={{width:"640px",height:"360px",marginBottom:"16px",backgroundImage:`url(${product.image[imgNum].imageUrl})`,
                    backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",transition:"0.3s"}}></div>
                            <div style={{display:"flex",marginBottom:"24px"}}>
                                {product.image.map((item)=>(<ImageArray item={item} key={item.id} setImgNum={setImgNum}></ImageArray>))}
                            </div>
                            <div style={{width:"640px",position:"relative",marginBottom:"24px"}}>
                                <ReactQuill theme=""
                                value={product.main_text} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%"}}></ReactQuill>
                                <div style={{width:"100%",height:"100%",position:'absolute',top:0,left:0}}></div>
                            </div>
                            <div style={{display:"flex"}}>
                                <div className="btn_three" style={{width:"84px",height:"40px",marginRight:"4px"}}>카카오톡</div>
                                <div className="btn_three" style={{width:"84px",height:"40px",marginRight:"4px"}}>페이스북</div>
                                <div className="btn_three" style={{width:"84px",height:"40px",marginRight:"4px"}}>트위터</div>
                                <div className="btn_three" style={{width:"84px",height:"40px",marginRight:"4px"}} onClick={clip}>링크복사</div>
                            </div>
                    </div>
                    <div style={{textAlign:"left",fontWeight:"bold",fontSize:"14px",marginBottom:"21px"}}>댓글({replyList.length})</div>
                    <div style={{width:"688px",backgroundColor:"#fff",boxSizing:"border-box",marginRight:"16px",marginBottom:"67px"}}>
                        <div style={{display:"flex",paddingBottom:"24px",borderBottom:"1px solid #f1f1f1"}}>
                            <div style={{
                                width:"40px",
                                height:"40px",
                                marginTop:"19px",
                                marginLeft:"24px",
                                marginRight:"16px",
                                borderRadius:"50%",
                                backgroundColor:"#c4c4c4",
                                backgroundImage:sessionStorage.getItem("userInfo")&&`url(${"http://www.proveit.co.kr/"+JSON.parse(sessionStorage.getItem("userInfo")).thumbnail})`,
                                backgroundSize:"contain",
                                backgroundRepeat:"no-repeat",
                                backgroundPosition:"center"
                            }}
                                >
                            </div>
                            <ReactQuill theme="" placeholder="서비스에 관한 의견이나 궁금한 점을 남겨보세요"
                                value={currentComment} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"474px",marginTop:"19px",border:"1px solid rgba(156,49,198,0.3)",borderRadius:"2px",
                            padding:"6px 6px 6px 6px",boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"48px"}}
                            onFocus={()=>{
                                if(sessionStorage.getItem("hash")){
                                }else{
                                    console.log("로그인후 댓글을 남겨주세요");
                                }
                            }}
                                onChange={(e)=>{setCurrentComment(e)}}></ReactQuill>
                            <div className="btn_one" style={{width:"78px",height:"48px",marginLeft:"8px",marginTop:"19px"}}
                            onClick={()=>{
                                if(sessionStorage.getItem("hash")){
                                    replyAddApi();
                                    setCurrentComment("");
                                }
                            }}>남기기</div>
                        </div>
                        <div style={{width:"100%",backgroundColor:"#fff",padding:"32px 48px 31px 24px",boxSizing:"border-box"}}>
                            {replyList.map((item)=>(<CommentRender key={item.id} product={product} modal={modal} setModal={setModal} item={item}></CommentRender>))}
                        </div>
                        {replyList.length>=10&&<div style={{display:"flex",paddingBottom:"37px",borderTop:"1px solid #f1f1f1"}}>
                            <div style={{
                                width:"40px",
                                height:"40px",
                                marginTop:"32px",
                                marginLeft:"24px",
                                marginRight:"16px",
                                borderRadius:"50%",
                                backgroundColor:"#c4c4c4",
                                backgroundImage:sessionStorage.getItem("userInfo")&&`url(${"http://www.proveit.co.kr/"+JSON.parse(sessionStorage.getItem("userInfo")).thumbnail})`,
                                backgroundSize:"contain",
                                backgroundRepeat:"no-repeat",
                                backgroundPosition:"center"
                                }}>
                            </div>
                            <ReactQuill theme="" placeholder="서비스에 관한 의견이나 궁금한 점을 남겨보세요"
                                value={currentComment} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"474px",marginTop:"32px",border:"1px solid rgba(156,49,198,0.3)",borderRadius:"2px",
                            padding:"6px 6px 6px 6px",boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"48px"}}
                                onChange={(e)=>{setCurrentComment(e)}}></ReactQuill>
                            <div className="btn_one" style={{width:"78px",height:"48px",marginLeft:"8px",marginTop:"32px"}}
                            onClick={()=>{
                            if(sessionStorage.getItem("hash")){
                                replyAddApi();
                                setCurrentComment("");
                            }}}>남기기</div>
                        </div>}
                    </div>
                    </div>
                    <div>
                    <div style={{display:"flex",marginBottom:"24px"}}>
                        <div className="btn_two" style={{width:"112px",height:"56px",marginRight:"8px"}} onClick={()=>{
                            const alink = document.createElement("a");
                            alink.target="blink";
                            alink.href = product.link;
                            alink.click();
                        }}>써보러 가기</div>
                        {product.like_m==="0"&&<div className="btn_one_big" style={{width:"216px",height:"56px"}}
                        onClick={likeApi}>↑ 추천하기{product.like_count}</div>}
                        {product.like_m==="1"&&<div className="btn_one_big2" style={{width:"216px",height:"56px"}}
                        onClick={likeApi}>↑ 추천했어요{product.like_count}</div>}
                    </div>
                    <div style={{width:"336px",height:"108px",backgroundColor:"#fff",borderRadius:"2px",fontSize:"14px",padding:"16px 24px 24px 24px",textAlign:"left"}}>
                        <div style={{color:"#a5a5a5",marginBottom:"16px"}}>제작자</div>
                        <div style={{display:"flex"}}>
                            <div style={{width:"32px",height:'32px',borderRadius:"50%",backgroundImage:`url(${product.produce_info.thumbnail})`,backgroundColor:"#c4c4c4",marginRight:"24px",
                        backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}></div>
                            <div style={{textAlign:"left"}}>
                                <div style={{fontWeight:'bold',color:'#505050',marginBottom:"8px",height:"14px",lineHeight:"14px"}}>{product.produce_info.nick}</div>
                                <div style={{color:"#a5a5a5",height:"14px",lineHeight:"14px"}}>{product.produce_info.department},{product.produce_info.position}</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
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
                url : "http://proveit.co.kr/api/login.php",
                headers: {
                    //'Header-110': 'UxgOISh44O3eJxbKInDj3',
                },
                data:data
    
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    window.sessionStorage.setItem("hash",e.data.hash);
                    window.sessionStorage.setItem("email",id);
                    window.sessionStorage.setItem("userName",name);
                    userInfoApi(id,token);
                    setSignUpWindow(false);
                    setLoginWindow(false);
    
                }else if(e.data.ret_code ==="1000"){
                  window.sessionStorage.setItem("token",token);
                  window.sessionStorage.setItem("email",id);
                  window.sessionStorage.setItem("userName",name);
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
              url : "http://proveit.co.kr/api/user.php",
              data:data
    
          }).then((e)=>{
              if(e.data.ret_code === "0000"){
                sessionStorage.setItem("userInfo",JSON.stringify(e.data.user))
              }else{
    
              }
          })
      }catch{
    
      }
    }

  return(
    <div style={{width:"100%",height:"100vh",display:"flex",flexDirection:"column"}}
    onClick={()=>{setModal(false)}}>
    <Header 
    setLoginWindow={setLoginWindow} 
    loginWindow={loginWindow}
    setSignUpWindow={setSignUpWindow}
    signupWindow={signupWindow}
    modal={modal}
    setModal={setModal}
    ></Header>
    <Body
    modal={modal}
    setModal={setModal}
    ></Body>
    {loginWindow&&<div 
      style={{
        position:"absolute",
        width:'100vw',
        height:'100vh',
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
        color:"#505050"}}
        onClick={(e)=>{setLoginWindow(true);e.stopPropagation();}}>
          <div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`,marginTop:"56px",marginBottom:"32px"}}></div>
          <div style={{height:'23px',lineHeight:"23px",fontSize:"20px",fontWeight:'bold',marginBottom:"40px"}}>로그인</div>
          <div style={{fontSize:"16px",lineHeight:"28.8px",textAlign:"left",marginBottom:"49px"}}>
            <li>최소 기능 제품을 만들었다면, 프루브잇에 소개하고 커뮤니티 피드백을 받아보세요.</li>
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
        width:'100vw',
        height:'100vh',
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
        color:"#505050"}}
        onClick={(e)=>{setSignUpWindow(true);e.stopPropagation();}}>
          <div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`,marginTop:"56px",marginBottom:"32px"}}></div>
          <div style={{height:'23px',lineHeight:"23px",fontSize:"20px",fontWeight:'bold',marginBottom:"40px"}}>회원가입</div>
          <div style={{fontSize:"16px",lineHeight:"28.8px",textAlign:"left",marginBottom:"49px"}}>
            <li>최소 기능 제품을 만들었다면, 프루브잇에 소개하고 커뮤니티 피드백을 받아보세요.</li>
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

export default Product;