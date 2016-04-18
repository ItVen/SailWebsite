/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt=require('bcrypt-nodejs');
module.exports = {
  tableName: 'user',
  attributes: {
		name:{
			unique:true,//唯一的
			type:'string',
		},
		password:{
			unique:true,//唯一的
			type:'string',
		},
		/**需要有机制控制用户权限的层级**/
		role:{
			type:'integer',
			defaultsTo:0
		},
		//关联评论
		fromu:{
			collection: 'comment',
		    via: 'from'
		},
		tou:{
			collection: 'comment',
		    via: 'to'
		}

  },
  beforeCreate: function (user, cb) {
  		console.log('加盐处理密码');
		//加盐处理密码
		bcrypt.hash(user.password,null,null,function(err,hash){
			if(err){
				return cb(err);
			}
			user.password=hash;
			cb();
		});
	}
};

