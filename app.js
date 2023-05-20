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
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// 모달의 참가 버튼을 클릭하면 데이터 삽입 함수 호출
$(".submit-btn").click(()=>{
  // 날짜, 이름, 컬러 값 찾아오기
  let date = $(".submit-li-date").text()
  date = date.split(" ")[2] + date.split(" ")[3] + " " + date.split(" ")[5] // .submit-li-date 값이 : 05월 16일 수요일 점심 과 같이 되어 있음
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

// 날짜 확인 함수
const matchDate = (targetDate, matchingIndex=-1) => {
  // console.log(`input => ${targetDate}`)

  dates.forEach((date, index)=> {
    // console.log(`loop => ${date}`)
    if(targetDate==date) {
      matchingIndex = index
      // 반복문 실행 종료
      return false
    }
  })

  return matchingIndex
}
// 데이터 조회 함수
const getParties = async () => {
  const memberList = await getDocs(collection(db, "member"));
  $(".member-wrap").empty()
  memberList.forEach((doc) => {
    let data = doc.data()
    console.log(data)

    $(".b-card-date").each(function() {
      let htmlDate = $(this).text();
      let dataDate = data.date.split(" ")[0] + " " + data.date.split(" ")[1];
      
      if (htmlDate === dataDate) {
        let htmlCard = $(this).closest('.b-card');
        let htmlDayDiv = htmlCard.find('.b-card-banner');
        let htmlDayText = htmlDayDiv.text().split(" ")[1];
        let dataDay = data.date.split(" ")[2];
        
        if (htmlDayText === dataDay) {
          let htmlMember = htmlCard.find('.member-wrap');
          let tempHtml = `<div class="b-card flex-col-between shadow-sm">
                                <div class="b-card-banner flex-col-center text-w">월요일 점심</div>
                                <div class="b-card-date mon">5월 15일</div>
                                <h4>참여인원 <span class="party-on">3</span> /4</h4>
                                <div class="member-wrap"></div>
                                <button class="party-btn">이 일정 참가하기 🎲</button>
                          </div>`;
          htmlMember.append(tempHtml);
        }
      }
    });
    
    // let targetDate = data.date.split(" ")[0] + " " + data.date.split(" ")[1]
    // let result = matchDate(targetDate)
    // if(result>=0 && result<5) {
    //   // console.log('yay')
    //   let targetClass = days[matchDate(targetDate)]
    //   console.log(targetClass)
    //   let targetParents = $(`.${targetClass}`).closest('.b-card').find('.member-wrap')
    //   console.log(targetParents)
    //   let targetChild = `<div class="member-icon color-${data.color}"></div>`
      
    
  })
};

getParties()
