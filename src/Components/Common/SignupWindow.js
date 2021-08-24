import React from 'react';
import icon_logo from '../../image/logo.svg';
import googleSign from '../../image/googleSign.svg';
import googleIcon from '../../image/googleIcon.png';
import GoogleLogin from 'react-google-login';

const SignupWindow = ({responseGoogle,setSignUpWindow})=>{
  return(
       <div 
      className="modal_background"
    onClick={(e)=>{setSignUpWindow(false);e.stopPropagation();}}>
      <div className="modal_login"
        onClick={(e)=>{setSignUpWindow(true);e.stopPropagation();}}>
          <div style={{height:'23px',lineHeight:"23px",fontSize:"32px",fontWeight:'bold',marginBottom:"40px"}}>시작하기</div>
          <div style={{lineHeight:"32.4px",textAlign:"center",marginBottom:"25px",fontSize:18}}>
            내가 만든 서비스에 관해 더 많은 사람들과 이야기를 나누세요.<br/>
            간단하게 가입 할 수 있습니다.
          </div>
          <div style={{position:"relative",width:"256px",height:"56px",display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"24px"}}>
              <GoogleLogin
                    clientId='148840721751-8otnv8h8pcuabmilq8mdv9ungtmohatc.apps.googleusercontent.com'
                    buttonText=""
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
              />
              <div id="login_btn" className="btn_google" 
                onClick={(e)=>{
                  if(e.target.id ==="login_btn"){
                    e.target.parentNode.childNodes[0].click();
                  }else{
                    e.target.parentNode.parentNode.childNodes[0].click();
                  }
                }}>
                <div id="login_btn_icon" style={{backgroundImage:`url(${googleIcon})`,width:"24px",height:"24px",marginRight:"8px"}}></div>
                <div id="login_btn_text"style={{width:"96px",height:"20px"}} >구글 회원가입</div>
              </div>
          </div>
          <div style={{textAlign:"center",fontSize:14,color:"#a0a0a0"}}>
          네이버, 카카오톡 로그인은 곧 지원됩니다.
          </div>
      </div>
    </div>
  )
}

export default SignupWindow;