import React, { useEffect, useState } from 'react';

import icon_logo from '../image/logo.svg';
import icon_upBtn from '../image/icon_upBtn.svg';
import icon_like from '../image/likeIcon.svg';
import icon_comment from '../image/commentIcon.svg';
import googleLogin from '../image/googleLogin.svg';
import googleSign from '../image/googleSign.svg';
import intro from '../image/intro.pdf';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Header=({setModal,loginWindow,signupWindow,modal,setLoginWindow,setSignUpWindow})=>{
  const [hover,setHover] = useState(0);
  const [header,setHeader] = useState(0);

  const upBtnMount = ()=>{
      window.addEventListener("scroll",()=>{    
          const scrollPosition = window.scrollY;
          if(scrollPosition>=48&&scrollPosition<=96){
              setHeader(scrollPosition-48);
          }else if(scrollPosition>96){
              setHeader(47);
          }else{
              setHeader(0);
          }
      })
  }

  useEffect(()=>{
      upBtnMount();
  },[])

  const upEvt = ()=>{
      window.scroll({
        behavior:"smooth",
        left:0,
        top:0
      });
  }
  return(
      <>
        <div id="header" style={{width:"100%",height:"48px",backgroundColor:"#fff",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"48px"}}>
            <div style={{width:"1040px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>  
                    <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                    <div>
                {localStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                    <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                    </div>
                }
                {localStorage.getItem("hash")!==null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <Link to="/registerproduct"><div className="btn_textBtn" style={{marginRight:"16px"}}>서비스 등록하기</div></Link>
                    <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${"https://www.proveit.co.kr/"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                    ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                    </div>
                }  
            </div>

            </div>
        </div>
        {(!loginWindow&&!signupWindow)&&<div id="header" style={{width:"100%",height:"48px",backgroundColor:"#fff",position:"fixed",top:"-48px",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"48px",
                              transform:`translate(0,${header}px)`,transition:"0.3s",zIndex:"9999"}}>
          <div style={{width:"1040px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>  
                  <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                  <div>
              {localStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                  <div className="btn_textBtn" style={{marginRight:"16px"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                  <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                  </div>
              }
              {localStorage.getItem("hash")!==null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                  <Link to="/registerproduct"><div className="btn_textBtn" style={{marginRight:"16px"}}>서비스 등록하기</div></Link>
                  <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:localStorage.getItem("userInfo")&&`url(${"https://www.proveit.co.kr/"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                  ,backgroundColor:"#c5c5c5",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                  </div>
              }  
          </div>
          {modal&&<div style={{width:"192px",height:"80px",position:'absolute',backgroundColor:"#fff",right:"0px",top:`${96-header}px`,zIndex:"999"}}>
          <Link to="/profile"><div style={{width:"100%",height:"40px",lineHeight:"40px",paddingLeft:"16px",fontSize:'14px',color:"#505050",backgroundColor:hover===1?"rgba(156, 49, 198, 0.1)":"#fff"}}
          onMouseOver={()=>{setHover(1)}}
          onMouseLeave={()=>{setHover(0)}}>내 프로필</div></Link>
          <div style={{width:"100%",height:"40px",cursor:"pointer",lineHeight:"40px",paddingLeft:"16px",fontSize:'14px',color:"#505050",backgroundColor:hover===2?"rgba(156, 49, 198, 0.1)":"#fff"}}
          onMouseOver={()=>{setHover(2)}}
          onMouseLeave={()=>{setHover(0)}}
          onClick={()=>{
              const alink = document.createElement("a");
              alink.href="/";
              localStorage.clear();
              // alink.click();
              }}>로그아웃</div>
          </div>}
          </div>
      </div>}
          <div className="btn_up" style={{width:"40px",height:"40px",backgroundImage:`url(${icon_upBtn})`,position:"fixed",bottom:"84px",right:"80px",backgroundRepeat:"no-repeat",backgroundPosition:"center",
              display:header!==47&&"none",
              cursor:"pointer"}}
              onClick={upEvt}></div>   
      </>
  )
}


const Body=({productOrderState,setProductOrderState})=>{
  const [renderState,setRenderState] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [project,setProject] = useState(
    [
    {
      product:[
        {
        category: "",
        created_at: "2021-07-04 10:48:19",
        date: "2021-07-04",
        id: "1",
        image:[],
        like_count:0,
        link: "",
        main_text: "",
        payment_type: "",
        produce_info: "",
        review_count: 0,
        status: "N",
        sub_title: "",
        thumbnail: "",
        title: "test",
        updated_at: "2021-07-06 14:53:40",
        user_email: "test",
        user_name: "",
        youtube: "",
      }
    ]
    },    {
      product:[
        {
        category: "",
        created_at: "2021-07-04 10:48:19",
        date: "2021-07-04",
        id: "1",
        image:[],
        like_count:0,
        link: "",
        main_text: "",
        payment_type: "",
        produce_info: "",
        review_count: 0,
        status: "N",
        sub_title: "",
        thumbnail: "",
        title: "test",
        updated_at: "2021-07-06 14:53:40",
        user_email: "test",
        user_name: "",
        youtube: "",
      }
    ]
    },    {
      product:[
        {
        category: "",
        created_at: "2021-07-04 10:48:19",
        date: "2021-07-04",
        id: "1",
        image:[],
        like_count:0,
        link: "",
        main_text: "",
        payment_type: "",
        produce_info: "",
        review_count: 0,
        status: "N",
        sub_title: "",
        thumbnail: "",
        title: "test",
        updated_at: "2021-07-06 14:53:40",
        user_email: "test",
        user_name: "",
        youtube: "",
      }
    ]
    },    {
      product:[
        {
        category: "",
        created_at: "2021-07-04 10:48:19",
        date: "2021-07-04",
        id: "1",
        image:[],
        like_count:0,
        link: "",
        main_text: "",
        payment_type: "",
        produce_info: "",
        review_count: 0,
        status: "N",
        sub_title: "",
        thumbnail: "",
        title: "test",
        updated_at: "2021-07-06 14:53:40",
        user_email: "test",
        user_name: "",
        youtube: "",
      }
    ]
    },    {
      product:[
        {
        category: "",
        created_at: "2021-07-04 10:48:19",
        date: "2021-07-04",
        id: "1",
        image:[],
        like_count:0,
        link: "",
        main_text: "",
        payment_type: "",
        produce_info: "",
        review_count: 0,
        status: "N",
        sub_title: "",
        thumbnail: "",
        title: "test",
        updated_at: "2021-07-06 14:53:40",
        user_email: "test",
        user_name: "",
        youtube: "",
      }
    ]
    },    {
      product:[
        {
        category: "",
        created_at: "2021-07-04 10:48:19",
        date: "2021-07-04",
        id: "1",
        image:[],
        like_count:0,
        link: "",
        main_text: "",
        payment_type: "",
        produce_info: "",
        review_count: 0,
        status: "N",
        sub_title: "",
        thumbnail: "",
        title: "test",
        updated_at: "2021-07-06 14:53:40",
        user_email: "test",
        user_name: "",
        youtube: "",
      }
    ]
    },
  ])

  const ProjectRender = ({item,productOrderState,setProductOrderState,index})=>{
    const currentDate = new Date();
    const now = new Date();
    const yesterdayDate = new Date(now.setDate(now.getDate()-1));
    const month = (currentDate.getMonth()+1)/10;
    const date = (currentDate.getDate())/10;
    const today = `${currentDate.getFullYear()}-${month<1?`0${currentDate.getMonth()+1}`:currentDate.getMonth()+1}-${date<1?`0${currentDate.getDate()}`:currentDate.getDate()}`
    const yesterday = `${yesterdayDate.getFullYear()}-${month<1?`0${yesterdayDate.getMonth()+1}`:yesterdayDate.getMonth()+1}-${date<1?`0${yesterdayDate.getDate()}`:yesterdayDate.getDate()}`
    const length = item.product.length;
    const [popularArray,setPopularArray] =useState(item.product);
    const [fastestArray,setFastestArray] =useState(item.product);
    const [renderDate,setRenderDate] = useState("");
    
    const RenderList =({item,index,length})=>{
      const currentNum = index;
      const maxNum = length;
      return(
        <>
        <Link to={`/product?productnum=${item.id}`}><div id={item.id} 
          style={{width:"688px",height:"120px",display:"flex",alignItems:"center",backgroundColor:"#fff",position:"relative",cursor:"pointer",borderBottom:"1px solid #e5e5e5"}}
          onClick={(e)=>{e.stopPropagation();}}
        >
          <div style={{width:"88px",marginLeft:"16px",height:"88px",marginRight:"16px",backgroundImage:`url(${item.thumbnail})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}></div>
          <div style={{width:"480px",textAlign:"left",marginRight:"24px"}}>
            <div style={{color:"#505050",height:"16px",fontWeight:"bold",fontSize:'16px',marginBottom:"12px",lineHeight:"16px"}}>{item.title}</div>
            <div style={{color:"#828282",height:"14px",fontSize:'13px',marginBottom:'16px',lineHeight:"14px"}}>{item.sub_title}</div>
            <div style={{display:"flex",height:"24px",alignItems:"center"}}>
              <div style={{padding:"3.5px 5px 3.5px 5px",maxHeight:"24px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",backgroundColor:"#F1F1F1"}}>
                <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_comment})`,marginRight:"8px"}}></div>
                <div>{item.review_count}</div>
              </div>
              <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.payment_type}</div>
              <div style={{height:"14px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",width:"1px",backgroundColor:"#e5e5e5"}}></div>
              <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.category}</div>
            </div>
          </div>
          <div style={{position:"absolute",width:"48px",height:"52px",right:"28px"}}>
            <div style={{height:"50%",width:"100%",backgroundImage:`url(${icon_like})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
            <div style={{height:"50%",width:"100%",fontSize:"18px",fontWeight:"bold",color:"#505050",textAlign:"center"}}>{item.like_count}</div>
          </div>
        </div>
        </Link>
        </>
      )
    }

    const popularLogic =(array)=>{
      const currentArray = array;
      const length = item.product.length;
      let tmp = null;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length-1; j++) {
          if (currentArray[j].like_count*1 < currentArray[j+1].like_count*1) {
            tmp = currentArray[j];
            currentArray[j] = currentArray[j + 1];
            currentArray[j + 1] = tmp;
            tmp = null;
          }
        }
        if(i+1 === length){
          setPopularArray(currentArray);
        }
      }
    }

    const fastestLogic =(array)=>{
      const currentArray = array;
      const length = item.product.length;
      let tmp = null;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length-1; j++) {
          if (currentArray[j].id*1 < currentArray[j+1].id*1) {
            tmp = currentArray[j];
            currentArray[j] = currentArray[j + 1];
            currentArray[j + 1] = tmp;
            tmp = null;
          }
        }
        if(i+1 === length){
          setFastestArray(currentArray);
        }
      }
    }

    const setDate = ()=>{
      if(item.date ===today){
        setRenderDate("오늘")
      }else if(item.date ===yesterday){
        setRenderDate("어제")
      }else{
        if(item.date){
          const year = item.date.slice(0,4);
          const month = (item.date.slice(5,7)/10) >=1?item.date.slice(5,7):item.date.slice(5,7)%10;
          const date = (item.date.slice(8,10)/10)>=1?item.date.slice(8,10):item.date.slice(8,10)%10;
          setRenderDate(`${month}월 ${date}일, ${year}년`);
        }
      }
    }

    useEffect(()=>{
      setFastestArray(item.product);
      setDate();
    },[])

    useEffect(()=>{
      if(productOrderState==="popular"){
        popularLogic(fastestArray);
      }else{
        fastestLogic(fastestArray);
      }
    },[productOrderState])
    return(
      <div style={{marginBottom:"40px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",marginBottom:"16px"}}>
          <div style={{fontWeight:"bold",fontSize:"20px"}}>{renderDate}</div>
          {index ===0&&<div style={{display:"flex"}}>
            <div style={{
              fontSize:"14px",
              marginRight:"8px",
              cursor:"pointer",
              fontWeight:productOrderState==="popular"&&"bold",
          }} onClick={()=>{setProductOrderState("popular")}}>인기순</div>
            <div style={{
              fontSize:"14px",
              cursor:"pointer",
              fontWeight:productOrderState==="fastest"&&"bold",}} 
              onClick={()=>{setProductOrderState("fastest")}}>최신순</div>
          </div>}
        </div>
        {productOrderState==="fastest"&&<div>{fastestArray.map((item,index)=>(<RenderList index={index} length={length} key={item.id} item={item}></RenderList>))}</div>}
        {productOrderState==="popular"&&<div>{popularArray.map((item,index)=>(<RenderList index={index} length={length} key={item.id} item={item}></RenderList>))}</div>}
      </div>
    )
  }

  const productListApi = async()=>{
    var data = new FormData();
    try{
        await axios({
            method:"post",
            url : "https://www.proveit.co.kr/api/productList.php",
            data:data

        }).then((e)=>{
            if(e.data.ret_code === "0000"){
              setProject(e.data.product);
            }else{

            }
        })
    }catch{

    }
}

  useEffect(()=>{
    productListApi();
  },[])
  return(
    <div style={{width:"100%",height:"100%",paddingTop:"48px",backgroundColor:"#f9f9f9",display:"flex",justifyContent:"center"}}> 
      {renderState&&<div style={{display:"flex",width:"1040px",height:"100%"}}>
        <div style={{width:"688px",height:"100%",marginRight:"16px"}}>
          {project.map((item,index)=>(<ProjectRender key={index} index={index} productOrderState={productOrderState} setProductOrderState={setProductOrderState} setRenderState={setRenderState} item={item}></ProjectRender>))}
          <div style={{width:"100%",height:"19px",fontSize:'13px',color:"#828282",textAlign:"center"}}>여기가 끝이에요</div>
        </div>
        <div style={{width:"336px",height:"115px",color:"#505050",fontSize:"13px",lineHeight:"23.4px",textAlign:"left",marginTop:"45px"}}>
          <div><a href={intro} target="_blank">소개</a></div>
          <div><Link to="/guideline">커뮤니티 가이드라인</Link></div>
          <div><Link to="/tos">이용약관</Link></div>
          <div><Link to="/privacy_policy">개인정보 처리방침</Link></div>
          이메일 문의 : hello@110corp.com<br/>
          © 2021 oneonezero Inc.<br/>
        </div>
      </div>}
    </div>
  )
}

const MainPage = ()=>{
  const [loginWindow,setLoginWindow] = useState(false);
  const [signupWindow,setSignUpWindow] = useState(false);
  const [modal,setModal] = useState(false);
  const [productOrderState,setProductOrderState] = useState("fastest");

  
  
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
                localStorage.setItem("userInfo",JSON.stringify(e.data.user));
            }else{

            }
        })
    }catch{

    }
  }
  return(
  <div style={{
    width:"100%",
    height:window.innerHeight,
    display:"flex",
    flexDirection:"column",
    //overflow:"hidden"
    overflow:(loginWindow||signupWindow)&&"hidden"
  }}
  onClick={()=>{setModal(false)}}>
    <Header 
    setLoginWindow={setLoginWindow} 
    loginWindow={loginWindow}
    setSignUpWindow={setSignUpWindow}
    signupWindow={signupWindow}
    modal={modal}
    setModal={setModal}
    ></Header>
      <Body 
      productOrderState={productOrderState}
      setProductOrderState={setProductOrderState}></Body>

    {loginWindow&&<div 
      style={{
        position:"absolute",
        width:'100%',
        height:'100%',
        backgroundColor:"rgba(80,80,80,0.9)",
        display:"flex",
        justifyContent:"center"
        }}
    onClick={()=>{setLoginWindow(false)}}>
      <div style={{
        width:"688px",
        height:"384px",
        backgroundColor:"#fff",
        borderRadius:'4px',
        marginTop:"179px",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        position:"fixed",
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-100%)",
        color:"#505050"}}
        onClick={(e)=>{setLoginWindow(true);e.stopPropagation();}}>
          <div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`,marginTop:"56px",marginBottom:"32px"}}></div>
          <div style={{height:'23px',lineHeight:"23px",fontSize:"20px",fontWeight:'bold',marginBottom:"40px"}}>로그인</div>
          <div style={{fontSize:"16px",lineHeight:"28.8px",textAlign:"left",marginBottom:"49px"}}>
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
                    <div style={{position:"absolute",width:"100%",height:"100%",left:0,top:0,backgroundImage:`url(${googleLogin})`,cursor:"pointer"}}
                    onClick={(e)=>{e.target.parentNode.childNodes[0].click();}}></div>
          </div>
      </div>
    </div>}

    {signupWindow&&<div 
      style={{
        position:"absolute",
        width:'100%',
        height:'100%',
        backgroundColor:"rgba(80,80,80,0.9)",
        display:"flex",
        justifyContent:"center"
        }}
    onClick={()=>{setSignUpWindow(false)}}>
      <div style={{
        width:"688px",
        height:"384px",
        backgroundColor:"#fff",
        borderRadius:'4px',
        marginTop:"179px",
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        position:"fixed",
        top:"50%",
        left:"50%",
        transform: "translate(-50%,-100%)",
        color:"#505050"}}
        onClick={(e)=>{setSignUpWindow(true);e.stopPropagation();}}>
          <div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`,marginTop:"56px",marginBottom:"32px"}}></div>
          <div style={{height:'23px',lineHeight:"23px",fontSize:"20px",fontWeight:'bold',marginBottom:"40px"}}>회원가입</div>
          <div style={{fontSize:"16px",lineHeight:"28.8px",textAlign:"left",marginBottom:"49px"}}>
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
    </div>}
 
  </div>  
  )
}

export default MainPage;