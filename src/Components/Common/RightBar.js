import React, { useState,useEffect } from 'react';
import axios from 'axios';
import intro from '../../image/intro.pdf';
import icon_reviewer from '../../image/icon_reviewer.svg';
import { Link } from 'react-router-dom';


const RightBar = ()=>{

    const [reviewList,setReviewList] = useState([
        {id:0,thumb:"",title:""}
      ])

    const reviewListApi = async()=>{
        try{
            await axios({
                method:"get",
                url : "https://proveit.co.kr/api/blogList.php?id&page=1",
    
            }).then((e)=>{
                if(e.data.ret_code === "0000"){
                  setReviewList(e.data.blog);
                }else{
    
                }
            })
        }catch{
    
        }
      }
    
      const ReviewRender=({item,index})=>{
        return(<>
          {index<3&&
            <Link to={`/review?id=${item.id}`}>
              <div className={window.location.pathname==="/review"?"reveiw_preview review":"reveiw_preview"}>
                <div style={{width:'240px',maxHeight:"40px",height:"100%",marginRight:"20px"}}>{item.title}</div>
                <div style={{width:"40px",height:"40px",backgroundImage:`url(${item.thumb})`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
              </div>
            </Link>
          }
          </>
        )
      }
    useEffect(()=>{
        
        reviewListApi();
    },[]);
  return(
    <div className="main_proveit">
        <div style={{width:"100%",marginBottom:"32px"}}>
        <div style={{fontWeight:"bold",marginBottom:"16px",color:"#505050",fontSize:'14px',lineHeight:"30px",height:"30px",display:"flex",alignItems:"center"}}>
          <div style={{width:"14px",minWidth:"14px",minHeight:'14px',height:"14px",backgroundImage:`url(${icon_reviewer})`,marginRight:"4px",backgroundPosition:"center",backgroundSize:"cover"}}></div>
          <Link to="/proreviewer">리뷰 중독자</Link>
        </div>
        {reviewList.map((item,index)=>(<ReviewRender item={item} index={index} key={item.id}></ReviewRender>))}
        </div>
        <div style={{marginLeft:"20px"}}>
          <div><a href={intro} target="_blank">소개</a></div>
          <div><Link to="/guideline">커뮤니티 가이드라인</Link></div>
          <div><Link to="/tos">이용약관</Link></div>
          <div><Link to="/privacy_policy">개인정보 처리방침</Link></div>
          <div>이메일 문의 : hello@110corp.com</div>
          <div>© 2021 oneonezero Inc.<br/></div>
        </div>
     </div> 
  )
}

export default RightBar;