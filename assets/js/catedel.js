//删除个功能使用jquery
$(function(){
	$('.del').click(function(e){//拿到所有的删除按钮，监听点击事件
		var target=$(e.target);
		var id=target.data('id');
		console.log('id:'+id);
		// //拿到表格中的行，删除整行
		 var tr=$('.item-id-'+id);
		 console.log('拿到tr'+tr );
		$.ajax({
			type:'DELETE',
			url:'/admin/category/list?id='+id
		})
		.done(function(results){
			if(results.success===1){
				if(tr.length>0){
					tr.remove();
				}else{
					console.log('什么情况！！！')
				}
			}
		})
	});
})
