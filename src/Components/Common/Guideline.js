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
        <div id="pageBody" style={{backgroundColor:"#000"}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",alignItems:"center",padding:"96px 20px 96px 20px"}}>
                <div className="guideline_page">
                    <div style={{backgroundImage:`url(${logo2})`,width:"160px",height:"66px",backgroundRepeat:"no-repeat",backgroundSize:"cover",marginBottom:"76px"}}></div>
                    <div className="guideline_page_text" style={{marginBottom:"104px"}}>
                        <div className="guideline_page_highlight">커뮤니티 가이드라인</div>
                        프루브잇 커뮤니티에서 지켜야 할 사항들을 안내합니다.<br/>
                        잘 읽어보시고, 좋은 커뮤니티를 만드는 데 동참해주세요.
                    </div>
                    <div className="guideline_page_contents">
                        <div className="guideline_page_contents_item">
                            <div className="guideline_page_text">
                                <div className="guideline_page_highlight">긍정적이고 진솔한 커뮤니케이션</div>
                                커뮤니티의 건강한 토론과 의견 전달을 방해하고, 회원 간의 감정을 상하게 하는 
                                부정적인 커뮤니케이션은 지양해주세요. 우리가 가진 경험과 역량이 모두 
                                다름을 이해하고, 서로 발전할 수 있도록 긍정적인 커뮤니케이션을 부탁드려요.
                            </div>
                        </div>
                        <div className="guideline_page_contents_item">
                            <div className="guideline_page_text">
                                <div className="guideline_page_highlight">내가 등록한 글과 서비스에 관심을 가져주세요.</div>
                                여러분이 업로드한 서비스에 관심있는 사용자가 
                                제품과 서비스에 관해 질문을 하거나 의견을 줄 수 있습니다. 
                                자주 방문하셔서 대화에 참여해주세요.
                            </div>
                        </div>
                        <div className="guideline_page_contents_item">
                            <div className="guideline_page_text">
                                <div className="guideline_page_highlight">혐오와 차별은 안돼요</div>
                                타인에 대한 위협·모욕·방해·연령·성적 취향·성별·민족·인종·종교  
                                또는 장애에 근거한 고의적인 차별과 혐오 표현이 포함된 서비스 
                                소개나 댓글은 통보 없이 삭제되며 회원 활동이 제제 될 수 있습니다.
                            </div>
                        </div>
                        <div className="guideline_page_contents_item">
                            <div className="guideline_page_text">
                                <div className="guideline_page_highlight">등록 불가능한 서비스</div>
                                아래와 같은 서비스는 관리자 확인 후 통보 없이 삭제 될 수 있습니다.
                                1) 불법이나 사행성 서비스
                                2)단순 상품판매 페이지(ex: 쿠팡 상품 페이지)
                                3) 행사 이벤트 등 모집 페이지
                                4) 뉴스 기사, 블로그 포스트
                            </div>
                        </div>
                    </div>
                    <div className="guideline_page_text">
                        <div className="guideline_page_text">
                            <div className="guideline_page_highlight">자주 묻는 질문</div>
                            <br/>
                            <div style={{color:"#A1A1A1",}}>Q. 뉴스레터를 개설했어요. 소개해도 되나요?</div>
                            <div style={{color:"#fff"}}>A. 됩니다. 어떤 뉴스레터 서비스인지 잘 소개해주세요.</div>
                            <br/>
                            <div style={{fontSize:18,color:"#fff"}}>*FAQ는 계속 업데이트 됩니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Guideline = ()=>{
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

  const scrollEvent=(e)=>{
    // console.dir(e.target);
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
    setSignUpWindow={setSignUpWindow}
    signupWindow={signupWindow}
    modal={modal}
    setModal={setModal}
    ></Header>
    <Body></Body>
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

export default Guideline;