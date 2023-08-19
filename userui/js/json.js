// import Swal from "sweetalert2";

$(function() {
    check1()
    check2()

    $style1 = $('.flex-name')
    $('#alert').hide()
        // if ($('#alert').css('display') == 'none') {
        //  name = true;

    // } else {
    //  name = false;
    // }
    $('.checkshort').on("keyup", function() {
        var value = $(this).val();
        // console.log(value);
        if (value.length = 0) {
            alert("please enter only 5 letters");
        } else {
            console.log("you can update");
            length = true;
        }
        console.log(length);
        $.ajax({
            type: 'GET',
            url: '/check-shorturl/' + value,
            success: function(data) {

                // console.log(data.data);
                var urlavailable = data.data;
                senderror(urlavailable);



            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var x = JSON.parse(XMLHttpRequest.responseText);
                var urlexists = x.error;
                // console.log(urlexists);

                senderror(urlexists);


                // console.log(textStatus + errorThrown + JSON.stringify(XMLHttpRequest.responseText));
            }
        });
    });

    function senderror(urlexists, urlavailable) {
        console.log(urlexists);
        // console.log(urlavailable);
        if (urlexists === "Short URL exists") {
            console.log("show cross mark");
            $('.wrong').show();
            $('.correct').hide();


        } else {
            console.log("show tick mark");
            $('.correct').show();
            $('.wrong').hide();


        }
    }




    $('.bioname').on('keyup', function(e) {
        // var a1 = $(this).val()

        // if (a1.length < 20) {
        //     check1()

        //     $('#alert').hide()
        //         // name = true;
        // } else {
        //     $('#alert').show()

        //     name = false
        // }
        checkbioname();
        check1();
    })

    function checkbioname() {
        var name = $(".bioname").val().length;
        if (name > 20) {
            $("#name-err").html("Max allowed For Name - 20 characters");
            $("#name-err").show();
            errorname = true;
        } else {
            $("#name-err").hide();

        }

    }
    $('.bio').on('keyup', function(e) {

        checkbio();
        check2();

    })

    function checkbio() {
        var name = $(".bio").val().length;
        if (name > 140) {
            $("#bio-err").html("Max allowed For Bio- 140 characters");
            $("#bio-err").show();
            errorname = true;
        } else {
            $("#bio-err").hide();

        }

    }


    function check1() {
        $('.flex-name').empty()

        var val = $('.bioname').val()

        var a2 = foo(val)
        $('.flex-name').append(a2)
    }

    function check2() {
        $('.flex-bio').empty()
        var val = $('.bio').val()

        var a2 = foo1(val)
        $('.flex-bio').append(a2)
    }

    function foo1(params) {
        var data = `<div>` + params + `</div>`
        return data
    }

    function foo(params) {
        var data = `<div class="title">` + params + `</div>`
        return data
    }
    // console.log(name)
    /// ////////////////////////////////////////////////////////////////////

    $style2 = $('.flex-bio')
    $('#alert1').hide()
    var bio = false
        // if ($('#alert1').css('display') == 'none') {
        //  bio = true;

    // } else {
    //  bio = false;
    // }
    // $('.bio').on('keyup', function(e) {
    //     var a1 = $(this).val()

    //     if (a1.length < 100) {
    //         check2()
    //         $('#alert1').hide()
    //             // bio = true;
    //     } else {
    //         $('#alert1').show()
    //         bio = false
    //     }
    //     console.log(bio)
    // })






    console.log(bio)

    $('.creating').on('click', function(e) {
        console.log('creating')

        // ###########################################social validation
        e.preventDefault()
        var socialboolean = false
        var $appendData1 = $('#sortable').children()

        for (let index = 0; index < $appendData1.length; index++) {
            var $dynamic = $appendData1.eq(index)
                // console.log($dynamic.children().html());
            const href = $dynamic.children().find('.ip').val();
            if (href === '') {
                $dynamic.children().find('.disit').remove();

                $dynamic.children().append('<span class="alert-danger disit">please Enter the URL here</span>');
                socialboolean = true;
            } else {
                $dynamic.children().find('.disit').remove();

            }
        }

        // ###########################################social validation complete end
        // ###########################################links validation#############################################################//
        var oyy = $('#sortable1').children()
        var hrefboolean = false;
        var linkboolean = false;

        for (let index = 0; index < oyy.length; index++) {
            var $dynamic = oyy.eq(index)
            const href = $dynamic.children().find('.link').val()
            const title = $dynamic.children().find('.title').val()
                // console.log($dynamic.append('<span class="alert-danger disit">please Enter the URL here</span>'));

            if (href === '') {
                $dynamic.children().eq(0).find('.disit').remove();

                $dynamic.children().eq(0).append('<span class="alert-danger disit">please Enter the URL here</span>')
                hrefboolean = true;
            } else {
                // $dynamic.children().eq(0).remove('.disit');
                $dynamic.children().eq(0).find('.disit').remove()
            }

            if (title === '') {
                $dynamic.children().eq(1).find('.disit').remove();

                $dynamic.children().eq(1).append('<span class="alert-danger disit">please Enter the Title here</span>')
                linkboolean = true;

            } else {
                // $dynamic.children().eq(1).remove('.disit');
                $dynamic.children().eq(1).find('.disit').remove()
            }
        }
        // ////////////////////////////


        // check name and bio length

        var bioname = $('.bioname').val();
        var bio = $('.bio').val();
        var nameandbio = false;
        if (bioname.length < 20 && bio.length < 140) {} else {
            swal("Oops...",
                "Oops! Please check name and bio length",
                "error");
            nameandbio = true;

        }







        var shortlength = false
        var shortUrlCode = $('.checkshort').val()

        if (shortUrlCode.length = 0) {
            swal("Oops...",
                "Please Enter Atleast 5 ShortURL characters",
                "error");
            shortlength = true

        } else {

        }


        var $appendData10 = $('#sortable').children()


        // for (let index = 0; index < $appendData10.length; index++) {
        //     var $dynamic = $appendData1.eq(index)
        //         // console.log($dynamic.children().html());
        //     const href = $dynamic.children().find('.disit');
        //     console.log(href);

        //     if (href) {
        //         alert("error")
        //     } else {
        //         alert("goahead");
        //     }


        // }


        console.log(socialboolean, "socialboolean");
        console.log(hrefboolean, "hrefboolean");
        console.log(linkboolean, "linkboolean");
        console.log(name, "name");
        console.log(bio, "bio");
        console.log(shortlength, "shortlength");



        var childrencount = $("#checktrack").children();

        console.log(childrencount, "childrencount");
        console.log(childrencount.length);

        var childrencount = $("#checktrack").children();

        console.log(childrencount, "childrencount");
        console.log();
        if (childrencount.length > 0) {
            swal("Oops...",
                "Please Fill the Tracking details to continue",
                "error");

            // if (socialbool === true && alertd1 === true && name === true && bio === true && shortlength === true) {
        } else {
            if (socialboolean == false && hrefboolean == false && linkboolean == false && nameandbio == false && shortlength == false) {
                // alert("success");

                validate();
            }
        }
        // if (socialboolean == false && hrefboolean == false && linkboolean == false && nameandbio == false && shortlength == false) {

        //     validate()


        // } else {
        //     console.log('checkboolean')
        // }
    })

    function validate() {
        // alert("true");
        var obj = {
            'socialmedia': [],
            'links': [],
            'trackingList': []

        }
        var personName = $(".bioname").val();
        var personBio = $(".bio").val();
        console.log(personName);
        var shortUrlCode = $('.checkshort').val();
        var clientidval = $('#getclientid').val();
        var getImage = $('#item-img-output').prop('src');
        var tapLogo = $('.e1').prop('src');
        var description = ['app-icon1.png', 'app-icon2.png', 'app-icon3.png', 'app-icon4.png', 'app-icon5.png',
            'app-icon6.png', 'app-icon7.png'
        ]
        var size = description.length
        var x = Math.floor(size * Math.random())
        var imaged = '/userui/img/' + description[x];
        var dashimage = imaged;
        // var personName = $('.flex-name').children().html()
        // var personBio = $('.flex-bio').children().html()



        // var k = new Object();
        // k.img = pic;
        // k.name = personName;
        // k.bio = personBio;
        obj.shortcode = shortUrlCode;
        obj.type = 'instabio';
        obj.client = clientidval;
        obj.img = getImage;
        obj.dashimg = dashimage;

        obj.title = personName;
        obj.bio = personBio;
        // obj.profile.logo = tapLogo;

        var getColor = $('.phonebody-internal').attr('id')

        /// //////////////////////////////////////////////if anything is checked it will be true (if button contains rounded corner then rounded is true)

        var rounded = false

        /// ////////////
        var $a3 = $('.button-area')
        var $a4 = $('.button-area1')

        if ($a3.hasClass('rounded')) {
            // obj.style.rounded_border = "is-active";
            rounded = true
        } else {
            // obj.style.rounded_border = "is";
            rounded = false
        }
        // var k = new Object();
        // k.rectangle_border = rectangle;
        // k.rounded_border = rounded;
        // k.bg_color = getColor;
        obj.rounded_border = rounded
        obj.bg_color = getColor
        obj.clicks = 0;


        /// ////////////////////// social media

        var $appendData1 = $('#sortable').children()

        for (let index = 0; index < $appendData1.length; index++) {
            var $dynamic = $appendData1.eq(index)
            var name = $dynamic.find('.naming').html()
            name = name.trim()
            var icon = $dynamic.find('.image1').html()
            icon = icon.trim()
            var href = $dynamic.children().find('.ip').val()
            href = href.trim()
            var iconnumber = $dynamic.children().find('.findp').html()
            var url = $dynamic.children().find('.url').html()
            url = url.trim();

            iconnumber = iconnumber.trim();

            // console.log(icon, href);

            var k = {}
            k.name = name;
            k.username = href
            k.icon = icon;
            // k.id = iconnumber;
            k.url = url;
            k.name = name;
            var uniqueid = generateGuid();
            k.id = uniqueid;
            k.clicks = 0;

            obj.socialmedia.push(k);

        }

        /// //////////////////////////////////////////////////////// links to json object
        var oyy = $('#sortable1').children()

        for (let index = 0; index < oyy.length; index++) {
            var $dynamic = oyy.eq(index);
            const href = $dynamic.children().find('.link').val();
            const title = $dynamic.children().find('.title').val();
            var k = {};
            k.link = href;
            k.title = title;
            var uniqueid = generateGuid();
            k.id = uniqueid;
            k.clicks = 0;

            obj.links.push(k)
        }

        function generateGuid() {
            var result, i, j;
            result = '';
            for (j = 0; j < 32; j++) {
                if (j == 8 || j == 12 || j == 16 || j == 20)
                    result = result + '-';
                i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            return result;
        }

        var $appendData1 = $('#update-client-list').children()
        for (let index = 0; index < $appendData1.length; index++) {
            var $dynamic = $appendData1.eq(index);
            console.log($dynamic);
            // var trackingid = $dynamic.children().find('.id').html();
            var href = $dynamic.children().find('.ip').val();
            var img = $dynamic.children().find('.img').html();
            var name = $dynamic.children().find('.name').html();

            var k = {};
            // k.id = trackingid;
            k.tracking_code = href;
            k.icon = img;
            k.name = name;
            obj.trackingList.push(k);




        }
        console.log(obj)
        console.log('creating');
        //////////////////////////////////////////
        $.ajax({
                type: 'POST',
                data: obj,
                url: '/create-instabio',
                success: function(data) {


                    // swal(
                    //     'Great!',
                    //     "Insta Bio is Created",
                    //     'success'
                    // );

                    $("#success-url").text("biotree.one/link/" + shortUrlCode);
                    $("#success-url2").val("biotree.one/link/" + shortUrlCode);


                    $("#success-modal").trigger("click");

                    // $('.shortthat').show()
                    // $('#shortcoding').html('Tap.sr/' + shortUrlCode);
                    // $('#shortcoding1').val('Tap.sr/' + shortUrlCode);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + errorThrown);
                }

            })
            // ////////////////////////////////////////

    }
    // #&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&*************************************************** updating //#endregion
    // #&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&*************************************************** updating //#endregion
    // #&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&*************************************************** updating //#endregion
    // #&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&*************************************************** updating //#endregion
    // #&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&*************************************************** updating //#endregion
    // #&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&*************************************************** updating //#endregion
    // #&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&*************************************************** updating //#endregion
    // #&^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&*************************************************** updating //#endregion

    $('.updating').on('click', function(e) {
        // ###########################################social validation



        e.preventDefault()
        var socialboolean1 = false
        var $appendData1 = $('#sortable').children()

        for (let index = 0; index < $appendData1.length; index++) {
            var $dynamic = $appendData1.eq(index)
                // console.log($dynamic.children().html());
            const href = $dynamic.children().find('.ip').val();
            if (href === '') {
                $dynamic.children().find('.disit').remove();

                $dynamic.children().append('<span class="alert-danger disit">please Enter the URL here</span>');
                socialboolean1 = true;
            } else {
                $dynamic.children().find('.disit').remove();

            }
        }

        // ###########################################social validation complete end
        // ###########################################links validation#############################################################//
        var oyy = $('#sortable1').children()
        var hrefboolean1 = false;
        var linkboolean1 = false;

        for (let index = 0; index < oyy.length; index++) {
            var $dynamic = oyy.eq(index)
            const href = $dynamic.children().find('.link').val()
            const title = $dynamic.children().find('.title').val()
                // console.log($dynamic.append('<span class="alert-danger disit">please Enter the URL here</span>'));

            if (href === '') {
                $dynamic.children().eq(1).find('.disit').remove();

                $dynamic.children().eq(0).append('<span class="alert-danger disit">please Enter the URL here</span>')
                hrefboolean1 = true;
            } else {
                // $dynamic.children().eq(0).remove('.disit');
                $dynamic.children().eq(0).find('.disit').remove()
            }

            if (title === '') {
                $dynamic.children().eq(1).find('.disit').remove();

                $dynamic.children().eq(1).append('<span class="alert-danger disit">please Enter the Title here</span>')
                linkboolean1 = true;

            } else {
                // $dynamic.children().eq(1).remove('.disit');
                $dynamic.children().eq(1).find('.disit').remove()
            }
        }
        // ////////////////////////////



        // check name and bio length

        var bioname = $('.bioname').val();
        var bio = $('.bio').val();
        var nameandbio1 = false;
        if (bioname.length < 20 && bio.length < 140) {} else {
            swal("Oops...",
                "Oops! Please check name and bio length",
                "error");
            nameandbio1 = true;

        }





        var shortlength = false
        var shortUrlCode = $('.checkshort').val()

        if (shortUrlCode.length = 0) {
            swal("Oops...",
                "Please Enter atleast 5 shortUrl characters",
                "error");
            shortlength = true


        }
        var childrencount = $("#checktrack").children();

        // console.log(childrencount, "childrencount");
        // console.log();
        if (childrencount.length > 0) {
            swal("Oops...",
                "Please Fill the Tracking details to continue",
                "error");
            // if (socialbool === true && alertd1 === true && name === true && bio === true && shortlength === true) {
        } else {
            if (socialboolean1 == false && hrefboolean1 == false && linkboolean1 == false && nameandbio1 == false && shortlength == false) {

                validate1();
            }
        }

    })

    function validate1() {
        var obj = {
            'socialmedia': [],
            'links': [],
            'trackingList': []



        }
        var shortUrlCode = $('.checkshort').val()
        var clientidval = $('#getclientid').val()
        var getImage = $('#item-img-output').prop('src')
        var tapLogo = $('.e1').prop('src')
        var personName = $('.flex-name').children().html()
        var personBio = $('.flex-bio').children().html()
        console.log(getImage)
            // var k = new Object();
            // k.img = pic;
            // k.name = personName;
            // k.bio = personBioupdate
        obj.shortcode = shortUrlCode
        obj.type = 'instabio'
        obj.client = clientidval
        obj.img = getImage
        obj.title = personName
        obj.bio = personBio
            // obj.profile.logo = tapLogo;

        var getColor = $('.phonebody-internal').attr('id')

        /// //////////////////////////////////////////////if anything is checked it will be true (if button contains rounded corner then rounded is true)

        var rounded = false

        /// ////////////
        var $a3 = $('.button-area')
        var $a4 = $('.button-area1')
        if ($a3.hasClass('rounded')) {
            // obj.style.rounded_border = "is-active";
            rounded = true
        } else {
            // obj.style.rounded_border = "is";
            rounded = false
        }
        // var k = new Object();
        // k.rectangle_border = rectangle;
        // k.rounded_border = rounded;
        // k.bg_color = getColor;
        obj.rounded_border = rounded
        obj.bg_color = getColor

        /// ////////////////////// social media
        // FIXME kanye
        var $appendData1 = $('#sortable').children()
        for (let index = 0; index < $appendData1.length; index++) {
            var $dynamic = $appendData1.eq(index)
            var name = $dynamic.find('.naming').html()
            name = name.trim()
            var icon = $dynamic.find('.image1').html()
            icon = icon.trim()
            var href = $dynamic.children().find('.ip').val()
            href = href.trim()
            var iconnumber = $dynamic.children().find('.findp').html()
            var url = $dynamic.children().find('.url').html()
            url = url.trim();

            iconnumber = iconnumber.trim();

            // console.log(icon, href);

            var k = {}
                // k.name = name;
            k.username = href
            k.icon = icon;
            k.id = iconnumber;
            k.url = url;
            k.name = name;


            obj.socialmedia.push(k)
        }
        /// //////////////////////////////////////////////////////// links to json object
        var oyy = $('#sortable1').children()

        for (let index = 0; index < oyy.length; index++) {
            var $dynamic = oyy.eq(index)
            const href = $dynamic.children().find('.link').val()
            const title = $dynamic.children().find('.title').val()
            var k = {}
            k.link = href
            k.title = title
            obj.links.push(k)
        }

        var updateid = $('#gettingid').val()
        console.log(updateid)
        obj.id = updateid;


        var $appendData1 = $('#update-client-list').children()
        for (let index = 0; index < $appendData1.length; index++) {
            var $dynamic = $appendData1.eq(index);
            console.log($dynamic);
            // var trackingid = $dynamic.children().find('.id').html();
            var href = $dynamic.children().find('.ip').val();
            var img = $dynamic.children().find('.img').html();
            var name = $dynamic.children().find('.name').html();

            var k = {}
                // k.id = trackingid;
            k.tracking_code = href;
            k.icon = img;
            k.name = name;


            obj.trackingList.push(k)




        }
        console.log(obj);

        $.ajax({
            type: 'PUT',
            data: obj,
            url: '/update-instabio',
            success: function(data) {
                // setTimeout(function() {
                //     swal({
                //             title: 'Great',
                //             text: 'Insta Bio is Updated!',
                //             type: 'success',
                //             confirmButtonText: 'OK'
                //         },
                //         function(isConfirm) {
                //             if (isConfirm) {
                //                 window.location.href = "/dashboard";
                //             }
                //         })
                // }, 1000)

                // swal(
                //     'Great!',
                //     "Insta Bio is Updated Successfully",
                //     'success'
                // );

                $("#success-url").text("biotree.one/link/" + shortUrlCode);
                $("#success-url2").val("biotree.one/link/" + shortUrlCode);


                $("#success-modal").trigger("click");


            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus + errorThrown)
            }

        })
    }
})