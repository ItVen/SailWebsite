//检测用户权限
 module.exports=function(req,res,next){
	var user=req.session.user;
	User
	.find({name:user.name})
	.exec(function(err,user){
		if(err){
			console.log(err);
		}else{
			console.log(user[0].role)
			if(user[0].role<=10||user[0].role===undefined){
				return res.redirect('/signin');
			}
		}
		next();
	})
	
};
