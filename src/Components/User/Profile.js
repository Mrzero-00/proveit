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
import icon_pointcoin from '../../image/icon_pointcoin.svg';
import icon_review_title from '../../image/icon_review_title.svg';
import icon_community_title_icon from '../../image/icon_community_title_icon.png';
import icon_like from '../../image/likeIcon.svg';

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
    const today = new Date();
    const [point,setPoint] = useState(0);
    const [currentYear,setCurrentYear] = useState(`${today.getFullYear()}`);
    const [currentMonth,setCurrentMonth] = useState(today.getMonth()<10?`0${today.getMonth()+1}`:`${today.getMonth()+1}`);
    const [pointSum,setPointSum] = useState(0);
    const [pointList,setPointList] = useState([]);
    const [nickCheck,setNickCheck] = useState(false);
    const [renderList,setRenderList]= useState("like");
    const [modifyState,setModifyState]= useState(false);
    const [profileInofo,setProfileInofo]= useState(false);
    const [rendering,setrendering] =useState(false);
    const [currentUserInfo,setCurrentUserInfo] = useState(
        {
            userId:"dkdk@gmail.com",
            name:"?????????",
            nickName:"?????????",
            belong:"??????",
            position:"?????????",
            profileUrl:"",
            comment:"",
            likeProject:"",
            registerProject:"",
            newLetterState:false
        }
    )

    const [yearWindow,setYearWindow] = useState(false);
    const [monthWindow,setMonthWindow] = useState(false);
    const yearlist = ["2021"]; 
    const monthlist = ["01","02","03","04","05","06","07","08","09","10","11","12"]; 
    const reasonList =[
        {id:1,text:"?????? ???????????? ?????????"},
        {id:2,text:"????????? ???????????? ????????? ?????????"},
        {id:3,text:"?????? ???????????? ??? ?????????"},
        {id:4,text:"?????? ????????? ?????????"},
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
                        onClick={(e)=>{e.stopPropagation();}}>??????</div></Link>
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
                        onClick={(e)=>{e.stopPropagation();}}>??????</div></Link>
                    </div>
                </Link>}
            </div>}
            </>
        )
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
                        <div style={{fontSize:"14px",fontWeight:"500",color:"#6200EE"}}>{item.target==="product"?`${item.title}`:`"${item.title}"`}</div>
                        <div style={{fontSize:"14px"}}>??? ?????? ?????????</div>
                    </div>
                    <div style={{width:"100%",position:"relative",height:'16px'}}>
                        <ReactQuill theme=""
                        className="profile_comment_quill"
                        value={item.reply.length>56?item.reply.slice(0,50)+"??????":item.reply} style={{textAlign:"left",color:"#505050",fontSize:'13px',width:"100%",height:'16px',lineHeight:"16px",overflow:"hidden"}}></ReactQuill>
                        {/* <ReactQuill theme=""
                        value={item.reply} style={{textAlign:"left",color:"#505050",fontSize:'13px',width:"100%",height:'16px',lineHeight:"16px"}}></ReactQuill> */}
                        <div style={{width:"100%",height:"100%",position:'absolute',top:0,left:0}}></div>
                    </div>
                </div>
            </div>}
            </>
        )
    }   

    const PointRender =({item,index,currentMonth,currentYear})=>{
        return(
        <>
            {(currentMonth===item.created_at.slice(5,7)&&currentYear===item.created_at.slice(0,4))&&<div className="profile_point_list_item">
                {item.type==="plus"?<div className="point_plus">??????</div>:<div className="point_minus">??????</div>}
                <div className="profile_point_list_item_comment">{item.comment}</div>
                <div className="profile_point_list_item_date">{item.created_at.slice(0,4)}.{item.created_at.slice(5,7)}.{item.created_at.slice(8,10)}</div>
                {item.type==="plus"?
                <div className="profile_point_list_item_point_p">+{item.point} ?????????</div>:
                <div className="profile_point_list_item_point_m">{item.point} ?????????</div>}
            </div>}
        </>
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
                        alert("?????? ????????? ?????? ?????????.");
                    }
                }
                }
        }
        else{
            alert("?????? ????????? ????????? ??? ????????????.");
        } 
        //input ?????? ??? ?????????
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
                console.log(e);
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
                    alert("????????? ????????? ?????????????????????. ?????? ?????????????????????");
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

    const pointGetApi = async()=>{
        var data = new FormData();
        data.append('email', localStorage.getItem("email"));
        data.append('token', localStorage.getItem("hash"));
        data.append('type', "select");
        try{
            await axios({
                method:"post",
                url : "https://proveit.co.kr/api/user.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    setPoint(e.data.user.point);
                    setPointSum(e.data.user.point_sum);
                }else if(e.data.ret_code ==="500"){
                    alert("????????? ????????? ?????????????????????. ?????? ?????????????????????");
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

    const pointListGetApi = async()=>{
        var data = new FormData();
        data.append('user_email', localStorage.getItem("email"));
        data.append('hash', localStorage.getItem("hash"));
        data.append('type', "getList");
        try{
            await axios({
                method:"post",
                url : "https://proveit.co.kr/api/point.php",
                data:data
      
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                    setPointList(e.data.list);
                }else if(e.data.ret_code ==="500"){
                    alert("????????? ????????? ?????????????????????. ?????? ?????????????????????");
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
        var pattern_num = /[0-9]/;	// ?????? 
    	var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // ????????????

    	if(pattern_num.test(str)){
            setNickCheck(true);
    	}else if(pattern_spc.test(str)){
            setNickCheck(true);
    	}else{
            setNickCheck(false);
        }
    }
    
    useEffect(()=>{
        pointGetApi();
        pointListGetApi();
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

    return(
        <div id="pageBody" style={{minHeigth:window.innerHeight-48}}>
        {(render&&pageNum===0)&&
        <div style={{width:"100vw",display:"flex",alignItems:"center",flexDirection:"column"}}>
            <div className="profile_header_info">
                <div className="profile_main_myinfo">
                    <div className="profile_main_thumbnail" style={{
                        backgroundImage:localStorage.getItem("userInfo")&&`url(${JSON.parse(localStorage.getItem("userInfo")).thumbnail})`
                        }}></div>
                    <div>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <div className="profile_main_nick">{JSON.parse(localStorage.getItem("userInfo")).nick}</div>
                            <div className="profile_main_nick" 
                                style={{
                                    width:'16px',
                                    height:"16px",
                                    backgroundImage:`url(${icon_pointcoin})`,
                                    backgroundSize:"contain",
                                    backgroundPosition:"center",
                                    backgroundRepeat:"no-repeat",
                                    marginLeft:"8px",marginRight:"4px"}}></div>
                            <div className="profile_main_nick" style={{color:"#6200EE",fontSize:"14px"}}>{pointSum}</div>
                        </div>
                        <div className="profile_main_join">{localStorage.getItem("email")}</div>
                        <div className="profile_main_join">
                            {JSON.parse(localStorage.getItem("userInfo")).created_at.slice(0,4)}??? {JSON.parse(localStorage.getItem("userInfo")).created_at.slice(5,7)}??? {JSON.parse(localStorage.getItem("userInfo")).created_at.slice(8,10)}?????? ?????????
                        </div>
                        <div className="profile_main_position">
                            {JSON.parse(localStorage.getItem("userInfo")).position}{JSON.parse(localStorage.getItem("userInfo")).department?`,${JSON.parse(localStorage.getItem("userInfo")).department}`:""}
                        </div>
                        <div className="btn_three profile_main_modifyBtn"
                        onClick={()=>{setPageNum(1)}}>????????? ??????</div>
                    </div>
                </div>
                <div className="profile_main">
                   <div className="profile_category"
                   style={{color:renderList==="like"&&"#6200EE",
                           borderBottom:renderList==="like"&&"2px solid#6200EE",
                           fontWeight:renderList==="like"&&"500"}}
                    onClick={()=>{setRenderList("like")}}>??????({productNum.like})</div>
                   <div className="profile_category"
                   style={{color:renderList==="make"&&"#6200EE",
                           borderBottom:renderList==="make"&&"2px solid#6200EE",
                           fontWeight:renderList==="make"&&"500"}}
                    onClick={()=>{setRenderList("make")}}>??????({productNum.make})</div>
                   <div className="profile_category"
                   style={{color:renderList==="introduce"&&"#6200EE",
                           borderBottom:renderList==="introduce"&&"2px solid#6200EE",
                           fontWeight:renderList==="introduce"&&"500"}}
                    onClick={()=>{setRenderList("introduce")}}>??????({productNum.introduce})</div>
                   <div className="profile_category"
                   style={{color:renderList==="comment"&&"#6200EE",
                           borderBottom:renderList==="comment"&&"2px solid#6200EE",
                           fontWeight:renderList==="comment"&&"500"}}
                    onClick={()=>{setRenderList("comment")}}>?????????</div>
                    <div className="profile_category"
                   style={{color:renderList==="point"&&"#6200EE",
                           borderBottom:renderList==="point"&&"2px solid#6200EE",
                           fontWeight:renderList==="point"&&"500"}}
                    onClick={()=>{setRenderList("point")}}>?????????</div>
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
                {renderList==="point"&&<div>
                    <div className="profile_point_header">
                        <div className="profile_point_header_text">
                            <div
                                style={{
                                    width:'16px',
                                    height:"16px",
                                    backgroundImage:`url(${icon_pointcoin})`,
                                    backgroundSize:"contain",
                                    backgroundPosition:"center",
                                    backgroundRepeat:"no-repeat",
                                    marginRight:"4px"}}>
                                </div>
                            <div>{today.getFullYear()}??? {today.getMonth()+1}??? ?????? ?????????:</div>
                            <div>{point}</div>
                            <div
                                style={{
                                    width:'16px',
                                    height:"16px",
                                    backgroundImage:`url(${icon_pointcoin})`,
                                    backgroundSize:"contain",
                                    backgroundPosition:"center",
                                    backgroundRepeat:"no-repeat",
                                    marginLeft:"12px",
                                    marginRight:"4px"}}>
                                </div>
                            <b>?????? ?????????:</b>
                            <b>{pointSum}</b>
                        </div>
                        <div className="profile_point_header_datelist">
                            <div className="profile_point_header_datelist_dropMenu"
                            onClick={()=>{setYearWindow(!yearWindow)}}>
                                <div className="profile_point_header_datelist_text">{currentYear}</div>
                                <div style={{
                                    width:"20px",
                                    height:"20px",
                                    backgroundImage:`url(${icon_like})`,
                                    transform:"rotate(180deg)",
                                    backgroundPosition:"center"}}></div>
                            </div>
                            <div className="profile_point_header_datelist_dropMenu"
                            onClick={()=>{setMonthWindow(!monthWindow)}}>
                                <div className="profile_point_header_datelist_text">{currentMonth}???</div>
                                <div style={{
                                    width:"20px",
                                    height:"20px",
                                    backgroundImage:`url(${icon_like})`,
                                    transform:"rotate(180deg)",
                                    backgroundPosition:"center"}}></div>
                            </div>
                            {yearWindow&&<div className="profile_date_item_list" style={{top:"32px",right:"77px"}}>
                                {yearlist.map((item)=>(<div className="profile_date_item" onClick={()=>{setCurrentYear(item);setYearWindow(false)}}>{item}</div>))}
                            </div>}
                            {monthWindow&&<div className="profile_date_item_list" style={{right:"0px",top:"32px"}} >
                                {monthlist.map((item)=>(<div className="profile_date_item" onClick={()=>{setCurrentMonth(item);setMonthWindow(false)}}>{item}???</div>))}
                            </div>}
                        </div>
                    </div>
                    <div className="profile_point_header_list">
                        {pointList.map((item,index)=>(<PointRender key={index} currentMonth={currentMonth} currentYear={currentYear} item={item}></PointRender>))}
                    </div>
                </div>}
                {(productNum.like===0&&renderList==="like")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>????????? ???????????? ????????????.</div>
                </div>}
                {(productNum.make===0&&renderList==="make")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>???????????? ???????????? ????????????.</div>    
                </div>}
                {(productNum.introduce===0&&renderList==="introduce")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>????????? ???????????? ????????????.</div>
                </div>}
                {(myReply.length===0&&renderList==="comment")&&<div className="profile_not_item">
                    <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_profile_notItem})`,marginRight:"8px"}}></div>
                    <div>???????????? ????????????.</div>
                </div>}
            </div>
                        
        </div>}
        {(render&&pageNum===1)&&<div style={{width:"100%",height:"100%",backgroundColor:"#F9F9F9",display:"flex",justifyContent:"center"}}>
            <div className="profile_myInfo">
                <div style={{textAlign:"left",fontSize:"20px",fontWeight:"bold",lineHeight:"20px",height:"20px",marginBottom:"24px"}}>?????????</div>
                <div style={{width:"100%",display:"flex",textAlign:"left"}}>
                    <div>
                        <div className="profile_myInfo_contents">
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px"}}>??????</div>
                            <div style={{fontSize:"13px",color:'#a5a5a5',marginBottom:"24px"}}>{localStorage.getItem("userName")}</div>
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px"}}>????????? ??????</div>
                            <div style={{fontSize:"13px",color:'#a5a5a5'}}>{localStorage.getItem("email")}</div>
                        </div>
                        <div className="profile_myInfo_contents">
                            <div style={{
                                height:"14px",
                                fontSize:"14px",
                                lineHeight:'14px',fontWeight:'bold',color:"#505050",marginBottom:"18px",width:"100%",textAlign:"left"}}>????????? ????????? ??????</div>
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
                                        <label for="thumbnailImg" className="btn_three" style={{fontSize:"13px",width:"112px",height:"32px",marginBottom:"16px"}}>????????? ?????????
                                        </label>
                                    </form>
                                    <div style={{color:"#a5a5a5",lineHeight:"18.82px"}}>?????? ????????? : 240*240<br/>jpg,jpeg,png,gif,?????? ???????????? 2MB</div>
                                </div>
                            </div>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>
                                <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050'}}>?????????</div>
                                {nickCheck&&<div style={{marginLeft:"8px",fontSize:13,height:"14px",lineHeight:"14px",color:"#EA4335",fontWeight:500}}>???????????? ?????? ?????? ??????????????? ????????? ?????????</div>}
                            </div>
                            <input className="profile_myInfo_input" name="nick" value={currentUserInfo.nick} placeholder="???????????? ??????????????????" onChange={inputLogic}></input>
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"10px"}}>??????/?????? - ??????  <span style={{color:"#ED5C2E"}}>*</span></div>
                            <input className="profile_myInfo_input" name="position"  placeholder="?????? ??? ????????? ??????????????????" value={currentUserInfo.position} onChange={inputLogic}></input>
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"10px"}}>??????</div>
                            <input className="profile_myInfo_input" name="department" placeholder="????????? ??????????????????" value={currentUserInfo.department} onChange={inputLogic}></input>
                        </div> 
                        <div className="profile_myInfo_contents">
                            <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"18px"}}>???????????? ??????</div>
                            <div style={{fontSize:"14px",color:'#505050',marginBottom:"13px",height:"20px",lineHeight:"20px"}}>??????????????? ???????????? ?????? ????????? ??????????????????????</div>
                            <div style={{display:"flex",alignItems:"center"}}>
                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:currentUserInfo.mailing==="Y"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                    onClick={(e)=>{setCurrentUserInfo({...currentUserInfo,mailing:"Y"});e.stopPropagation();}}></div>
                                <div style={{fontSize:"14px",color:'#505050',marginRight:"32px",height:"14px",lineHeight:"14px",width:"72px"}}>???</div>
                                <div style={{width:"24px",height:"24px",marginRight:"8px",backgroundImage:currentUserInfo.mailing!=="Y"?`url(${icon_radioChecked})`:`url(${icon_radioUnChecked})`,cursor:"pointer"}}
                                    onClick={(e)=>{setCurrentUserInfo({...currentUserInfo,mailing:"N"});e.stopPropagation();}}></div>
                                <div style={{fontSize:"14px",color:'#505050',marginRight:"24px",height:"14px",lineHeight:"14px"}}>?????????</div>
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
                            }}>??????</div>
                            {profileInofo&&<div style={{marginRight:"8px",fontSize:13,height:"14px",lineHeight:"14px",color:"#EA4335",fontWeight:500}}>????????? ????????? ???????????? ??????????????????.</div>}
                            {modifyState&&<div style={{width:"67px",height:"19px",backgroundImage:`url(${icon_profileModify})`,backgroundRepeat:"no-repeat",marginRight:"16px"}}></div>}
                        </div>
                    </div>
                    <div className="profile_withdrawal" style={{width:"512px"}}>
                        <div style={{fontSize:'13px',color:"#505050",lineHeight:"23.4px"}}>
                            ????????? ????????? ????????? ???????????????.<br/>
                            hello@110corp.com ?????? ??????????????? ???????????????.<br/>
                            <span style={{cursor:"pointer"}} onClick={()=>{setPageNum(2)}}>????????????</span>
                        </div>
                    </div>  
                </div>
            </div>
        </div>}
        {(render&&pageNum===2)&&<div style={{width:"100%",minHeight:window.innerHeight-48,backgroundColor:"#F9F9F9",display:"flex",justifyContent:"center"}}>
            <div onClick={()=>{setReasonWindow(false)}}>
                <div style={{width:"512px",marginTop:"40px",marginBottom:"24px",fontSize:"20px",height:"20px",lineHeight:"20px",textAlign:"left",fontWeight:"bold"}}>
                    ?????? ??????
                </div>
                <div style={{width:"512px",marginRight:"16px",backgroundColor:"#fff",padding:"24px 24px 32px 24px",marginBottom:"24px",textAlign:"left"}}>
                    <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px"}}>??????</div>
                    <div style={{fontSize:"13px",color:'#a5a5a5',marginBottom:"24px"}}>{localStorage.getItem("userName")}</div>
                    <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px"}}>????????? ??????</div>
                    <div style={{fontSize:"13px",color:'#a5a5a5'}}>{JSON.parse(localStorage.getItem("userInfo")).email}</div>
                </div>
                <div style={{marginBottom:"24px",color:"#505050",fontSize:"13px",lineHeight:"23.4px",textAlign:"left"}}>
                    <li>?????? ????????? ?????? ?????? ????????? ??????????????? ????????? ???????????? ???????????? ?????? ???????????? ????????????.</li>
                    <li>?????? ????????? ???????????? ????????? ?????? ??? ????????????, ?????? ?????? ?????? ?????? ?????????.</li>
                    <li>?????? ?????? ????????? ???????????? ?????? ?????? ????????? ????????????.</li>
                </div>
                <div style={{width:"512px",marginRight:"16px",backgroundColor:"#fff",padding:"24px 24px 32px 24px",marginBottom:"24px",textAlign:"left"}}>
                    <div style={{marginBottom:"24px",position:"relative"}}>
                        <div style={{fontWeight:"bold",color:"#505050",textAlign:"left",fontSize:"14px",height:'14px',lineHeight:"14px",marginBottom:'10px'}}>???..?????????????????? ??????????</div>
                        <div name="category" style={styled.dropBox} onClick={(e)=>{setReasonWindow(!reasonWindow);e.stopPropagation();}}>
                            {reasonNum===0?"????????? ???????????????":reasonList[reasonNum-1].text}
                            <div style={{position:"absolute",width:"24px",height:'24px',right:"16px",top:"8px",backgroundImage:`url(${icon_dropBox})`}}></div>
                        </div>
                        {reasonWindow&&<div style={{padding:"8px 0px 8px 0px",backgroundColor:"#fff",height:"176px",overflow:"auto",overflowX:"hidden",position:"absolute",width:"100%",top:"24px",zIndex:"9999"}}>
                            {reasonList.map((item)=>(<ReasonRender key={item.id} item={item} setReasonWindow={setReasonWindow} reasonNum={reasonNum} setReasonNum={setReasonNum}></ReasonRender>))}
                        </div>}
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <div style={{width:"16px",height:"16px",marginRight:"8px",cursor:"pointer",backgroundImage:userLeaveState?`url(${icon_leaveChecked})`:`url(${icon_leaveUnChecked})`}} onClick={()=>{setUserLeaveState(!userLeaveState)}}></div>
                        <div style={{fontSize:"14px",color:"#505050",lineHeight:"14px",height:'14px'}}>?????? ????????? ?????? ?????? ?????? ????????? ?????????????????????.</div>
                    </div>
                </div>
                <div style={{width:"100%",display:"flex",justifyContent:"center",position:"relative"}}>
                    <div className="btn_one" style={{width:"88px",height:"32px"}}
                    onClick={(e)=>{setLeaveWindow(true);e.stopPropagation();}}>
                        ?????? ??????
                    </div>
                    {(reasonNum===0||!userLeaveState)&&<div className="btn_one_disible" style={{width:"88px",height:"100%"}}>?????? ??????</div>}
                </div>
            </div>
        </div>}
        {leaveWindow&&<div style={{width:"100%",height:"100%",position:"fixed",backgroundColor:"rgba(80,80,80,0.4)",display:"flex",justifyContent:"center",top:0,left:0}}
        onClick={(e)=>{setLeaveWindow(false);e.stopPropagation();}}>
            <div style={{width:"336px",height:"184px",backgroundColor:"#fff",display:"flex",alignItems:"center",flexDirection:"column",marginTop:"179px"}}>
                <div style={{fontSize:"14px",fontWeight:"bold",color:'#505050',marginBottom:"16px",marginTop:"32px"}}>?????? ???????????????????</div>
                <div style={{fontSize:"13px",color:'#505050',marginBottom:"25px",height:"23px",lineHeight:'23px'}}>????????? ??? ??? ?????? ????????? ???????????????.</div>
                <div style={{display:"flex"}}>
                    <div className="btn_two" style={{width:"120px",height:"40px",marginRight:"8px"}} onClick={(e)=>{setLeaveWindow(false);e.stopPropagation();}}>??????</div>
                    <div className="btn_one" style={{width:"120px",height:"40px"}} onClick={userOutApi}>???, ???????????????</div>
                </div>
            </div>
        </div>}
    </div>
    )
}

const Profile = ()=>{
    const [loginWindow,setLoginWindow] = useState(false);
    const [modal,setModal] = useState(false);
    const [alarmModal,setAlarmModal] = useState(false);
    const scrollEvent=(e)=>{
        
      }
    
      return(
        <div className="contentsBody" style={{
            width:"100%",
          }}
      onClick={()=>{setModal(false);setAlarmModal(false);}}
      onScroll={scrollEvent}>
    <Header 
    setLoginWindow={setLoginWindow} 
    loginWindow={loginWindow}
    modal={modal}
    setModal={setModal}
    alarmModal={alarmModal}
    setAlarmModal={setAlarmModal}
    ></Header>
    <Body
    ></Body>
  </div>  
  )
}

export default Profile;