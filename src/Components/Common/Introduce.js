import React, {useState } from 'react';


import axios from 'axios';
import Header from './Header';
import logo2 from '../../image/logo2.svg';
import LoginWindow from './LoginWindow';
import SignupWindow from './SignupWindow';
import { useEffect } from 'react';

const Body = ()=>{
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return(
        <div id="pageBody" style={{backgroundColor:"#000",width:"100vw"}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",alignItems:"center",padding:"96px 20px 96px 20px"}}>
                <div className="introduce_page">
                    <div style={{backgroundImage:`url(${logo2})`,width:"160px",height:"66px",backgroundRepeat:"no-repeat",backgroundSize:"cover",marginBottom:"76px"}}></div>
                    <div className="introduce_page_text">
                    프루브잇은 이제 막 세상에 나온, 혹은 곧 세상에 나올 제품과 서비스를 소개하고 공유하는 온라인 커뮤니티입니다. <br/><br/>

                    우리는 ‘최소 기능 제품(MVP; Minimum Viable Product)을 개발하고 초기 100명의 열정적인 팬을 만들라’라는 스타트업 격언을 다양한 곳에서 듣습니다. 
                    하지만 100명의 팬을 만드는 것이 결코 쉬운 일은 아니죠. 대부분의 서비스는 어느 정도의 고객이 모일 때까지 ‘콜드스타트’ 문제를 겪기 마련입니다. 
                    프루브잇은 이 문제를 조금이라도 해소하고자 시작된 커뮤니티입니다.<br/><br/>

                    프루브잇은 서비스 소개 및 추천, 토론 게시판, 랜딩페이지 제작 기능 등을 통해 메이커나 창업자가 아이디어를 검증하고, 
                    서비스 제작 초기부터 유저 피드백과 함께 성장하며 브랜드 스토리를 쌓아나갈 수 있는 커뮤니티가 되고자 합니다.<br/><br/>

                    <span className="introduce_page_highlight">서비스 소개하기</span><br/>
                    자신이 직접 만든 프로덕트를 등록하는 것은 물론이고, 자신이 평소에 애용하는 서비스를 등록하여 더 많은 사람들에게 소개할 수 있습니다.<br/><br/>

                    <span className="introduce_page_highlight">커뮤니티에 참여하기</span><br/>
                    아이디어를 기획하고 프로덕트를 제작하다 보면 생기는 이런 저런 고민들을 나눠주세요. 좋은 정보가 있다면 공유해주셔도 좋아요.<br/><br/>

                    <span className="introduce_page_highlight">오픈 아이디어(Coming soon)</span><br/>
                    8조원 가치의 기업이 된 토스도 아이디어를 설명한 랜딩페이지 하나로 시작했습니다. 우리도 그렇게 시작할 수 있어요.<br/><br/><br/>


                    되는 서비스들의 런칭 커뮤니티,<br/>
                    프루브잇에 오신 것을 환영합니다.
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

const Introduce = ()=>{
  const [loginWindow,setLoginWindow] = useState(false);
  const [signupWindow,setSignUpWindow] = useState(false);
  const [modal,setModal] = useState(false);
  const [alarmModal,setAlarmModal] = useState(false);
  const [scrollY,setScrollY]=useState(0);
  
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
    console.log(response);
    localStorage.setItem("profile",JSON.stringify({
      type:"google",
      name:profileObj.name,
      imageUrl:profileObj.imageUrl,
      email:profileObj.email
    }));
    localStorage.setItem("token",tokenObj.access_token);
    submitGoogleData(profileObj.givenName,profileObj.email,tokenObj.access_token);
  }

  const responseKakao = (response) => {
    const res = response;
    const profile = res.profile.kakao_account;
    console.log(profile);
    localStorage.setItem("profile",JSON.stringify({
      type:"kakao",
      name:res.profile.kakao_account.profile.nickname,
      imageUrl:"",
      email:profile.email
    }));
    localStorage.setItem("token",res.access_token);
    submitGoogleData(profile.profile.nickname,profile.email,res.access_token);
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
    <div className="contentsBody" style={{
        width:"100%",
      }}
  onClick={()=>{setModal(false);setAlarmModal(false);}}
  >
    <Header 
    setScrollY={setScrollY}
    setLoginWindow={setLoginWindow} 
    loginWindow={loginWindow}
    setSignUpWindow={setSignUpWindow}
    signupWindow={signupWindow}
    modal={modal}
    setModal={setModal}
    alarmModal={alarmModal}
    setAlarmModal={setAlarmModal}
    ></Header>
    <Body></Body>
    {loginWindow&&<LoginWindow 
    responseGoogle={responseGoogle}
    setLoginWindow={setLoginWindow}
    responseKakao={responseKakao}
    ></LoginWindow >}

    {signupWindow&&<SignupWindow 
    responseGoogle={responseGoogle}
    setSignUpWindow={setSignUpWindow}
    responseKakao={responseKakao}
    ></SignupWindow>}
 
  </div>  
  )
}

export default Introduce;