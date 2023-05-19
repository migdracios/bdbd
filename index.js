$(".modal-wrap").click(()=>{
    $(".modal-wrap").hide()
})

$(".modal").click((event)=>{
    event.stopPropagation()
})

$(".submit-btn").click(()=>{
  
})

$(document).ready(function() {
    $('.party-color-1, .party-color-2, .party-color-3, .party-color-4, .party-color-5').click(function() {
        var isChecked = $(this).text().includes('✔️');
        
        $('.party-color-1, .party-color-2, .party-color-3, .party-color-4, .party-color-5').text('');
        
        if (!isChecked) {
            $(this).text('✔️');
        }
    });
});

