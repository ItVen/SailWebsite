/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	save:function(req,res){
		//拿到评论对象
		var _comment=req.body;
		console.log(_comment);
		// //得到电影的id
		var movieId=_comment.movieid;
		var userid=_comment.fromid;
		var id=_comment.cid;
		var tid=_comment.tid;
		var content=_comment.content;
		if(id){
			Comment
			.update(id,{from:userid,to:tid})
			.exec(function(err,newcomment){
				if (err) console.log(err);
				console.log(newcomment);
			})
		}else{
			Comment
			.create(_comment)
			.exec(function(err,comment){
				if(err) console.log(err);
				Comment
				.update(comment.id,{movie:movieId,from:userid})
				.exec(function(err,updatecomment){
					if(err) console.log(err);
					console.log(updatecomment);
					res.redirect('/movie/'+movieId);
				});
			});
		}

		/***回复的处理**/
		//查看是否存在cid---有则表示有用户评论回复
		// if(_comment.cid){
	// 		//找到主评论的id--通过回调拿到主评论
	// 		Comment.findById(_comment.cid,function(err,comment){
	// 			console.log(comment);
	// 			if(err){
	// 				console.log(err);
	// 			}
	// 			
	// 			//向当前的comment添加一条数据
	// 			comment.reply.push(newReply);
	// 			// console.log(_comment);
	// 			// //保存
	// 			comment.save(function(err,comment){
	// 				// console.log('reply')
	// 		        console.log(comment.reply.from)
	// 				if(err){
	// 					// console.log('err:')
	// 					console.log(err);
	// 				}
	// 				//保存成功后刷新到评论电影的页面
	// 				res.redirect('/movie/'+movieId);
	// 			});
	// 		});
	}
	
};