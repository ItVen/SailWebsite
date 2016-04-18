//检测用户是否登录
 module.exports=function(req,res,next){
	var user=req.session.user;
	if(!user){
		console.log("not signin!!!");
		return res.redirect('/signin');
	}
	next()
};
