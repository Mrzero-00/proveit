import React, { useEffect, useRef, useState } from 'react';

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


const RenderList =({item,index,length,setRenderState,setLoginWindow,indexNum})=>{
  const [hover,setHover] = useState(false);
  const [likeState,setLikeState] = useState(item.like_m==="0"?false:true);
  const [likeCount,setLikeCount] = useState(item.like_count*1);
  
  const iconSet = (text)=>{
    let icon;
    switch(text){
      case "????????? ??? ?????????":
        icon = icon_category1;
        break;
      case "?????? ??? ????????????":
        icon = icon_category2;
        break;
      case "??????":
        icon = icon_category3;
        break;
      case "??????":
        icon = icon_category4;
        break;
      case "?????? ??? ?????????":
        icon = icon_category5;
        break;
      case "????????????":
        icon = icon_category6;
        break;
      case "??????????????????":
        icon = icon_category7;
        break;
      case "??????":
        icon = icon_category8;
        break;
      case "??????":
        icon = icon_category9;
        break;
      case "?????????":
        icon = icon_category10;
        break;
      case "??????":
        icon = icon_category11;
        break;
      case "??????????????????":
        icon = icon_category12;
        break;
      case "??????":
        icon = icon_category13;
        break;
      case "????????????":
        icon = icon_category14;
        break;
      case "?????????":
        icon = icon_category15;
      break;
      case "????????????":
        icon = icon_category16;
        break;
      case "????????????":
        icon = icon_category17;
        break;
      case "??????":
        icon = icon_category18;
        break;
      case "????????????":
        icon = icon_category19;
        break;
      case "??????":
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
              if(e.data.ret_msg ==="????????????"){
                setLikeCount(likeCount-1);
                setLikeState(false);
              }else{
                setLikeCount(likeCount+1);
                setLikeState(true);
              }
              // setRenderState(false);
            }else{
              if(localStorage.getItem("email")){
                alert("????????? ????????? ?????????????????????. ?????? ?????????????????????");
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
      className="main_body_product_item"
      onClick={()=>{
        const alink = document.createElement("a");
        alink.href =`/product?productnum=${item.id}`;
        alink.click();
      }}
      // style={{filter:(index>10&&window.localStorage.getItem("hash")===null)&&"blur(10px)"}}
    >
     
      <div className="main_body_product_thumbnail" role="img" alt={`${item.title}_thumbnail`} style={{backgroundImage:`url(${item.thumbnail})`}}></div>
      <div style={{width:"100%",textAlign:"left",display:"flex",flexDirection:"column",justifyContent:"center",height:"100%"}}>
        <h3 className="main_body_product_title">{item.title}</h3>
        <p className="main_body_product_subtitle">{item.sub_title}</p>
        <div className="iphone" style={{display:"flex",alignItems:"center"}}>
          {/* <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",color:"#7b7b7b"}}>{item.category}</div>
          <div style={{width:"4px",margin:"0px 4px",color:"#7b7b7b"}}>??</div>
          <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",color:"#7b7b7b"}}>{item.payment_type}</div>
          <div style={{width:"4px",margin:"0px 4px",color:"#7b7b7b"}}>??</div>
          <div style={{height:"14px",display:"flex",justifyContent:"center",alignItems:"center",color:"#7b7b7b"}}>{item.ago_time}</div>
          <div style={{width:"4px",margin:"0px 4px",color:"#7b7b7b"}}>??</div>
          <div style={{color:"#6200EE"}}>{item.review_count}?????? ??????</div> */}
          {/* <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>
            <div style={{width:"13px",height:"13px",marginRight:"4px",backgroundImage:`url(${categoryIcon})`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
            <div>{item.category}</div>
            <div style={{width:"7px",margin:"0px 4px"}}>??</div>
            <div style={{color:"#9c31c6"}}>{item.review_count}?????? ??????</div>
          </div> */}
        </div>
      </div>
      <div className="main_body_product_btnList">
        <div className="main_body_product_replycount">
          <div style={{height:"10px",minWidth:"10px",width:"10px",backgroundSize:"cover",marginLeft:"10px",backgroundImage:`url(${icon_comment})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
          <div style={{height:"16px",lineHeight:"16px",width:"100%",fontSize:"12px",fontWeight:"400",color:"#262626",textAlign:"center"}}>
            {item.review_count}
          </div>
        </div>
        <div className="main_body_product_likecount" style={{border:(likeState||hover)&&"1px solid #6200EE",}}
        onMouseEnter={()=>{setHover(true);}}
        onMouseLeave={()=>{setHover(false);}}
        onClick={(e)=>{likeApi();e.stopPropagation();}}>
          <div style={{height:"16px",minWidth:"16px",width:"16px",marginLeft:"5px",backgroundImage:(likeState||hover)?`url(${icon_like_m})`:`url(${icon_like})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
          <div style={{height:"16px",lineHeight:"16px",width:"100%",fontSize:"12px",fontWeight:"400",color:(likeState||hover)?"#6200EE":"#262626",textAlign:"center"}}>
            {likeCount*1/1000>=1?`${likeCount*1/1000}k`:likeCount}
            </div>
        </div>
      </div>
    </div>

    {/* {indexNum*8>index&&
    <div id={item.id} 
      className="main_body_product_item"
      onClick={()=>{
        const alink = document.createElement("a");
        alink.href =`/product?productnum=${item.id}`;
        alink.click();
      }}
      // style={{filter:(index>10&&window.localStorage.getItem("hash")===null)&&"blur(10px)"}}
    >
     
      <div className="main_body_product_thumbnail" role="img" alt={`${item.title}_thumbnail`} style={{backgroundImage:`url(${item.thumbnail})`}}></div>
      <div style={{width:"100%",textAlign:"left"}}>
        <h3 className="main_body_product_title">{item.title}</h3>
        <p className="main_body_product_subtitle">{item.sub_title}</p>
        <div className="iphone" style={{display:"flex",alignItems:"center"}}>
          <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.payment_type}</div>
          <div style={{height:"14px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",width:"1px",backgroundColor:"#e5e5e5"}}></div>
          <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>
            <div style={{width:"13px",height:"13px",marginRight:"4px",backgroundImage:`url(${categoryIcon})`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
            <div>{item.category}</div>
            <div style={{width:"7px",margin:"0px 4px"}}>??</div>
            <div style={{color:"#9c31c6"}}>{item.review_count}?????? ??????</div>
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
      
    </div>} */}
    </>

  )
}

const Body=({productOrderState,setProductOrderState,setLoginWindow,scrollY})=>{
  const [renderState,setRenderState] = useState(true);
  const [fullProject,setFullProject] = useState([]);
  const [popularArray,setPopularArray] =useState([]);
  const [fastestArray,setFastestArray] =useState([]);
  const [indexNum,setIndexNum] = useState(2);
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

    useEffect(()=>{
      setFastestArray(item.product);
    },[])

    useEffect(()=>{
      if(productOrderState==="popular"){
        popularLogic(fastestArray);
      }else{
        fastestLogic(fastestArray);
      }

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
              fontWeight:productOrderState==="popular"?"700":"400",
              color:productOrderState==="popular"?"#323232":"#828282",
          }} onClick={()=>{setProductOrderState("popular")}}>????????? |</div>
            <div style={{
              fontSize:"14px",
              cursor:"pointer",
              fontWeight:productOrderState==="fastest"?"700":"400",
              color:productOrderState==="fastest"?"#323232":"#828282",}} 
              onClick={()=>{setProductOrderState("fastest")}}>?????????</div>
          </div>}
        </div>
       
        {productOrderState==="fastest"&&<div className="product_date_list_array">{fastestArray.map((item,index)=>(<RenderList index={index} setLoginWindow={setLoginWindow} setRenderState={setRenderState} length={length} key={item.id} item={item}></RenderList>))}</div>}
        {productOrderState==="popular"&&<div className="product_date_list_array">{popularArray.map((item,index)=>(<RenderList index={index} setLoginWindow={setLoginWindow} setRenderState={setRenderState} length={length} key={item.id} item={item}></RenderList>))}</div>}   
      </div>
      )
  }

  const fullPopularLogic =(array)=>{
    const currentArray = array;
    const length = array.length;
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

  const fullFastestLogic =(array)=>{
    const currentArray = array;
    const length = array.length;
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
              fullArraySet(e.data.product);
            }else{

            }
        })
    }catch{

    }
  }

  useEffect(()=>{
    productListApi();
    // upBtnMount();
  },[])


 const fullArraySet = (product)=>{
  let array=[];
  for(let i =0;i<product.length;i++){
    for(let k=0; k<product[i].product.length;k++){
      array =[...array,product[i].product[k]];
    }
    if(i===product.length-1){
      setFullProject(array);
      fullFastestLogic(array);
    }
  }
 }

  useEffect(()=>{
    productListApi();
  },[localStorage.getItem("email"),renderState])

  useEffect(()=>{
    if(indexNum<parseInt(scrollY/window.innerHeight)+2){
      setIndexNum(parseInt(scrollY/window.innerHeight)+2);
    }
  },[scrollY])

  return(
    <div id="pageBody" style={{width:"100%",backgroundColor:"#fafafc",display:"flex",alignItems:"center",flexDirection:"column"}}
    > 

          <div className="homepage_title">
            <div className="homepage_title_gif"></div>
            <div className="homepage_title_textcontents">
              <div className="homepage_title_text">
              ?????? ????????? ???????????? ???????????? ??????
              ??? ?????? ????????? ???????????????.
              </div>
              <Link to="/event"><div className="homepage_title_btn">????????? ??????</div></Link>
            </div>
          </div>

      {renderState&&<div className="main_body">
        <div className="main_body_product_list">
          {/* {project.map((item,index)=>(
          <ProjectRender 
            key={index} 
            index={index} 
            setLoginWindow={setLoginWindow} 
            setRenderState={setRenderState} 
            fullProject={fullProject} 
            setFullProject={setFullProject} 
            index={index} 
            productOrderState={productOrderState} 
            setProductOrderState={setProductOrderState} 
            item={item}>
          </ProjectRender>))} */}


          {/* ????????? */}
          <div style={{marginBottom:"40px"}}>
            <div className="main_body_product_date">
              <div style={{fontWeight:"bold"}}>????????? ?????????</div>
                <div style={{display:"flex"}}>
                  <div style={{
                    fontSize:"14px",
                    height: "14px",
                    lineHeight:"14px",
                    marginRight:"8px",
                    cursor:"pointer",
                    fontWeight:productOrderState==="popular"?"700":"400",
                    color:productOrderState==="popular"?"#262626":"#7b7b7b",
                }} onClick={()=>{setProductOrderState("popular");fullPopularLogic(fastestArray);}}>????????? |</div>
                  <div style={{
                    fontSize:"14px",
                    height: "14px",
                    lineHeight:"14px",
                    cursor:"pointer",
                    fontWeight:productOrderState==="fastest"?"700":"400",
                    color:productOrderState==="fastest"?"#262626":"#7b7b7b",}} 
                    onClick={()=>{setProductOrderState("fastest");fullFastestLogic(popularArray);}}>?????????</div>
                </div>
            </div>
            {productOrderState==="fastest"&&<div className="product_list_array">{fastestArray.map((item,index)=>(<RenderList indexNum={indexNum} index={index} setLoginWindow={setLoginWindow} setRenderState={setRenderState}  key={item.id} item={item}></RenderList>))}</div>}
            {productOrderState==="popular"&&<div className="product_list_array">{popularArray.map((item,index)=>(<RenderList indexNum={indexNum} index={index} setLoginWindow={setLoginWindow} setRenderState={setRenderState}  key={item.id} item={item}></RenderList>))}</div>}   
          </div>
          {/* ????????? */}
          <div style={{width:"100%",height:"19px",fontSize:'13px',color:"#7b7b7b",textAlign:"center",paddingBo:"32px"}}>??? ?????? ???????????? ????????????.</div>
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
  const [alarmModal,setAlarmModal] = useState(false);
  const [productOrderState,setProductOrderState] = useState("fastest");
  const [scrollY,setScrollY]=useState(0);
  
  const submitGoogleData= async(name,id,token)=>{
    //????????? ??????
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

  const scrollEvent=(e)=>{
    // setScrollY(e.target.scrollTop);
  }

 

  return(
  <div className="contentsBody" style={{
    width:"100%",
  }}
  onClick={()=>{
    setModal(false);
    setAlarmModal(false);
  }}
  onScroll={scrollEvent}>


    <Helmet>
      <title>???????????? - ?????? ??????????????? ?????? ?????????</title>
      <meta name="description" content="??? ?????? ?????? ?????????, ??? ?????? ?????? ???????????? ??????????????????." />
    </Helmet>

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
      scrollY={scrollY}
      productOrderState={productOrderState}
      setLoginWindow={setLoginWindow}
      setProductOrderState={setProductOrderState}
      ></Body>



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

export default MainPage;