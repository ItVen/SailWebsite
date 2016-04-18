//点击头像对当前用户的评论进行评论
$(function(){
	$('.headPhoto').click(function(e){//对头像事件进行监听
		var target=$(this);//拿到自身的节点
		var tid=target.data('tid');
		var cid=target.data('cid');
		//开始动态的插入隐藏域
		if($('#tid').length>0){
			$('#tid').value(tid);
		}else{
			$('<input>').attr({
				type:'hidden',
				name:'tid',
				id:'tid',
				value:tid
			}).appendTo('#commentForm');
		}

		
		if($('#cid').length>0){
			$('#cid').val(cid);
		}else{
			$('<input>').attr({
				type:'hidden',
				name:'cid',
				id:'cid',
				value:cid
			}).appendTo('#commentForm');
		}
	})
})