$(function(){
    var slider = $('#slider');
    var sliderWrap = $('#slider ul');
    var sliderImg = $('#slider ul li');
    var length = sliderImg.length;
    var width = sliderImg.width();

    sliderWrap.width(width*length);
    $('#slider ul li:last-child').prependTo('#slider ul');
    sliderWrap.css('margin-left', - width);

    setInterval(function(){
        sliderWrap.animate({
            'margin-left': '-=' + width
        }, 500, function() {
            $('#slider ul li:first-child').appendTo('#slider ul');
            sliderWrap.css('margin-left', - width);
        });
        return false;
    },2000);

});

$('#password').keypress(function(e) {
    var s = String.fromCharCode( e.which );
    if ( s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey ) {
        $('#capsLockIsOn').html("Caps Lock in on <span style=\"color: white\">!!<\/span>")
    }else{
        $('#capsLockIsOn').html("");
    }
});