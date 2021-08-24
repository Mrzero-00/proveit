import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../Common/Header';
import LoginWindow from '../Common/LoginWindow';
import SignupWindow from '../Common/SignupWindow';

import icon_like from '../../image/likeIcon.svg';
import icon_community_category_1 from '../../image/icon_community_category_1.png';
import icon_community_category_2 from '../../image/icon_community_category_2.png';
import icon_community_category_3 from '../../image/icon_community_category_3.png';
import icon_community_category_4 from '../../image/icon_community_category_4.png';
import icon_community_title_icon from '../../image/icon_community_title_icon.png';
import ReactQuill from 'react-quill';

const Body =()=>{
    const [categoryModal,setCategoryModal] = useState(false);
    const [categoryNum,setCategoryNum] = useState(0);
    const [addState,setAddState] = useState(false);
    const [render,setRender] = useState(false);
    const [communityState,setCommunityState] = useState({
        category: "피드백을 부탁드립니다",
        contents: "<p>ㅇㅇㅇㅇㅇ</p>",
        id: "16",
        thumbnail: "/api/uploads/user/570.jpg",
        title: "ㅇㅇ",
    }
    );

    const categoryList = [
        {id:0,text:"선택해주세요",icon:icon_community_category_1},
        {id:1,text:"궁금합니다",icon:icon_community_category_2},
        {id:2,text:"피드백 요청",icon:icon_community_category_3},
        {id:3,text:"기타",icon:icon_community_category_4}
    ]
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
                        switch(e.data.view.category){
                            case "궁금합니다":
                                setCategoryNum(1);
                                break;
                            case "피드백 요청":
                                setCategoryNum(2);
                                break;
                            case "기타":
                                setCategoryNum(3);
                                break;
                            default:
                                break;
                        }
                        setCommunityState(e.data.view);
                    }
                }).then(()=>{
                    setRender(true);
                })
            }catch{

            }
    }


    const CategoryWindow = ({item,categoryNum,setCategoryNum,setCategoryModal,communityState,setCommunityState})=>{
        const [hover,setHover] = useState("");
        return(
            <>
            {item.id>0&&
            <div style={{width:"216px",height:"40px",backgroundColor:hover===item.id&&"#e5e5e5",display:"flex",alignItems:"center",paddingLeft:"16px"}}
            onMouseOver={()=>{setHover(item.id);}}
            onMouseLeave={()=>{setHover("");}}
            onClick={(e)=>{setCategoryNum(item.id);setCategoryModal(false);setCommunityState({...communityState,category:item.text});e.stopPropagation();}}>
                <div style={{
                    width:"16px",
                    height:"16px",
                    minWidth:"16px",
                    minHeight:'16px',
                    backgroundSize:"cover",
                    backgroundPosition:"center",
                    backgroundImage:`url(${item.icon})`,
                    marginRight:"8px"}}></div>
                <div>{item.text}</div>
            </div>
            }
            </>
        )
    }

    const communityModifyApi = async()=>{
        let data = new FormData();
        data.append("type","update");
        data.append("user_email",localStorage.getItem("email"));
        data.append("hash",localStorage.getItem("hash"));
        data.append("title",communityState.title);
        data.append("contents",communityState.contents);
        data.append("category",communityState.category);
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

    useEffect(()=>{
        communityItemGetApi();
    },[])
  return(

      <>
      {render&&<div id="pageBody" className="blogMain_body" style={{paddingBottom:"56px"}}
      onClick={()=>{setCategoryModal(false)}}>
          <div className="community_header_write">
              <div className="community_title">커뮤니티<div className="blogMain_title_icon" style={{backgroundImage:`url(${icon_community_title_icon})`}}></div></div>
          </div>
          <div className="community_body">
            <div className="community_add_body">
                <div className="community_add_window">
                    <div className="community_add_header"
                    style={{marginBottom:"18px"}}>
                        <div style={{
                        width:"40px",
                        height:"40px",
                        marginRight:"17px",
                        backgroundImage:`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`,
                        backgroundRepeat:"no-repeat",
                        backgroundPosition:"center",
                        borderRadius:"50%",}}></div>
                        <div>{JSON.parse(localStorage.getItem("userInfo")).nick}</div>
                    </div>
                    <div className="community_item_add_title">제목</div>
                    <input className="community_item_add_input" placeholder="제목을 입력해 주세요."
                    value={communityState.title}
                    onChange={(e)=>{if(e.target.value.length<51){
                        setCommunityState({...communityState,title:e.target.value})
                    }}}
                    style={{height:"44px",marginBottom:"18px"}}></input>
                    <div className="community_item_add_title">내용</div>
                    <ReactQuill className="community_item_add_input"
                    placeholder="내용을 입력해주세요."
                    value={communityState.contents}
                    onChange={(e)=>{setCommunityState({...communityState,contents:e})}}
                    style={{height:"320px",marginBottom:"24px",overflow:"auto"}} theme=""></ReactQuill>
                    <div className="community_item_add_title">카테고리</div>
                    <div className="community_item_add_input"
                        style={{height:"40px",display:"flex",width:"216px",justifyContent:"space-between",cursor:"pointer",position:"relative",alignItems:"center",fontSize:'14px'}}
                        onClick={(e)=>{setCategoryModal(!categoryModal);e.stopPropagation();}}>
                            <div style={{
                                width:"16px",
                                height:"16px",
                                minWidth:"16px",
                                minHeight:'16px',
                                backgroundSize:"cover",
                                backgroundPosition:"center",
                                backgroundImage:`url(${categoryList[categoryNum].icon})`,
                                marginRight:"8px"}}></div>
                            <div style={{width:"100%"}}>{communityState.category}</div>
                            <div style={{
                                width:"16px",
                                height:"16px",
                                minWidth:"16px",
                                minHeight:'16px',
                                backgroundSize:"cover",
                                backgroundPosition:"center",
                                backgroundImage:`url(${icon_like})`,
                                transform:"rotate(180deg)",
                                marginLeft:"8px"}}></div>
                            {categoryModal&&<div style={{position:"absolute",top:"0px",left:"0px",backgroundColor:"#fff",display:"flex",flexDirection:"column"}}>
                                {categoryList.map((item)=>(<CategoryWindow item={item} communityState={communityState} setCommunityState={setCommunityState} setCategoryNum={setCategoryNum} setCategoryModal={setCategoryModal} categoryNum={categoryNum} key={item.id}/>))}
                            </div>}
                    </div>
                </div>
                <div style={{marginTop:'16px',display:"flex",width:"100%",justifyContent:"space-between",alignItems:"center"}}>
                <Link to="/community"><div className="btn_three" style={{width:"104px",height:'40px',minWidth:"104px",maxWidth:"104px"}}>취소</div></Link>
                    {addState&&<div style={{width:"100%",textAlign:"right",marginRight:"16px",color:"#ea4335",fontSize:'13px'}}>항목을 빠짐없이 입력해 주세요.</div>}
                    <div className="btn_one" style={{width:"104px",height:'40px',minWidth:"104px",maxWidth:"104px"}}
                    onClick={()=>{
                        if(communityState.category===""&&communityState.title===""&&communityState.contents==="<p><br></p>"){
                            setAddState(false);
                        }else{
                            communityModifyApi();
                            setAddState(true);
                        }
                    }}>수정 완료</div>
                </div>
            </div>
            <div className="community_rightbar">
                <div className="community_rightbar_item">
                    자신이 만든 서비스에 관해 질문을 하거나 받거나, 
                    스타트업/서비스 관련 노하우와 정보를 공유하거나 토론할 수 있습니다. 
                    커뮤니티 내에서는 상대방을 배려하는 태도를 보여주세요. 👍
                </div>
            </div>
          </div>
      </div>}
      </>
  )
}

const CommunityModify = ()=>{
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

    const scrollEvent=(e)=>{
      }
    
      return(
        <div className="contentsBody" style={{
            width:"100%",
            height:window.innerHeight,
          }}
      onClick={()=>{setModal(false);}}
      onScroll={scrollEvent}>
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

export default CommunityModify;