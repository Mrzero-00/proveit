import React, { useEffect, useState } from 'react';

import icon_logo from '../image/logo.svg';
import icon_upBtn from '../image/icon_upBtn.svg';
import icon_like from '../image/likeIcon.svg';
import icon_comment from '../image/commentIcon.svg';
import intro from '../image/intro.pdf';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Common/Header';
import SignupWindow from './Common/SignupWindow';
import LoginWindow from './Common/LoginWindow';

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
          onClick={(e)=>{e.stopPropagation();}}
          className="main_body_product_item"
        >
          <div className="main_body_product_thumbnail" style={{backgroundImage:`url(${item.thumbnail})`}}></div>
          <div style={{width:"100%",textAlign:"left"}}>
            <div className="main_body_product_title">{item.title}</div>
            <div className="main_body_product_subtitle">{item.sub_title}</div>
            <div className="iphone" style={{display:"flex",height:"24px",alignItems:"center"}}>
              <div style={{padding:"3.5px 5px 3.5px 5px",maxHeight:"24px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",backgroundColor:"#F1F1F1"}}>
                <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_comment})`,marginRight:"8px"}}></div>
                <div>{item.review_count}</div>
              </div>
              <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.payment_type}</div>
              <div style={{height:"14px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",width:"1px",backgroundColor:"#e5e5e5"}}></div>
              <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{item.category}</div>
            </div>
          </div>
          <div className="main_body_product_likecount">
            <div style={{height:"24px",width:"24px",backgroundImage:`url(${icon_like})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",marginTop:'16px',marginBottom:"4px"}}></div>
            <div style={{height:"16px",lineHeight:"16px",width:"100%",fontSize:"14px",fontWeight:"bold",color:"#505050",textAlign:"center"}}>{item.like_count*1/1000>=1?`${item.like_count*1/1000}k`:item.like_count}</div>
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
        <div className="main_body_product_date">
          <div style={{fontWeight:"bold"}}>{renderDate}</div>
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
      {renderState&&<div className="main_body">
        <div className="main_body_product_list">
          {project.map((item,index)=>(<ProjectRender key={index} index={index} productOrderState={productOrderState} setProductOrderState={setProductOrderState} setRenderState={setRenderState} item={item}></ProjectRender>))}
          <div style={{width:"100%",height:"19px",fontSize:'13px',color:"#828282",textAlign:"center"}}>여기가 끝이에요</div>
        </div>
        <div className="main_proveit">
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
    display:"flex",
    flexDirection:"column"
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