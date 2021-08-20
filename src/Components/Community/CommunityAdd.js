import axios from 'axios';
import React, { useState } from 'react';
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
    const [communityState,setCommunityState] = useState(
        {
        nick:"",
        title:"",
        text:"",
        like_count:0,
        review_count:0,
        category:""}
    );

    const categoryList = [
        {id:0,text:"선택해주세요",icon:icon_community_category_1},
        {id:1,text:"궁금합니다",icon:icon_community_category_2},
        {id:2,text:"피드백 요청",icon:icon_community_category_3},
        {id:3,text:"기타",icon:icon_community_category_4}
    ]

    const communityAddApi = async()=>{
        let data = new FormData();
        data.append("type","insert");
        data.append("user_email",localStorage.getItem("email"));
        data.append("hash",localStorage.getItem("hash"));
        data.append("title",communityState.title);
        data.append("contents",communityState.text);
        data.append("category",communityState.category);
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

    const CategoryWindow = ({item,categoryNum,setCategoryNum,setCategoryModal,communityState,setCommunityState})=>{
        const [hover,setHover] = useState("");
        return(
            <>
            {item.id>0&&
            <div style={{width:"216px",height:"40px",backgroundColor:(hover===item.id||categoryNum===item.id)&&"rgba(156, 49, 198, 0.1",display:"flex",alignItems:"center",paddingLeft:"16px"}}
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
    console.log(communityState);
  return(
      <div id="pageBody" className="blogMain_body" style={{paddingBottom:"56px"}}
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
                        backgroundSize:"cover",
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
                    value={communityState.text}
                    onChange={(e)=>{setCommunityState({...communityState,text:e})}}
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
                            <div style={{width:"100%"}}>{categoryList[categoryNum].text}</div>
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
                            {categoryModal&&<div style={{position:"absolute",top:"0px",left:"0px",backgroundColor:"#fff",display:"flex",flexDirection:"column",boxShadow:"1px 1px 2px rgba(0,0,0,0.3)"}}>
                                {categoryList.map((item)=>(<CategoryWindow item={item} communityState={communityState} setCommunityState={setCommunityState} setCategoryNum={setCategoryNum} setCategoryModal={setCategoryModal} categoryNum={categoryNum} key={item.id}/>))}
                            </div>}
                    </div>
                </div>
                <div style={{marginTop:'16px',display:"flex",width:"100%",justifyContent:"space-between",alignItems:"center"}}>
                    <Link to="/community"><div className="btn_three" style={{width:"104px",height:'40px',minWidth:"104px",maxWidth:"104px"}}>취소</div></Link>
                    {addState&&<div style={{width:"100%",textAlign:"right",marginRight:"16px",color:"#ea4335",fontSize:'13px'}}>항목을 빠짐없이 입력해 주세요.</div>}
                    <div className="btn_one" style={{width:"104px",height:'40px',minWidth:"104px",maxWidth:"104px"}}
                    onClick={()=>{
                        if(communityState.category!==""&&communityState.title!==""&&communityState.text!==""&&communityState.text!=="<p><br></p>"){
                            communityAddApi();
                            setAddState(false);
                        }else{
                            setAddState(true);
                        }
                    }}>작성완료</div>
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
      </div>
  )
}

const CommunityAdd = ()=>{
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

export default CommunityAdd;