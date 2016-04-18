 module.exports = function(req, res, next) {
    var id=req.cookies.id;
    console.log(id)
    if(id){
        User
        .findOne(id)
        .exec(function(err,user){
            if(err){
              console.log(err)
            }else{
            	console.log(user)
                req.session.user = user;
                res.locals.user=user;
                req.isAuthenticated=true; 
                console.log(res.locals.user)
            }
        })
    }
    next();
};