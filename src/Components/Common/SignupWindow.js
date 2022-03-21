import React from 'react';
import googleIcon from '../../image/googleIcon.png';
import kakaoIcon from '../../image/kakaoIcon.svg';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';

const SignupWindow = ({responseGoogle,setSignUpWindow,responseKakao})=>{

  const jsKey = "f803730b31a04aa1ffd90e1fbd5db921";

  if (!window.Kakao.isInitialized()) {
    // JavaScript key를 인자로 주고 SDK 초기화
    window.Kakao.init(jsKey);
    // SDK 초기화 여부를 확인하자.
  }
  // if (window.navigator) {
  //     isMobile = filter.indexOf(navigator.platform.toLowerCase()) < 0;
  // }
  console.log(navigator.userAgent.includes("wv"));
  return(
       <div 
      className="modal_background"
    onClick={(e)=>{setSignUpWindow(false);e.stopPropagation();}}>
      <div className="modal_login"
        onClick={(e)=>{setSignUpWindow(true);e.stopPropagation();}}>
          <div style={{height:'23px',lineHeight:"23px",fontSize:"32px",fontWeight:'bold',marginBottom:"24px",color:"#505050"}}>시작하기</div>
          <div style={{lineHeight:"32.4px",textAlign:"center",marginBottom:"40px",fontSize:"14px",color:"#505050"}}>
            내가 만든 서비스에 관해 더 많은 사람들과 이야기를 나누세요.<br/>
            간단하게 가입 할 수 있습니다.
          </div>
          <div style={{
            position:"relative",
            width:"256px",
            height:"56px",
            display:/wv/i.test(navigator.userAgent)?"none":"flex",
            justifyContent:"center",alignItems:"center",marginBottom:"8px"}}>
              <GoogleLogin
                    clientId='148840721751-8otnv8h8pcuabmilq8mdv9ungtmohatc.apps.googleusercontent.com'
                    buttonText=""
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  
              />
              <div id="login_btn" 
                className="btn_google" 
                onClick={(e)=>{
                  if(e.target.id ==="login_btn"){
                    e.target.parentNode.childNodes[0].click();
                  }else{
                    e.target.parentNode.parentNode.childNodes[0].click();
                  }
                }}
                >
                <div id="login_btn_icon" style={{backgroundImage:`url(${googleIcon})`,width:"24px",height:"24px",marginRight:"40px",marginLeft:"17px"}}></div>
                <div id="login_btn_text"style={{width:"96px",height:"20px"}} >구글 회원가입</div>
              </div>
          </div>

          <div style={{position:"relative",width:"256px",height:"56px",display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"40px"}}>
              <KakaoLogin
                    token='23171cd8148017846b0514bae6409fc6'
                    buttonText=""
                    onSuccess={responseKakao}
                    onFail={responseKakao}
                    needProfile
                    onLogout={console.info}
                    style={{opacity:0}}
                  
              />
              <div id="login_btn" 
                className="btn_kakao" 
                onClick={(e)=>{
                  if(e.target.id ==="login_btn"){
                    e.target.parentNode.childNodes[0].click();
                  }else{
                    e.target.parentNode.parentNode.childNodes[0].click();
                  }
                }}
                >
                <div id="login_btn_icon" style={{backgroundImage:`url(${kakaoIcon})`,width:"24px",height:"21px",marginRight:"32px",marginLeft:"18px"}}></div>
                <div id="login_btn_text"style={{width:"120px",height:"20px"}} >카카오 회원가입</div>
              </div>
          </div>
          
          
          
          <div style={{textAlign:"center",fontSize:14,color:"#a0a0a0"}}>
          네이버 로그인은 곧 지원됩니다.
          </div>
      </div>
    </div>
  )
}

export default SignupWindow;