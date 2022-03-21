import React, { useState,useEffect } from 'react';
import axios from 'axios';
import intro from '../../image/intro.pdf';
import icon_reviewer from '../../image/icon_reviewer.svg';
import icon_fire from '../../image/icon_fire.svg';

import icon_community_1 from '../../image/icon_community_1.png';
import icon_community_2 from '../../image/icon_community_2.png';
import icon_community_3 from '../../image/icon_community_3.png';
import icon_community_4 from '../../image/icon_community_4.png';
import icon_like from '../../image/likeIcon.svg';
import icon_feedback from '../../image/icon_feedback.png';
import icon_pointcoin from '../../image/icon_pointcoin.svg';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';

const ReviewRender=({item,index})=>{
  return(<>
    {index<3&&
      <Link to={`/review?id=${item.id}`}>
        <div className={window.location.pathname==="/review"?"reveiw_preview review":"reveiw_preview"}>
          {/* <div style={{width:"32px",height:"32px",backgroundImage:`url(${item.thumb_m})`,backgroundPosition:"center",backgroundSize:"cover"}}></div> */}
          <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
          <div style={{width:'216px',maxHeight:"24px",height:"100%",marginRight:"8px",fontSize:'13px',display:"flex",alignItems:"center"}}>{item.title}</div>
        </div>
      </Link>
    }
    </>
  )
}

const RankingRender =({item,index})=>{
  return(
    <Link to={`/anotheruserinfo?${item.u_id}`}>
      <div className="rightbar_pointranking" style={{borderBottom:index<4&&"1px solid #EFE5FD"}}>
        <div>{index+1}</div>
        <div style={{
          width:"32px",
          height:"32px",
          minWidth:'32px',
          minHeight:"32px",
          backgroundImage:`url(${item.thumbnail})`,
          backgroundColor:"#7b7b7b",
          backgroundPosition:"center",
          backgroundSize:"cover",
          marginLeft:"16px",
          marginRight:"16px"}}></div>
       <div style={{width:"96px"}}>{item.nick}</div>
       <div style={{width:"14px",height:"14px",backgroundImage:`url(${icon_pointcoin})`,margin:"0px 4px"}}></div>
       <div>{item.point}</div>
       <div style={{
         position: "absolute",
         right:"0px",
         top:"20px",
         width:"16px",
         height:"16px",
         backgroundSize:"cover",
         backgroundImage:`url(${icon_like})`
         }}></div>
      </div>
    </Link>
  )
}

const CommunityRender =({item,index})=>{
  return(
    <Link to={`/communityitem?id=${item.id}`}>
      <div style={{borderBottom:index<2&&"1px solid #EFE5FD",display:"flex",padding:"16px 0px"}}>
        <div style={{
          width:"32px",
          height:"32px",
          minWidth:'32px',
          minHeight:"32px",
          backgroundImage:`url(${item.thumbnail})`,
          backgroundColor:"#7b7b7b",
          backgroundPosition:"center",
          backgroundSize:"cover",
          marginRight:"8px"}}></div>
        <div>
          <div className="rightbar_community_title">{item.title}</div>
          <ReactQuill className="rightbar_community_text" theme=""
          value={item.contents}
          readOnly></ReactQuill>
        </div>
      </div>
    </Link>
  )
}




const RightBar = ({setLoginWindow,categoryState,setCategoryState,scrollY})=>{
    const [header,setHeader] = useState(false);
    const [pageNum,setPageNum] = useState(0);
    const [reviewList,setReviewList] = useState([
        {id:0,thumbnail:"",title:"",like_count:0}
      ]);

    const [pointRanking,setPointRanking] = useState([
    ])

    const [communityList,setCommunityList] = useState([
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
    

      const upBtnMount = ()=>{
        window.addEventListener("scroll",()=>{    
          const scrollPosition = window.scrollY;
          if(window.location.pathname==="/review"){
            if(scrollPosition>=500){
                setHeader(true);
            }else if(scrollPosition<=500){
                setHeader(false);
            }else{
                setHeader(false);
            }
          }else if(window.location.pathname==="/community"){
            if(scrollPosition>=166){
              setHeader(true);
            }else if(scrollPosition<=166){
                setHeader(false);
            }else{
                setHeader(false);
            }
          }else if(window.location.pathname==="/communityitem"){
            if(scrollPosition>=166){
              setHeader(true);
            }else if(scrollPosition<=166){
                setHeader(false);
            }else{
                setHeader(false);
            }
          }else{
            if(scrollPosition>=368){
              setHeader(true);
            }else if(scrollPosition<=368){
                setHeader(false);
            }else{
                setHeader(false);
            }
          }
        })
    }
  

    const pointRankingApi = async()=>{
      var data = new FormData();
      data.append("type","getRank");
      try{
          await axios({
              method:"post",
              url : "https://proveit.co.kr/api/point.php",
              data:data
          }).then((e)=>{
              if(e.data.ret_code === "0000"){
                setPointRanking(e.data.list)
              }else{
  
              }
          })
      }catch{
  
      }
    }

    const communityListApi = async()=>{
      var data = new FormData();
      data.append("type","getRank");
      try{
          await axios({
              method:"post",
              url : "https://proveit.co.kr/api/community.php",
              data:data
          }).then((e)=>{
              if(e.data.ret_code === "0000"){
                setCommunityList(e.data.list)
              }else{
  
              }
          })
      }catch{
  
      }
    }
    useEffect(()=>{
      upBtnMount();
      if(window.location.pathname==="/community"||window.location.pathname==="/communityitem"){
        setPageNum(1);
      }else{
        setPageNum(0);
        pointRankingApi();
        reviewListApi();
        communityListApi();
      }
    },[]);

    // useEffect(()=>{
    //   upBtnMount(scrollY);
    // },[scrollY])
  return(
    <>
      {pageNum===0&&<div>
        {window.innerWidth>834&&<div className="main_proveit" style={{
        top:96,
        // position:header&&"fixed",
        margin:"0 auto",
        transition:"0s",
        flexDirection:"row-reverse",
        display:"flex",}}>
          <div>
            <div
            style={{
              fontWeight:"bold",
              marginBottom:"8px",
              color:"#262626",
              fontSize:'14px',
              lineHeight:"16px",
              height:"16px",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"}}>서비스 등록 안내</div>
            <div style={{width:"288px",marginBottom:"24px"}}>
              <div style={{display:"flex"}}>
                <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                <div>프루브잇은 여러분의 창의적인 아이디어와 초기 단계의 서비스들을 등록하여 메이커 상호간 피드백을 주고 받을 수 있는 공간입니다. </div>
              </div>
              <div style={{display:"flex"}}>
                <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                <div>서비스를 등록하면 발견 탭에 표시됩니다. </div>
              </div>
              <div style={{display:"flex"}}>
                <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                <div>직접 만든 제품/서비스를 홍보해주세요. 직접 만들지는 않았더라도 유용하게 잘 쓰고 있는 서비스가 있다면 소개해주셔도 좋습니다. </div>
              </div>
              
              <div style={{display:"flex"}}>
                <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                <div>
                  만약 직접 만들지 않은 앱을 소개하는 경우, 제작자에게 링크를 보내 대화에 참여할 수 있도록 알려주시면 좋습니다.<br/>
                  <a href="/" style={{color:"#6200EE",textDecoration:"underline",textUnderlinePosition:"under",display:"none"}}>✏️ 등록 요령 자세히보기 →</a>
                </div>
              </div>
              <div style={{display:"flex"}}>
                <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                <div>앱/웹을 포함, 서비스/제품을 체험해 볼 수 있는 상태여야 합니다. 체험해 볼 수 있다면 MVP나 베타 버전도 당연히 등록 가능합니다. </div>
              </div>
              <div style={{display:"flex"}}>
                <div style={{fontSize:"30px",marginRight:"8px"}}>·</div>
                <div>
                  다음과 같은 페이지는 등록할 수 없습니다. (블로그 글, 뉴스기사, 불법 사이트 등)<br/>
                  <a href="/guideline" style={{color:"#6200EE",textDecoration:"underline",textUnderlinePosition:"under",display:'none'}}>🚨 가이드라인 자세히보기</a>     
                </div>
              </div>
            </div>
            
            <div style={{width:"288px",marginBottom:"24px"}}>
              <div style={{
                fontWeight:"bold",
                marginBottom:"8px",
                color:"#262626",
                fontSize:'14px',
                lineHeight:"14px",
                height:"14px",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"}}>
                {/* <div style={{width:"14px",minWidth:"14px",minHeight:'14px',height:"14px",backgroundImage:`url(${icon_reviewer})`,marginRight:"4px",backgroundPosition:"center",backgroundSize:"cover"}}></div> */}
                <Link to="/proreviewer">매거진</Link>
              </div>
              <div style={{width:"288px",padding:"0px 0px"}}>
                {reviewList.map((item,index)=>(<ReviewRender item={item} index={index} key={item.id}></ReviewRender>))}
              </div>
            </div>
            <div style={{width:"288px",marginBottom:"24px"}}>
              <div style={{
                fontWeight:"bold",
                marginBottom:"8px",
                color:"#262626",
                fontSize:'14px',
                lineHeight:"14px",
                height:"14px",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"}}>
                {/* <div style={{width:"14px",minWidth:"14px",minHeight:'14px',height:"14px",backgroundImage:`url(${icon_reviewer})`,marginRight:"4px",backgroundPosition:"center",backgroundSize:"cover"}}></div> */}
                <Link to="/proreviewer">획득 포인트</Link>
              </div>
              <div style={{width:"288px",borderRadius:"4px",padding:"0px 16px"}}>
                {pointRanking.map((item,index)=>(<RankingRender item={item} index={index} key={item.id}></RankingRender>))}
              </div>
            </div>
            <div style={{width:"288px",marginBottom:"24px"}}>
              <div style={{
                fontWeight:"bold",
                marginBottom:"8px",
                color:"#262626",
                fontSize:'16px',
                lineHeight:"16px",
                height:"16px",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"}}>
                {/* <div style={{width:"14px",minWidth:"14px",minHeight:'14px',height:"14px",backgroundImage:`url(${icon_reviewer})`,marginRight:"4px",backgroundPosition:"center",backgroundSize:"cover"}}></div> */}
                {/* <Link to="/proreviewer">토론-토</Link> */}
                {/* <div style={{fontWeight:"400",fontSize:"12px",color:"#7b7b7b"}}>무엇이든 물어보고 토론해요</div> */}
              </div>
              {/* <div style={{width:"288px",backgroundColor:"#fff",borderRadius:"4px",border:"1px solid #EFE5FD",padding:"0px 16px"}}>
                {communityList.map((item,index)=>(<CommunityRender item={item} index={index} key={item.id}></CommunityRender>))}
              </div> */}
            </div>
            
            {/* <div style={{fontWeight:"bold",marginBottom:"16px",color:"#505050",fontSize:'14px',lineHeight:"30px",height:"30px",display:"flex",alignItems:"center"}}>
              <div style={{width:"14px",minWidth:"14px",minHeight:'14px',height:"14px",backgroundImage:`url(${icon_fire})`,marginRight:"4px",backgroundPosition:"center",backgroundSize:"cover"}}></div>
              주간 트렌딩
            </div>
            {weekRanking.map((item)=>(<WeekServiceRender item={item} key={item.id}></WeekServiceRender>))} */}
            {/* <Link to="/product?productnum=58">
              <div className="btn_feedBack">
                <div style={{width:"16px",height:"16px",backgroundImage:`url(${icon_feedback})`,marginRight:"8px"}}></div>
                <div>서비스 피드백 및 문의</div>
              </div>
            </Link> */}
            <div style={{marginLeft:"20px",marginTop:"32px"}}>
              <div style={{display:"flex"}}>
                <div><Link to="/introduce">소개</Link></div>
                <div style={{marginLeft:"4px",marginRight:'4px'}}>·</div>
                <div style={{display:"none"}}><Link to="/guideline">커뮤니티 가이드라인</Link></div>
              </div>
              <div style={{display:"flex"}}>
                <div><Link to="/tos">이용약관</Link></div>
                <div style={{marginLeft:"4px",marginRight:'4px'}}>·</div>
                <div><Link to="/privacy_policy">개인정보 처리방침</Link></div>
              </div>
              <div>이메일 문의 : hello@110corp.com</div>
              <div>© 2021 oneonezero Inc.<br/></div>
            </div>
          </div>
      </div>} 
      </div>}
      {pageNum===1&&<div>
        {window.innerWidth>834&& <div className="main_proveit" style={{
        top:96,
        // position:header&&"fixed",
        margin:"0 auto",
        transition:"0s",
        marginTop:"40px",
        display:"flex",
        marginLeft:"16px"}}>
          <div style={{width:"100%"}}>
          <div className="community_item_category"
            onClick={()=>{
              if(window.location.pathname==="/communityitem"){
                const alink = document.createElement("a");
                alink.href = '/community';
                alink.click();
              }else{
                setCategoryState(0)
              }}}>
            <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_community_1})`,marginRight:"8px"}}></div>
            <div style={{color:categoryState===0&&"#9C31C6",fontWeight:categoryState===0&&"bold"}}>전체보기</div>
          </div>
          <div className="community_item_category"
            onClick={()=>{
              if(window.location.pathname==="/communityitem"){
                const alink = document.createElement("a");
                alink.href = '/community';
                alink.click();
              }else{
                setCategoryState(1)
              }}}>
            <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_community_2})`,marginRight:"8px"}}></div>
            <div style={{color:categoryState===1&&"#9C31C6",fontWeight:categoryState===1&&"bold"}}>궁금합니다</div>
          </div>
          <div className="community_item_category"
            onClick={()=>{
              if(window.location.pathname==="/communityitem"){
                const alink = document.createElement("a");
                alink.href = '/community';
                alink.click();
              }else{
                setCategoryState(2)
              }}}>
            <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_community_3})`,marginRight:"8px"}}></div>
            <div style={{color:categoryState===2&&"#9C31C6",fontWeight:categoryState===2&&"bold"}}>피드백 요청</div>
          </div>
          <div className="community_item_category"
            onClick={()=>{
              if(window.location.pathname==="/communityitem"){
                const alink = document.createElement("a");
                alink.href = '/community';
                alink.click();
              }else{
                setCategoryState(3)
              }}}>
            <div style={{width:"16px",height:'16px',backgroundImage:`url(${icon_community_4})`,marginRight:"8px"}}></div>
            <div style={{color:categoryState===3&&"#9C31C6",fontWeight:categoryState===3&&"bold"}}>기타</div>
          </div>
          <div style={{width:"288px",padding:"16px",border:"1px solid #f1f1f1",borderRadius:"8px",color:"#9C31C6",marginBottom:"16px"}}>
            자신이 만든 서비스에 관해 질문을 하거나 받거나, 
            스타트업/서비스 관련 노하우와 정보를 공유하거나 토론할 수 있습니다. 
            커뮤니티 내에서는 상대방을 배려하는 태도를 보여주세요. 👍
          </div>
          <div className="btn_one_big" style={{height:"60px",borderRadius:"8px"}}
          onClick={()=>{
            if(localStorage.getItem("hash")){
              const alink = document.createElement("a");
              alink.href = "/community_add";
              alink.click();
            }else{
                setLoginWindow(true);
            }
          }}>새로운 토론 생성</div>
          <div style={{marginLeft:"20px",marginTop:"16px"}}>
              <div style={{display:"flex"}}>
                <div><Link to="/introduce">소개</Link></div>
                <div style={{marginLeft:"4px",marginRight:'4px'}}>·</div>
                <div style={{display:'none'}}><Link to="/guideline">커뮤니티 가이드라인</Link></div>
              </div>
              <div style={{display:"flex"}}>
                <div><Link to="/tos">이용약관</Link></div>
                <div style={{marginLeft:"4px",marginRight:'4px'}}>·</div>
                <div><Link to="/privacy_policy">개인정보 처리방침</Link></div>
              </div>
              <div>이메일 문의 : hello@110corp.com</div>
              <div>© 2021 oneonezero Inc.<br/></div>
            </div>
        </div>
        </div>}
      </div>}
    </>
  )
}

export default RightBar;