/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list:function(req,res){
		//实现查询逻辑
		User
		.find()
		.exec(function(err,users){
			if(err){
				console.log(err);
			}
			res.locals.moment=require('moment');
			res.render('pages/userlist',{
				title:'用户信息列表页',
				users:users
			})
		})
	},
	delet:function(req,res){
		var query=req._parsedUrl.query;
		console.log(query);
		if(query!==undefined){
			var id=query.substr(3);
		}
		// console.log(id);
		if(id){
			User.destroy({id: id},function(err,user){
				if(err){
					console.log(err)
				}else{
					res.json({success:1})
				}

			});
		}
	}
};

