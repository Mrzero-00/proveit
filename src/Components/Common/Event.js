import React, {useState } from 'react';


import axios from 'axios';
import Header from './Header';
import LoginWindow from './LoginWindow';
import SignupWindow from './SignupWindow';
import { useEffect } from 'react';

const Body = ({setSignUpWindow})=>{
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return(
        <div id="pageBody" style={{width:"100%",display:"flex",justifyContent:"center"}}>
            <div className="event_contents">
                <div className="event_header">
                    <div className="event_coffe_gif"></div>
                    <h2 className="event_title">커피라도 한 잔<br/>하시면서</h2>
                    <div className="event_subtitle">
                        <div></div>
                        <div>커뮤니티에 참여하고 한 달치 커피를 받으세요.</div>
                    </div>
                </div>
                <div className="event_body">
                    <h3 className="event_body_h3">매일 획득한 커뮤니티 포인트에 따라 한달치 커피를 지원합니다.</h3>
                    <h4 className="event_body_h4">
                    프루브잇 커뮤니티에 참여하여 한 달 동안 가장 많은 포인트를 획득한 회원에게 따뜻한 커피를 지원합니다. 
                    포인트는 게시글을 올리거나 댓글을 다는 등 다양한 방법으로 획득할 수 있습니다. 
                    포인트는 {"<커피 한 잔>"}프로그램 외에도 향후 스타트업과 메이커의 제작 활동을 돕는 다양한 방식으로 확장하여 활용될 예정입니다. 
                    </h4>
                    
                    <h4 className="event_body_join_title">참여방법</h4>
                    <ul className="event_body_join">
                        <li>회원 가입 후 프루브잇 커뮤니티에 참여하여 포인트를 획득합니다.</li>
                        <li>매달 1일, 전월 한 달 동안 획득한 포인트를 합산해 가장 많은 포인트를 획득한 상위 3팀(혹은 개인)에 약 한 달치 커피 쿠폰 지원 (20만원 상당의 스타벅스 e-Gift Card)</li>
                        <li>자세한 프루브 포인트 획득 방법은 아래를 참조해주세요.</li>
                    </ul>

                    <h4 className="event_body_info_title">안내사항</h4>
                    <ul className="event_body_info">
                        <li>포인트 순위는 ‘누적 포인트’가 아니라 ‘월간 획득 포인트’로 산정합니다.</li>
                        <li>이번 달 내가 획득한 포인트의 상세내역은 마이페이지에서 확인할 수 있습니다. 커뮤니티 가이드라인에 위배되는 게시글을 포함, 무성의한 게시글은 관리자에 의해 삭제될 수 있으며 이때 적립된 포인트는 환수됩니다.</li>
                        <li>{"<커피 한 잔>"}프로그램은 예산 소진시 종료될 수 있습니다.</li>
                    </ul>
                </div>

                <div className="event_body">
                    <h3 className="event_body_h3">커피 쿠폰을 왜 주나요?</h3>
                    <h4 className="event_body_h4">
                     {"<커피 한 잔>"}은 프루브잇이 메이커와 스타트업에게 처음으로 말을 건네는 프로그램입니다. 
                    서비스 개발이 잘 안되고 누군가 내 아이디어를 보고 코웃음 칠 때, 커피 한 잔 사주며 우리의 이야기를 
                    진지하게 들어주던 분들을 떠올리며 {"<커피 한 잔>"}을 준비했습니다. 
                    여러분이 키워주시는 이 작은 커뮤니티가 향후 다양한 방식으로 여러분에게 보답할 수 있도록 많이 참여해주세요.
                    </h4>
                    <div className="btn_event" onClick={()=>{setSignUpWindow(true);}}
                    style={{width:"184px",height:"48px"}}>지금 가입하기</div>
                </div>
                <div className="event_body">
                    <div className="event_coin_gif"></div>
                    <h3 className="event_body_h3">커뮤니티에 참여하고 포인트를 획득하세요</h3>
                    <h4 className="event_body_h4">
                    프루브 포인트는 커뮤니티 참여도에 따라 증가하는 마일리지입니다.<br/>
                    스타트업과 메이커를 지원하는 다양한 프로그램에 참여하기 위해서는 포인트 획득이 필요합니다.<br/>
                    프루브 포인트는 향후 다양한 방식으로 확장하여 활용될 예정입니다.
                    </h4>
                    <div className="btn_event" onClick={()=>{setSignUpWindow(true);}}
                    style={{width:"184px",height:"48px"}}>지금 가입하기</div>
                    <h3 className="event_body_h3">프루브 포인트 소개</h3>
                    <div className="how_to_get_point_list">
                        <div className="get_point_item">
                            <div className="get_point_item_title">회원가입</div>
                            <div className="get_point_item_body">
                                <div className="get_point_item_body_text_item">
                                    <div className="point_icon">·</div>
                                    <div className="get_point_item_body_text">
                                        <div>회원가입시</div>
                                        <b>300포인트 추가</b>
                                    </div>
                                </div>
                                <div className="get_point_item_body_text_item">
                                    <div className="point_icon">·</div>
                                    <div className="get_point_item_body_text">
                                        <div>회원가입시 추천인 ID 입력</div>
                                        <b>
                                            추천인 500포인트 추가,<br/>
                                            가입회원 1,000포인트 추가
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="get_point_item">
                            <div className="get_point_item_title">커뮤니티 참여</div>
                            <div className="get_point_item_body">
                                <div className="get_point_item_body_text_item">
                                    <div className="point_icon">·</div>
                                    <div className="get_point_item_body_text">
                                        <div>출석 로그인</div>
                                        <b>50포인트 추가(1일 1회 로그인시)</b>
                                    </div>
                                </div>
                                <div className="get_point_item_body_text_item">
                                    <div className="point_icon">·</div>
                                    <div className="get_point_item_body_text">
                                        <div>서비스 등록 혹은 소개시</div>
                                        <b>
                                            1,000포인트 추가
                                        </b>
                                    </div>
                                </div>
                                <div className="get_point_item_body_text_item">
                                    <div className="point_icon">·</div>
                                    <div className="get_point_item_body_text">
                                        <div>토른글 등록시</div>
                                        <b>
                                            300포인트 추가
                                        </b>
                                    </div>
                                </div>
                                <div className="get_point_item_body_text_item">
                                    <div className="point_icon">·</div>
                                    <div className="get_point_item_body_text">
                                        <div>댓글 등록시</div>
                                        <b>
                                            50포인트 추가
                                        </b>
                                    </div>
                                </div>
                                <div className="get_point_item_body_text_item">
                                    <div className="point_icon">·</div>
                                    <div className="get_point_item_body_text">
                                        <div>추천 버튼 클릭시(게시글,댓글)</div>
                                        <b>
                                            10포인트 추가
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="get_point_item">
                            <div className="get_point_item_title">마케팅 수신 동의</div>
                            <div className="get_point_item_body">
                                <div className="get_point_item_body_text_item">
                                    <div className="point_icon">·</div>
                                    <div className="get_point_item_body_text">
                                        <div>뉴스레터 구독시</div>
                                        <b>100포인트 추가 (최초 1회)</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Event = ()=>{
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
    <Body 
    setSignUpWindow={setSignUpWindow}
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

export default Event;