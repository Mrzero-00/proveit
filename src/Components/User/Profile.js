import React, { useEffect, useState } from 'react';

import icon_profileModify from '../../image/icon_profileModify.svg';
import icon_radioChecked from '../../image/icon_radioChecked.svg';
import icon_radioUnChecked from '../../image/icon_radioUnChecked.svg';
import icon_profile_item_comment from '../../image/icon_profile_item_comment.png';
import icon_profile_item_like from '../../image/icon_profile_item_like.png';
import icon_profile_notItem from '../../image/icon_profile_notItem.png';
import icon_checked from '../../image/icon_checked.svg';
import icon_dropBox from '../../image/icon_dropBox.svg';
import icon_leaveUnChecked from '../../image/icon_leaveUnChecked.svg';
import icon_leaveChecked from '../../image/icon_leaveChecked.svg';
import icon_profile_commentIcon from '../../image/icon_profile_commentIcon.png';

import icon_review_title from '../../image/icon_review_title.svg';
import icon_community_title_icon from '../../image/icon_community_title_icon.png';

import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import Header from '../Common/Header';


const Body =()=>{
    const [render,setRender] =useState(false);
    const [pageNum,setPageNum] =useState(0);
    const [reasonWindow,setReasonWindow] = useState(false);
    const [reasonNum,setReasonNum] = useState(0);
    const [userLeaveState,setUserLeaveState] =useState(false);
    const [currentImg,setCurrentImg] =useState("");
    const [leaveWindow,setLeaveWindow] = useState(false);
    const [myProducts,setMyProducts] =useState([]);
    const [likelyProducts,setLikelyProducts] =useState([]);
    const [myReply,setMyReply] =useState([]);
    const [productNum,setProductNum] =useState({
        like:0,
        introduce:0,
        make:0,
        community:0
    });

    const [nickCheck,setNickCheck] = useState(false);
    const [renderList,setRenderList]= useState("like");
    const [modifyState,setModifyState]= useState(false);
    const [profileInofo,setProfileInofo]= useState(false);
    const [rendering,setrendering] =useState(false);
    const [currentUserInfo,setCurrentUserInfo] = useState(
        {
            userId:"dkdk@gmail.com",
            name:"아무개",
            nickName:"아무개",
            belong:"한국",
            position:"직장인",
            profileUrl:"",
            comment:"",
            likeProject:"",
            registerProject:"",
            newLetterState:false
        }
    )

    const reasonList =[
        {id:1,text:"자주 사용하지 않아요"},
        {id:2,text:"이용이 불편하고 장애가 많아요"},
        {id:3,text:"다른 사이트가 더 좋아요"},
        {id:4,text:"중복 계정이 있어요"},
    ]

    const styled={
        input:{
            border:"1px solid #e5e5e5",
            width:"464px",
            height: "40px",
            padding:"13px 12px 14px 12px",
            color:"#505050",
            borderRadius:"2px",
            backgroundColor:"#fff",
            fontSize:'13px',
            marginBottom:"16px"
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
    }

    const ReasonRender =({item,reasonNum,setReasonNum,setReasonWindow})=>{
        const [hover,setHover] =useState(reasonNum);
        return(
            <div style={{
                width:"100%",
                height:"40px",
                fontSize:"14px",
                lineHeight:"40px",
                paddingLeft:"16px",
                color:"#505050",
                backgroundColor:(reasonNum===item.id||hover===item.id)&&"rgba(156,49,198,0.1)",
                position:"relative",
                cursor:"pointer"}}
                onClick={(e)=>{setReasonNum(item.id);setReasonWindow(false);e.stopPropagation()}}
                onMouseLeave={()=>{setHover(reasonNum)}}
                onMouseOver={()=>{setHover(item.id)}}
                >
                {item.text}
                {item.id===reasonNum&&<div style={{width:"24px",height:"24px",position:"absolute",top:"8px",right:"16px",backgroundImage:`url(${icon_checked})`,backgroundRepeat:"no-repeat",backgroundPosition:"center"}}></div>}
            </div>
        )
    }

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem("userInfo"))){
            setCurrentUserInfo(JSON.parse(localStorage.getItem("userInfo")));
            setRender(true);
        }else{
            const alink = document.createElement("a");
            alink.href = "/";
            alink.click();
        }
    },[])

    const inputLogic = (e)=>{
        const {name,value} = e.target;
        if(value.length<21){
            setCurrentUserInfo({
             ...currentUserInfo,
             [name]:value
            })
        }
    }

    const FileUploder =(e) =>{
        e.preventDefault();
        let data = e.target;
        if(data.files[0].type === "image/jpeg" ||data.files[0].type ===  "image/png" ||data.files[0].type ===  "image/jpg"||data.files[0].type ===  "image/gif"){
            if (data.files) {
            for (let i = 0; i < data.files.length; i++) {
                let file = data.files[i];           
                    let fileSize = file.size;
                    fileSize *= 1;
                    if(fileSize <= 2000000){
                        setCurrentImg(window.URL.createObjectURL(file));
                        setCurrentUserInfo({
                            ...currentUserInfo,
                            thumbnail:data.files[0]
                           })
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

    
    const userInfoApi = async()=>{
        var data = new FormData();
        data.append('email', localStorage.getItem("email"));
        data.append('token', localStorage.getItem("token"));
        data.append('type', 'update');
        data.append('thumbnail', currentUserInfo.thumbnail);
        data.append('nick', currentUserInfo.nick===""?localStorage.getItem("userName"):currentUserInfo.nick);
        data.append('department', currentUserInfo.department);
        data.append('position', currentUserInfo.position);
        data.append('mailing', currentUserInfo.mailing);
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/user.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    localStorage.setItem("userInfo",JSON.stringify(e.data.user));
                    setModifyState(true);
                    setTimeout(() => {
                        setPageNum(0);
                        setModifyState(false);
                    }, 1000);
                }else{
      
                }
            })
        }catch{
      
        }
    }

    const userInfoGetApi = async(type)=>{
        var data = new FormData();
        data.append('user_email', localStorage.getItem("email"));
        data.append('hash', localStorage.getItem("hash"));
        data.append('type', type);
        try{
            await axios({
                method:"post",
                url : "https://proveit.co.kr/api/mypage.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    if(type==="likeProdcut"){
                        setLikelyProducts(e.data.list);
                    }else if(type==="myReply"){
                        setMyReply(e.data.list);
                    }else if(type==="counting"){
                        setProductNum({
                            like:e.data.list.like*1,
                            introduce:e.data.list.introduce*1,
                            make:e.data.list.make*1,
                        });
                        userInfoGetApi("likeProdcut");
                        setrendering(true);
                    }else{
                        setMyProducts(e.data.list);
                    }
                    setRender(true);
                }else if(e.data.ret_code ==="500"){
                    alert("로그인 해쉬가 만료되었습니다. 다시 로그인해주세요");
                    const alink = document.createElement("a");
                    alink.href="/";
                    setTimeout(() => {
                        localStorage.clear();
                        alink.click();
                    }, 0);
                }
            })
        }catch{
      
        }
    }

    const userOutApi = async()=>{
        var data = new FormData();
        data.append('email', localStorage.getItem("email"));
        data.append('hash', localStorage.getItem("hash"));
        try{
            await axios({
                method:"post",
                url : "https://www.proveit.co.kr/api/userOut.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    localStorage.clear();
                    const alink =document.createElement("a");
                    alink.href="/";
                    alink.click();
                }else{
      
                }
            })
        }catch{
      
        }
    }

    const nickNameCheck =(str)=>{
        var pattern_num = /[0-9]/;	// 숫자 
    	var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자

    	if(pattern_num.test(str)){
            console.log("숫자");
            setNickCheck(true);
    	}else if(pattern_spc.test(str)){
            console.log("특수문자");
            setNickCheck(true);
    	}else{
            setNickCheck(false);
        }
    }
    
    useEffect(()=>{
        nickNameCheck(currentUserInfo.nick);
        if(profileInofo){
            setProfileInofo(false);
        }
    },[currentUserInfo])


    useEffect(()=>{
        userInfoGetApi("counting");
        if(rendering){
            userInfoGetApi("myReply");
            if(renderList==="like"){
                userInfoGetApi("likeProdcut");
            }else if(renderList ==="introduce" || renderList ==="make"){
                userInfoGetApi("myProduct");
            }
        }
    },[renderList])

    const ProductRender =({item,type,index})=>{
        return(
            <>
            {item.category&&<div style={{position:"relative"}}>
                {type==="like"&&<Link to={`/product?productnum=${item.id}`}>
                    <div id={item.id} 
                        onClick={(e)=>{e.stopPropagation();}}
                        className="profile_item_render"
                        >
                        <div className="profile_product_thumbnail" style={{backgroundImage:`url(${item.thumbnail})`}}></div>
                        <div className="profile_product_info">
                            <div className="profile_product_title">{item.title}</div>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_comment})`,backgroundSize:'cover',marginRight:"8px"}}></div>
                                <div className="profile_product_info_text">{item.review_count}</div>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_like})`,backgroundSize:'cover',marginRight:"8px",marginLeft:"8px"}}></div>
                                <div className="profile_product_info_text">{item.like_count}</div>
                            </div>
                        </div>

                    </div>
                </Link>}
                {(type==="myProduct"&&item.make_by==="true")&&<Link to={`/product?productnum=${item.id}`}>
                    <div id={item.id} 
                        onClick={(e)=>{e.stopPropagation();}}
                        className="profile_item_render"
                        >
                        <div className="profile_product_thumbnail" style={{backgroundImage:`url(${item.thumbnail})`}}></div>
                        <div className="profile_product_info">
                            <div className="profile_product_title">{item.title}</div>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_comment})`,backgroundSize:'cover',marginRight:"8px"}}></div>
                                <div className="profile_product_info_text">{item.review_count}</div>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_like})`,backgroundSize:'cover',marginRight:"8px",marginLeft:"8px"}}></div>
                                <div className="profile_product_info_text">{item.like_count}</div>
                            </div>
                        </div>
                        <Link to={`/modifyproduct?productnum=${item.id}`}><div className="btn_modify" style={{width:"48px",height:"32px",zIndex:"99",borderRadius:"4px",marginLeft:"8px"}}
                        onClick={(e)=>{e.stopPropagation();}}>수정</div></Link>
                    </div>
                </Link>}
                {(type==="introduceProduct"&&item.make_by==="false")&&<Link to={`/product?productnum=${item.id}`}>
                    <div id={item.id} 
                        onClick={(e)=>{e.stopPropagation();}}
                        className="profile_item_render"
                        >
                        <div className="profile_product_thumbnail" style={{backgroundImage:`url(${item.thumbnail})`}}></div>
                        <div className="profile_product_info">
                            <div className="profile_product_title">{item.title}</div>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_comment})`,backgroundSize:'cover',marginRight:"8px"}}></div>
                                <div className="profile_product_info_text">{item.review_count}</div>
                                <div style={{width:'16px',minWidth:"16px",height:"16px",backgroundImage:`url(${icon_profile_item_like})`,backgroundSize:'cover',marginRight:"8px",marginLeft:"8px"}}></div>
                                <div className="profile_product_info_text">{item.like_count}</div>
                            </div>
                        </div>
                        <Link to={`/modifyproduct?productnum=${item.id}`}><div className="btn_modify" style={{width:"48px",height:"32px",zIndex:"99",borderRadius:"4px",marginLeft:"8px"}}
                        onClick={(e)=>{e.stopPropagation();}}>수정</div></Link>
                    </div>
                </Link>}
            </div>}
            </>
        )
    }

    window.history.pushState(null,"",window.location.href);
    window.onpopstate = ()=>{
        if(pageNum!==0){
            window.history.go(1);
            setPageNum(0);
        }else{
            const alink = document.createElement("a");
            alink.href = "/";
            alink.click();
        }

    }

    const ReplyRender =({item,index})=>{
        return(
            <>
            {item!==null&&<div className="profile_comment" onClick={
                ()=>{
                    localStorage.setItem("replyId",item.id);
                    const alink = document.createElement("a");
                    alink.href =item.url;
                    alink.click();
                }
                }>
                <div className="profile_comment_icon" style={{backgroundImage:`url(${icon_profile_commentIcon})`}}></div>
                <div style={{width:'100%',overflow:"hidden"}}>
                    <div style={{display:"flex",alignItems:"center",marginBottom:"5px",height:"16px",lineHeight:'16px',flexWrap:"nowrap",width:"1000px"}}>
                        {item.target==="blog"&&<div style={{backgroundImage:`url(${icon_review_title})`,width:'16px',height:'16px',backgroundSize:'cover',marginRight:"4px"}}></div>}
                        {item.target==="community"&&<div style={{backgroundImage:`url(${icon_community_title_icon})`,width:'16px',height:'16px',backgroundSize:'cover',marginRight:"4px"}}></div>}
                        <div style={{fontSize:"14px",fontWeight:"500",color:"#9c31c6"}}>{item.target==="product"?`${item.title}`:`"${item.title}"`}</div>
                        <div style={{fontSize:"14px"}}>에 남긴 코멘트</div>
                    </div>
                    <div style={{width:"100%",position:"relative",height:'16px'}}>
                        <ReactQuill theme=""
                        className="profile_comment_quill"
                        value={item.reply.length>56?item.reply.slice(0,50)+"···":item.reply} style={{textAlign:"left",color:"#505050",fontSize:'13px',width:"100%",height:'16px',lineHeight:"16px",overflow:"hidden"}}></ReactQuill>
                        {/* <ReactQuill theme=""
                        value={item.reply} style={{textAlign:"left",color:"#505050",fontSize:'13px',width:"100%",height:'16px',lineHeight:"16px"}}></ReactQuill> */}
                        <div style={{width:"100%",height:"100%",position:'absolute',top:0,left:0}}></div>
                    </div>
                </div>
            </div>}
            </>
        )
    }   

    return(
        <div id="pageBody" style={{minHeight:window.innerHeight-48,backgroundColor:"#FFFEFC"}}>
        {(render&&pageNum===0)&&
        <div style={{width:"100%",backgroundColor:"#FFFEFC",display:"flex",alignItems:"center",flexDirection:"column"}}>
            <div className="profile_header_info">
                <div className="profile_main_myinfo">
                    <div className="profile_main_thumbnail" style={{
                        backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                        }}></div>
                    <div>
                        <div className="profile_main_nick">{JSON.parse(localStorage.getItem("userInfo")).nick}</div>
                        <div className="profile_main_position">
                            {JSON.parse(localStorage.getItem("userInfo")).position}{JSON.parse(localStorage.getItem("userInfo")).department?`,${JSON.parse(localStorage.getItem("userInfo")).department}`:""}
                        </div>
                        <div className="profile_main_join">
                            {JSON.parse(localStorage.getItem("userInfo")).created_at.slice(0,4)}년 {JSON.parse(localStorage.getItem("userInfo")).created_at.slice(5,7)}월 {JSON.parse(localStorage.getItem("userInfo")).created_at.slice(8,10)}일에 가입함
                            </div>
                        <div className="btn_three profile_main_modifyBtn"
                        onClick={()=>{setPageNum(1)}}>프로필 수정</div>
                    </div>
                </div>
                <div className="profile_main">
                   <div className="profile_category"
                   style={{color:renderList==="like"&&"#9C31C6",
                           borderBottom:renderList==="like"&&"2px solid#9C31C6",
                           fontWeight:renderList==="like"&&"500"}}
                    onClick={()=>{setRenderList("like")}}>추천({productNum.like})</div>
                   <div className="profile_category"
                   style={{color:renderList==="make"&&"#9C31C6",
                           borderBottom:renderList==="make"&&"2px solid#9C31C6",
                           fontWeight:renderList==="make"&&"500"}}
                    onClick={()=>{setRenderList("make")}}>제작({productNum.make})</div>
                   <div className="profile_category"
                   style={{color:renderList==="introduce"&&"#9C31C6",
                           borderBottom:renderList==="introduce"&&"2px solid#9C31C6",
                           fontWeight:renderList==="introduce"&&"500"}}
                    onClick={()=>{setRenderList("introduce")}}>소개({productNum.introduce})</div>
                   <div className="profile_category"
                   style={{color:renderList==="comment"&&"#9C31C6",
                           borderBottom:renderList==="comment"&&"2px solid#9C31C6",
                           fontWeight:renderList==="comment"&&"500"}}
                    onClick={()=>{setRenderList("comment")}}>코멘트</div>
                </div>
                <div style={{width:"100%",height:"1px",backgroundColor:"#c4c4c4",position:"absolute",bottom:0,left:0}}></div>
            </div>
            <div className="profile_main_full">
                {renderList==="like"&&<div>
                    {likelyProducts.map((item,index)=>(<ProductRender key={index} item={item} type="like"/>))}
                </div>}
                {renderList==="make"&&<div>
                    {myProducts.map((item,index)=>(<ProductRender key={index} item={item} type="myProduct"/>))}
                </div>}
                {renderList==="introduce"&&<div>
                    {myProducts.map((item,index)=>(<ProductRender key={index} item={item} type="introduceProduct"/>))}
                </div>}
                {renderList==="comment"&&<div>
                    {myReply.map((item,index)=>(<ReplyRender key={index} myReply={myReply} item={item}></ReplyRender>))}
                </div>}
                {(productNum.like===0&&renderList==="like")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>추천한 서비스가 없습니다.</div>
                </div>}
                {(productNum.make===0&&renderList==="make")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>업로드한 서비스가 없습니다.</div>    
                </div>}
                {(productNum.introduce===0&&renderList==="introduce")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>소개한 서비스가 없습니다.</div>
                </div>}
                {(myReply.length===0&&renderList==="comment")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>코멘트가 없습니다.</div>
                </div>}
            </div>
                        
        </div>}
        {(render&&pageNum===1)&&<div style={{width:"100%",height:"100%",backgroundColor:"#F9F9F9",display:"flex",justifyContent:"center"}}>
            <div className="profile_myInfo">
                <div style={{textAlign:"left",fontSize:"20px",fontWeight:"bold",lineHeight:"20px",height:"20px",marginBottom:"24px"}}>프로필</div>
                <div style={{width:"100%",display:"flex",textAlign:"left"}}>
                    <div>
                        <div className="profile_myInfo_contents">
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px"}}>이름</div>
                            <div style={{fontSize:"13px",color:'#a5a5a5',marginBottom:"24px"}}>{localStorage.getItem("userName")}</div>
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px"}}>이메일 주소</div>
                            <div style={{fontSize:"13px",color:'#a5a5a5'}}>{localStorage.getItem("email")}</div>
                        </div>
                        <div className="profile_myInfo_contents">
                            <div style={{
                                height:"14px",
                                fontSize:"14px",
                                lineHeight:'14px',fontWeight:'bold',color:"#505050",marginBottom:"18px",width:"100%",textAlign:"left"}}>프로필 이미지 변경</div>
                                <div style={{display:"flex"}}>
                                    <div style={{
                                        width:"80px",
                                        height:"80px",
                                        minWidth:"80px",
                                        minHeight:"80px",
                                        borderRadius:"50%",backgroundColor:"#c4c4c4",marginRight:"20px",
                                    backgroundImage:currentImg===""?(localStorage.getItem("userInfo")&&`url(${currentUserInfo.thumbnail})`):`url(${currentImg})`,
                                    backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}></div>
                                    <div  style={{width:"100%",textAlign:"left",fontSize:"13px",marginBottom:'24px'}}>
                                    <form style={{display:"block"}}>
                                        <input type='file' id="thumbnailImg" style={{display:"none"}}  accept=".jpg,.jpeg,.png,.bmp" onChange={FileUploder}></input>
                                        <label for="thumbnailImg" className="btn_three" style={{fontSize:"13px",width:"112px",height:"32px",marginBottom:"16px"}}>이미지 업로드
                                        </label>
                                    </form>
                                    <div style={{color:"#a5a5a5",lineHeight:"18.82px"}}>추천 사이즈 : 240*240<br/>jpg,jpeg,png,gif,최대 파일크기 2MB</div>
                                </div>
                            </div>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>
                                <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050'}}>닉네임</div>
                                {nickCheck&&<div style={{marginLeft:"8px",fontSize:13,height:"14px",lineHeight:"14px",color:"#EA4335",fontWeight:500}}>닉네임은 한글 또는 알파벳으로 입력해 주세요</div>}
                            </div>
                            <input className="profile_myInfo_input" name="nick" value={currentUserInfo.nick} placeholder="닉네임을 입력해주세요" onChange={inputLogic}></input>
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"10px"}}>직책/직군 - 필수  <span style={{color:"#ED5C2E"}}>*</span></div>
                            <input className="profile_myInfo_input" name="position"  placeholder="직책 및 직군을 입력해주세요" value={currentUserInfo.position} onChange={inputLogic}></input>
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"10px"}}>소속</div>
                            <input className="profile_myInfo_input" name="department" placeholder="소속을 입력해주세요" value={currentUserInfo.department} onChange={inputLogic}></input>
                        </div> 
                        <div className="profile_myInfo_contents">
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"18px"}}>뉴스레터 수신</div>
                            <div style={{fontSize:"14px",color:'#505050',marginBottom:"13px",height:"20px",lineHeight:"20px"}}>새로나오는 서비스에 관한 소식을 받아보시겠어요?</div>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:currentUserInfo.mailing==="Y"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                    onClick={(e)=>{setCurrentUserInfo({...currentUserInfo,mailing:"Y"});e.stopPropagation();}}></div>
                                <div style={{fontSize:"14px",color:'#505050',marginRight:"32px",height:"14px",lineHeight:"14px",width:"72px"}}>네</div>
                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:currentUserInfo.mailing!=="Y"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                    onClick={(e)=>{setCurrentUserInfo({...currentUserInfo,mailing:"N"});e.stopPropagation();}}></div>
                                <div style={{fontSize:"14px",color:'#505050',marginRight:"24px",height:"14px",lineHeight:"14px"}}>아니오</div>
                            </div>
                        </div> 
                            
                        <div className="profile_myInfo_contents_btn">
                            <div className="btn_one" style={{width:"72px",height:"32px"}}
                            onClick={()=>{
                                if(currentUserInfo.position!==""&&!nickCheck){
                                    userInfoApi();
                                }else{
                                    setProfileInofo(true);
                                }
                            }}>저장</div>
                            {profileInofo&&<div style={{marginRight:"8px",fontSize:13,height:"14px",lineHeight:"14px",color:"#EA4335",fontWeight:500}}>프로필 정보를 다시한번 확인해주세요.</div>}
                            {modifyState&&<div style={{width:"67px",height:"19px",backgroundImage:`url(${icon_profileModify})`,backgroundRepeat:"no-repeat",marginRight:"16px"}}></div>}
                        </div>
                    </div>
                    <div className="profile_withdrawal" style={{width:"512px"}}>
                        <div style={{fontSize:'13px',color:"#505050",lineHeight:"23.4px"}}>
                            문의는 이메일 문의만 가능합니다.<br/>
                            hello@110corp.com 으로 문의사항을 보내주세요.<br/>
                            <span style={{cursor:"pointer"}} onClick={()=>{setPageNum(2)}}>회원탈퇴</span>
                        </div>
                    </div>  
                </div>
            </div>
        </div>}
        {(render&&pageNum===2)&&<div style={{width:"100%",minHeight:window.innerHeight-48,backgroundColor:"#F9F9F9",display:"flex",justifyContent:"center"}}>
            <div onClick={()=>{setReasonWindow(false)}}>
                <div style={{width:"512px",marginTop:"40px",marginBottom:"24px",fontSize:"20px",height:"20px",lineHeight:"20px",textAlign:"left",fontWeight:"bold"}}>
                    회원 탈퇴
                </div>
                <div style={{width:"512px",marginRight:"16px",backgroundColor:"#fff",padding:"24px 24px 32px 24px",marginBottom:"24px",textAlign:"left"}}>
                    <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px"}}>이름</div>
                    <div style={{fontSize:"13px",color:'#a5a5a5',marginBottom:"24px"}}>{localStorage.getItem("userName")}</div>
                    <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px"}}>이메일 주소</div>
                    <div style={{fontSize:"13px",color:'#a5a5a5'}}>{JSON.parse(localStorage.getItem("userInfo")).email}</div>
                </div>
                <div style={{marginBottom:"24px",color:"#505050",fontSize:"13px",lineHeight:"23.4px",textAlign:"left"}}>
                    <li>회원 탈퇴를 하면 계정 정보는 삭제되지만 등록한 댓글이나 프로젝트 등은 삭제되지 않습니다.</li>
                    <li>회원 탈퇴를 신청해도 계정은 한달 간 유지되고, 한달 이후 완전 삭제 됩니다.</li>
                    <li>한달 안에 마음이 바뀌시면 그냥 다시 로그인 해주세요.</li>
                </div>
                <div style={{width:"512px",marginRight:"16px",backgroundColor:"#fff",padding:"24px 24px 32px 24px",marginBottom:"24px",textAlign:"left"}}>
                    <div style={{marginBottom:"24px",position:"relative"}}>
                        <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>왜..탈퇴하시려는 건가요?</div>
                        <div name="category" style={styled.dropBox} onClick={(e)=>{setReasonWindow(!reasonWindow);e.stopPropagation();}}>
                            {reasonNum===0?"이유를 알려주세요":reasonList[reasonNum-1].text}
                            <div style={{position:"absolute",width:"24px",height:'24px',right:"16px",top:"8px",backgroundImage:`url(${icon_dropBox})`}}></div>
                        </div>
                        {reasonWindow&&<div style={{padding:"8px 0px 8px 0px",backgroundColor:"#fff",height:"176px",overflow:"auto",overflowX:"hidden",position:"absolute",width:"100%",top:"24px",zIndex:"9999"}}>
                            {reasonList.map((item)=>(<ReasonRender key={item.id} item={item} setReasonWindow={setReasonWindow} reasonNum={reasonNum} setReasonNum={setReasonNum}></ReasonRender>))}
                        </div>}
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <div style={{width:"16px",height:"16px",marginRight:"8px",cursor:"pointer",backgroundImage:userLeaveState?`url(${icon_leaveChecked})`:`url(${icon_leaveUnChecked})`}} onClick={()=>{setUserLeaveState(!userLeaveState)}}></div>
                        <div style={{fontSize:"14px",color:"#505050",lineHeight:"14px",height:'14px'}}>회원 탈퇴에 관한 모든 안내 사항을 확인하였습니다.</div>
                    </div>
                </div>
                <div style={{width:"100%",display:"flex",justifyContent:"center",position:"relative"}}>
                    <div className="btn_one" style={{width:"88px",height:"32px"}}
                    onClick={(e)=>{setLeaveWindow(true);e.stopPropagation();}}>
                        회원 탈퇴
                    </div>
                    {(reasonNum===0||!userLeaveState)&&<div className="btn_one_disible" style={{width:"88px",height:"100%"}}>회원 탈퇴</div>}
                </div>
            </div>
        </div>}
        {leaveWindow&&<div style={{width:"100%",height:"100%",position:"fixed",backgroundColor:"rgba(80,80,80,0.4)",display:"flex",justifyContent:"center",top:0,left:0}}
        onClick={(e)=>{setLeaveWindow(false);e.stopPropagation();}}>
            <div style={{width:"336px",height:"184px",backgroundColor:"#fff",display:"flex",alignItems:"center",flexDirection:"column",marginTop:"179px"}}>
                <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px",marginTop:"32px"}}>탈퇴 하시겠습니까?</div>
                <div style={{fontSize:"13px",color:'#505050',marginBottom:"25px",height:"23px",lineHeight:'23px'}}>계정은 한 달 후에 완전히 삭제됩니다.</div>
                <div style={{display:"flex"}}>
                    <div className="btn_two" style={{width:"120px",height:"40px",marginRight:"8px"}} onClick={(e)=>{setLeaveWindow(false);e.stopPropagation();}}>취소</div>
                    <div className="btn_one" style={{width:"120px",height:"40px"}} onClick={userOutApi}>예, 삭제합니다</div>
                </div>
            </div>
        </div>}
    </div>
    )
}

const Profile = ()=>{
    const [loginWindow,setLoginWindow] = useState(false);
    const [modal,setModal] = useState(false);
  return(
    <div style={{width:"100%",display:"flex",flexDirection:"column"}}
    onClick={()=>{setModal(false)}}>
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

export default Profile;