import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import LoginWindow from '../Common/LoginWindow';
import RightBar from '../Common/RightBar';
import SignupWindow from '../Common/SignupWindow';

import icon_like from '../../image/likeIcon.svg';
import icon_like_m from '../../image/likeIcon_m.svg';
import icon_commentModify from '../../image/icon_commentModify.png';
import icon_community_likeIcon from '../../image/icon_community_likeIcon.png';
import icon_community_category_2 from '../../image/icon_community_category_2.png';
import icon_community_category_3 from '../../image/icon_community_category_3.png';
import icon_community_category_4 from '../../image/icon_community_category_4.png';
import icon_community_title_icon from '../../image/icon_community_title_icon.png';
import ReactQuill from 'react-quill';
import { useRef } from 'react';

const CommentRender =({item,product,setLoginWindow,rerender})=>{

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
      data.append("community_id",window.location.search.substring(4));
      data.append("target","community");
      try{
          await axios({
              method:"post",
              url : "https://www.proveit.co.kr/api/replySubmit.php",
              data:data
    
          }).then((e)=>{
              if(e.data.ret_code === "0000"){
                rerender();
                  localStorage.setItem("replyId",e.data.reply_id);
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
      data.append("community_id",window.location.search.substring(4));
      data.append("type","update");
      data.append("target","community");
      try{
          await axios({
              method:"post",
              url : "https://www.proveit.co.kr/api/replySubmit.php",
              data:data
    
          }).then((e)=>{
              if(e.data.ret_code === "0000"){
                rerender();
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
      data.append("community_id",window.location.search.substring(4));
      data.append("type","delete");
      data.append("target","community");
      try{
          await axios({
              method:"post",
              url : "https://www.proveit.co.kr/api/replySubmit.php",
              data:data
    
          }).then((e)=>{
              
              if(e.data.ret_code === "0000"){
                rerender();
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

  // useEffect(()=>{
  //     setModifyText(item.reply);
  // },[])
  return(
      <div id={item.id} style={{position:"relative"}}
       className={item.depth==="0"?"product_item_reply":"product_item_reply_depth"}>
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
          <div>
              <div style={{display:"flex"}}>
              <Link to={item.user_email===localStorage.getItem("email")?`/profile`:`/anotheruserinfo?${item.user_id}`}><div style={{fontWeight:"bold",marginBottom:'8px',height:"14px",lineHeight:"14px",marginRight:"4px",fontSize:'14px',color:"#505050"}}>{item.nick}</div></Link>
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
                      }else{
                          setLoginWindow(true);
                      }
                  }}>남기기</div>
              </div>}
          </div>

      </div>
  )
}

const CommunityListRender=({item,categoryState})=>{
    const iconImg=(item)=>{
      let iconImg;
      if(item.category ==="궁금합니다"){
        iconImg= icon_community_category_2;
      }else if(item.category ==="피드백을 부탁드립니다"){
        iconImg= icon_community_category_3;
      }else if(item.category ==="도와주세요"){
        iconImg= icon_community_category_4;
      }
      return iconImg;
    }
    let icon = iconImg(item);
    useEffect(()=>{
      if(categoryState===0){

      }
    },[categoryState])

    return(
    <>
     {item.id !==window.location.search.substring(4)&&<div style={{width:"624px",height:"188px",marginBottom:"8px"}}>
        <Link to={`/communityitem?id=${item.id}`}>
        <div className="community_item">
          <div className="community_item_header"
          >
            <div style={{
              width:"40px",
              height:"40px",
              marginRight:"17px",
              backgroundImage:`url(${item.thumbnail})`,
              backgroundRepeat:"no-repeat",
              backgroundPosition:"center",
              borderRadius:"50%",
              backgroundColor:"#000",
              }}></div>
            <div>{item.nick}</div>
          </div>
          <div className="community_item_title">{item.title}</div>
          <ReactQuill className="community_item_text"
              placeholder="내용을 입력해주세요."
              value={item.contents}
              readOnly
              style={{height:"32px",backgroundColor:"transparent"}} theme=""></ReactQuill>
          <div className="community_item_footer">
            <div style={{width:"16px",height:"16px",backgroundImage:`url(${icon_like})`,backgroundPosition:"center"}}></div>
            <div style={{width:"40px",height:"100%",lineHeight:"16px",fontSize:"14px",textAlign:"center",color:"#505050",fontWeight:"700"}}>{item.like_count}</div>
            <div style={{width:'12px',height:'12px',backgroundImage:`url(${icon})`,marginRight:'8px',backgroundSize:"cover"}}></div>
            <div style={{marginRight:"4px"}}>{item.category}</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{marginRight:"4px"}}>{item.ago_time}</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{color:"#9C31C6"}}>{`${item.reply_count}개의 댓글`}</div>
          </div>
        </div>
      </Link>
        
      </div>}
    </>
    )
  }

const Body =({setLoginWindow,modal,setModal})=>{
    const [community,setCommunity] = useState(
        {
        id:0,
        nick:"dkdkdk",
        title:"1,000명 까지 사용자를 모으는 데 가장 중요한 것은 무엇이라고 생각하시나요?",
        contents:"커뮤니티 내에서는 상대방을 배려하는 태도를 갖추어 주세요. 서로 비난하고 스타트업과 서비스에 관해 질문을 하거나 받거나, 노하우와 정보를 공유하거나 치열하게 토론하거나. 이런 것들을 합니다.",
        like_count:0,
        reply_count:0,
        thumbnail:"",
        ago_time:"",
        like_m:0}
    );
    const [communityList,setCommunityList] = useState([

    ])

    const [replyList,setReplyList] = useState([]);
    const currentComment= useRef("");
    const [replyState,setReplyState] =useState(true);
    const [delWindow,setDelWindow] = useState(false);
  
    const replyAddApi = async()=>{
        var data = new FormData();
        data.append('parent_id',"");
        data.append('reply', currentComment.current);
        data.append('user_email',localStorage.getItem("email"));
        data.append('nick',JSON.parse(localStorage.getItem("userInfo")).nick);
        data.append('hash', localStorage.getItem("hash"));
        data.append("community_id",window.location.search.substring(4));
        data.append("target","community");
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/replySubmit.php",
                data:data
    
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    localStorage.setItem("replyId",e.data.reply_id);
                    rerender();
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
        data.append("community_id",window.location.search.substring(4));
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
        data.append("target","community");
        data.append("community_id",window.location.search.substring(4));
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/productLike.php",
                data:data
        
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    communityItemGetApi();
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

    const communityItemGetApi = async()=>{
        let data = new FormData();
        data.append("type","view");
        data.append("user_email",localStorage.getItem("email"));
        data.append("hash",localStorage.getItem("hash"));
        data.append("id",window.location.search.substring(4));
            try{
                await axios({
                    method:"post",
                    url : `https://proveit.co.kr/api/community.php`,
                    data
                }).then((e)=>{
                    if(e.data.ret_code === "400"){
                    setCommunity(e.data.view);
                    }
                })
            }catch{

            }
    }

    const communityListGetApi = async()=>{
        let data = new FormData();
        data.append("type","list");
          try{
              await axios({
                  method:"post",
                  url : `https://proveit.co.kr/api/community.php`,
                  data
              }).then((e)=>{
                  if(e.data.ret_code === "0000"){
                    setCommunityList(e.data.list);
                  }
              })
          }catch{
        
          }
        }

    const communityItemDelApi = async()=>{
        let data = new FormData();
        data.append("type","delete");
        data.append("user_email",localStorage.getItem("email"));
        data.append("hash",localStorage.getItem("hash"));
        data.append("id",window.location.search.substring(4));
        try{
            await axios({
                method:"post",
                url : `https://proveit.co.kr/api/community.php`,
                data
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    const alink = document.createElement("a");
                    alink.href = '/community';
                    alink.click();
                }
            })
        }catch{
        
        }
    }

    const CommunityRender=({community,communityList,rerender})=>{

    return(
        <div>
        <div className="community_item_detail">
            <div className="community_item_detail_header">
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center"}}>
                <div style={{
                    width:"40px",
                    height:"40px",
                    marginRight:"17px",
                    backgroundImage:`url(${community.thumbnail})`,
                    backgroundRepeat:"no-repeat",
                    backgroundPosition:"center",
                    borderRadius:"50%",
                    backgroundSize:"cover"}}></div>
                <div>{community.nick}</div>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                {(JSON.parse(window.localStorage.getItem("userInfo"))&&(community.user_id ===JSON.parse(window.localStorage.getItem("userInfo")).u_id))&&
                <div style={{display:"flex",alignItems:"center"}}>
                <div className="btn_textBtn" style={{marginRight:"8px"}}
                onClick={()=>{setDelWindow(true);}}>삭제</div>
                <div className="btn_one" style={{width:"72px",height:"32px",marginRight:"8px"}}
                onClick={()=>{
                    const alink = document.createElement("a");
                    alink.href=`/community_modify?id=${community.id}`;
                    alink.click();
                }}>수정</div>
                </div>
                }
                <div className="btn_six" style={{
                    width:"80px",
                    height:"32px",
                    fontWeight:community.like_m==="1"&&"700",
                    color:community.like_m==="1"&&"#9C31C6",
                    border:community.like_m==="1"&&"1px solid #9C31C6"}}
                onClick={()=>{
                    if(window.localStorage.getItem("userInfo")){
                        likeApi();
                    }else{
                        setLoginWindow(true);
                    }}}>
                    <div style={{backgroundImage:`url(${icon_community_likeIcon})`,width:'14px',height:'14px',marginRight:"4px"}}></div>
                    <div>추천</div>
                </div>
                </div>
            </div>
            <div className="community_item_detail_title">{community.title}</div>
            </div>
            <ReactQuill className="community_item_detail_text"
                value={community.contents}
                readOnly
                style={{backgroundColor:"transparent"}} theme=""></ReactQuill>
            <div className="community_item_detail_footer">
            <div style={{width:"16px",height:"16px",backgroundImage:`url(${icon_like})`,backgroundPosition:"center"}}></div>
            <div style={{width:"40px",height:"100%",lineHeight:"16px",fontSize:"14px",textAlign:"center",color:"#505050",fontWeight:"700"}}>{community.like_count}</div>
            {community.category==="궁금합니다"&&<div style={{width:'12px',height:'12px',backgroundImage:`url(${icon_community_category_2})`,marginRight:'8px',backgroundSize:"cover"}}></div>}
            {community.category==="피드백을 부탁드립니다"&&<div style={{width:'12px',height:'12px',backgroundImage:`url(${icon_community_category_3})`,marginRight:'8px',backgroundSize:"cover"}}></div>}
            {community.category==="도와주세요"&&<div style={{width:'12px',height:'12px',backgroundImage:`url(${icon_community_category_4})`,marginRight:'8px',backgroundSize:"cover"}}></div>}
            <div style={{marginRight:"4px"}}>{community.category}</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{marginRight:"4px"}}>{community.ago_time}</div>
            <div style={{marginRight:"4px"}}>·</div>
            <div style={{color:"#9C31C6"}}>{`${community.reply_count}개의 댓글`}</div>
            </div>
        </div>
            <div className="community_item_reply_length">댓글({replyList.length})</div>
            <div className="community_item_comment">
                <div className="community_item_reply_list">
                    {replyList.map((item)=>(<CommentRender key={item.id} rerender={rerender} community={community} modal={modal} setModal={setModal} item={item}></CommentRender>))}
                </div>
            <div className="product_item_comment_sort">
                <div className="product_item_comment_submit" style={{border:"none"}}>
                    <div style={{
                        width:"40px",
                        height:"40px",
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
                        <div>
                            <ReactQuill className="quillInput product_item_comment_input" theme="" placeholder="의견이나 궁금한 점을 남겨보세요"
                            value={currentComment.current}
                            onChange={(e)=>{currentComment.current=e;console.log(e);}}></ReactQuill>
                            {replyState&&<div style={{marginBottom:"24px"}}></div>}
                            {!replyState&&<div style={{color:"#ea4335",fontSize:'14px',marginTop:"8px",marginBottom:'16px',height:'14px',lineHeight:"14px"}}>내용을 입력해 주세요.</div>}
                    </div>
                    <div className="btn_one product_item_comment_submitbtn"
                    onClick={()=>{
                        if(localStorage.getItem("hash")){
                            replyAddApi();
                            currentComment.current="";
                        }else{
                            setLoginWindow(true);
                        }
                    }}>남기기</div>
                </div>              
            </div>
            </div>
        {delWindow&&<div style={{width:"100vw",height:"100vh",position:"fixed",backgroundColor:"rgba(0,0,0,0.7)",top:0,left:0,zIndex:9999,display:"flex",justifyContent:"center"}}>
            <div style={{width:"336px",height:"184px",padding:"32px 44px 32px 44px",backgroundColor:"#fff",marginTop:"180px"}}>
                <div style={{width:"100%",textAlign:"center",height:"16px",marginBottom:"16px",fontWeight:"bold"}}>토론 삭제</div>
                <div style={{width:"100%",textAlign:"center",height:"23px",marginBottom:"25px",fontSize:'13px',lineHeight:"23px"}}>토론을 삭제하시겠습니까?</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div className="btn_two" style={{width:"120px",height:'40px'}} onClick={()=>{setDelWindow(false);}}>취소</div>
                <div className="btn_one" style={{width:"120px",height:'40px'}} onClick={()=>{communityItemDelApi();}}>삭제합니다.</div>
                </div>
            </div>
        </div>}
        <div style={{fontWeight:"700",color:"#505050",marginBottom:"16px",marginTop:"40px"}}>커뮤니티의 다른 글</div>
        {communityList.map((item)=>(<CommunityListRender item={item}></CommunityListRender>))}
        </div>
    )
    }

    const rerender=()=>{
        replayListApi();
        communityItemGetApi();
    }

    useEffect(()=>{
        rerender();
        communityListGetApi();
        window.scrollTo(0,0);
    },[window.location.search])

  return(
      <div id="pageBody" className="blogMain_body">
          <div className="community_header">
              <div className="community_title">커뮤니티<div className="blogMain_title_icon" style={{backgroundImage:`url(${icon_community_title_icon})`}}></div></div>
          </div>
          <div className="community_contents">
              <CommunityRender community={community} communityList={communityList} rerender={rerender}></CommunityRender>
              <RightBar setLoginWindow={setLoginWindow}></RightBar>
          </div>
      </div>
  )
}

const CommunityItem = ()=>{
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
      {/* <Helmet>
        <title>리뷰 중독자 | 프루브잇 - 되는 서비스들의 런칭 플랫폼</title>
        <meta
          name="description"
          content="좋은 서비스는 직접 써보고 리뷰합니다."
          data-react-helmet="true"
        />
      </Helmet> */}
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

export default CommunityItem;