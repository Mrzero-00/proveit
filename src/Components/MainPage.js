import React, { useEffect, useState } from 'react';

import icon_like from '../image/likeIcon.svg';
import icon_like_m from '../image/likeIcon_m.svg';
import icon_comment from '../image/commentIcon.svg';
import icon_mainTitle_hand from '../image/icon_mainTitle_hand.svg';
import intro from '../image/intro.pdf';
import axios from 'axios';
import Header from './Common/Header';
import SignupWindow from './Common/SignupWindow';
import LoginWindow from './Common/LoginWindow';
import RightBar from './Common/RightBar';
import { Helmet } from 'react-helmet';

import icon_category1 from '../image/icon_category1.png';
import icon_category2 from '../image/icon_category2.png';
import icon_category3 from '../image/icon_category3.png';
import icon_category4 from '../image/icon_category4.png';
import icon_category5 from '../image/icon_category5.png';
import icon_category6 from '../image/icon_category6.png';
import icon_category7 from '../image/icon_category7.png';
import icon_category8 from '../image/icon_category8.png';
import icon_category9 from '../image/icon_category9.png';
import icon_category10 from '../image/icon_category10.png';
import icon_category11 from '../image/icon_category11.png';
import icon_category12 from '../image/icon_category12.png';
import icon_category13 from '../image/icon_category13.png';
import icon_category14 from '../image/icon_category14.png';
import icon_category15 from '../image/icon_category15.png';
import icon_category16 from '../image/icon_category16.png';
import icon_category17 from '../image/icon_category17.png';
import icon_category18 from '../image/icon_category18.png';
import icon_category19 from '../image/icon_category19.png';
import icon_category20 from '../image/icon_category20.png';
import { Link } from 'react-router-dom';


const Body=({productOrderState,setProductOrderState,setLoginWindow})=>{
  const [renderState,setRenderState] = useState(true);
  const [fullProject,setFullProject] = useState([]);
  // const currentScroll=useRef(0);
  // const [scrollState,setScrollState] =useState(1);
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
    }
  ])

  const ProjectRender = ({item,productOrderState,setProductOrderState,setRenderState,index,scrollState,setLoginWindow})=>{
    const length = item.product.length;
    const [popularArray,setPopularArray] =useState(item.product);
    const [fastestArray,setFastestArray] =useState(item.product);
    const [redering,setRendering] = useState(false);
    const RenderList =({item,index,length,setRenderState,setLoginWindow})=>{
      const [hover,setHover] = useState(false);
      const [likeState,setLikeState] = useState(item.like_m==="0"?false:true);
      const [likeCount,setLikeCount] = useState(item.like_count*1);
      
      const iconSet = (text)=>{
        let icon;
        switch(text){
          case "그래픽 및 디자인":
            icon = icon_category1;
            break;
          case "건강 및 피트니스":
            icon = icon_category2;
            break;
          case "교육":
            icon = icon_category3;
            break;
          case "금융":
            icon = icon_category4;
            break;
          case "사진 및 비디오":
            icon = icon_category5;
            break;
          case "비즈니스":
            icon = icon_category6;
            break;
          case "엔터테인먼트":
            icon = icon_category7;
            break;
          case "여행":
            icon = icon_category8;
            break;
          case "음악":
            icon = icon_category9;
            break;
          case "생산성":
            icon = icon_category10;
            break;
          case "푸드":
            icon = icon_category11;
            break;
          case "라이프스타일":
            icon = icon_category12;
            break;
          case "의료":
            icon = icon_category13;
            break;
          case "유틸리티":
            icon = icon_category14;
            break;
          case "미디어":
            icon = icon_category15;
          break;
          case "블록체인":
            icon = icon_category16;
            break;
          case "인공지능":
            icon = icon_category17;
            break;
          case "교통":
            icon = icon_category18;
            break;
          case "뉴스레터":
            icon = icon_category19;
            break;
          case "기타":
            icon = icon_category20;
            break;
          default:
            break;
        }
        return icon;
      }

      const categoryIcon = iconSet(item.category);

      const likeApi = async()=>{
        var data = new FormData();
        data.append("user_email",localStorage.getItem("email"));
        data.append("hash",localStorage.getItem("hash"));
        data.append("product_id",item.id);
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/productLike.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                  if(e.data.ret_msg ==="추천취소"){
                    setLikeCount(likeCount-1);
                    setLikeState(false);
                  }else{
                    setLikeCount(likeCount+1);
                    setLikeState(true);
                  }
                  // setRenderState(false);
                }else{
                  if(localStorage.getItem("email")){
                    alert("로그인 해쉬가 만료되었습니다. 다시 로그인해주세요");
                    localStorage.clear();
                  }else{
                    setLoginWindow(true);
                  }
                }
            })
        }catch{
      
        }
      }
      return( 
        <>
        <div id={item.id} 
          onClick={(e)=>{
            const alink = document.createElement("a");
            alink.href = `/product?productnum=${item.id}`;
            alink.click();
            e.stopPropagation();
          }}
          className="main_body_product_item"
        >
          <div className="main_body_product_thumbnail" role="img" alt={`${item.title}_thumbnail`} style={{backgroundImage:`url(${item.thumbnail})`}}></div>
          <div style={{width:"100%",textAlign:"left"}}>
            <h3 className="main_body_product_title">{item.title}</h3>
            <p className="main_body_product_subtitle">{item.sub_title}</p>
            <div className="iphone" style={{display:"flex",height:"24px",alignItems:"center"}}>
              <div style={{padding:"3.5px 5px 3.5px 5px",maxHeight:"24px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>
                <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_comment})`,marginRight:"8px"}}></div>
                <div>{item.review_count}</div>
              </div>
              <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.payment_type}</div>
              <div style={{height:"14px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",width:"1px",backgroundColor:"#e5e5e5"}}></div>
              <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>
                <div style={{width:"13px",height:"13px",marginRight:"4px",backgroundImage:`url(${categoryIcon})`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
                <div>{item.category}</div>
              </div>
            </div>
          </div>
          <div className="main_body_product_likecount" style={{border:(likeState||hover)&&"1px solid #9C31C6",}}
          onMouseEnter={()=>{setHover(true);}}
          onMouseLeave={()=>{setHover(false);}}
          onClick={(e)=>{likeApi();e.stopPropagation();}}>
            <div style={{height:"24px",width:"24px",backgroundImage:(likeState||hover)?`url(${icon_like_m})`:`url(${icon_like})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
            <div style={{height:"16px",lineHeight:"16px",width:"100%",fontSize:"14px",fontWeight:"bold",color:(likeState||hover)?"#9C31C6":"#505050",textAlign:"center"}}>{likeCount*1/1000>=1?`${likeCount*1/1000}k`:likeCount}</div>
          </div>
        </div>
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
      setTimeout(() => {
        setRendering(true);
      }, 100);
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
        <div className="main_body_product_date">
          <div style={{fontWeight:"bold"}}>{item.date}</div>
          {index ===0&&<div style={{display:"flex"}}>
            <div style={{
              fontSize:"14px",
              marginRight:"8px",
              cursor:"pointer",
              fontWeight:productOrderState==="popular"&&"bold",
              color:productOrderState==="popular"?"#323232":"#828282",
          }} onClick={()=>{setProductOrderState("popular")}}>인기순 |</div>
            <div style={{
              fontSize:"14px",
              cursor:"pointer",
              fontWeight:productOrderState==="fastest"&&"bold",
              color:productOrderState==="fastest"?"#323232":"#828282",}} 
              onClick={()=>{setProductOrderState("fastest")}}>최신순</div>
          </div>}
        </div>
       
        {productOrderState==="fastest"&&<div>{fastestArray.map((item,index)=>(<RenderList index={index} setLoginWindow={setLoginWindow} setRenderState={setRenderState} length={length} key={item.id} item={item}></RenderList>))}</div>}
        {productOrderState==="popular"&&<div>{popularArray.map((item,index)=>(<RenderList index={index} setLoginWindow={setLoginWindow} setRenderState={setRenderState} length={length} key={item.id} item={item}></RenderList>))}</div>}   
      </div>
      )
  }

  const productListApi = async()=>{
    var data = new FormData();
    data.append("user_email",localStorage.getItem("email"));
    data.append("hash",localStorage.getItem("hash"));
    try{
        await axios({
            method:"post",
            url : "https://proveit.co.kr/api/productList.php",
            data:data

        }).then((e)=>{
            if(e.data.ret_code === "0000"){
              setProject(e.data.product);
              setRenderState(true);
            }else{

            }
        })
    }catch{

    }
  }

  // const upBtnMount = ()=>{
  //   window.addEventListener("scroll",()=>{    
  //       const scrollPosition = window.scrollY;
  //       const body = document.getElementById("pageBody");
  //       if(currentScroll.current<scrollPosition){
  //           currentScroll.current=scrollPosition;
  //           if(body.scrollHeight+48-window.innerHeight-10<scrollPosition){
  //               setScrollState(scrollState+1);
  //           }else{
  //               setScrollState(scrollState);
  //           }
  //       }
  //   })
  // }

  useEffect(()=>{
    productListApi();
    // upBtnMount();
    if(renderState){
      let array=[];
      for(let i =0;i<project.length;i++){
        for(let k=0; k<project[i].product.length;k++){
          array =[...array,project[i].product[k]];
        }
        if(i===project.length-1){
          setFullProject(array);
        }
      }
    }
  },[])
  useEffect(()=>{
    productListApi();
  },[localStorage.getItem("email"),renderState])

  return(
    <div id="pageBody" style={{width:"100%",height:"100%",backgroundColor:"#fffefc",display:"flex",alignItems:"center",flexDirection:"column"}}> 

          <div className="homepage_title">
            <p className="hompage_title_main">
              안녕하세요?<br/>
              혹시 서비스를 만들고 계신가요?
            </p>
            <div style={{display:"flex",alignItems:"center",width:"100%"}}>
              <Link to="/startQuestion?yes"><button className="homepage_main_btn1">네</button></Link>
              <Link to="/startQuestion?no"><button className="homepage_main_btn2">아니오</button></Link>
            </div>
          </div>

      {renderState&&<div className="main_body">
        <div className="main_body_product_list">
          {project.map((item,index)=>(<ProjectRender key={index} index={index} setLoginWindow={setLoginWindow} setRenderState={setRenderState} fullProject={fullProject} setFullProject={setFullProject} index={index} productOrderState={productOrderState} setProductOrderState={setProductOrderState} item={item}></ProjectRender>))}
          <div style={{width:"100%",height:"19px",fontSize:'13px',color:"#828282",textAlign:"center",marginBottom:"32px"}}>여기가 끝이에요</div>
        </div>
        <RightBar></RightBar>
      </div>}
    </div>
  )
}

const MainPage = ()=>{
  const [loginWindow,setLoginWindow] = useState(false);
  const [signupWindow,setSignUpWindow] = useState(false);
  const [modal,setModal] = useState(false);
  const [productOrderState,setProductOrderState] = useState("popular");
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
    display:"flex",
    flexDirection:"column"
  }}
  onClick={()=>{setModal(false)}}>
      {/* <Helmet>
        <title>프루브잇 - 되는 서비스들의 런칭 플랫폼</title>
        <meta
          name="description"
          content="잘 되고 있는 서비스, 잘 되고 싶은 서비스를 소개해주세요."
          data-react-helmet="true"
        />
      </Helmet> */}
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
      setLoginWindow={setLoginWindow}
      setProductOrderState={setProductOrderState}
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

export default MainPage;