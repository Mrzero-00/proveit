import React, { useEffect, useRef, useState } from 'react';

import icon_logo from '../../image/logo.svg';
import icon_like from '../../image/likeIcon.svg';
import icon_comment from '../../image/commentIcon.svg';
import icon_checked from '../../image/icon_checked.svg';
import icon_dropBox from '../../image/icon_dropBox.svg';
import icon_radioChecked from '../../image/icon_radioChecked.svg';
import icon_radioUnChecked from '../../image/icon_radioUnChecked.svg';
import icon_upBtn from '../../image/icon_upBtn.svg';
import icon_noneimg from '../../image/icon_noneimg.svg';
import icon_imgRemoveBtn from '../../image/icon_imgRemoveBtn.svg';
import icon_likeBtn from '../../image/icon_likeBtn.svg';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
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

const Body=()=>{
      const [pageNum,setPageNum] = useState(1);
      const [dataState,setDataState] =useState(false);
      const [renderState,setRenderState] =useState(false); 
      const imgNum = useRef(0);
      const [productInfo,setProductInfo] =useState({
        producerInfo:{
            department: null,
            email: "",
            hash:"",
            mailing: "N",
            memo: null,
            nick: null,
            position: null,
            thumbnail: null,
            u_id: "",
            updated_at: "2021-07-06 11:21:12",
            user_name: "상일",
            youtube: null,
          },
          title:"",
          subTitle:"",
          likeCount:0,
          mainText:"",
          comment:[
            {
              id:0,
              text:"",
              commentuserInfo:{
                  userId:"",
                  nickName:"",
                  profileUrl:"",
                  belong:"",
                  position:""
              },
              nestedComment:{
              },
              likeCount:0
          },
          ],
          paymentType:"무료",
          category:"",
          image:[

          ],
          link:"",
          thumbnail:"",
          youtube:""
      });
      const currentDate = new Date();
      const tommowDate = new Date(currentDate.setDate(currentDate.getDate()+1));
      const registerDate={
          year:tommowDate.getFullYear(),
          month:tommowDate.getDate()===1?(tommowDate.getMonth()===0?1:tommowDate.getMonth()+1):tommowDate.getMonth()+1,
          date:tommowDate.getDate()
      }
      const [registerState,setRegisterState] =useState(false);

      const [categoryWindowState,setCategoryWindowState] = useState(false);
      const [categoryNum,setCategoryNum] = useState(0);
      const [imgHover,setImgHover] = useState(0);
      const styled={
        input:{
            width:"464px",
            height: "40px",
            padding:"13px 12px 14px 12px",
            color:"#505050",
            borderRadius:"2px",
            backgroundColor:"#fff",
            fontSize:'13px'
        },
        dropBox:{
            border:"1px solid #e5e5e5",
            width:"464px",
            height: "40px",
            padding:"0px 12px 0px 12px",
            color:"#505050",
            borderRadius:"2px",
            backgroundColor:"#fff",
            textAlign:"left",
            fontSize:'13px',
            lineHeight:"40px",
            cursor: "pointer",
            position:"relative"
        },
        imgBox:{
            border:"1px dashed #e5e5e5",
            width: "40px",
            height: "40px",
            position:"relative",
            borderRadius:"2px",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            marginRight:"8px"
        },
        imgRemoveBtn:{
            width:"14px",
            height:"14px",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            position:"absolute",
            right:"-7px",
            top:"-7px",
            backgroundImage:`url(${icon_imgRemoveBtn})`,
            cursor: "pointer"
        },
        textareaBox:{
            border:"1px solid #e5e5e5",
            width:"464px",
            height: "168px",
            color:"#a5a5a5",
            borderRadius:"2px",
            backgroundColor:"#fff",
            fontSize:'13px',
            resize:"none"
        }
     }

     const categoryList=[
         {id:1,text:"그래픽 및 디자인"},
         {id:2,text:"건강 및 피트니스"},
         {id:3,text:"교육"},
         {id:4,text:"금융"},
         {id:5,text:"사진 및 비디오"},
         {id:6,text:"비즈니스"},
         {id:7,text:"엔터테이먼트"},
         {id:8,text:"여행"},
         {id:9,text:"음악"},
         {id:10,text:"생산성"},
         {id:11,text:"라이프스타일"},
         {id:12,text:"의료"},
         {id:13,text:"유틸리티"},
         {id:14,text:"미디어"},
         {id:15,text:"블록체인"},
         {id:16,text:"인공지능"},
         {id:17,text:"기타"},
     ]

     const CategoryRender =({item,categoryNum,setCategoryNum,setProductInfo,productInfo,setCategoryWindowState})=>{
         const [hover,setHover] =useState(categoryNum);
         return(
             <div style={{
                 width:"100%",
                 height:"40px",
                 fontSize:"14px",
                 lineHeight:"40px",
                 paddingLeft:"16px",
                 color:"#505050",
                 backgroundColor:(categoryNum===item.id||hover===item.id)&&"rgba(156,49,198,0.1)",
                 position:"relative",
                 cursor:"pointer"}}
                 onClick={(e)=>{setCategoryNum(item.id);setProductInfo({...productInfo,category:item.text});setCategoryWindowState(false);e.stopPropagation()}}
                 onMouseLeave={()=>{setHover(categoryNum)}}
                 onMouseOver={()=>{setHover(item.id)}}
                 >
                 {item.text}
                 {item.id===categoryNum&&<div style={{width:"24px",height:"24px",position:"absolute",top:"8px",right:"16px",backgroundImage:`url(${icon_checked})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>}
             </div>
         )
     }

     const Page1_preview=({productInfo})=>{
         return(
            <div style={{width:"512px",height:"120px",display:"flex",alignItems:"center",backgroundColor:"#fff",position:"relative",cursor:"pointer",borderBottom:"1px solid #e5e5e5"}}>
            <div style={{width:"88px",marginLeft:"16px",height:"88px",marginRight:"16px",backgroundImage:`url(${productInfo.thumbnail})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",
                        border:productInfo.thumbnail===""&&"1px dashed #e5e5e5"}}></div>
            <div style={{width:"292px",textAlign:"left",marginRight:"24px"}}>
              <div style={{color:"#505050",height:"16px",fontWeight:"bold",fontSize:'16px',marginBottom:"12px",lineHeight:"16px",overflow:"hidden"}}>{productInfo.title}</div>
              <div style={{color:"#828282",height:"14px",fontSize:'13px',marginBottom:'16px',lineHeight:"14px",overflow:"hidden"}}>{productInfo.subTitle}</div>
              <div style={{display:"flex",height:"24px",alignItems:"center"}}>
                <div style={{padding:"3.5px 5px 3.5px 5px",maxHeight:"24px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",backgroundColor:"#F1F1F1"}}>
                  <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_comment})`,marginRight:"8px"}}></div>
                  <div>{productInfo.comment.length}</div>
                </div>
                <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{productInfo.paymentType}</div>
                <div style={{height:"14px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",width:"1px",backgroundColor:"#e5e5e5"}}></div>
                <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{productInfo.category}</div>
              </div>
            </div>
            <div style={{position:"absolute",width:"48px",height:"52px",right:"28px"}}>
              <div style={{height:"50%",width:"100%",backgroundImage:`url(${icon_like})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>
              <div style={{height:"50%",width:"100%",fontSize:"18px",fontWeight:"bold",color:"#505050",textAlign:"center"}}>{productInfo.likeCount}</div>
            </div>
          </div>
         )
     }

     const Page2_preview=({productInfo})=>{
         const [imgNum,setimgNum] =useState(0);

         const ImageArray =({item,setimgNum})=>{
            return(
                <div style={{width:"40px",height:"40px",marginRight:"8px",backgroundImage:`url(${item.imageUrl})`,cursor:"pointer",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}
                onClick={()=>{setimgNum(item.id)}}>      
                </div>
            )
        }
        return(
           <div style={{width:"512px",padding:"24px",alignItems:"center",backgroundColor:"#fff",position:"relative",borderBottom:"1px solid #e5e5e5"}}>
               <div style={{
                   width:"464px",height:"261px",backgroundImage:productInfo.image.length!==0&&`url(${productInfo.image[imgNum].imageUrl})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",
                   border:productInfo.image.length===0&&"1px dashed #e5e5e5"}}></div>
               <div style={{display:"flex",marginTop:"16px",marginBottom:"24px"}}>
                {productInfo.image.map((item)=>(<ImageArray item={item} key={item.id} setimgNum={setimgNum}></ImageArray>))}
               </div>
               <div style={{width:"464px",position:"relative",marginBottom:"24px"}}>
                    <ReactQuill theme=""
                    value={productInfo.mainText} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%",display:"flex",flexDirection:"column"}}></ReactQuill>
                    <div style={{width:"100%",height:"100%",position:'absolute',top:0,left:0}}></div>
               </div>
               <div style={{display:"flex"}}>
                    <div className="btn_three" style={{width:"84px",height:"40px",marginRight:"4px"}}>카카오톡</div>
                    <div className="btn_three" style={{width:"84px",height:"40px",marginRight:"4px"}}>페이스북</div>
                    <div className="btn_three" style={{width:"84px",height:"40px",marginRight:"4px"}}>트위터</div>
                    <div className="btn_three" style={{width:"84px",height:"40px",marginRight:"4px"}}>링크복사</div>
               </div>
            </div>
        )
    }

    const Page3_preview=({productInfo})=>{

        return(
            <div style={{width:"512px",padding:"24px",alignItems:"center",backgroundColor:"#fff",position:"relative",borderBottom:"1px solid #e5e5e5"}}>
                <div style={{display:"flex"}}>
                    <div style={{width:"36px",height:"36px",borderRadius:"50%",marginRight:"20px",
                    backgroundImage:`url(${"https://www.proveit.co.kr"+JSON.parse(localStorage.getItem("userInfo")).thumbnail})`,backgroundColor:"#c4c4c4",
                    backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}></div>
                        <div>
                            <div style={{display:"flex",position:"relative",marginBottom:"5px"}}>   
                                <div style={{fontWeight:"bold",color:'#505050',lineHeight:"20px",height:"20px",fontSize:'14px',marginRight:"6px"}}>{productInfo.producerInfo.nick}</div>
                                <div style={{color:'#9c31c6',lineHeight:"16px",height:"16px",fontSize:'10px',textAlign:"center",width:"48px",borderRadius:"8px",backgroundColor:"#f1f1f1"}}>제작자</div>
                            </div>
                            <div style={{fontSize:"14px",color:"#a5a5a5",textAlign:"left",marginBottom:"8px"}}>{productInfo.producerInfo.position},{productInfo.producerInfo.department}</div>
                            <div style={{width:"408px",position:"relative",marginBottom:"16px"}}>
                                <ReactQuill theme=""
                                value={productInfo.comment[0].text} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%"}}></ReactQuill>
                                <div style={{width:"100%",height:"100%",position:'absolute',top:0,left:0}}></div>
                            </div>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{color:"#a5a5a5",fontSize:"14px",marginRight:"22px"}}>답글</div>
                                {/* <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_likeBtn})`,marginRight:"4px",backgroundPosition:"center",backgroundSize:"100% 100%"}}></div>
                                <div style={{color:"#a5a5a5",fontSize:"14px",}}>추천(0)</div> */}
                            </div>
                    </div>
                </div>
            </div>
        )
    }

      const inputLogic =(e)=>{
        const {name,value}=e.target;

        setProductInfo({
            ...productInfo,
            [name]:value
        })
      }

      useEffect(()=>{
        if(JSON.parse(localStorage.getItem("userInfo"))){
            setProductInfo(
                {
                    ...productInfo,
                    producerInfo:JSON.parse(localStorage.getItem("userInfo"))
                }
            )
            setRenderState(true);
        }else{
            const alink = document.createElement("a");
            alink.href = "/";
            alink.click();
        }

      },[])

    const productRegisterApi = async()=>{
        var data = new FormData();
        data.append('produce_info', JSON.stringify(productInfo.producerInfo));
        data.append('title', productInfo.title);
        data.append('sub_title', productInfo.subTitle);
        data.append('like_count', productInfo.likeCount);
        data.append('main_text', productInfo.mainText);
        data.append('payment_type', productInfo.paymentType);
        data.append('category', productInfo.category);
        data.append('image', JSON.stringify(productInfo.image));
        data.append('comment',productInfo.comment[0].text);
        data.append('link', productInfo.link);
        data.append('thumbnail', productInfo.thumbnail);
        data.append('youtube', productInfo.youtube);
        data.append('user_email', localStorage.getItem("email"));
        data.append('user_name',localStorage.getItem("userName"));
        data.append('hash', localStorage.getItem("hash"));
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/productRegister.php",
                data:data
    
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    const alink = document.createElement("a");
                    alink.href="/profile";
                    alink.click();
                }else{
                    
                }
            })
        }catch{
    
        }
    }

    const imgUploadApi = async(img,id)=>{
        var data = new FormData();
        data.append('img', img);
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/imgUpload.php",
                data:data
    
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    if(id==="thumbnailImg"){
                        setProductInfo(
                            {
                                ...productInfo,
                                thumbnail:"https://www.proveit.co.kr"+e.data.img
                            }
                        )
                    }else{
                        if(productInfo.image.length!==6){
                            setProductInfo(
                                {
                                    ...productInfo,
                                    image:[
                                        ...productInfo.image,
                                        {
                                            id:productInfo.image.length+1,
                                            type:"img",
                                            imageUrl:"https://www.proveit.co.kr"+e.data.img
                                        }
    
                                    ]
                                }
                            )
                        }
                    }
                }else{
                }
            })
        }catch{
    
        }
    }


    const FileUploder =(e) =>{
    e.preventDefault();
    let data = e.target;
    if(data.files[0].type === "image/jpeg" ||data.files[0].type ===  "image/png" ||data.files[0].type ===  "image/jpg"){
        if (data.files) {
        for (let i = 0; i < data.files.length; i++) {
            let file = data.files[i];           
                let fileSize = file.size;
                fileSize *= 1;
                if(fileSize <= 10000000){
                    imgUploadApi(data.files[0],e.target.id);
                }else{
                    alert("파일 크기가 너무 큽니다.");
                }
            }
            }
    }
    else{
        alert("해당 파일은 사용할 수 없습니다.");
    } 
    //input 내부 값 초기화
    e.target.value = "";
    }

    const ProductImgRender = ({setImgHover,productInfo,setProductInfo,item,styled})=>{
        return(
            <div style={{
                border:"1px dashed #e5e5e5",
                width: "40px",
                height: "40px",
                position:"relative",
                borderRadius:"2px",
                backgroundRepeat:"no-repeat",
                backgroundPosition:"center",
                backgroundImage:`url(${item.imageUrl})`,
                backgroundSize:"cover",
                marginRight:"8px"}} 
                onMouseLeave={()=>{setImgHover("");}}
                onMouseEnter={()=>{setImgHover(item.id)}}>
                {imgHover===item.id&&<div style={styled.imgRemoveBtn}
                onClick={()=>{setProductInfo(
                    {
                        ...productInfo,
                        image:productInfo.image.filter(list=>list.id!==item.id)
                    }
                )}}></div>}
            </div>)
    }

      return(
          <>
          {renderState&&<div style={{width:"100%",height:'100%',backgroundColor:"#F9F9F9",display:"flex",justifyContent:"center",paddingTop:"40px"}}
          onClick={()=>{setCategoryWindowState(false);}}>
              <div style={{width:"1040px",display:"flex"}}>
                  <div style={{width:"512px",marginRight:"16px"}}>
                      <div style={{color:"#505050",fontSize:"14px",marginBottom:'16px',textAlign:"left"}}>프로젝트 기본정보 등록 ({pageNum}/3)</div>
                      {pageNum===1&&<div style={{width:"100%",padding:"24px 24px 32px 24px",backgroundColor:"#fff"}}>
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>사이트 주소 및 다운로드 링크<span style={{color:"#ED5C2E"}}>*</span></div>
                                            <input name="link" value={productInfo.link} style={styled.input} placeholder="https://" onChange={inputLogic}></input>
                                        </div>
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>서비스 이름<span style={{color:"#ED5C2E"}}>*</span></div>
                                            <input name="title" value={productInfo.title} style={styled.input} placeholder="서비스 이름" onChange={inputLogic}></input>
                                        </div>
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>한 줄 소개<span style={{color:"#ED5C2E"}}>*</span></div>
                                            <input name="subTitle" value={productInfo.subTitle} style={styled.input} placeholder="서비스를 한 줄로 요약해서 설명해주세요." onChange={inputLogic}></input>
                                        </div>
                                        <div style={{marginBottom:"24px",position:"relative"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>카테고리<span style={{color:"#ED5C2E"}}>*</span></div>
                                            <div name="category" style={styled.dropBox} onClick={(e)=>{setCategoryWindowState(!categoryWindowState);e.stopPropagation();}}>
                                                {categoryNum===0?"카테고리를 선택하세요":categoryList[categoryNum-1].text}
                                                <div style={{position:"absolute",width:"24px",height:'24px',right:"16px",top:"8px",backgroundImage:`url(${icon_dropBox})`}}></div>
                                            </div>
                                            {categoryWindowState&&<div style={{padding:"8px 0px 8px 0px",backgroundColor:"#fff",height:"320px",overflow:"scroll",overflowX:"hidden",position:"absolute",width:"100%",top:"24px"}}>
                                                {categoryList.map((item)=>(<CategoryRender key={item.id} item={item} setCategoryWindowState={setCategoryWindowState} setCategoryNum={setCategoryNum} productInfo={productInfo} setProductInfo={setProductInfo} categoryNum={categoryNum}></CategoryRender>))}
                                            </div>}
                                        </div>
                                        <div style={{marginBottom:"32px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>이 서비스는 ...</div>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:productInfo.paymentType==="무료"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                                onClick={(e)=>{setProductInfo({...productInfo,paymentType:"무료"});e.stopPropagation();}}></div>
                                                <div style={{fontSize:"14px",color:'#505050',marginRight:"24px",height:"14px",lineHeight:"14px"}}>무료입니다.</div>
                                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:productInfo.paymentType==="유료"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                                onClick={(e)=>{setProductInfo({...productInfo,paymentType:"유료"});e.stopPropagation();}}></div>
                                                <div style={{fontSize:"14px",color:'#505050',marginRight:"24px",height:"14px",lineHeight:"14px"}}>유료입니다.</div>
                                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:productInfo.paymentType==="부분 유료"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                                onClick={(e)=>{setProductInfo({...productInfo,paymentType:"부분 유료"});e.stopPropagation();}}></div>
                                                <div style={{fontSize:"14px",color:'#505050',marginRight:"24px",height:"14px",lineHeight:"14px"}}>일부 유료입니다.</div>
                                            </div>
                                        </div>
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>썸네일<span style={{color:"#ED5C2E"}}>*</span></div>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div style={{width:"88px",height:"88px",borderRadius:"2px",backgroundImage:productInfo.thumbnail===""?`url(${icon_noneimg})`:`url(${productInfo.thumbnail})`,border:"1px dashed #c4c4c4",marginRight:"12px",
                                                            backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}></div>
                                                <div style={{textAlign:"left"}}>
                                                    <form style={{display:"block"}}>
                                                        <input type='file' id="thumbnailImg" style={{display:"none"}}  accept=".jpg,.jpeg,.png,.bmp" onChange={FileUploder}></input>
                                                        <label for="thumbnailImg" className="btn_three" style={{fontSize:"13px",width:"112px",height:"32px",marginBottom:"16px"}}>이미지 업로드
                                                        </label>
                                                    </form>
                                                    <div style={{fontSize:"13px",color:"#a5a5a5",lineHeight:"18.82px"}}>추천 사이즈 : 240*240<br/>jpg, jpeg, png, gif, 최대 파일크기 2MB</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                      {pageNum===2&&<div style={{width:"100%",padding:"24px 24px 32px 24px",backgroundColor:"#fff"}}>
                            <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>대표 이미지<span style={{color:"#ED5C2E"}}>*</span></div>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <form style={{display:"block"}}>
                                                            <input type='file' id="productImg" style={{display:"none"}}  accept=".jpg,.jpeg,.png,.bmp" onChange={FileUploder}></input>
                                                            <label for="productImg" className="btn_three" style={{width:"120px",height:"40px"}}>이미지 등록
                                                            </label>
                                                </form>
                                                <div style={{marginLeft:"16px",fontSize:'13px',color:"#a5a5a5"}}>{`최대 6장 등록 가능(${productInfo.image.length}/6)`}</div>
                                            </div>
                                        </div>
                                        <div style={{marginBottom:"16px",display:"flex"}}>
                                            {productInfo.image.length!==0&&productInfo.image.map((item)=>(<ProductImgRender 
                                            item={item}
                                            setImgHover={setImgHover}
                                            productInfo={productInfo}
                                            setProductInfo={setProductInfo}
                                            styled={styled}
                                            />))}
                                            {productInfo.image.length===0&&
                                            <div style={{
                                                border:"1px dashed #e5e5e5",
                                                width: "40px",
                                                height: "40px",
                                                position:"relative",
                                                borderRadius:"2px",
                                                backgroundRepeat:"no-repeat",
                                                backgroundPosition:"center",
                                                backgroundSize:"cover",
                                                marginRight:"8px"}} 
                                                onMouseLeave={()=>{setImgHover(0);}}
                                                onMouseEnter={()=>{setImgHover(1)}}>
                                                {imgHover===1&&<div style={styled.imgRemoveBtn}></div>}
                                            </div>}
                                        </div>
                                        <div style={{marginBottom:"33px",fontSize:"13px",lineHeight:"13px",height:'13px',color:"#a5a5a5"}}>추천 사이즈 : 1280*720 (16:9) jpg, png, gif, 최대 파일크기 각 2MB, 최소 1장 필수</div>
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>서비스 설명<span style={{color:"#ED5C2E"}}>*</span></div>
                                            <ReactQuill className="quillInput" value={productInfo.mainText}  placeholder="내용을 입력해주세요. 공백 포함 280자까지 입력할 수 있습니다."
                                             theme="" onChange={(e)=>{setProductInfo({...productInfo,mainText:e})}} style={{width:"464px",fontSize:"13px",position:"relative",height:"168px",textAlign:"left",padding:"16px",overflow:"auto"}}></ReactQuill>
                                        </div>     
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>유튜브 동영상 링크</div>
                                            <input name="youtube" value={productInfo.youtube} style={styled.input} placeholder="유튜브 주소를 입력해주세요" onChange={inputLogic}></input>
                                        </div>  
                                    </div>}
                      {pageNum===3&&<div style={{width:"100%",padding:"24px 24px 32px 24px",backgroundColor:"#fff"}}>
                            <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>첫번째 댓글을 써보세요</div>
                                            <ReactQuill className="quillInput" placeholder="내용을 입력해주세요. 공백 포함 280자까지 입력할 수 있습니다."
                                            value={productInfo.comment[0].text}
                                             theme="" onChange={(e)=>{
                                                 setProductInfo(
                                                     {...productInfo,
                                                        comment:[{...productInfo,text:e}]})}} style={{width:"464px",position:"relative",height:"168px",textAlign:"left",border:"1px solid #e5e5e5",fontSize:'13px',padding:"16px",overflow:"auto"}}></ReactQuill>
                                        </div>
                            </div>}
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:""}}>
                          {!dataState&&<div style={{width:"10px"}}></div>}
                          {dataState&&<div style={{color:'#EA4335',fontSize:"13px"}}>필수 항목을 빠짐없이 입력해 주세요.</div>}
                          <div style={{display:"flex",flexDirection:"row-reverse"}}>
                            {pageNum!==3&&<div className="btn_one" style={{marginTop:"16px",width:"72px",height:"32px"}} onClick={(e)=>{
                                if(pageNum===1){
                                    if(productInfo.link===""||productInfo.title===""||productInfo.subTitle===""||productInfo.category===""||productInfo.thumbnail===""){
                                        setDataState(true);
                                    }else{
                                        setPageNum(pageNum+1);
                                        setDataState(false);
                                    }
                                }else if(pageNum===2){
                                    if(productInfo.image.length===0||productInfo.mainText===""){
                                        setDataState(true);
                                    }else{
                                        setPageNum(pageNum+1);
                                        setDataState(false);
                                    }
                                }
                                
                                e.stopPropagation();
                                }}>다음</div>}
                            {pageNum===3&&<div className="btn_one" style={{marginTop:"16px",width:"96px",height:"32px"}} onClick={(e)=>{setRegisterState(true);e.stopPropagation();}}>등록하기</div>}
                            {pageNum!==1&&<div className="btn_three" style={{marginTop:"16px",width:"72px",height:"32px",marginRight:"8px"}} onClick={(e)=>{setPageNum(pageNum-1);e.stopPropagation();}}>이전</div>}
                          </div>
                      </div>

                  </div>
                  <div style={{width:"512px"}}>
                      <div style={{color:"#505050",fontSize:"14px",marginBottom:'16px',textAlign:"left"}}>미리보기</div>
                      {pageNum===1&&<Page1_preview productInfo={productInfo}></Page1_preview>}
                      {pageNum===2&&<Page2_preview productInfo={productInfo}></Page2_preview>}
                      {pageNum===3&&<Page3_preview productInfo={productInfo}></Page3_preview>}
                  </div>
              </div>
          </div>}
          {registerState&&<div style={{width:"100%",height:"100%",position:"absolute",backgroundColor:"rgba(80,80,80,0.4)",display:"flex",justifyContent:"center"}}
            onClick={(e)=>{setRegisterState(false);e.stopPropagation();}}>
                <div style={{width:"336px",height:"144px",backgroundColor:"#fff",display:"flex",alignItems:"center",flexDirection:"column",marginTop:"179px"}}>
                    <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginTop:"32px"}}>프로젝트를 등록하시겠습니까?</div>
                    <div style={{display:"flex",marginTop:"24px"}}>
                        <div className="btn_two" style={{width:"120px",height:"40px",marginRight:"8px"}} onClick={(e)=>{setRegisterState(false);e.stopPropagation();}}>취소</div>
                        <div className="btn_one" style={{width:"120px",height:"40px"}} onClick={()=>{productRegisterApi();}}>예, 등록합니다</div>
                    </div>
                </div>
            </div>}
          </>
      )
}

const RegisterProduct = ()=>{
    const [loginWindow,setLoginWindow] = useState(false);
    const [modal,setModal] = useState(false);
    return(
    <div style={{width:"100%",height:"100vh",display:"flex",flexDirection:"column"}}>
    <Header 
    setLoginWindow={setLoginWindow}
    loginWindow={loginWindow}
    modal={modal}
    setModal={setModal}
    ></Header>
    <Body
    ></Body>
    </div>  
  )
}

export default RegisterProduct;