$('.colorbutton').on("click", function () {
    let bronny = $(this).attr('id');
    // console.log(bronny);
    $('.phonebody-internal').attr('id', bronny);
    $('.phonebody-internal1').attr('id', bronny);

    let $a1 = $('.flex-name');
    let $a2 = $('.flex-bio');
    let $a3 = $('.button-area');
    let $a4 = $('.button-area1');
    let $a5 = $('.flex-name1');
    let $image = $(".e1");
    // let $blackimage = $("#e1");



    if (bronny === "purewhite") {
        $a1.addClass('black');
        $a2.addClass('black');
        $a3.addClass('black');
        $a4.addClass('black');
        $a5.addClass('black');
        $image.attr('src', '/userui/biotree_logo.png');
        // $whiteimage.hide();
        // $blackimage.show();


    } else {
        $a1.removeClass('black');
        $a2.removeClass('black');
        $a3.removeClass('black');
        $a4.removeClass('black');
        $a5.removeClass('black');




        // //
        $a1.addClass('white');
        $a2.addClass('white');
        $a3.addClass('white');
        $a4.addClass('white');
        $a5.addClass('white');
        $image.attr('src', '/userui/biotree_logo.png');


    }

});
// ###################################rectangle border ################################################################################//
////////////////////////////

////////////////////////////////////


// #########################################rounded border
////////////////////
$("#secondswitch").on("click", function () {
    let $a3 = $('.button-area');
    let $a4 = $('.button-area1');

    $a3.removeClass('rectangle');

    $a4.removeClass('rectangle');
    $a3.toggleClass('rounded');
    $a4.toggleClass('rounded');
    checkit();

});

function checkit() {
    let $a3 = $('.button-area');
    let $a4 = $('.button-area1');
    if ($a3.hasClass('rounded')) {
        console.log("do nothing");

    } else {
        $a3.addClass('rectangle');
        $a4.addClass('rectangle');
    }
}