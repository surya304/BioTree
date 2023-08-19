   //   function readURL(input) {
   //      if (input.files && input.files[0]) {
   //         var reader = new FileReader();

   //         reader.onload = function (e) {
   //            $('#blah')
   //               .attr('src', e.target.result);
   //         };

   //         reader.readAsDataURL(input.files[0]);
   //      }
   //   }
   // file upload preview
   // $("#upfile1").click(function () {
   //    $("#file1").trigger('click');
   // });
   /////////// to do type
   // var $appendData = $('.bron');
   var $appendData = $('#sortable');
   var $appendData1 = $('.bron1');
   var $appendData2 = $('.bron2');




   // ////////////
   $('.hello').on('click', function() {
   	var melo = $(this).find('.image1').attr("src");
   	var melo1 = $(this).find('.first').html();
   	// console.log(melo1);
   	/////////////////////////////////////////////////////

   	/////////////////////////////////////
   	var listItemToAdda = makeNewListItema(melo, melo1);
   	// var listItemToAdda1 = makeNewListItema1(melo, melo1);
   	/////////////////

   	//////////////////////////////
   	$appendData.append(listItemToAdda);
   	var number = $appendData.children().html();

   	// console.log(number);
   	var dumb1 = createpreview();









   	// $('.button-area').append(listItemToAdda1);



   });
   var createpreview = function() {
   	// console.log(number);
   	// $number.each(function (index, element) {

   	//    var eachProductContent = $(this).find(".image1").clone();
   	//    console.log(eachProductContent);
   	// });
   	$('#button-area').empty();



   	var $appendData = $('#sortable').children();

   	for (let index = 0; index < $appendData.length; index++) {



   		var $dynamic = $appendData.eq(index);

   		const element = $dynamic.find('.image1').attr('src');

   		const element1 = $dynamic.find('.sortableitem').attr('id');

   		var listItemToAdda1 = makeNewListItema1(element, element1);

   		$('#button-area').append(listItemToAdda1);
   		console.log(element);
   		console.log(element1);





   	}



   }




   // $('.hello').on('click', function () {
   //    var melo = $(this).find('.image1').attr("src");
   //    var listItemToAdda1 = makeNewListItema1(melo);
   //    $('.button-area').append(listItemToAdda1);
   // });
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////anirudh
   var makeNewListItema = function(add, troop) {

   	var $allData = `<div><li class="sortableitem" id="` + troop + `">

      <div class="row justify-content-left u-mb-small nolo"><div class="col-md-2 u-mb-small  text-center">

      <img src="` + add + `" class="rounded-circle image1" style="height: 35px;">
      </div><div class="col-md-5 u-mb-small "><label class="c-field__label u-hidden-visually " for="input1">Label</label>
      <input class="c-input ip" id="input1" type="text" placeholder="place your Link here">

      </div>
      <div class="col-md-1 text-center">
       <a class="btn sav" style="border:1px dotted #00B4DB;padding-bottom: 10px;"> <i class="fa fa-save" aria-hidden="true"></i></a>
       <span class="find" style="display:none">` + troop + `</span>
       </div>
       <div class="col-md-1 text-center">
      <a class="btn del" style="border:1px dotted #00B4DB;padding-bottom: 10px;"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>
      <span class="find" style="display:none">` + troop + `</span></div>

      </div></li></div>`;

   	return $allData;

   }
   var makeNewListItema1 = function(add, troop) {

   	var $allData = `<a  class="previewbutton" href="#" id="` + troop + `"><img src="` + add + `" class="rounded-circle image1" style="height: 25px;"></a>`;
   	return $allData;

   }



   var $flex = $('.button-area');
   $appendData.on("click", ".del", function() {
   	var bolo = $(this).parent().parent().remove();
   	var bolo1 = $(this).next().html();

   	var foo = $flex.children();

   	// console.log(bolo1);
   	console.log(foo);

   	for (let index = 0; index < foo.length; index++) {


   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];
   		// console.log($element1);

   		// console.log($element1);
   		if (bolo1 === $element) {

   			$element1.remove();

   		} else {

   		}

   	}
   	createpreview();
   });
   $appendData.on("click", ".sav", function() {
   	var $list = $(this).parent().parent();
   	console.log($list);
   	var bolo1 = $(this).next().html();
   	console.log(bolo1);

   	var $input = $list.find('.ip').val();
   	console.log($input);
   	var foo = $flex.children();

   	for (let index = 0; index < foo.length; index++) {
   		const $element = foo[index].setAttribute('href', $input);
   		// const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];


   		if (bolo1 === $element) {
   			$element1.setAttribute('href', $input);



   		} else {

   		}

   	}
   	// editTask($list, $input);

   });






   // ////////////////////////// social media

   $('.hellomedia').on('click', function() {
   	var melo = $(this).find('.image1').attr("src");
   	var melo1 = $(this).find('.first1').html();

   	var listItemToAddb = makeNewListItemb(melo, melo1);
   	var listItemToAdda1 = makeNewListItemsocial(melo, melo1);



   	$appedndData1.append(listItemToAddb);

   	$('.button-area2').append(listItemToAdda1);

   });
   var makeNewListItemb = function(add, troop) {

   	var $allData = `<div class="row justify-content-left u-mb-small nolo"><div class="col-md-2 u-mb-small  text-center">
      <img src="` + add + `" class="rounded-circle image1" style="height: 35px;"> <input style="display:none" id="">
      </div><div class="col-md-5 u-mb-small "><label class="c-field__label u-hidden-visually " for="input1">Label</label>
      <input class="c-input ip" id="input1" type="text" placeholder="place your Link here">
      </div>
      <div class="col-md-1 text-center">
       <a class="btn sav" style="border:1px dotted #00B4DB;padding-bottom: 10px;"> <i class="fa fa-save" aria-hidden="true"></i></a>
       <span class="find" style="display:none">` + troop + `</span>
       </div>
       <div class="col-md-1 text-center">
      <a class="btn del1" style="border:1px dotted #00B4DB;padding-bottom: 10px;"> <i class="fa fa-trash-o" aria-hidden="true"></i></a>
      <span class="find" style="display:none">` + troop + `</span></div>
      </div>`;
   	// console.log(add);
   	return $allData;

   }
   var makeNewListItemsocial = function(add, troop) {

   	var $allData = `<a  href="#" id="` + troop + `"><img src="` + add + `" class="rounded-circle image1" style="height: 25px;"><p class="what" style="display:none" id=` + troop + ` >` + troop + `</p></a>`;

   	return $allData;

   }
   // $appedndData1.on("click", ".del1", function () {

   //    $(this).parent().parent().remove();
   // })
   $appendData1.on("keyup", ".ip1", function() {
   	var polo = $(this).val();
   	console.log(polo);

   });

   var $flex2 = $('.button-area2');

   $appendData1.on("click", ".del1", function() {
   	var bolo = $(this).parent().parent().remove();
   	var bolo1 = $(this).next().html();
   	console.log(bolo);
   	console.log(bolo1);


   	var foo = $flex2.children();

   	// console.log(bolo1);
   	console.log(foo);

   	for (let index = 0; index < foo.length; index++) {

   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];
   		// console.log($element1);

   		// console.log($element1);
   		if (bolo1 === $element) {

   			$element1.remove();

   		} else {

   		}

   	}
   });
   $appendData1.on("click", ".sav", function() {
   	var $list = $(this).parent().parent();
   	console.log($list);
   	var bolo1 = $(this).next().html();
   	console.log(bolo1);

   	var $input = $list.find('.ip').val();
   	console.log($input);
   	var foo = $flex2.children();
   	// console.log(foo);
   	for (let index = 0; index < foo.length; index++) {
   		// const $element = foo[index].setAttribute('href', $input);
   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];


   		if (bolo1 === $element) {
   			$element1.setAttribute('href', $input);



   		} else {

   		}

   	}
   	// editTask($list, $input);

   });









   //////////////////////////////////////// add pixels
   $('.helloaddpixels').on('click', function() {
   	var melo = $(this).find('.image1').attr("src");

   	var listItemToAddc = makeNewListItemc(melo);

   	$appendData2.append(listItemToAddc);

   });
   var makeNewListItemc = function(add) {

   	var $allData = ` < div class = "row justify-content-left u-mb-small " > < div class = "col-md-2 u-mb-small  text-center" >
      <
      img src = "` + add + `"
   class = "rounded-circle image1"
   style = "height: 35px;" > < /div><div class="col-md-5 u-mb-small "> <
      label class = "c-field__label u-hidden-visually"
   for = "input1" > Label < /label><input class="c-input ip2" id="input1" type="text" placeholder="place your title here"> </div > < div class = "col-md-1 text-center" >
      <
      a class = "btn del2"
   style = "border:1px dotted#00B4DB;padding-bottom: 10px;" >
      <
      i class = "fa fa-trash-o"
   aria - hidden = "true" > < /i></a > < /div></div > `;
   	// console.log(add);
   	return $allData;

   }


   $appendData2.on("keyup", ".ip2", function() {
   	var polo = $(this).val();
   	console.log(polo);

   });









   ////////////////////////////////////////
   /////////////////////////////////////////// link button
   var $data = $('.steph');
   var iCnt = 0;
   $('.linkbtn').on('click', function() {
   	iCnt = iCnt + 1;
   	var $data1 = ` <div class="row">
      <span class="find" style="display:none">` + iCnt + `</span>
      <div class="col-md-5 u-mb-small">

         <div class="c-field ">
            <label class="c-field__label u-hidden-visually" for="input1">Label</label>
            <input class="c-input link" id="input1" type="text" placeholder="place your link here">
         </div>
      </div>
      <div class="col-md-5 u-mb-small">
         <div class="c-field ">
            <label class="c-field__label u-hidden-visually" for="input1">Label</label>
            <input class="c-input title" id="input1" type="text" placeholder="place your title here">
         </div>
      </div>
      <div class="col-md-1 u-mb-small">
      <a class="btn sav" style="border:1px dotted#00B4DB;padding-bottom: 10px;">
         <i class="fa fa-save" aria-hidden="true"></i>
      </a>
   </div>
      <div class="col-md-1 u-mb-small">
         <a class="btn del3" style="border:1px dotted#00B4DB;padding-bottom: 10px;">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
         </a>
      </div>
   </div>`;

   	$data.append($data1);
   	var listItemToAdda1 = makeNewListItemLink();


   	$('.button-area1').append(listItemToAdda1);


   });
   var iCnt1 = 0;
   var makeNewListItemLink = function() {
   	iCnt1 = iCnt1 + 1;
   	var $allData = `<a href="#" id="` + iCnt1 + `"></a>`;
   	return $allData;

   }
   $flex3 = $('.button-area1');
   $data.on("click", ".del3", function() {
   	// $(this).parent().parent().remove();

   	// var bolo = $(this).parent().parent().remove();
   	var bolo1 = $(this).parent().parent().find('.find').html();
   	console.log(bolo);
   	console.log(bolo1);


   	var foo = $flex3.children();

   	// console.log(bolo1);
   	console.log(foo);

   	for (let index = 0; index < foo.length; index++) {

   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];
   		// console.log($element1);

   		// console.log($element1);
   		if (bolo1 === $element) {

   			$element1.remove();

   		} else {

   		}

   	}

   });
   // $data.on("keyup", ".link", function () {
   //    var polo = $(this).val();
   //    console.log(polo);
   // });
   // $data.on("keyup", ".title", function () {
   //    var polo = $(this).val();
   //    console.log(polo);
   // });
   $data.on("click", ".sav", function() {
   	var $damn = $(this).parent().parent().find('.link').val();
   	var $damn1 = $(this).parent().parent().find('.title').val();
   	// var bolo = $(this).parent().parent().remove();
   	var bolo1 = $(this).parent().parent().find('.find').html();
   	// console.log(bolo);
   	console.log(bolo1);
   	var foo = $flex3.children();

   	// console.log(bolo1);
   	console.log(foo);

   	for (let index = 0; index < foo.length; index++) {

   		const $element = foo[index].getAttribute('id');
   		const $element1 = foo[index];
   		// console.log($element1);

   		// console.log($element1);
   		if (bolo1 === $element) {

   			$element1.append($damn);
   			$element1.setAttribute("href", $damn1);

   		} else {

   		}

   	}




   })




   //////////////////////////////////////////
