// Start upload preview image
$(".gambar").attr("src", "https://user.gadjian.com/static/images/personnel_boy.png");
var $uploadCrop,
    tempFilename,
    rawImg,
    imageId;

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.upload-demo').addClass('ready');
            $('#cropImagePop').modal('show');
            rawImg = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        swal("Sorry - you're browser doesn't support the FileReader API");
    }
}

$uploadCrop = $('#upload-demo').croppie({
    viewport: {
        width: 130,
        height: 130,
    },
    enforceBoundary: false,
    enableExif: true
});
$('#cropImagePop').on('shown.bs.modal', function() {
    // alert('Shown pop');
    $uploadCrop.croppie('bind', {
        url: rawImg
    }).then(function() {
        console.log('jQuery bind complete');
    });
});

$('.item-img').on('change', function() {
    imageId = $(this).data('id');
    tempFilename = $(this).val();
    $('#cancelCropBtn').data('id', imageId);
    readFile(this);
});
$('#cropImageBtn').on('click', function(ev) {
    $uploadCrop.croppie('result', {
        type: 'base64',
        format: 'jpeg',
        size: {
            width: 150,
            height: 200,
        }
    }).then(function(resp) {
        var dumb = $('.flex-image').find('#item-img-output');
        var dumb1 = $('.flex-image').find('#item-img-output1');
        console.log(dumb);
        $(dumb).attr('src', resp);
        $('.flex-image').append(`<div><img src="${resp}" class="roundimage mx-auto d-block" id="item-img-output" /></div>`);



        $('#cropImagePop').modal('hide');
    });
});
// End upload preview image