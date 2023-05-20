// Firebase API 관련 JS

// Firebase Importing
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {getFirestore, collection, addDoc,getDocs} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase App Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3ccd5RK_q01Vr1Bh9bqR-6Bd7G-61BPE",
  authDomain: "new-webjong-server.firebaseapp.com",
  projectId: "new-webjong-server",
  storageBucket: "new-webjong-server.appspot.com",
  messagingSenderId: "1092753361332",
  appId: "1:1092753361332:web:5459ff3d4fd0df3767cae1",
  measurementId: "G-K1YM5L404Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 데이터 삽입 함수
const joinParty = async (date, name, color) => {
  try {
    const docRef = await addDoc(collection(db, "member"), {
      // 데이터베이스 콜렉션 설계
      date: date, 
      name: name,
      color: color,
    });
    alert(`${name}은(는) 보드게임 일정을 등록했다!`);
    window.location.reload()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// 날짜 확인 함수
const idList = ["월요일 점심","화요일 점심","수요일 점심","목요일 점심","금요일 점심","월요일 저녁","화요일 저녁","수요일 저녁","목요일 저녁","금요일 저녁"]
const matchDate = (targetDate, matchingIndex=-1) => {
  idList.forEach((date, index)=> {
    if(targetDate==date) {
      console.log(targetDate, date)
      matchingIndex = index
      // 반복문 실행 종료
      return false
    }
  })

  return matchingIndex
}

// 모달의 참가 버튼을 클릭하면 데이터 삽입 함수 호출
$(".submit-btn").click(()=>{
  // 날짜, 이름, 컬러 값 찾아오기
  let date = $(".submit-li-date").text()
  date = date.split(" ")[2] + " " + date.split(" ")[3] // .submit-li-date 값이 : 05월 16일 수요일 점심 과 같이 되어 있음
  console.log(date)
  date = matchDate(date)
  console.log(date)
  let name = $(".submit-input").val()
  let color = 0
  // ✔️ 표시가 들어있는지 확인해서 해당 div 집어내기
  $('.flex-row-center div').each(function() {
    if ($(this).text().trim() === '✔️') {
      color = $(this).attr("class")
      color = color.split(" ")[0].split("-")[2]*1 // 클래스 이름이 party-color-1과 같이 되어 있음 -> 숫자 값으로 변경
    }
  });
  // 값 입력 확인
  if (name == "" || color == 0) {
    alert("값을 전부 입력해주세요")
  } else {
    joinParty(date, name, color)
  }
})

// 데이터 조회 함수
const getParties = async () => {
  const memberList = await getDocs(collection(db, "member"));
  $(".member-wrap").empty()
  $(".b-card > h4 > span").text(0)
  memberList.forEach((doc) => {
    let data = doc.data()
    console.log(data)
    let targetCard = $(`#${data.date}`)

    // 멤버 카운트 수 올리기
    let memberCountDiv = targetCard.find('h4 > span')
    let memberCountNum = memberCountDiv.text()
    memberCountDiv.text(memberCountNum * 1 + 1)

    // 멤버 아이콘 추가하기
    let colorIconDiv = `<button class="member-icon color-${data.color} data-toggle="popover" data-content="참여자 : ${data.name}"></button>`
    targetCard.find(".member-wrap").append(colorIconDiv)
  })

  checkActive()
};


const checkActive = () => {
    $('.b-card > h4 > span').each(function() {
    let countNum = $(this).text() * 1
    if( countNum >= 4) {
      $(this).addClass("party-on")
      $(this).removeClass("party-off")
      $(this).closest('.b-card').find('.b-card-banner').addClass("activate")
    }
  })
}



getParties()


$(document).ready(function() {
  $('[data-toggle="popover"]').popover();
});
