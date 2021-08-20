import React, { useEffect, useState } from 'react';

import icon_logo from '../../image/logo.svg';
import icon_checked from '../../image/checked.svg';
import icon_nonChecked from '../../image/nonChecked.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';


  

const SignUp = ()=>{

    const [checkState1,setCheckeState1]=useState(false);
    const [checkState2,setCheckeState2]=useState(false);
    const [renderState,setRenderState] =useState(false);
    const [privacyWindow,setPrivacyWindow] =useState(false);
    const [termsOfServiceWindow,setTermsOfService] =useState(false);
    const [historyBack,setHistoryBack] =useState(false);
    const [nickCheck,setNickCheck] = useState(false);
    const [currentImg,setCurrentImg] = useState(JSON.parse(localStorage.getItem("googleProfile")).imageUrl);
    const [currentUserInfo,setCurrnetUserInfo] =useState({
        nick:"",
        department:"",
        position:"",
        mailing:true,
    });
    const [imgFile,setImgFile] = useState("");

    const convertURLtoFile = async (url,setImgFile) => {
        const response = await fetch(url);
        // here image is url/location of image
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', {type: blob.type});
        setImgFile(file);
      };

    useEffect(()=>{
        if(currentUserInfo!==""){
            setRenderState(true);
        }
        convertURLtoFile(JSON.parse(localStorage.getItem("googleProfile")).imageUrl,setImgFile);
    },[]);

    const Privacy =()=>{
        return(
            <div style={{textAlign:"left",padding:"0px 24px 24px 24px",color:"#505050"}}>
                <div style={{fontSize:"24px",fontWeight:"bold",marginBottom:"45px",marginTop:"27px"}}>개인정보 처리방침</div>
                <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                    <div style={{fontSize:'20px',marginBottom:"20px"}}>제1조 개인정보의 처리 목적</div>
                    <div>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br/><br/>
                        1. 홈페이지 회원가입 및 관리<br/>
                        <li>회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 만14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부 확인, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.</li>
                        2. 민원사무 처리<br/>
                        <li>민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보, 민원 내역을 통한 서비스 개선 목적으로 개인정보를 처리합니다.</li>
                        3. 재화 또는 서비스 제공<br/>
                        <li>서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제·정산을 목적으로 개인정보를 처리합니다.</li>
                        4. 마케팅 및 광고에의 활용<br/>
                        <li>신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 , 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.</li>
                        </div>
                </div>
                <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                    <div style={{fontSize:'20px',marginBottom:"20px"}}>제2조 개인정보의 처리 및 보유 기간</div>
                    <div>
                    ① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.<br/>
                    ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.<br/><br/>

                    <b>홈페이지 회원가입 및 관리</b><br/>
                    홈페이지 회원가입 및 관리와 관련한 개인정보는 수집·이용에 관한 동의일로부터 5년까지 위 이용목적을 위하여 보유·이용됩니다.<br/>
                    보유근거 : 서비스 부정 이용 방지 및 원활한 서비스 제공<br/>
                    관련법령 : 계약 또는 청약철회 등에 관한 기록 : 5년<br/>
                    예외사유 : -<br/><br/>

                    <b>민원사무 처리</b><br/>
                    민원사무 처리와 관련한 개인정보는 수집.이용에 관한 동의일로부터 3년까지 위 이용목적을 위하여 보유·이용됩니다.<br/>
                    보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률<br/>
                    관련법령 : 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년<br/>
                    예외사유 : -<br/><br/>

                    <b>재화 또는 서비스 제공</b><br/>
                    재화 또는 서비스 제공과 관련한 개인정보는 수집.이용에 관한 동의일로부터 5년까지 위 이용목적을 위하여 보유·이용됩니다.<br/>
                    보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률<br/>
                    관련법령 : 대금결제 및 재화 등의 공급에 관한 기록 : 5년<br/>
                    예외사유 : -<br/><br/>

                    <b>마케팅 및 광고에의 활용</b><br/>
                    마케팅 및 광고에의 활용과 관련한 개인정보는 수집.이용에 관한 동의일로부터 6개월까지 위 이용목적을 위하여 보유·이용됩니다.<br/>
                    보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률<br/>
                    관련법령 : 표시/광고에 관한 기록 : 6개월<br/>
                    예외사유 : -

                    </div>
                </div>
                <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                    <div style={{fontSize:'20px',marginBottom:"20px"}}>제3조 처리하는 개인정보의 항목</div>
                    <div>
                    ① 회사는 다음의 개인정보 항목을 처리하고 있습니다. 사용자는 서비스 이용을 위해 아래의 정보를 제공해야 합니다.<br/>
                    <li>필수항목 : 이메일, 비밀번호, 이름</li>
                    <li>자동 수집 항목 : 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록</li>
                    </div>
                </div>
                <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                    <div style={{fontSize:'20px',marginBottom:"20px"}}>제4조 개인정보의 파기</div>
                    <div>
                    1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br/>
                    2. 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br/>
                    3. 개인정보 파기의 절차 및 방법은 다음과 같습니다.<br/>
                    <li>파기절차 : 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
                    <li>파기방법 : 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                    </div>
                </div>
                <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                    <div style={{fontSize:'20px',marginBottom:"20px"}}>제5조 개인정보의 안전성 확보 조치</div>
                    <div>
                    1. 회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br/>
                    <li>개인정보 취급 직원의 최소화 및 교육 : 개인정보를 취급하는 직원을 지정, 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.</li>
                    </div>
                </div>
                <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                    <div style={{fontSize:'20px',marginBottom:"20px"}}>제6조 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항</div>
                    <div>
                    1. 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.<br/>
                    2. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. <br/>
                    <li>쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다. </li>
                    <li>쿠키의 설치·운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. 다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
                    </div>
                </div>
                <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                    <div style={{fontSize:'20px',marginBottom:"20px"}}>제7조 개인정보 보호 책임자</div>
                    <div>
                    1. 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br/>
                    개인정보 보호책임자
                    <li>성명 : 이성만</li>
                    <li>직책 : 대표이사</li>
                    <li>연락처 : 010-9143-1648, sungman5@110corp.com</li>
                    2. 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
                    </div>
                </div>
                <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                    <div style={{fontSize:'20px',marginBottom:"20px"}}>제8조 권익침해 구제방법</div>
                    <div>
                    1. 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.<br/>
                    <li>개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                    <li>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>
                    <li>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
                    <li>경찰청 : (국번없이) 182 (cyberbureau.police.go.kr)</li>
                    2. 「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
                    <li>행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.</li>
                    </div>
                </div>
                <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                    <div style={{fontSize:'20px',marginBottom:"20px"}}>제9조 개인정보 처리방침 변경</div>
                    <div>
                    1. 이 개인정보처리방침은 2021년 7월 12일부터 적용됩니다.
                    </div>
                </div>
            </div>
        )
    }
    
    const TermsOfService = ()=>{
        return(
            <div style={{textAlign:"left",padding:"0px 24px 24px 24px",color:"#505050"}}>
            <div style={{fontSize:"24px",fontWeight:"bold",marginBottom:"45px",marginTop:"27px"}}>이용약관</div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제1조 목적</div>
                <div>
                    이 약관은 주식회사 일일공(이하 "회사")이 운영하는 프루브잇 웹사이트(이하 "사이트")에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항, 그 외의 필요한 사항을 규정합니다.<br/>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제2조 용어의 정의</div>
                <div>
                1. 사이트 : 회원이 이용하는 사이트(https://proveit.co.kr)입니다.<br/>
                2. 이용자 : 사이트에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br/>
                3. 회원 : 사이트에 회원등록을 한 자로서, 계속적으로 사이트가 제공하는 서비스를 이용할 수 있는 자를 말합니다.<br/>
                4. 해지: 회사 또는 회원이 서비스 개시 후 서비스 이용 계약을 해약하는 것을 말합니다.<br/>
                5. 게시물 : 회원이 서비스를 이용함에 있어 사이트 상에 게시한 부호·문자·음성·음향·화상·동영상 등 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.<br/>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제3조 약관 등의 명시와 설명 및 개정</div>
                <div>
                1. 회사는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소, 문의를 위한 전자우편 주소, 사업자 등록번호, 통신판매업 신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 사이트 초기 서비스 화면에 게시합니다. 다만 약관의 내용은 이용자가 연결화면을 통하여 보도록 할 수 있습니다.<br/>
                2. 회사는 전자상거래 등에서의 소비자 보호에 관한 법률, 약관이 규제에 관한 법률, 전자문서 및 전자거래기본법, 전자금융거래법, 전자서명법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 방문판매 등에 관한 법률, 소비자기본법 등 관련 법을 위배하지 않는 범위에서 사전 고지 없이 이 약관을 개정할 수 있습니다.<br/>
                3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기 화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 회사는 개정 전·후의 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.<br/>
                4. 회사가 앞의 내용에 따라 공지하거나 통지한 개정 약관에 대해 회원이 명시적으로 거부 의사를 표시하지 않으면 동의한 것으로 봅니다. 동의하지 않는 회원은 언제든지 자유롭게 서비스 이용계약을 해지할 수 있습니다. 다만, 기존 약관을 적용할 수 없는 특별한 사정이 있는 경우에 회사는 이용 계약을 해지할 수 있습니다.<br/>
                5. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호 지침 및 관계법령에 따릅니다.<br/>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제4조 서비스 이용 계약의 성립</div>
                <div>
                1. 이용자는 ‘이용약관'과 ‘개인정보 수집 및 이용'에 동의하면 회원 가입을 신청할 수 있고, 회사가 신청을 승낙하면 이용계약이 체결됩니다.<br/>
                2. 회사는 회원에게 필요시 실명 확인 및 본인 인증을 요청할 수 있으며, 그 절차와 방식은 관계 법령에 따릅니다.<br/>
                3. 회사는 다음의 경우 신청에 대한 승낙을 하지 않거나 유보할 수 있습니다.<br/>
                <li>동일한 이메일 주소로 가입한 사람이 있을 때</li>
                <li>회원가입을 신청한 사람이 이전에 이 약관에 의해 회원 자격을 상실한 적이 있을 때 - 단, 회사가 재가입을 승낙한 경우는 예외로 합니다.</li>
                <li>허위로 정보를 기재했거나 회사가 제시하는 내용을 기재하지 않았을 때</li>
                <li>회원의 귀책사유로 승인을 할 수 없거나, 회원이 규정한 내용이나 법령을 위반하였을 때</li>
                <li>회사의 서비스 설비에 여유가 없거나 기술상 또는 업무상 문제가 있는 경우</li>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제5조 서비스의 제공 및 변경</div>
                <div>
                1. 사이트는 아래 업무를 수행합니다.<br/>
                <li>회원이 업로드한 게시물의 등록 및 게시</li>
                <li>커뮤니티 서비스</li>
                <li>기타 사업자가 자체 개발하거나 다른 회사와의 협력 계약을 통해 회원들에게 제공할 일체의 서비스</li>
                <li>광고 상품 판매</li>
                2. 회사는 기술상 또는 업무상 문제가 없는 한 연중무휴, 1일 24시간 서비스를 제공합니다. 다만, 회사는 다음의 경우 서비스 제공의 전부 또는 일부를 중단할 수 있습니다.<br/>
                <li>서비스를 위한 기반 설비의 보수, 정비 및 교체 등의 사유가 발생하였을 때</li>
                <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 때</li>
                <li>서비스 이용 폭주 등의 사유로 시스템 설비 장애가 발생하였을 때</li>
                <li>국가 비상사태 혹은 정전 등의 불가항력의 사유가 발생했을 때</li>
                <li>회사의 서비스 설비에 여유가 없거나 기술상 또는 업무상 문제가 있는 경우</li>
                <li>정기 점검, 긴급한 시스템 점검 및 그 외 회사가 적절하다고 판단할 때</li>
                3. 회사는 서비스 제공을 중단해야 하는 사유가 발생하였을 때 사이트의 공지사항이나 등록된 이메일을 통해 회원에게 통지합니다.<br/>
                4. 회사는 제공하는 서비스를 일정 범위로 나누어 각 범위의 이용 가능 시간을 별도로 정할 수 있습니다. 이 때 그 내용을 사전에 공지합니다.<br/>
                5. 회사는 업무상 또는 기술의 필요에 따라 제공하는 서비스의 전부 또는 일부를 변경할 수 있습니다. 이 때 변경하는 내용과 날짜를 사이트의 공지사항이나 아이디로 등록된 이메일을 통해 회원에게 통지합니다.
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제6조 서비스 이용의 기술적 요구사항</div>
                <div>
                1. 회사는 서비스를 공급하면서 아래의 서비스이용 필수사양이 충족되어야 정상적인 서비스 이용이 가능하며, 사용자가 해당 사양에 충족되지 못한 사유로 서비스 이용의 이의를 제기할 시 회사는 책임을 지지 않습니다.<br/>
                2. 서비스이용 필수사양<br/>
                <li>(웹브라우저) 원활한 서비스 사용을 위해 크롬 브라우저를 권장합니다. 인터넷 익스플로러(Internet Explorer)의 모든 버전에서는 정상적으로 동작하지 않을 수 있습니다.</li>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제7조 개인정보의 보호 및 사용</div>
                <div>
                1.회사는 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의 개인정보 처리방침이 적용됩니다. 단, 회사의 사이트 이외의 링크된 사이트에서는 회사의 개인정보 취급방침이 적용되지 않습니다. 또한, 회원은 비밀번호 등이 타인에게 노출되지 않도록 철저히 관리해야 하며 회사는 회원의 귀책사유로 인해 노출된 정보에 대해서 책임을 지지 않습니다.<br/>
                2.회사는 다음과 같은 경우에 법이 허용하는 범위 내에서 회원의 개인정보를 제 3자에게 제공할 수 있습니다.
                <li>수사기관이나 기타 정부 기관으로부터 정보제공을 요청받은 경우</li>
                <li>회원의 법령 또는 약관의 위반을 포함하여 부정행위 확인 등의 정보보호 업무를 위해 필요한 경우</li>
                <li>기타 법률에 의해 요구되는 경우</li>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제8조 이용의 제한</div>
                <div>
                1. 회사는 아래 사항에 해당하는 경우에는 서비스 이용을 제한하거나, 이용승낙을 철회할 수 있습니다.<br/>
                <li>타인의 이메일이나 아이핀이나 휴대폰 인증 정보를 도용하여 가입한 경우</li>
                <li>부정한 용도로 본 서비스를 이용하는 경우</li>
                <li>법령 위반 또는 사회의 안녕과 질서, 미풍양속을 저해할 목적으로 이용한 경우</li>
                <li>청소년보호법의 취지에 위배되는 목적으로 본 서비스를 이용하는 경우</li>
                <li>기타 현행 법령에 위배되는 목적으로 본 서비스를 이용하는 경우</li>
                <li>본 서비스와 경쟁 관계에 있는 사용자가 회사의 이익을 저해하려는 목적으로 이용하는 경우</li>
                <li>기타 규정한 제반 사항을 위반하며 신청하는 경우</li>
                2. 회사는 회원의 서비스 이용 중 다음 각 호에 해당하는 경우에는 그 이용에 대하여 아래의 사유가 해소될 때까지 이용을 제한할 수 있습니다.<br/>
                <li>회사가 설비의 여유가 없는 경우</li>
                <li>회사의 기술상 지장이 있는 경우</li>
                <li>기타 회사의 귀책 사유로 이용이 곤란한 경우.</li>
                3. 회사는 이용 신청 고객이 만 14세 미만의 아동일 경우 정보통신망이용촉진 및 정보보호 등에 관한 법률 등에 따라 법정 대리인의 동의가 없을 경우 광고 상품의 구매 등에 제한을 할 수 있습니다.<br/>
                4. 회사는 회원이 사이트의 커뮤니티 서비스를 이용함에 있어, 커뮤니티 가이드라인에 명시된 항목을 위반하였을 경우 회원의 게시물이나 댓글을 별도의 통보 없이 삭제할 수 있으며, 이에 대하여 회사는 어떠한 책임도 지지 않습니다. 커뮤니티 활동에 관한 자세한 내용은 별도의 커뮤니티 가이드라인에 명시합니다. 
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제9조 정보 제공과 광고 게재</div>
                <div>
                1. 서비스를 이용하는 데 도움이 되는 정보나 서비스 운영과 관련된 광고를 사이트에 게재하거나 이메일로 전달할 수 있습니다. 회원은 이메일 수신을 거부할 수 있습니다.<br/>
                2. 회사는 회원이 서비스를 이용하는 데 도움이 된다고 판단되는 다양한 정보를 공지사항이나 이메일 등의 방법으로 회원에게 제공할 수 있습니다. 회원은 관련법에 따른 거래 관련 정보와 고객문의 등에 대한 답변 등을 제외하고는 언제든지 이메일에 대해서 수신을 거부할 수 있습니다.<br/>
                3. 회사는 서비스 운영과 관련하여 사이트, 이메일 등에 광고를 게재할 수 있습니다. 원치않는 경우 회원은 수신을 거부할 수 있습니다.<br/>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제10조 서비스 이용 요금</div>
                <div>
                1. 사이트는 무료로 운영됩니다.<br/>
                2. 회원이 회사가 제공하는 서비스 중 광고 상품을 구매하고자 하는 경우 정해진 금액을 회사에 지불하고 광고를 게재할 수 있습니다.
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제11조 회원번호 관리</div>
                <div>
                1. 사용자 ID와 비밀번호에 관한 모든 관리 책임은 회원에게 있습니다.<br/>
                2. 회사는 사용자 아이디(ID)를 사용자가 가입시 선택한 소셜 로그인 서비스의 이메일 주소를 사용하고 있으며, 이것을 사용자의 유일한 구별자로 하여 제반 사용자 관리 업무를 수행하므로 회원은 사용자 아이디는 변경할 수 없습니다. 변경하고자 하는 경우에는 해지 후 다른 아이디로 새롭게 가입해야 합니다.<br/>
                3. 이용 고객이 등록한 사용자 ID 및 비밀번호에 의하여 발생되는 사용상의 과실 또는 제 3자에 의한 부정사용 등에 대한 모든 책임은 해당 이용 고객에게 있습니다.
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제12조 계약 해지</div>
                <div>
                1. 회원은 사이트에서 계약 해지(회원 탈퇴)를 신청할 수 있습니다.<br/>
                2. 계약 해지(회원 탈퇴)는 사이트 우측 상단의 계정 아이콘을 클릭하여 표시되는 '내 프로필 → 회원 탈퇴' 메뉴에서 진행할 수 있습니다.<br/>
                3. 회원이 사이트에서 계약 해지(회원 탈퇴)를 신청시, 회사는 관련 법령 등이 정하는 절차에 따라 이를 처리합니다.<br/>
                4. 회원이 진행한 계약 해지(회원 탈퇴)가 정상적으로 처리 될 경우, 회원의 게정은 회원 탈퇴 요청일로부터 1개월 후에 완전삭제 됩니다. 단 회원의 요청이 있을 시 회사는 회원 정보를 즉시 삭제하여야 합니다.<br/>
                5. 회사는 회원 탈퇴 요청 후 회원의 별다른 요청이 없다면 보존 기간이 만료시 관계 법령에 따라 보존해야 하는 개인정보 및 거래 정보 이외의 모든 데이터를 즉시 삭제합니다. 삭제된 데이터는 복구할 수 없습니다. 이때 남아있는 정보는 다음과 같습니다. (①광고 상품 구매 이력 및 구매 이력 관리를 위한 가입 아이디 ② 게시글과 댓글)<br/>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제13조 저작권</div>
                <div>
                1. 회원이 사이트에 게시하는 게시물은 회사가 사이트의 운영, 홍보, 회원이 등록한 게시물의 홍보 등을 위해 회사의 소셜미디어, 이메일 등에 첨부하여 소개될 수 있습니다. 이는 회원의 게시물에 대한 저작권 소유를 의미하지 않습니다.<br/>
                2. 회원이 사이트에 게시하는 게시물에 포함된 부호·문자·음성·음향·화상·동영상 등 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등이 타인의 저작권 위반이 있을 경우, 이에 대한 모든 법적 책임은 회사에 있지 않고, 이를 등록한 회원에게 있습니다.<br/>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제14조 면책조항</div>
                <div>
                1. 회사는 천재지변, 건쟁 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우 서비스 제공에 대한 책임이 면제됩니다.<br/>
                2. 회사는 기간통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다.<br/>
                3. 회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.<br/>
                4. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다.<br/>
                5. 회사는 사용자의 컴퓨터 오류에 의해 손해가 발생한 경우, 또는 회원이 신상정보 및 전자우편 주소를 부실하게 기재하여 손해가 발생한 경우 책임지지 않습니다.<br/>
                6. 회사는 회원이 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다. 또한 회사는 회원이 서비스를 이용하며 타 회원으로 인해 입게되는 정신적/물질적 피해에 대하여 보상할 책임이 없습니다.<br/>
                7. 회사는 회원이 등록한 사진, 로고, 벡터 그래픽, 기타 등록자료 등이 타인의 저작권을 침해한 경우, 회원에게 책임이 있으며 회사는 책임을 지지 않습니다.<br/>
                8. 회사는 사용자 상호간 및 사용자와 제삼자 상호간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며 이에 따른 손해를 배상할 책임도 없습니다.<br/>
                9. 서비스의 장애 혹은 통신장애 등으로 인하여 서비스를 사용할 수 없게 됨으로써 발생하는 사용자의 데이터 유실, 물질적/정신적 손실, 비즈니스의 중단 등으로 인한 피해에 대하여 회사는 책임을 지지 않습니다.<br/>
                10. 서비스는 사전 통보 없이 웹사이트 내의 콘텐츠, 소프트웨어, 게시물 등을 변경할 수 있습니다.
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제15조 재판권 및 준거법</div>
                <div>
                1. 약관에 명시되지 않은 사항이 관계법령에 규정되어 있을 때는 해당 규정에 따릅니다.<br/>
                2. 회사의 유료 서비스 이용 회원의 경우 회사가 별도로 정한 약관 및 정책이 있을 경우 이를 따릅니다.<br/>
                3. 서비스 이용으로 회사와 사용자 간의 분쟁이 발생할 경우, 회사와 회원은 상호 원만히 합의되도록 노력해야 합니다. 합의가 결렬되어 발생한 분쟁에 대하여 소송이 제기될 경우 회사의 소재지를 관할하는 법원을 관할 법원으로 합니다.<br/>
                4. 회사의 사용자 간에 제기된 전자상거래 소송에는 대한민국 법을 적용합니다.<br/>
                </div>
            </div>
            <div style={{marginBottom:"40px",fontSize:"14px",lineHeight:'25px'}}>
                <div style={{fontSize:'20px',marginBottom:"20px"}}>제16조 이용약관의 변경</div>
                <div>
                1. 이 이용약관은 2021년 7월 12일부터 적용됩니다.
                </div>
            </div>
        </div>
        )
    }

    const inputLogic = (e)=>{
        const {name,value} = e.target;
        if(value.length<21){
            setCurrnetUserInfo({
             ...currentUserInfo,
             [name]:value
            })
        }
    }

    const userInfoApi = async()=>{
        var data = new FormData();
        data.append('email', localStorage.getItem("email"));
        data.append('token', localStorage.getItem("token"));
        data.append('type', 'update');
        data.append('thumbnail', imgFile);
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
                    localStorage.setItem("hash",e.data.user.hash);
                    localStorage.setItem("userInfo",JSON.stringify(e.data.user));
                    const alink = document.createElement("a");
                    alink.href ="/";
                    setTimeout(() => {
                        alink.click();       
                    }, 100);
                }else{
      
                }
            })
        }catch{
      
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
                if(fileSize <= 10000000){
                    setCurrentImg(window.URL.createObjectURL(file));
                    setImgFile(data.files[0]);
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
    },[currentUserInfo])

        window.history.pushState(null,"",window.location.href);

        window.onpopstate = ()=>{
            window.history.go(1);
            setHistoryBack(true);
        }


  return(
      <>
      {renderState&&
        <div style={{
            backgroundColor:"#F9F9F9",
            display:"flex",
            height: "100%",
            flexDirection:"column",
            alignItems:"center",
            position: "relative",
            color:"#505050"}}>
            <div className="signup">
                <div style={{width:"90px",height:"16px",backgroundImage:`url(${icon_logo})`,marginTop:'40px',marginBottom:'24px',cursor:"pointer"}}
                onClick={()=>{
                    localStorage.clear();
                    const alink = document.createElement("a");
                    alink.href = "/";
                    alink.click();
                }}></div>
                <div style={{fontSize:"16px",height:"16px",lineHeight:'16px',fontWeight:"bold"}}>회원가입</div>
                <div style={{width:"100%",marginTop:"40px"}}>
                    <div className="signup_group_title">반갑습니다</div>
                    <div className="signup_group">
                        <div style={{height:"14px",fontSize:"14px",lineHeight:'14px',fontWeight:'bold',color:"#505050",width:"100%",textAlign:"left"}}>이름</div>
                        <div style={{width:"100%",fontSize:"13px",textAlign:"left",marginTop:"16px",color:"#a5a5a5"}}>{JSON.parse(localStorage.getItem("googleProfile")).name}</div>
                        <div style={{height:"14px",fontSize:"14px",lineHeight:'14px',marginTop:"24px",fontWeight:'bold',color:"#505050",width:"100%",textAlign:"left"}}>이메일</div>
                        <div style={{width:"100%",fontSize:"13px",textAlign:"left",marginTop:"16px",color:"#a5a5a5"}}>{JSON.parse(localStorage.getItem("googleProfile")).email}</div>
                    </div>
                </div>
                <div style={{marginTop:"40px",marginBottom:"24px",width:"100%"}}>
                    <div className="signup_group_title">간단한 프로필을 완성해주세요</div>
                    <div className="signup_group">
                        <div style={{height:"14px",fontSize:"14px",lineHeight:'14px',fontWeight:'bold',color:"#505050",width:"90%",textAlign:"left"}}>프로필 이미지 변경</div>
                        <div style={{marginTop:"18px",display:"flex"}}>
                            <div style={{width:"80px",height:"80px",minHeight:"80px",minWidth:"80px",borderRadius:"50%",backgroundColor:"#c4c4c4",marginRight:"20px",
                                        backgroundImage:`url(${currentImg})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}></div>
                            <div style={{width:"100%",textAlign:"left",fontSize:"13px",marginBottom:'24px'}}>
                                <form style={{display:"block"}}>
                                    <input type='file' id="thumbnailImg" style={{display:"none"}}  accept=".jpg,.jpeg,.png,.bmp" onChange={FileUploder}></input>
                                    <label for="thumbnailImg" className="btn_three" style={{fontSize:"13px",width:"112px",height:"32px",marginBottom:"16px"}}>이미지 업로드
                                    </label>
                                </form>
                                <div style={{color:"#a5a5a5",lineHeight:"18.82px"}}>추천 사이즈 : 240*240<br/>jpg,jpeg,png,gif,최대 파일크기 2MB</div>
                            </div>
                        </div>
                        <div style={{textAlign:"left"}}>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}}>
                                <div style={{fontWeight:"bold",fontSize:'14px',height:'14px',lineHeight:"14px",textAlign:"left"}}>닉네임</div>
                                {nickCheck&&<div style={{marginLeft:"8px",fontSize:13,height:"14px",lineHeight:"14px",color:"#EA4335",fontWeight:500}}>닉네임은 한글 또는 알파벳으로 입력해 주세요</div>}
                            </div>
                            <input name="nick" placeholder="입력하지 않으면 구글 계정명으로 표시됩니다." value={currentUserInfo.nick} onChange={inputLogic}


                             className="signup_input"></input>
                        </div> 
                        <div style={{textAlign:"left",marginTop:'16px'}}>
                            <div style={{fontWeight:"bold",fontSize:'14px',height:'14px',lineHeight:"14px",marginBottom:"10px",textAlign:"left"}}>직책/직군 - 필수 <span style={{color:"#ED5C2E"}}>*</span></div>
                            <input name="position" placeholder="CEO, 대표이사, 예비창업자, 디자이너, 개발자, 투자자등" value={currentUserInfo.position} onChange={inputLogic}
                             className="signup_input"></input>
                        </div>  
                        <div style={{textAlign:"left",marginTop:'16px'}}>
                            <div style={{fontWeight:"bold",fontSize:'14px',height:'14px',lineHeight:"14px",marginBottom:"10px",textAlign:"left"}}>소속</div>
                            <input name="department" placeholder="소속을 알려주세요 - 회사명, 팀, 프리랜서 등" value={currentUserInfo.department} onChange={inputLogic}
                            className="signup_input"></input>
                        </div>  
                        <div style={{display:"flex",marginTop:'24px'}}>
                            <div style={{width:"16px",minWidth:"16px",minHeight:'16px',height:'16px',marginRight:'8px',backgroundImage:checkState1?`url(${icon_checked})`:`url(${icon_nonChecked})`,cursor:"pointer"}}
                            onClick={()=>{setCheckeState1(!checkState1)}}></div>
                            <div style={{fontSize:"13px",color:"#a5a5a5",lineHeight:"16px"}}>
                                프루브잇의 
                                <span style={{textDecoration:"underline",cursor:"pointer",marginLeft:"4px"}} 
                                onClick={()=>{setTermsOfService(true);window.scrollTo(0,0);}}>
                                    이용약관
                                </span>과 
                                <span style={{textDecoration:"underline",cursor:"pointer",marginLeft:"4px"}} 
                                onClick={()=>{setPrivacyWindow(true);window.scrollTo(0,0);}}>
                                    개인정보처리방침
                                    </span>
                                을 확인하였습니다.{"(필수)"}</div>
                        </div>
                        <div style={{display:"flex",marginTop:"15px",marginBottom:"29px"}}>
                            <div style={{width:"16px",minWidth:"16px",minHeight:'16px',height:'16px',marginRight:'8px',backgroundImage:checkState2?`url(${icon_checked})`:`url(${icon_nonChecked})`,cursor:"pointer"}}
                            onClick={()=>{
                                if(checkState2){
                                    setCurrnetUserInfo({
                                        ...currentUserInfo,
                                        mailing:"N"
                                    });
                                    setCheckeState2(false);
                                }else{
                                    setCurrnetUserInfo({
                                        ...currentUserInfo,
                                        mailing:"Y"
                                    });
                                    setCheckeState2(true)
                                }
                                }}></div>
                            <div style={{fontSize:"13px",color:"#a5a5a5",lineHeight:"16px"}}>프루브잇의 최신 소식과 관련 트렌드 뉴스레터를 받아볼게요.{"(선택)"}</div>
                        </div>
                    </div>
                </div>

                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
                    <div className="btn_one" style={{width:"104px",height:'32px',marginBottom:"32px"}}
                    onClick={(e)=>{userInfoApi();}}>가입 완료</div>
                    {(currentUserInfo.position===""||!checkState1||nickCheck)&&<div className="btn_one_disible" style={{width:"104px",height:'32px',bottom:"0px",position:'absolute'}}>가입 완료</div>}
                    
                </div>
                {(privacyWindow||termsOfServiceWindow)&&<div style={{width:"100%",height:"100%",position:'absolute',top:"0px",left:"0px",backgroundColor:"rgba(80,80,80,0.8)",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"80px"}} onClick={()=>{setPrivacyWindow(false);setTermsOfService(false)}}>
                    <div style={{width:"1040px",height:"80vh",backgroundColor:"#fff",overflow:"scroll",overflowX:"hidden"}}>
                        {privacyWindow&&<Privacy></Privacy>}
                        {termsOfServiceWindow&&<TermsOfService></TermsOfService>}
                    </div>
                    <div style={{width:"1040px",textAlign:"right",color:"#fff",cursor:"pointer",fontSize:"14px"}}>닫기</div>
                </div>}
                {historyBack&&<div style={{width:"100vw",height:"100vh",position:"fixed",top:"0",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(80,80,80,0.8)"}}
            onClick={()=>{setHistoryBack(false);}}>
                    <div style={{width:"336px",height:"184px",backgroundColor:"#fff",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                        <div style={{fontWeight:"bold",fontSize:"16px",marginBottom:"16px"}}>회원 가입 취소</div>
                        <div style={{fontSize:"13px",marginBottom:"25px"}}>회원 가입을 취소하시겠습니까?</div>
                        <div style={{display:"flex"}}>
                            <div style={{width:"120px",height:"40px",marginRight:"8px"}} className="btn_two" onClick={(e)=>{e.stopPropagation();setHistoryBack(false);}}>계속 진행</div>
                            <div style={{width:"120px",height:"40px"}} className="btn_one" onClick={(e)=>{
                                e.stopPropagation();
                                localStorage.clear();
                                const alink = document.createElement("a");
                                alink.href = "/";
                                alink.click();
                            }}>가입 취소</div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>        
      }
      </>
  )
}

export default SignUp;