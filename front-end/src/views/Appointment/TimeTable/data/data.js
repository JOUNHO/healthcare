// const tAppointment=[
//   {"시간":"10:00", "김의사":null,"나의사":1,"박의사":2,"정의사":null, "검사실":3},
//   {"시간":"10:30", "김의사":4,"나의사":null,"박의사":5,"정의사":6, "검사실":7},
//   {"시간":"11:00", "김의사":null,"나의사":null,"박의사":9,"정의사":null, "검사실":null},
//   {"시간":"11:30", "김의사":null,"나의사":11,"박의사":12,"정의사":null, "검사실":13},
//   {"시간":"12:00", "김의사":null,"나의사":null,"박의사":null,"정의사":null, "검사실":null},
//   {"시간":"12:30", "김의사":null,"나의사":null,"박의사":15,"정의사":16, "검사실":17},
//   {"시간":"13:00", "김의사":null,"나의사":null,"박의사":null,"정의사":null, "검사실":null},
//   {"시간":"14:00", "김의사":21,"나의사":22,"박의사":23,"정의사":null, "검사실":null},
//   {"시간":"14:30", "김의사":null,"나의사":null,"박의사":null,"정의사":null, "검사실":null},
//   {"시간":"15:00", "김의사":null,"나의사":null,"박의사":29,"정의사":null, "검사실":30},
//   {"시간":"15:30", "김의사":null,"나의사":31,"박의사":null,"정의사":33, "검사실":null},
//   {"시간":"16:00", "김의사":null,"나의사":35,"박의사":36,"정의사":null, "검사실":null},
//   {"시간":"16:30", "김의사":null,"나의사":null,"박의사":null,"정의사":null, "검사실":null},
//   {"시간":"17:00", "김의사":null,"나의사":35,"박의사":null,"정의사":null, "검사실":null}
// ]

const appointmentTime=[
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00"
]
export function getAppointTime(){
  return appointmentTime;
}




const tAppointment=[
  {"김의사":null,"나의사":1,"박의사":2,"정의사":null},
  {"김의사":4,"나의사":null,"박의사":5,"정의사":6},
  {"김의사":null,"나의사":null,"박의사":9,"정의사":null},
  {"김의사":null,"나의사":11,"박의사":12,"정의사":null},
  {"김의사":null,"나의사":null,"박의사":null,"정의사":null},
  {"김의사":null,"나의사":null,"박의사":15,"정의사":16},
  {"김의사":null,"나의사":null,"박의사":null,"정의사":null},
  {"김의사":21,"나의사":22,"박의사":23,"정의사":null},
  {"김의사":null,"나의사":null,"박의사":null,"정의사":null},
  {"김의사":null,"나의사":null,"박의사":29,"정의사":null},
  {"김의사":null,"나의사":31,"박의사":null,"정의사":33},
  {"김의사":null,"나의사":35,"박의사":36,"정의사":null},
  {"김의사":null,"나의사":null,"박의사":null,"정의사":null},
  {"김의사":null,"나의사":35,"박의사":null,"정의사":null}
]
export function getTAppoint(){
  return tAppointment;
}

const testAppointment=[
  {"검사실1":null,"검사실2":null},
  {"검사실1":4,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":21,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":null,"검사실2":null},
  {"검사실1":null,"검사실2":null}
];
export function getTestAppointment(){
  return testAppointment;
}

const appointList=[
  {appointment_id:1,patient_id:1,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"조운호", patient_gender:"남", appointment_state:"진료완료", appointment_content:"감기"},
  {appointment_id:2,patient_id:2,appointment_date:"2021-06-26",appointment_time:"10:00",patient_name:"정동호", patient_gender:"여", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:3,patient_id:2,appointment_date:"2021-06-27",appointment_time:"10:00",patient_name:"박선명", patient_gender:"남", appointment_state:"취소", appointment_content:"손목"},
  {appointment_id:4,patient_id:2,appointment_date:"2021-06-28",appointment_time:"10:00",patient_name:"강대희", patient_gender:"남", appointment_state:"예약", appointment_content:"감기"},
  {appointment_id:5,patient_id:2,appointment_date:"2021-06-29",appointment_time:"10:00",patient_name:"강정현", patient_gender:"여", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:6,patient_id:2,appointment_date:"2021-06-30",appointment_time:"10:00",patient_name:"김슬기", patient_gender:"남", appointment_state:"진료완료", appointment_content:"손목"},
  {appointment_id:7,patient_id:2,appointment_date:"2021-07-01",appointment_time:"10:00",patient_name:"구유빈", patient_gender:"남", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:8,patient_id:8,appointment_date:"2021-07-02",appointment_time:"10:00",patient_name:"김광민", patient_gender:"여", appointment_state:"취소", appointment_content:"손목"},
  {appointment_id:9,patient_id:9,appointment_date:"2021-07-03",appointment_time:"10:00",patient_name:"김나영", patient_gender:"남", appointment_state:"예약", appointment_content:"감기"},
  {appointment_id:10,patient_id:10,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"조운호", patient_gender:"남", appointment_state:"진료완료", appointment_content:"감기"},
  {appointment_id:11,patient_id:11,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"김동규", patient_gender:"여", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:12,patient_id:12,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"김사랑", patient_gender:"남", appointment_state:"취소", appointment_content:"손목"},
  {appointment_id:13,patient_id:13,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"김나영", patient_gender:"남", appointment_state:"예약", appointment_content:"감기"},
  {appointment_id:14,patient_id:14,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"김슬기", patient_gender:"여", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:15,patient_id:15,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"강정현", patient_gender:"남", appointment_state:"진료완료", appointment_content:"손목"},
  {appointment_id:16,patient_id:16,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"박선명", patient_gender:"남", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:17,patient_id:17,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"김슬기", patient_gender:"여", appointment_state:"취소", appointment_content:"손목"},
  {appointment_id:18,patient_id:18,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"김광민", patient_gender:"남", appointment_state:"예약", appointment_content:"감기"},
  {appointment_id:19,patient_id:19,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"강대희", patient_gender:"남", appointment_state:"진료완료", appointment_content:"감기"},
  {appointment_id:20,patient_id:2,appointment_date:"2021-06-25",appointment_time:"10:00",patient_name:"박선명", patient_gender:"여", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:21,patient_name:"정동호", patient_gender:"남", appointment_state:"취소", appointment_content:"손목"},
  {appointment_id:22,patient_name:"조운호", patient_gender:"남", appointment_state:"예약", appointment_content:"감기"},
  {appointment_id:23,patient_name:"박선명", patient_gender:"여", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:24,patient_name:"정동호", patient_gender:"남", appointment_state:"진료완료", appointment_content:"우측손목"},
  {appointment_id:25,patient_name:"조운호", patient_gender:"남", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:26,patient_name:"박선명", patient_gender:"여", appointment_state:"취소", appointment_content:"손목"},
  {appointment_id:27,patient_name:"정동호", patient_gender:"남", appointment_state:"예약", appointment_content:"감기"},
  {appointment_id:28,patient_name:"조운호", patient_gender:"남", appointment_state:"진료완료", appointment_content:"감기"},
  {appointment_id:29,patient_name:"박선명", patient_gender:"여", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:30,patient_name:"정동호", patient_gender:"남", appointment_state:"취소", appointment_content:"손목"},
  {appointment_id:31,patient_name:"조운호", patient_gender:"남", appointment_state:"예약", appointment_content:"감기"},
  {appointment_id:32,patient_name:"박선명", patient_gender:"여", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:33,patient_name:"정동호", patient_gender:"남", appointment_state:"진료완료", appointment_content:"손목"},
  {appointment_id:34,patient_name:"조운호", patient_gender:"남", appointment_state:"예약", appointment_content:"두통"},
  {appointment_id:35,patient_name:"박선명", patient_gender:"여", appointment_state:"취소", appointment_content:"손목"},
  {appointment_id:36,patient_name:"정동호", patient_gender:"남", appointment_state:"예약", appointment_content:"감기"},
  {appointment_id:37,patient_name:"정동호", patient_gender:"남", appointment_state:"예약", appointment_content:"감기"},
]

export function getAppointList() {
  return appointList;
}

const patientList=[
  {"patient_id":1,"patient_name":"조운호","patient_gender":"남", "patient_birth":"960413","patient_tel":"01012341324","reception_date":"2020-12-11"},
  {"patient_id":2,"patient_name":"정동호","patient_gender":"여", "patient_birth":"960413","patient_tel":"01012341234","reception_date":"2020-12-11"},
  {"patient_id":3,"patient_name":"박선명","patient_gender":"남", "patient_birth":"960413","patient_tel":"01033333333","reception_date":"2020-12-11"},
  {"patient_id":4,"patient_name":"강대희","patient_gender":"여", "patient_birth":"960413","patient_tel":"01077069178","reception_date":"2020-12-11"},
  {"patient_id":5,"patient_name":"강정현","patient_gender":"남", "patient_birth":"960413","patient_tel":"01077069178","reception_date":"2020-12-11"},
  {"patient_id":6,"patient_name":"김슬기","patient_gender":"여", "patient_birth":"960413","patient_tel":"01077069178","reception_date":"2020-12-11"},
  {"patient_id":7,"patient_name":"구유빈","patient_gender":"남", "patient_birth":"960413","patient_tel":"01077069178","reception_date":"2020-12-11"},
  {"patient_id":8,"patient_name":"김광민","patient_gender":"여", "patient_birth":"960413","patient_tel":"01077069178","reception_date":"2020-12-11"},
  {"patient_id":9,"patient_name":"김나영","patient_gender":"남", "patient_birth":"960413","patient_tel":"01077069178","reception_date":"2020-12-11"},
  {"patient_id":10,"patient_name":"조운호","patient_gender":"남", "patient_birth":"960413","patient_tel":"01077069178","reception_date":"2020-12-11"},
  {"patient_id":11,"patient_name":"김동규","patient_gender":"여", "patient_birth":"960413","patient_tel":"01077069178","reception_date":"2020-12-11"}
]



export function getPatientList() {
  return patientList;
}

