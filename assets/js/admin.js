//删除个功能使用jquery
$(function(){
	//跨域请求豆瓣api测试
	$('#douban').blur(function(){
		var douban=$(this);
		var id=douban.val();
		if(id){
			$.ajax({
				url:'https://api.douban.com/v2/movie/subject/'+id,
				cache:true,
				type:'get',
				dataType:'jsonp',
				crossDomain:true,//跨域 
				jsonp:'callback',//jsonp回传的参数名callback
				success:function(data){
					//豆瓣数据进行赋值
					$('#inputTitle').val(data.title)
					$('#inputDoctor').val(data.directors[0].name)
					$('#inputCountry').val(data.countries[0])
					// $('#inputLanguage').val(data.)
					$('#inputPoster').val(data.images.large)
					// $('#inputFlash').val(data.)
					$('#inputYea').val(data.year)
					$('#inputSummary').val(data.summary)

				}

			})
		}
	})
})