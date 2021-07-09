import React, { useEffect, useRef, useState } from 'react';

import icon_logo from '../../image/logo.svg';
import icon_like from '../../image/likeIcon.svg';
import icon_comment from '../../image/commentIcon.svg';
import icon_checked from '../../image/icon_checked.svg';
import icon_dropBox from '../../image/icon_dropBox.svg';
import icon_radioChecked from '../../image/icon_radioChecked.svg';
import icon_radioUnChecked from '../../image/icon_radioUnChecked.svg';
import icon_noneimg from '../../image/icon_noneimg.svg';
import icon_imgRemoveBtn from '../../image/icon_imgRemoveBtn.svg';
import icon_likeBtn from '../../image/icon_likeBtn.svg';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header=({setModal,modal,setLoginWindow,setSignUpWindow})=>{
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
    return(
        <>
        <div id="header" style={{width:"100%",height:"48px",backgroundColor:"#fff",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"48px"}}>
            <div style={{width:"1040px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>  
                    <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                    <div>
                {sessionStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <div style={{marginRight:"16px",fontSize:"14px",color:"#828282",cursor:"pointer"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                    <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                    </div>
                }
                {sessionStorage.getItem("hash")!==null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <Link to="/registerproduct"><div style={{marginRight:"16px",fontSize:"14px",color:"#505050",cursor:"pointer"}}>프로젝트 등록하기</div></Link>
                    <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:sessionStorage.getItem("userInfo")&&`url(${"http://www.proveit.co.kr/"+JSON.parse(sessionStorage.getItem("userInfo")).thumbnail})`
                    ,backgroundColor:"#c5c5c5",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
                    </div>
                }  
            </div>
  
            </div>
        </div>
        <div id="header" style={{width:"100%",height:"48px",backgroundColor:"#fff",position:"fixed",top:"-48px",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"48px",
                                transform:`translate(0,${header}px)`,transition:"0.3s",zIndex:"9999"}}>
            <div style={{width:"1040px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>  
                    <Link to="/"><div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`}}></div></Link>
                    <div>
                {sessionStorage.getItem("hash")===null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <div style={{marginRight:"16px",fontSize:"14px",color:"#828282",cursor:"pointer"}} onClick={()=>{setSignUpWindow(true);}}>회원가입</div>
                    <div className="btn_one" style={{width:"72px",height:"32px"}} onClick={()=>{setLoginWindow(true);}}>로그인</div>
                    </div>
                }
                {sessionStorage.getItem("hash")!==null&&<div style={{display:"flex",alignItems:"center",zIndex:"999"}}>
                    <Link to="/registerproduct"><div style={{marginRight:"16px",fontSize:"14px",color:"#505050",cursor:"pointer"}}>프로젝트 등록하기</div></Link>
                    <div className="btn_one" style={{width:"36px",height:"36px",borderRadius:"50%",backgroundImage:sessionStorage.getItem("userInfo")&&`url(${"http://www.proveit.co.kr/"+JSON.parse(sessionStorage.getItem("userInfo")).thumbnail})`
                    ,backgroundColor:"#c5c5c5",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:'no-repeat'}} onClick={(e)=>{setModal(!modal);e.stopPropagation()}}></div>
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
            onClick={()=>{sessionStorage.clear();}}>로그아웃</div>
            </div>}
            </div>
        </div>
        </>
    )
}

const Body=()=>{
      const [pageNum,setPageNum] = useState(1);
      const [renderState,setRenderState] =useState(false); 
      const imgNum = useRef(0);
      const [productInfo,setProductInfo] =useState({
        id:0,
        producerInfo:{
            userId:"",
            nickName:"",   
            profileUrl:"",
            belong:"",
            position:""
        },
        title:"",
        sub_title:"",
        like_count:0,
        main_text:".",
        payment_type:"",
        category:"",
        image:[
            {id:0,imageUrl:"0"},
            {id:1,imageUrl:"1"},
            {id:2,imageUrl:"2"},
            {id:3,imageUrl:"3"},
            {id:4,imageUrl:"4"},
        ],
        link:"",
        thumbnail:"",
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
            border:"1px solid #e5e5e5",
            width:"464px",
            height: "40px",
            padding:"13px 12px 14px 12px",
            color:"#a5a5a5",
            borderRadius:"2px",
            backgroundColor:"#fff",
            fontSize:'13px'
        },
        dropBox:{
            border:"1px solid #e5e5e5",
            width:"464px",
            height: "40px",
            padding:"0px 12px 0px 12px",
            color:"#a5a5a5",
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
                 backgroundColor:(item.text===productInfo.category||hover===item.id)&&"rgba(156,49,198,0.1)",
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
            <div style={{width:"88px",marginLeft:"16px",height:"88px",marginRight:"16px",backgroundImage:`url(${productInfo.thumbnail})`,backgroundColor:"#000",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}></div>
            <div style={{width:"292px",textAlign:"left",marginRight:"24px"}}>
              <div style={{color:"#505050",height:"16px",fontWeight:"bold",fontSize:'16px',marginBottom:"12px",lineHeight:"16px",overflow:"hidden"}}>{productInfo.title}</div>
              <div style={{color:"#828282",height:"14px",fontSize:'13px',marginBottom:'16px',lineHeight:"14px",overflow:"hidden"}}>{productInfo.sub_title}</div>
              <div style={{display:"flex",height:"24px",alignItems:"center"}}>
                <div style={{padding:"3.5px 5px 3.5px 5px",maxHeight:"24px",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px",backgroundColor:"#F1F1F1"}}>
                  <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_comment})`,marginRight:"8px"}}></div>
                  <div>{"00"}</div>
                </div>
                <div style={{height:"100%",fontSize:"13px",display:"flex",justifyContent:"center",alignItems:"center",color:"#828282",marginRight:"8px"}}>{productInfo.payment_type}</div>
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
                <div style={{width:"40px",height:"40px",marginRight:"8px",backgroundImage:`url(${item.imageUrl})`,backgroundColor:"#ff0",cursor:"pointer",backgroundSize:"cover",backgroundPosition:"center"}}
                onClick={()=>{setimgNum(item.id)}}>      
                </div>
            )
        }
        return(
           <div style={{width:"512px",padding:"24px",alignItems:"center",backgroundColor:"#fff",position:"relative",borderBottom:"1px solid #e5e5e5"}}>
               <div style={{
                   width:"464px",height:"261px",backgroundColor:"#ff0",backgroundImage:productInfo.image.length!==0&&`url(${productInfo.image[imgNum].imageUrl})`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
               <div style={{display:"flex",marginTop:"16px",marginBottom:"24px"}}>
                {productInfo.image.map((item)=>(<ImageArray item={item} key={item.id} setimgNum={setimgNum}></ImageArray>))}
               </div>
               <div style={{width:"464px",position:"relative",marginBottom:"24px"}}>
                    <ReactQuill theme=""
                    value={productInfo.main_text} style={{textAlign:"left",color:"#505050",fontSize:'14px',width:"100%",display:"flex",flexDirection:"column"}}></ReactQuill>
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

    const inputLogic =(e)=>{
    const {name,value}=e.target;

    setProductInfo({
        ...productInfo,
        [name]:value
    })
    }

    const productListApi = async()=>{
        var data = new FormData();
        data.append("product_id",window.location.search.substring(12));
        data.append("user_email",sessionStorage.getItem("email"));
        data.append("hash",sessionStorage.getItem("hash"));
        try{
            await axios({
                method:"post",
                url : "http://proveit.co.kr/api/productList.php",
                data:data
    
            }).then((e)=>{
                console.log(e);
                if(e.data.ret_code === "0000"){
                    const data = e.data.product;
                    setProductInfo({
                        id:data.id,
                        produce_info:JSON.parse(data.produce_info),
                        title:data.title,
                        sub_title:data.sub_title,
                        like_count:data.like_count,
                        main_text:data.main_text,
                        payment_type:data.payment_type,
                        category:data.category,
                        image:JSON.parse(data.image),
                        link:data.link,
                        thumbnail:data.thumbnail,
                        like_m:data.like_m,
                    });
                    setRenderState(true);
                }
            })
        }catch{
    
        }
    }

    const productRegisterApi = async()=>{
        var data = new FormData();
        data.append('produce_info', JSON.stringify(productInfo.produce_info));
        data.append('title', productInfo.title);
        data.append('sub_title', productInfo.sub_title);
        data.append('like_count', productInfo.like_count);
        data.append('main_text', productInfo.main_text);
        data.append('payment_type', productInfo.payment_type);
        data.append('category', productInfo.category);
        data.append('image', JSON.stringify(productInfo.image));
        data.append('link', productInfo.link);
        data.append('thumbnail', productInfo.thumbnail);
        data.append('youtube', productInfo.youtube);
        data.append('user_email', sessionStorage.getItem("email"));
        data.append('user_name',sessionStorage.getItem("userName"));
        data.append('hash', sessionStorage.getItem("hash"));
        data.append('product_id', window.location.search.substring(12));
        try{
            await axios({
                method:"post",
                url : "http://proveit.co.kr/api/productRegister.php",
                data:data
    
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    console.log(e);
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
                url : "http://proveit.co.kr/api/imgUpload.php",
                data:data
    
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    if(id==="thumbnailImg"){
                        setProductInfo(
                            {
                                ...productInfo,
                                thumbnail:`http://proveit.co.kr/${e.data.img}`
                            }
                        )
                    }else{
                        setProductInfo(
                            {
                                ...productInfo,
                                image:[
                                    ...productInfo.image,
                                    {
                                        id:productInfo.image.length,
                                        imageUrl:`http://proveit.co.kr/${e.data.img}`
                                    }

                                ]
                            }
                        )
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
    useEffect(()=>{
        productListApi();
      },[])

      return(
          <>
          {renderState&&<div style={{width:"100%",height:'100%',backgroundColor:"#F9F9F9",display:"flex",justifyContent:"center",paddingTop:"40px"}}
          onClick={()=>{setCategoryWindowState(false);}}>
              <div style={{width:"1040px",display:"flex"}}>
                  <div style={{width:"512px",marginRight:"16px"}}>
                      <div style={{color:"#505050",fontSize:"14px",marginBottom:'16px',textAlign:"left"}}>프로젝트 기본정보 등록 ({pageNum}/2)</div>
                      {pageNum===1&&<div style={{width:"100%",padding:"24px 24px 32px 24px",backgroundColor:"#fff"}}>
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>사이트 주소 및 다운로드 링크<span style={{color:"#f00"}}>*</span></div>
                                            <input name="link" value={productInfo.link} style={styled.input} placeholder="https://" onChange={inputLogic}></input>
                                        </div>
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>서비스 이름<span style={{color:"#f00"}}>*</span></div>
                                            <input name="title" value={productInfo.title} style={styled.input} placeholder="서비스 이름" onChange={inputLogic}></input>
                                        </div>
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>한 줄 소개<span style={{color:"#f00"}}>*</span></div>
                                            <input name="sub_title" value={productInfo.sub_title} style={styled.input} placeholder="서비스를 한 줄로 요약해서 설명해주세요." onChange={inputLogic}></input>
                                        </div>
                                        <div style={{marginBottom:"24px",position:"relative"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>카테고리<span style={{color:"#f00"}}>*</span></div>
                                            <div name="category" style={styled.dropBox} onClick={(e)=>{setCategoryWindowState(!categoryWindowState);e.stopPropagation();}}>
                                                {productInfo.category}
                                                <div style={{position:"absolute",width:"24px",height:'24px',right:"16px",top:"8px",backgroundImage:`url(${icon_dropBox})`}}></div>
                                            </div>
                                            {categoryWindowState&&<div style={{padding:"8px 0px 8px 0px",backgroundColor:"#fff",height:"320px",overflow:"scroll",overflowX:"hidden",position:"absolute",width:"100%",top:"24px"}}>
                                                {categoryList.map((item)=>(<CategoryRender key={item.id} item={item} setCategoryWindowState={setCategoryWindowState} setCategoryNum={setCategoryNum} productInfo={productInfo} setProductInfo={setProductInfo} categoryNum={categoryNum}></CategoryRender>))}
                                            </div>}
                                        </div>
                                        <div style={{marginBottom:"32px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>이 서비스는 ...</div>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:productInfo.payment_type==="무료"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                                onClick={(e)=>{setProductInfo({...productInfo,payment_type:"무료"});e.stopPropagation();}}></div>
                                                <div style={{fontSize:"14px",color:'#505050',marginRight:"24px",height:"14px",lineHeight:"14px"}}>무료입니다.</div>
                                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:productInfo.payment_type==="유료"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                                onClick={(e)=>{setProductInfo({...productInfo,payment_type:"유료"});e.stopPropagation();}}></div>
                                                <div style={{fontSize:"14px",color:'#505050',marginRight:"24px",height:"14px",lineHeight:"14px"}}>유료입니다.</div>
                                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:productInfo.payment_type==="부분 유료"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                                onClick={(e)=>{setProductInfo({...productInfo,payment_type:"부분 유료"});e.stopPropagation();}}></div>
                                                <div style={{fontSize:"14px",color:'#505050',marginRight:"24px",height:"14px",lineHeight:"14px"}}>일부 유료입니다.</div>
                                            </div>
                                        </div>
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>썸네일<span style={{color:"#505005"}}>*</span></div>
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
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>대표 이미지<span style={{color:"#f00"}}>*</span></div>
                                            <form style={{display:"block"}}>
                                                        <input type='file' id="productImg" style={{display:"none"}}  accept=".jpg,.jpeg,.png,.bmp" onChange={FileUploder}></input>
                                                        <label for="productImg" className="btn_three" style={{width:"120px",height:"40px"}}>이미지 등록
                                                        </label>
                                            </form>
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
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>서비스 설명<span style={{color:"#f00"}}>*</span></div>
                                            <ReactQuill value={productInfo.main_text}  placeholder="내용을 입력해주세요. 공백 포함 280자까지 입력할 수 있습니다."
                                             theme="" onChange={(e)=>{setProductInfo({...productInfo,main_text:e})}} style={{width:"464px",position:"relative",height:"168px",textAlign:"left",border:"1px solid #e5e5e5",padding:"16px",overflow:"auto"}}></ReactQuill>
                                        </div>     
                                        <div style={{marginBottom:"16px"}}>
                                            <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>유튜브 동영상 링크</div>
                                            <input name="youtube" value={productInfo.youtube} style={styled.input} placeholder="유튜브 주소를 입력해주세요" onChange={inputLogic}></input>
                                        </div>  
                                    </div>}
                      <div style={{display:"flex",flexDirection:"row-reverse"}}>
                          {pageNum!==2&&<div className="btn_one" style={{marginTop:"16px",width:"72px",height:"32px"}} onClick={(e)=>{setPageNum(pageNum+1);e.stopPropagation();}}>다음</div>}
                          {pageNum===2&&<div className="btn_one" style={{marginTop:"16px",width:"96px",height:"32px"}} onClick={(e)=>{setRegisterState(true);e.stopPropagation();}}>수정하기</div>}
                          {pageNum!==1&&<div className="btn_three" style={{marginTop:"16px",width:"72px",height:"32px",marginRight:"8px"}} onClick={(e)=>{setPageNum(pageNum-1);e.stopPropagation();}}>이전</div>}
                      </div>

                  </div>
                  <div style={{width:"512px"}}>
                      <div style={{color:"#505050",fontSize:"14px",marginBottom:'16px',textAlign:"left"}}>미리보기</div>
                      {pageNum===1&&<Page1_preview productInfo={productInfo}></Page1_preview>}
                      {pageNum===2&&<Page2_preview productInfo={productInfo}></Page2_preview>}
                  </div>
              </div>
          </div>}
          {registerState&&<div style={{width:"100%",height:"100%",position:"absolute",backgroundColor:"rgba(80,80,80,0.4)",display:"flex",justifyContent:"center"}}
            onClick={(e)=>{setRegisterState(false);e.stopPropagation();}}>
                <div style={{width:"336px",height:"235px",backgroundColor:"#fff",display:"flex",alignItems:"center",flexDirection:"column",marginTop:"179px"}}>
                    <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px",marginTop:"32px"}}>프로젝트를 등록하시겠습니까?</div>
                    <div style={{fontSize:"13px",color:'#505050',lineHeight:'23px',textAlign:"center"}}>
                        프로젝트는<br/>
                        <span style={{color:"#9C31C6"}}>{registerDate.year}년 {registerDate.month}월 {registerDate.date}일 12:00</span>에<br/> 
                        오픈됩니다.
                    </div>
                    <div style={{display:"flex",marginTop:"24px"}}>
                        <div className="btn_two" style={{width:"120px",height:"40px",marginRight:"8px"}} onClick={(e)=>{setRegisterState(false);e.stopPropagation();}}>취소</div>
                        <div className="btn_one" style={{width:"120px",height:"40px"}} onClick={()=>{productRegisterApi();}}>예, 등록합니다</div>
                    </div>
                </div>
            </div>}
          </>
      )
}

const ModifyProduct = ()=>{
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

export default ModifyProduct;