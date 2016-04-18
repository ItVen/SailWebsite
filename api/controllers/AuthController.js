/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport=require('passport');
function isLogin(req,res){
    var id=req.cookies.id;
    if(id){
        User
        .findOne(id)
        .exec(function(err,user){
            if(err){
              console.log(err)
            }else{
                req.session.user = user;
                res.locals.user=user;
                req.isAuthenticated=true; 
            }
        })
    }
};
module.exports = {
	//跳转注册页面
	toSignup: function (req, res) {
        return res.view('pages/signup');
    },
    //处理注册逻辑
    processSignup:function(req,res,next){
        // 由请求参数构造待创建User对象
        var user = req.allParams();
        console.log(user);
        User.create(user).exec(function createCB(err, created){
            console.log(created)

            if(err){
               	// 如果有误，返回错误
                res.view('pages/signup');
            }else{
                req.login(created, function(err) {
                    if (err) { 
                    	return next(err);
                	}
                    res.cookie('name',user.name,user);
                    isLogin(req,res);
                    return res.redirect('/');
                });
            }
        });
    },
    //处理登录逻辑
    processSignin: function(req,res){
        // console.log(req);
        // // 使用本地验证策略对登录进行验证
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user,
                    err:err
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err); 
                res.cookie('id',user.id);
                isLogin(req,res);
                return res.redirect('/');
            });

        })(req, res);
    },
    //处理登出逻辑
    logout: function(req, res) {
        req.logout();
        delete req.session.user;
        res.clearCookie('id');
        res.redirect('/');
    }
};

