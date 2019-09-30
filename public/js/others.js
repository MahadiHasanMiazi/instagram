// back to top

$(window).scroll(function(){


    if($(this).scrollTop()>50){
        $('.btt').fadeIn(200);
    }
    else{
        $('.btt').fadeOut(200);
    }

});

$('.btt').click(function(){

    $('body,html').animate({

        scrollTop:0
    },1500);

});


function translateToEnglish(post_id) {

    var caption= $('#postCaption'+post_id).text();

    $.ajax({
        url: '/home/translate/'+caption
    }).done(function (data) {
        console.log(data);
        data = "<p style='font-size: 16px; text-align: center; color: black'>Translated text</p>"+data;
        $('#translatedText'+post_id).html(data);
        $('#translatedText'+post_id).toggle();
    });

}