$(function() {

    // console.log("aksndkasdnsandinbsid");
    // createpreview();
    createpreview1();
    // check1();
    // check2();
    // ######################################################### image preview################################################################################
    $("#gallery-photo-add").on("click", function() {
        $('.flex-image').empty();
        // $('.flex-image').append(`<div><img src="" class="roundimage mx-auto d-block" id="item-img-output" /></div>`);

    });
    // var imagesPreview = function (input, placeToInsertImagePreview) {

    //     if (input.files) {
    //         var filesAmount = input.files.length;

    //         for (i = 0; i < filesAmount; i++) {
    //             var reader = new FileReader();

    //             reader.onload = function (event) {
    //                 $($.parseHTML('<img class="roundimage mx-auto d-block">')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
    //             }

    //             reader.readAsDataURL(input.files[i]);
    //         }
    //     }

    // };
    // ************************************************************check url exists************************************************************************************************//
    // $('.correct').hide();
    $('.linkit').on("keyup", function() {
        // $('.wrong').hide();

        if ($(this).val() === "surya") {
            $('.wrong').hide();
            $('.correct').show();

        } else {
            $('.correct').hide();

            $('.wrong').show();

        }




    });
    $('.linkit').on("keydown", function() {
            // $('.wrong').hide();


            if (!$(this).val()) {
                $('.wrong').hide();
            }





        })
        // ************************************************************check url exists************************************************************************************************//

    // 

    // $('#gallery-photo-add').on('change', function () {
    //     imagesPreview(this, 'div.gallery');
    // });

    // /////////////////////////////////////////////
    $('.deleteimage').css("opacity", 0);
    $(".upload").on("mouseover", function() {
        $('.deleteimage').css("opacity", 1);

    });
    $(".upload").on("mouseout", function() {
        $('.deleteimage').css("opacity", 0);


    });
    // ############################################################## image preview end#################################################################################

    //////////////////////////////

    var $appendData = $('#sortable');
    $('.dropping').on('click', '.hello', function() {

        // console.log("hello");
        // var img = $(this).find('.image1').attr("src");
        var name = $(this).data("name");
        var prefixurl = $(this).data("prefixurl");
        var id = $(this).data("id");
        var img = $(this).data("icon");





        // var img = $(this).find('.image1').html();
        // var id = $(this).find('.first').html();
        // var name = $(this).find('.naming').html();
        img = img.trim();
        id = id.trim();
        name = name.trim();
        console.log(img);
        console.log(name);
        console.log(id);
        console.log(prefixurl);


        //////////////
        var listItemToAdda = makelist(img, id, name, prefixurl);
        $appendData.append(listItemToAdda);
        createpreview();
        // /////////////////
        var $putDisable = $(this);
        $putDisable.remove();




    });

    function createpreview() {
        // console.log("haisdisaihdih");
        $('.button-area').empty();
        var $appendData1 = $('#sortable').children();

        for (let index = 0; index < $appendData1.length; index++) {

            var $dynamic = $appendData1.eq(index);

            var element = $dynamic.find('.image1').html();


            // const number = $dynamic.children().children().find('.findp').html();
            const href = $dynamic.children().find('.ip').val();

            var listItemToAdda1 = makeNewListItema1(element, href);
            $('.button-area').append(listItemToAdda1);

        }
    }
    // var makeNewListItema1 = function (add, troop, link) {
    function makeNewListItema1(add, link) {



        var $allData = `<a  href="` + link + `"><i class="` + add + `" class="rounded-circle image1" id="previewicon" ></i></a>`;
        return $allData;

    }

    // function makelist(add, troop, name, url) {
    function makelist(img, id, name, prefixurl) {
        var $allData = `<div class="sortableitem u-mt-custom" ><li>
    
    <div class="row justify-content-left nolo r0">
    <div class="col-md-10 col-9 r2" >
    <div class="c-field has-addon-left">
    <span class="c-field__addon"><i class="` + img + `" style="font-size:22px;color:#fff"></i></span>
    <label class="c-field__label u-hidden-visually" for="input9">Disabled Input</label>
    <input class="c-input ip "  id="input1" type="text" placeholder="Place Your Link Here">
    </div>
    </div>
     <div class="col-md-1 col-1 r3"> 
     <div class="pull-right">
    <span class="url" style="display:none">` + prefixurl + `</span>

    <span class="naming" style="display:none">` + name + `</span>
     <span class="findp" style="display:none">` + id + `</span>
     <span class="image1" style="display:none">` + img + `</span>
    <a class="btn del"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>
    <span class="find" style="display:none">` + img + `</span>
    </div></div>
    <div class="col-md-1 col-1 text-center r4" style="padding-top:5px;">
 <div class="pull-left">

    <i class="fa fa-bars" aria-hidden="true" style="font-size:15px;"></i>
    <span class="naming" style="display:none">` + name + `</span>
        </div>

    </div></li></div>`;

        return $allData;

    }
    $appendData.on("click", ".del", function() {
        //////////////////////////////

        console.log($(this).parent().find(".url").html(), "$(this).parent()")
        var icon = $(this).parent().find(".image1").html();
        var id = $(this).parent().find('.findp').html();
        var name = $(this).parent().find('.naming').html();
        var prefixurl = $(this).parent().find('.url').html();


        icon = icon.trim();
        prefixurl = prefixurl.trim();

        icon = icon.trim();

        id = id.trim();
        name = name.trim();
        console.log(name);
        console.log(id);
        console.log(icon);


        // var listItemToAdda = makelistdrop(icon, id, name);
        // $appendData.append(listItemToAdda);
        //     var prin = '';
        //     prin += ` <a class="c-dropdown__item dropdown-item form-check form-check-inline hello" href="#" style="padding:4px 5px 0 5px;">
        //     <label class="iconbox1">
        //         <i class="` + icon + `" id="dropdownicon" ></i>
        //         </label>
        //     <span class="naming" style="display:none">` + name + `</span>
        //     <label class="form-check-label mx-auto" for="inlineCheckbox1" style="margin-left:5px;font-size:13px;font-weight: 100;position: relative;bottom: 3px;color:black">` + name + `</label>
        //     <label style="display: none" class="first ">` + id + `</label>
        //     <span style="display:none" class="icon image1">` + icon + `</span>
        //     <i class="fa fa-plus-square-o fa-2x pull-right" style="font-size:15px;padding-top:6px;"></i>
        // </a>`;




        var prin = '';
        prin +=
            '<a class="c-dropdown__item dropdown-item form-check form-check-inline hello"  style="padding:4px 5px 0 5px;"  data-name="' + name + '" data-prefixurl="' + prefixurl + '" data-icon="' + icon + '" data-id="' + id + '">' +
            '        <label class="iconbox1">' +
            '            <i class="' + icon + '" id="dropdownicon" ></i>' +
            '            </label>' +
            '    <span class="naming" style="display:none">' + name + '</span>' +
            '            <label class="form-check-label mx-auto" for="inlineCheckbox1" style="margin-left:8px;font-size:13px;font-weight: 100;position: relative;color:black">' +
            name + '</label>' +
            '            <label style="display: none" class="first ">' + id + '</label>' +
            '            <span style="display:none" class="icon image1">' + icon + '</span>' +
            '            <i class="fa fa-plus-square-o fa-2x pull-right" style="font-size:15px;padding-top:6px"></i>' +
            '        </a>';



        //////////////////////////////////////////////////////



        $('.dropping').append(prin);








        /////////////////////////////

        createpreview();
        var bolo = $(this).parentsUntil('.sortableitem').parent().remove();




    });
    $appendData.on("keyup", ".ip", function(e) {

        createpreview();



    });
    ///////////////////////sortable
    $("#sortable")
        .sortable({
            revert: true,
            connectWith: ".sortable",
            stop: function(event, ui) {



                createpreview();

            }


        });

    ///////////////////////////
    // ########################################################################################################################################################################
    //////////////////////////////////////second Links///////////////////////////////////////////////////////////////////////////////////////
    $("#sortable1")
        .sortable({
            revert: true,
            connectWith: ".sortable",
            stop: function(event, ui) {



                createpreview1();

            }


        });
    var $data = $('#sortable1');

    $('.linkbtn').on('click', function() {


        var $data1 = ` <div class="row sortableitem u-mt-custom">

  
   <div class="col-md-5 l0">
      <div class="c-field ">
         <label class="c-field__label u-hidden-visually" for="input1">Label</label>
         <input class="c-input link resip" id="input1" type="text" placeholder="place your link here">
     
      </div>
   </div>
   <div class="col-md-5 l1">
      <div class="c-field ">
         <label class="c-field__label u-hidden-visually" for="input1">Label</label>
         <input class="c-input title resipdown" id="input1" type="text" placeholder="place your title here" >

      </div>
   </div>
  
   <div class="col-md-1 l2">
   <div class="pull-right">
      <a class="btn del3" ;padding-bottom: 10px;">
         <i class="fa fa-trash-o" aria-hidden="true"></i>
      </a>
      </div>
   </div>
   <div class="col-md-1 l3" >

   <i class="fa fa-bars" aria-hidden="true" style="font-size:15px;padding-top:10px;"></i>

   </div>
</div>`;

        $data.append($data1);
        createpreview1();

    });
    ////////////////

    //////////////
    // var createpreview1 = function () {
    function createpreview1() {
        $('.button-area1').empty();

        var oyy = $('#sortable1').children();


        for (let index = 0; index < oyy.length; index++) {

            var $dynamic = oyy.eq(index);

            // var number = $dynamic.children().find('.find').html();
            // console.log(number);

            const href = $dynamic.children().find('.link').val();
            const title = $dynamic.children().find('.title').val();


            // var listItemToAdda1 = makeNewListItemLink(number, href, title);
            // $('.button-area1').append(listItemToAdda1);
            var listItemToAdda1 = makeNewListItemLink(href, title);
            $('.button-area1').append(listItemToAdda1);





        }



    }
    $data.on("click", ".del3", function() {
        // var bolo = $(this).parent().parent().remove();
        var bolo = $(this).parentsUntil('.sortableitem').parent().remove();



        createpreview1();

    });

    function makeNewListItemLink(href, title) {

        var $allData = `<a href="` + href + `" >` + title + `</a>`;
        return $allData;

    }




    $data.on("keyup", ".link", function(e) {

        console.log(".link1 link1");

        createpreview1();


    });
    $data.on("keyup", ".title", function(e) {

        console.log(".title title");

        createpreview1();


    });

    $data.on("keydown", ".title", function() {

        // $('.button-area1').children().remove();
        // createpreview1();

    });


    $data.on("keydown", ".link", function(e) {
        // $('.button-area1').children().remove();
        // createpreview1();

    });





    // /////////////////////////checkshorturl








    // /////////////////////////////
    // ############################################################################style page#########################################################################################
    // **************************************************************************style page**********************************************************************************


    // $style1 = $('.flex-name');
    // $("#alert").hide();
    // var name = false;
    // $('.bioname').on("keyup", function (e) {

    //     var a1 = $(this).val();
    //     if (a1.length < 20) {
    //         check1();
    //         $("#alert").hide();
    //         name = true;

    //     } else {
    //         $("#alert").show();
    //     }
    //     console.log(name);


    // });




    // function check1() {

    //     $(".flex-name").empty();

    //     var val = $('.bioname').val();

    //     var a2 = foo(val);
    //     $(".flex-name").append(a2);


    // }

    // function foo(params) {
    //     var data = `<div class="title">` + params + `</div>`;
    //     return data;

    // }

    // ///////////////////////////////////////////////////////////////////////

    // $style2 = $('.flex-bio');
    // $("#alert1").hide();
    // var bio = false;
    // $('.bio').on("keyup", function (e) {


    //     var a1 = $(this).val();

    //     if (a1.length < 100) {
    //         check2();
    //         $("#alert1").hide();
    //         bio = true;

    //     } else {
    //         $("#alert1").show();
    //     }
    //     console.log(name);


    // });

    // function check2() {
    //     $('.flex-bio').empty();
    //     var val = $('.bio').val();

    //     var a2 = foo1(val);
    //     $('.flex-bio').append(a2);


    // }

    // function foo1(params) {

    //     var data = `<div>` + params + `</div>`;
    //     return data;

    // }
    ////////////////////////////////////flex image
    $('.deleteimage').on("click", function() {
        $(".flex-image").empty();
    });


    /////////////////////////////////////////////////////////////////////responsive

    // createpreview();

    ///////////////////////////////////////////////////////////////////

    var short = {
        "data": [{
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d1",
                "name": "Facebook",
                "prefixname": "Facebook",
                "prefixurl": "https://www.facebook.com/",
                "icon": "fa fa-facebook fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d2",
                "name": "Instagram",
                "prefixname": "Instagram",
                "prefixurl": "https://www.instagram.com/",
                "icon": "fa fa-instagram fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d3",
                "name": "Pinterest",
                "prefixname": "Pinterest",
                "prefixurl": "https://www.pinterest.com/",
                "icon": "fa fa-pinterest fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d4",
                "name": "Twitter",
                "prefixname": "Twitter",
                "prefixurl": "https://www.twitter.com/",
                "icon": "fa fa-twitter fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d5",
                "name": "Whatsapp",
                "prefixname": "Whatsapp",
                "prefixurl": "https://www.whatsapp.com/",
                "icon": "fa fa-whatsapp fa-2x",
                "v": 0
            },
            {
                "is_del": false,
                "is_active": true,
                "_id": "5c2b5c0c47b7cf95ef1248d6",
                "name": "WeChat",
                "prefixname": "Wechat",
                "prefixurl": "https://www.wechat.com/",
                "icon": "fa fa-wechat fa-2x",
                "v": 0
            }
        ]
    };


    var ramp = short.data;
    var prin = '';

    for (let index = 3; index < ramp.length; index++) {
        const element = ramp[index];
        // console.log(short.data[index].icon);
        // console.log(element.icon);

        prin += ` <a class="c-dropdown__item dropdown-item form-check form-check-inline hello" href="#" style="padding:4px 5px 0 5px;">
        <label class="iconbox1">
            <i class="` + element.icon + `" id="dropdownicon" ></i>
            </label>
    <span class="naming" style="display:none">` + element.prefixname + `</span>
            <label class="form-check-label mx-auto" for="inlineCheckbox1" style="margin-left:8px;font-size:15px;font-weight: 100;position: relative;color:black">` + element.prefixname + `</label>
            <label style="display: none" class="first ">` + element._id + `</label>
            <span style="display:none" class="icon image1">` + element.icon + `</span>
            <i class="fa fa-plus-square-o fa-2x pull-right" style="font-size:20px;padding-top:6px"></i>
        </a>`;
        //////////////////////////////////////////////////////


    }
    // $('.dropping').append(prin);
    //////////////////////////////////////////////
    var defaultPrin = '';
    for (let index = 0; index <= 1; index++) {
        const element = ramp[index];

        defaultPrin += `<div class="sortableitem u-mb-custom u-mt-custom"  ><li>
       

<div class="row justify-content-left nolo r0">
<div class="col-md-10 col-9 r2">
<div class="c-field has-addon-left hey">
<span class="c-field__addon" id="sizing-addon1"><i class="` + element.icon + `" style="font-size:20px;color:#fff"></i></span>
<label class="c-field__label u-hidden-visually" for="input9">Disabled Input</label>
<input class="c-input ip inputborder"  id="input1" type="text" placeholder="place Your link Here">
</div>
</div>
 <div class="col-md-1 col-1 r3"> 
 <div class="pull-right">
 <span class="naming" style="display:none">` + element.prefixname + `</span>
 <span class="findp" style="display:none">` + element._id + `</span>
 <span class="image1" style="display:none">` + element.icon + `</span>
<a class="btn del"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>
</div>
</div>
<div class="col-md-1 col-1 text-left r4" style="padding-top:5px;">
 <div class="pull-left">
<i class="fa fa-bars" aria-hidden="true" style="font-size:15px;padding-top:5px;"></i>
</div>


</div></li></div>


`;
    }
    /////////////////////


    // $('.sort').append(defaultPrin);
    ////////////////////////////////

    //////////////////////////
    $('#someButton').click(function() {
        createpreview();

    });

    $('#someButton').click();


























    //////////////////////////////////////////////////





    $('.hello1').on('click', function() {

        console.log("hello");
        // var img = $(this).find('.image1').attr("src");
        var img = $(this).find('.image1').html();

        var id = $(this).find('.first').html();
        var name = $(this).find('.naming').html();
        console.log(img);
        console.log(id);
        console.log(name);

        //////////////
        var listItemToAdda = makelist(img, id, name);
        $('.sorttracking').append(listItemToAdda);

        // /////////////////





    });


    $('.sorttracking').on("click", ".del", function() {
        var bolo = $(this).parentsUntil('.sortableitem').parent().remove();
    });

    // ###########################################################################################
    // short link

    // $('.updateshort').hide();
    // $('.shortlink').on("click", function () {
    //     var value = $(this).html();
    //     $(this).hide();
    //     $('.updateshort').show();
    //     $('.linkit').val(value);


    // });


    // $('.linkit').on("keyup", function (e) {
    //     e.preventDefault();
    //     if (e.keyCode == 13) {
    //         var value = $(this).val();
    //         $(this).hide();
    //         $('.shortlink').show();
    //         $('.shortlink').html(value);

    //     }

    // })

    // /////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////









});