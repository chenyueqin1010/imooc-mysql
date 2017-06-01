$(function(){
	var cropper;
	var username = sessionStorage.getItem('username');
	
	if(!username){
		location.href="/";
	}
	
    function init() {
        //添加剪切和预览区域
        cropper = new ImageCropper(300, 300, 180, 180);
        cropper.setCanvas("cropper");
        cropper.addPreview("preview180");
        //检测用户浏览器是否支持imagecropper插件
        if(!cropper.isAvaiable()){
            alert("浏览器不支持文件上传，请使用Firefox3.6+或Chrome10+！");
        }
    }
    //打开本地图片
    selectImage = function (fileList) {
        cropper.loadImage(fileList[0]);
        $('#copperContainer').show();
    }
    //上传图片
    saveImage = function (){
        var imgData = cropper.getCroppedImageData(180, 180);//自定义大小
        
        $.ajax({
        	type:"post",
        	url:"/user/upload/image",
        	data: {
        		'imgData':imgData,
        		'username':username
        	},
        	dataType:'json',
        	success: function (data){
        		sessionStorage.setItem('imgData',imgData);
        		location.reload();
        	}
        });
    }
    
    $('.cancel').click(function(){
    	$('#copperContainer').hide();
    })
    init();
})
