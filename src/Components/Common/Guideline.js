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
        <div id="pageBody" style={{backgroundColor:"#000",minHeight:window.innerHeight-120}}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100vw",alignItems:"center",padding:"96px 20px 96px 20px"}}>
                <div className="guideline_page">
                    {/* <div style={{backgroundImage:`url(${logo2})`,width:"160px",height:"66px",backgroundRepeat:"no-repeat",backgroundSize:"cover",marginBottom:"76px"}}></div> */}
                    <div className="guideline_page_text">
                        <div className="guideline_page_highlight">사이트 소개</div>
                        프루브잇 커뮤니티에서 지켜야 할 사항들을 안내합니다. 잘 읽어주시고, 좋은 커뮤니티를 만드는 데 동참해주세요.<br/>
                        이 사이트는 프루브잇팀이 직접 겪은 몇가지 초기 서비스 검증의 어려움을 직접 해결해보고자 만들었습니다.<br/><br/>

                        <li>초기 고객을 모으기가 어렵습니다.</li>
                        <li>유저로부터 생산적인 피드백을 획득하기가 어렵습니다.</li>
                        <li>서비스의 가능성을 검증할 적절한 방법을 찾기 어렵습니다.</li><br/>

                        이러한 고민에 도움이 될 수 있는 가장 좋은 형태가 무엇일까 고민하다가 프로덕트헌트 모델을 생각했습니다.<br/>
                        다만 프로덕트헌트보다는 조금 더 적극적이었으면 좋겠다고 생각했습니다.<br/>
                        그래서 우리는 ‘투자'와 ‘검증'이라는 적극적인 키워드와 방향성을 더했습니다.<br/>
                        이왕 하는거 적극적으로 해보려고 합니다. 커피 쿠폰에서 시드투자를 직접 집행할 수 있을 때까지요.
                    </div>
                    <div className="guideline_page_contents">
                        <div className="guideline_page_highlight">이용 가이드</div>
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>초기 고객을 모으기가 어렵습니다.</div>
                        </div>
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>유저로부터 생산적인 피드백을 획득하기가 어렵습니다.</div>
                        </div>
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>서비스의 가능성을 검증할 적절한 방법을 찾기 어렵습니다.</div>
                        </div>
                    </div>
                    <div className="guideline_page_contents">
                        <div className="guideline_page_highlight">서비스 등록</div>
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>서비스 등록 기능을 통해 직접 만든 제품을 홍보할 수 있습니다.</div>
                        </div>
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>직접 만들지 않은 서비스/제품도 소개할 수 있습니다. 가능하다면 제품을 만든 사람에게 링크를 보내 대화에 참여할 수 있도록 알려주시면 좋습니다.</div>
                        </div>                   
                    </div>
                    <div className="guideline_page_contents">
                        <div className="guideline_page_highlight">등록할 수 있는 서비스/제품</div>
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>사용자가 데스크톱, 스마트폰, 태블릿 등을 활용하여 제품을 바로 사용해볼 수 있는 Tech 제품이 가장 좋습니다.</div>
                        </div>    
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>하지만 스타트업 비즈니스에 Tech 제품만 있는 것은 아닙니다. 
                            사용자가 서비스를 체험해 볼 수 있거나 상세히 알아볼 수 있는 방안을 제시한다면 O2O, 오프라인 비즈니스 등 다양한 스타트업 비즈니스도 등록 가능합니다.</div>
                        </div>    
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>서비스/제품을 체험해 볼 수 있다면 MVP나 베타 버전도 당연히 등록 가능합니다.</div>
                        </div>    
                    </div>
                    <div className="guideline_page_contents">
                        <div className="guideline_page_highlight">등록 불가능한 제품</div>
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>초기 고객을 모으기가 어렵습니다.</div>
                        </div>    
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>불법 사이트 및 서비스, 단순한 읽을거리(블로그-뉴스 등 포함), 하지만 스타트업 비즈니스에 Tech 제품만 있는 것은 아닙니다. 
                                사용자가 서비스를 체험해 볼 수 있거나 상세히 알아볼 수 있는 방안을 제시한다면 O2O, 오프라인 비즈니스 등 다양한 스타트업 비즈니스도 등록 가능합니다.</div>
                        </div>    
                        <div style={{display:"flex",marginLeft:"8px"}}>
                            <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                            <div>서비스/제품을 체험해 볼 수 있다면 MVP나 베타 버전도 당연히 등록 가능합니다.</div>
                        </div>    
                    </div>
                        {/* <div className="guideline_page_contents_item">
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
                        </div>*/}
                </div>
            </div>
        </div>
    )
}

const Guideline = ()=>{
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

export default Guideline;