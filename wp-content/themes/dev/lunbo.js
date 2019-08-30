//点击→动画效果


var current = 0,
    origin = 19,
    flag = true;
$('#right').on('click', function () {
    current++; console.log(current);
    if (current < 4) {
        $('.d1 .imgs').addClass('imgsleftmove',);
        $('.d1 .text').addClass('textleftmove');
        $('#innerId').animate({
            left: origin + current * (-50) + '%'
        }, 700, function () {
            // $('.d1 .imgs').removeClass('imgsleftmove');
            // $('.d1 .text').removeClass('textleftmove');
            // alert();
        })
    } else {
        // return;
        current = 3;
    }
});

$('.d1 .imgs').on('animationend',function(){
    $('.d1 .imgs').removeClass('imgsleftmove');
});
$('.d1 .text').on('animationend',function(){
    $('.d1 .text').removeClass('textleftmove');
});

$('#left').on('click', function () {
    current--; console.log(current);
    if (current > -1) {
        $('.d1 .imgs').addClass('imgsrightmove');
        $('.d1 .text').addClass('textrightmove');
        $('#innerId').animate({
            left: origin + current * (-50) + '%'
        }, 700)
    } else {
        current = 0;
        // return;
    }
});
$('.d1 .imgs').on('animationend',function(){
    $('.d1 .imgs').removeClass('imgsrightmove',);
});
$('.d1 .text').on('animationend',function(){
    $('.d1 .text').removeClass('textrightmove');
});
