$(".b-modal-wrap").click(()=>{
    $(".b-modal-wrap").hide()
})

$(".b-modal").click((event)=>{
    event.stopPropagation()
})


$(document).ready(function() {
    $('.party-color-1, .party-color-2, .party-color-3, .party-color-4, .party-color-5').click(function() {
        let isChecked = $(this).text().includes('✔️');
        
        $('.party-color-1, .party-color-2, .party-color-3, .party-color-4, .party-color-5').text('');
        
        if (!isChecked) {
            $(this).text('✔️');
        }
    });
});

// 요일 이름 배열
let weekdays = ['일', '월', '화', '수', '목', '금', '토'];

// 오늘 날짜 가져오기
let today = new Date();

// 이번 주 월요일부터 금요일까지의 날짜와 요일 가져오기
let dates = [];
for (let i = 1; i <= 5; i++) {
  let date = new Date(today);
  date.setDate(today.getDate() - today.getDay() + i);
  let dateString = (date.getMonth() + 1) + "월 " + date.getDate() + "일";
  dates.push(dateString);
}
// console.log(dates)

// 결과 출력
let days = ['mon','tue','wed','thu','fri']
days.forEach((day, index)=>{
    console.log(day, index)
    $(`.${day}`).text(dates[index])
})

$(document).ready(function() {
    $('.party-btn').click(function() {
      let selectedDate = $(this).closest('.b-card').find('.b-card-date').text();
      let selectedDay = $(this).closest('.b-card').find('.b-card-banner').text();
      $(".b-modal-wrap").css("display", "flex")
      $(".submit-li-date").text(selectedDate + " " + selectedDay) 
    });
  });
  