const appointNum = [
  {gender:"남", num:"20"},
  {gender:"여", num:"25"}
]

export function getAppointNum(){
  return appointNum;
}

const staffList = [
  {"staff_id":1,"staff_name":"정동호","staff_tel":"010-1234-1234","img":"/resources/img/staff11.jpg","appoint_num":5,"staff_authority":"임상"},
  {"staff_id":2,"staff_name":"박선명","staff_tel":"010-1234-1234","img":"/resources/img/staff4.jpg","appoint_num":7,"staff_authority":"간호사"},
  {"staff_id":3,"staff_name":"조운호","staff_tel":"010-1234-1234","img":"/resources/img/staff11.jpg","appoint_num":15,"staff_authority":"의사"},
  {"staff_id":4,"staff_name":"강슬기","staff_tel":"010-1234-1234","img":"/resources/img/staff4.jpg","appoint_num":12,"staff_authority":"임상"},
  {"staff_id":5,"staff_name":"김나영","staff_tel":"010-1234-1234","img":"/resources/img/staff7.jpg","appoint_num":10,"staff_authority":"의사"}
]
export function getStaffList(){
  return staffList;
}

const imgNotice = [
  {"img_notice_id":1,"img_notice_title":"병원 근무시간 및 휴식시간 안내","img_notice_content":"우선 근로기준법에서는 1일 4시간 이상 근무 시 30분 이상의 휴게를 줘야 하고, 1일 8시간 이상 근무 시에는 1시간 이상의 휴게를 줘야 한다\n.그렇기 때문에 통상적인 중소기업체의 근무시간이 9시부터 18시까지 근무를 하면서 12시부터 13시까지 한 시간 휴게시간(점심시간)을 부여해 8시간 근로 및 휴게 1시간을 부여하고 있는 것이다.그러므로 만약 4시간만 근무시키고 싶은 파트타임 근로자가 있다면 실제 시업 종업시간의 총 시간은 4시간 30분이 돼야 한다.\n그러나 시업종업시간이 총 4시간이고, 15분 휴게를 부여한다면 실제 근로시간은 3시간 45분이 되므로, 휴게를 15분만 부여할 수 있다. 왜냐면 4시간 미만 근로 시에는 별도의 휴게를 부여하지 않아도 되기 때문이다.대기시간이에 반해 대기시간은 진행 중이던 업무가 중단돼 근로를 제공하고 있지 않지만, 언제든지 근로가 재개돼야 하기 때문에 대기하고 있는 시간을 의미한다","img_notice_date":"2021-06-25","img_notice_hitcount":2,"img_notice_img":"resources/img/img1.jpg"},
  {"img_notice_id":1,"img_notice_title":"병원 위치 및 병원관리","img_notice_content":"근무시간: 월요일 화요일 수요일 목요일 금요일 ....","img_notice_date":"2021-06-25","img_notice_hitcount":2,"img_notice_img":"resources/img/img2.jpg"},
  {"img_notice_id":1,"img_notice_title":"점심시간 안내 및 점심비용","img_notice_content":"근무시간: 월요일 화요일 수요일 목요일 금요일 ....","img_notice_date":"2021-06-25","img_notice_hitcount":2,"img_notice_img":"resources/img/img3.jpg"},
  {"img_notice_id":1,"img_notice_title":"병원 근무시간 및 휴식시간 안내","img_notice_content":"근무시간: 월요일 화요일 수요일 목요일 금요일 ....","img_notice_date":"2021-06-25","img_notice_hitcount":2,"img_notice_img":"resources/img/img1.jpg"},
  {"img_notice_id":1,"img_notice_title":"병원 근무시간 및 휴식시간 안내","img_notice_content":"근무시간: 월요일 화요일 수요일 목요일 금요일 ....","img_notice_date":"2021-06-25","img_notice_hitcount":2,"img_notice_img":"resources/img/img2.jpg"},
  {"img_notice_id":1,"img_notice_title":"점심시간 안내 및 점심비용","img_notice_content":"근무시간: 월요일 화요일 수요일 목요일 금요일 ....","img_notice_date":"2021-06-25","img_notice_hitcount":2,"img_notice_img":"resources/img/img3.jpg"}
]
export function getImgNotice(){
  return imgNotice;
}

const notice = [
  {"notice_id":1,"notice_title":"코로나 19 근무시간 관련 공지","notice_content":`<p class="ql-align-center">수도권 중심의 코로나19 확산으로 인해&nbsp;<strong>사회적거리두기 2.5단계</strong>로 상향되었습니다.&nbsp;</p><p class="ql-align-center"><br></p><p class="ql-align-center">이에 더존비즈온 병원은&nbsp;정부의 재택근무 권고 지침 및 내부 지침에 따라 근무시간 조정을 진행합니다.</p><p class="ql-align-center">&nbsp;</p><p class="ql-align-center">&nbsp;</p><p class="ql-align-center"><strong style="color: rgb(255, 102, 102);"><u>시행기간</u></strong></p><p class="ql-align-center">&nbsp;</p><p class="ql-align-center"><strong style="color: rgb(255, 102, 102);">2020년 12월 8일 (월) ~ 2021년 1월 17일 (일)</strong></p><p class="ql-align-center">&nbsp;</p><p class="ql-align-center">&nbsp;</p><p class="ql-align-center">&nbsp;</p><p class="ql-align-center">코로나 기간동안 대면 상담은 어려우나 일부 온라인으로 진행하고 있습니다.</p><p><br></p>`,"notice_date":"2021-06-26","notice_hitcount":3},
  {"notice_id":2,"notice_title":"설날 보너스 공지","notice_content":"<ol><li>	오잉</li><li>아깐 됐지?</li></ol><p><br></p>","notice_date":"2021-03-01","notice_hitcount":3},
  {"notice_id":3,"notice_title":"설날 휴무 관련 공지","notice_content":"자율재택 근무 관련을 공지합니다 내용은 뭐뭐입니다.","notice_date":"2021-02-21","notice_hitcount":3},
  {"notice_id":4,"notice_title":"2020년도 종무식 관련 공지","notice_content":"자율재택 근무 관련을 공지합니다 내용은 뭐뭐입니다.","notice_date":"2021-01-21","notice_hitcount":3},
  {"notice_id":5,"notice_title":"2020년 상반기 결산 관련 공지","notice_content":"자율재택 근무 관련을 공지합니다 내용은 뭐뭐입니다.","notice_date":"2021-01-01","notice_hitcount":3},
  {"notice_id":1,"notice_title":"코로나 19 근무시간 관련 공지","notice_content":"자율재택 근무 관련을 공지합니다 내용은 뭐뭐입니다.","notice_date":"2021-06-26","notice_hitcount":3},
  
]
export function getNotice(){
  return notice;
}

const freeBoard=[
  {"freeboard_id":1,"freeboard_title":"오늘 점심 뭐 먹을까요?","freeboard_date":"2021-06-26","freeboard_content":"면종류가 먹고 싶은데 고민이에요 ㅠㅠ","freeboard_time":"13:42","staff_name":"조운호","freeboard_comment":1},
  {"freeboard_id":2,"freeboard_title":"생일 선물 뭐가 좋을까요?","freeboard_date":"2021-06-26","freeboard_content":"면종류가 먹고 싶은데 고민이에요 ㅠㅠ","freeboard_time":"13:00","staff_name":"조운호","freeboard_comment":5},
  {"freeboard_id":3,"freeboard_title":"코로나가 갑자기 엄청 심해요","freeboard_date":"2021-06-26","freeboard_time":"13:00","staff_name":"조운호","freeboard_comment":4},
  {"freeboard_id":4,"freeboard_title":"오늘 날씨가 많이 춥네요","freeboard_date":"2021-06-26","freeboard_time":"13:00","staff_name":"조운호","freeboard_comment":3},
  {"freeboard_id":5,"freeboard_title":"밖에 비가 얼마나 오는 건가요?","freeboard_date":"2021-06-26","freeboard_time":"13:00","staff_name":"조운호","freeboard_comment":7},
  {"freeboard_id":6,"freeboard_title":"코로나가 갑자기 엄청 심해요","freeboard_date":"2021-06-26","freeboard_time":"13:00","staff_name":"조운호","freeboard_comment":7},
  {"freeboard_id":1,"freeboard_title":"오늘 점심 뭐 먹을까요?","freeboard_date":"2021-06-26","freeboard_time":"13:00","staff_name":"조운호","freeboard_comment":1},
  
]
export function getFreeBoard(){
  return freeBoard;
}
const freeBoardAnswer=[
  {"freeboard_id":1,"freeboard_answer_content":"짜장면어때요?!","freeboard_answer_date":"2021-06-26","freeboard_answer_time":"13:45","staff_name":"슬기"}

]

export function getFreeBoardAnswer() {
  return freeBoardAnswer;
}