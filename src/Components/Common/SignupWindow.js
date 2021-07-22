import React, { useEffect, useState } from 'react';
import icon_logo from '../../image/logo.svg';
import googleSign from '../../image/googleSign.svg';
import GoogleLogin from 'react-google-login';

const SignupWindow = ({responseGoogle,setSignUpWindow})=>{
  return(
       <div 
      className="modal_background"
    onClick={(e)=>{setSignUpWindow(false);e.stopPropagation();}}>
      <div className="modal_login"
        onClick={(e)=>{setSignUpWindow(true);e.stopPropagation();}}>
          <div style={{width:"90px",height:"16px",minHeight:"16px",minWidth:"90px",backgroundImage:`url(${icon_logo})`,marginBottom:"32px"}}></div>
          <div style={{height:'23px',lineHeight:"23px",fontSize:"20px",fontWeight:'bold',marginBottom:"40px"}}>회원가입</div>
          <div style={{lineHeight:"28.8px",textAlign:"left",marginBottom:"40px"}}>
            <li>서비스를 프루브잇에 소개하고 커뮤니티 피드백을 받아보세요.</li>
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
    </div>
  )
}

export default SignupWindow;