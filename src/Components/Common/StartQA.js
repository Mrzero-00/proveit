import React, {useState } from 'react';


import axios from 'axios';
import Header from './Header';
import logo2 from '../../image/logo2.svg';
import LoginWindow from './LoginWindow';
import SignupWindow from './SignupWindow';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Body = ({setLoginWindow})=>{
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return(
        <div id="pageBody" style={{backgroundColor:"#FFFEFC",height:"100%",minHeight:window.innerHeight-96}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",alignItems:"center",padding:"0px 20px "}}>
                {window.location.search.substring(1)==="yes"&&<div className="QA_page">
                    <div className="QA_title">
                        잘 오셨습니다<br/>
                        더 많은 사람들에게 서비스를 소개해주세요
                    </div>
                    <div className="QA_contents">
                        <div className="QA_contents_title">
                        서비스가 완성된 상태라면 💪
                        </div>
                        <div className="QA_contents_text">
                        프루브잇 피드에 서비스를 등록하고<br/>
                        더 많은 사람들에게 어떤 서비스인지 소개해주세요.<br/>
                        프루브잇에는 새로운 서비스에 관심이 많은 사람들이 모여있어요.<br/>
                        커뮤니티에 적극적으로 참여하실수록<br/>
                        더욱 많은 사람들에게 서비스가 도달하게 돼요!
                        </div>
                        <button className="QA_contents_btn"
                        onClick={()=>{
                            if(localStorage.getItem("hash")){
                                const alink = document.createElement("a");
                                alink.href="/registerproduct";
                                alink.click();
                            }else{
                                setLoginWindow(true);
                            }
                        }}>서비스 등록하기</button>
                    </div>
                    <div className="QA_contents">
                        <div className="QA_contents_title">
                        아직 만들고 있는 중이라면 👌
                        </div>
                        <div className="QA_contents_text">
                        토론-토에서 도움이 될만한 토론을 만들어보세요.<br/>
                        서비스 개발에 관한 이야기를 나누고 도움을 구할 수 있어요.<br/>
                        좋은 이야기거리는 더 많은 사람들에게 오랫동안 보여집니다.
                        </div>
                        <Link to="/community"><button className="QA_contents_btn">토론-토에 놀러가기</button></Link>
                    </div>
                    <div className="QA_contents">
                        <div className="QA_contents_title">
                        만들었지만 서비스 등록이 쑥쓰럽다면 😭
                        </div>
                        <div className="QA_contents_text">
                        괜찮아요. 다들 그래요.<br/>
                        프루브잇은 따-뜻-한 커뮤니티를 지향합니다.<br/>
                        그래도 공유해보시는 걸 추천드려요.<br/>
                        어쩌면 예상치 못한 서비스 개선 아이디어를 얻을지도?
                        </div>
                        <button className="QA_contents_btn"
                        onClick={()=>{
                            const alink = document.createElement("a");
                            alink.href="/product?productnum=57";
                            alink.click();
                        }}>쑥쓰럽지만 업로드한 사례 보기</button>
                    </div>
                </div>}
                {window.location.search.substring(1)==="no"&&<div className="QA_page">
                    <div className="QA_title">
                    그렇다면 요즘 어떤 서비스가 있는지 탐색하고,<br/>
                    커뮤니티에서 영향력을 발휘해보세요
                    </div>
                    <div className="QA_contents">
                        <div className="QA_contents_title">
                        좋아하는 서비스가 있다면 소개해주세요 💪
                        </div>
                        <div className="QA_contents_text">
                        꼭 내가 직접 만든 서비스가 아니어도 괜찮아요.<br/>
                        잘 사용하고 있는 서비스나 잘될 것 같은 서비스를 소개해주세요.<br/>
                        그리고 추천 버튼을 눌러주세요.
                        </div>
                        <button className="QA_contents_btn"
                        onClick={()=>{
                            if(localStorage.getItem("hash")){
                                const alink = document.createElement("a");
                                alink.href="/registerproduct";
                                alink.click();
                            }else{
                                setLoginWindow(true);
                            }
                        }}>서비스 등록하기</button>
                    </div>
                    <div className="QA_contents">
                        <div className="QA_contents_title">
                        커뮤니티에 참여해서 경험을 공유해주세요 🎙
                        </div>
                        <div className="QA_contents_text">
                        누군가는 여러분의 도움을 기다릴지도 모릅니다.<br/>
                        메이커들이 더 나은 서비스를 만들 수 있도록 피드백을 남겨주세요.<br/>
                        프루브잇 커뮤니티에 참여하여 영향력을 높여보세요.
                        </div>
                        <Link to="/community"><button className="QA_contents_btn">토론-토에 놀러가기</button></Link>
                    </div>
                </div>}
            </div>
        </div>
    )
}

const StartQA = ()=>{
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
    <div className="contentsBody" style={{
        width:"100%",
        minHeight:window.innerHeight,
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
    <Body setLoginWindow={setLoginWindow}></Body>
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

export default StartQA;